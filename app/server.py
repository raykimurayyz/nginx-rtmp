#!/usr/bin/env python3
"""Small dependency-free control service for NGINX RTMP relay configuration."""

from __future__ import annotations

import json
import logging
import os
import re
import signal
import subprocess
import threading
import time
import uuid
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlsplit
from urllib.request import urlopen


APP_HOST = os.environ.get("APP_HOST", "0.0.0.0")
APP_PORT = int(os.environ.get("APP_PORT", "8080"))
DATA_DIR = Path(os.environ.get("DATA_DIR", "/data"))
STATE_PATH = DATA_DIR / "config.json"
NGINX_CONFIG = Path(os.environ.get("NGINX_CONFIG", "/etc/nginx/nginx.conf"))
GENERATED_CONFIG = Path(
    os.environ.get("NGINX_GENERATED_CONFIG", "/etc/nginx/generated/push.conf")
)
STATIC_DIR = Path(__file__).with_name("static")
MAX_BODY_SIZE = 256 * 1024
MAX_DESTINATIONS = 20
CONTROL_CHARS = re.compile(r"[\x00-\x1f\x7f]")

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
LOGGER = logging.getLogger("relay-manager")
CONFIG_LOCK = threading.RLock()


class ValidationError(ValueError):
    pass


@dataclass
class ApplyResult:
    config: dict[str, Any]
    warning: str | None = None


def default_config() -> dict[str, Any]:
    return {"version": 1, "destinations": []}


def atomic_write(path: Path, content: str, mode: int = 0o600) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    temporary.write_text(content, encoding="utf-8")
    os.chmod(temporary, mode)
    os.replace(temporary, path)


def load_state() -> dict[str, Any]:
    if not STATE_PATH.exists():
        state = default_config()
        atomic_write(STATE_PATH, json.dumps(state, indent=2) + "\n")
        return state
    try:
        raw = json.loads(STATE_PATH.read_text(encoding="utf-8"))
        return validate_config(raw, default_config())
    except (OSError, json.JSONDecodeError, ValidationError) as exc:
        raise RuntimeError(f"Unable to load {STATE_PATH}: {exc}") from exc


def validate_text(value: Any, field: str, maximum: int, required: bool = True) -> str:
    if not isinstance(value, str):
        raise ValidationError(f"{field} must be a string")
    value = value.strip()
    if required and not value:
        raise ValidationError(f"{field} is required")
    if len(value) > maximum:
        raise ValidationError(f"{field} is too long")
    if CONTROL_CHARS.search(value):
        raise ValidationError(f"{field} contains control characters")
    return value


def validate_server_url(value: Any) -> str:
    url = validate_text(value, "serverUrl", 1024)
    parsed = urlsplit(url)
    if parsed.scheme.lower() != "rtmp":
        raise ValidationError("serverUrl must use the rtmp:// scheme")
    if not parsed.hostname:
        raise ValidationError("serverUrl must include a host")
    if parsed.username or parsed.password:
        raise ValidationError("credentials are not allowed in serverUrl")
    if parsed.fragment:
        raise ValidationError("serverUrl must not include a fragment")
    try:
        _ = parsed.port
    except ValueError as exc:
        raise ValidationError("serverUrl has an invalid port") from exc
    return url.rstrip("/")


def validate_config(payload: Any, existing: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(payload, dict):
        raise ValidationError("request body must be an object")
    destinations = payload.get("destinations")
    if not isinstance(destinations, list):
        raise ValidationError("destinations must be a list")
    if len(destinations) > MAX_DESTINATIONS:
        raise ValidationError(f"a maximum of {MAX_DESTINATIONS} destinations is allowed")

    existing_by_id = {
        item.get("id"): item
        for item in existing.get("destinations", [])
        if isinstance(item, dict) and isinstance(item.get("id"), str)
    }
    result: list[dict[str, Any]] = []
    seen_ids: set[str] = set()

    for index, item in enumerate(destinations):
        if not isinstance(item, dict):
            raise ValidationError(f"destination {index + 1} must be an object")

        destination_id = item.get("id")
        if destination_id is None or destination_id == "":
            destination_id = uuid.uuid4().hex
        if not isinstance(destination_id, str) or not re.fullmatch(r"[a-f0-9]{32}", destination_id):
            raise ValidationError(f"destination {index + 1} has an invalid id")
        if destination_id in seen_ids:
            raise ValidationError("destination ids must be unique")
        seen_ids.add(destination_id)

        name = validate_text(item.get("name"), "name", 60)
        server_url = validate_server_url(item.get("serverUrl"))
        enabled = item.get("enabled", True)
        if not isinstance(enabled, bool):
            raise ValidationError("enabled must be true or false")

        stream_key_value = item.get("streamKey", "")
        if stream_key_value == "" and destination_id in existing_by_id:
            stream_key = existing_by_id[destination_id].get("streamKey", "")
        else:
            stream_key = validate_text(stream_key_value, "streamKey", 1024)
        if not stream_key:
            raise ValidationError(f"streamKey is required for {name}")

        result.append(
            {
                "id": destination_id,
                "name": name,
                "serverUrl": server_url,
                "streamKey": stream_key,
                "enabled": enabled,
            }
        )

    return {"version": 1, "destinations": result}


def nginx_quote(value: str) -> str:
    if CONTROL_CHARS.search(value):
        raise ValidationError("configuration value contains control characters")
    escaped = value.replace("\\", "\\\\").replace('"', '\\"').replace("$", "\\$")
    return f'"{escaped}"'


def render_push_config(config: dict[str, Any]) -> str:
    lines = [
        "# Generated by RTMP Relay Manager. Do not edit manually.",
        f"# Updated: {time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}",
    ]
    for destination in config["destinations"]:
        if not destination["enabled"]:
            continue
        lines.append(f"# {destination['name']}")
        lines.append(
            f"push {nginx_quote(destination['serverUrl'])} "
            f"playPath={nginx_quote(destination['streamKey'])};"
        )
    return "\n".join(lines) + "\n"


def public_config(config: dict[str, Any]) -> dict[str, Any]:
    destinations = []
    for item in config["destinations"]:
        destinations.append(
            {
                "id": item["id"],
                "name": item["name"],
                "serverUrl": item["serverUrl"],
                "enabled": item["enabled"],
                "streamKeySet": bool(item["streamKey"]),
                "streamKeyHint": mask_key(item["streamKey"]),
            }
        )
    return {"version": config["version"], "destinations": destinations}


def mask_key(value: str) -> str:
    if len(value) <= 8:
        return "•" * min(len(value), 8)
    return f"{value[:3]}{'•' * 8}{value[-3:]}"


def run_nginx(*arguments: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["nginx", "-c", str(NGINX_CONFIG), *arguments],
        check=False,
        capture_output=True,
        text=True,
        timeout=15,
    )


def apply_config(payload: Any) -> ApplyResult:
    with CONFIG_LOCK:
        existing = load_state()
        validated = validate_config(payload, existing)
        rendered = render_push_config(validated)
        old_generated = GENERATED_CONFIG.read_text(encoding="utf-8") if GENERATED_CONFIG.exists() else ""

        atomic_write(GENERATED_CONFIG, rendered, mode=0o600)
        check = run_nginx("-t")
        if check.returncode != 0:
            atomic_write(GENERATED_CONFIG, old_generated, mode=0o600)
            LOGGER.error("NGINX rejected generated configuration: %s", check.stderr.strip())
            raise ValidationError("NGINX rejected the generated configuration")

        reload_result = run_nginx("-s", "reload")
        if reload_result.returncode != 0:
            atomic_write(GENERATED_CONFIG, old_generated, mode=0o600)
            run_nginx("-s", "reload")
            LOGGER.error("NGINX reload failed: %s", reload_result.stderr.strip())
            raise RuntimeError("NGINX could not reload the generated configuration")

        atomic_write(STATE_PATH, json.dumps(validated, indent=2, ensure_ascii=False) + "\n")
        status = fetch_rtmp_status()
        warning = None
        if status["activeStreams"]:
            warning = "Reconnect the input stream to guarantee that the new relay settings take effect."
        return ApplyResult(public_config(validated), warning)


def text_of(node: ET.Element, name: str, default: str = "0") -> str:
    child = node.find(name)
    return child.text if child is not None and child.text is not None else default


def fetch_rtmp_status() -> dict[str, Any]:
    try:
        with urlopen("http://127.0.0.1:8081/stat", timeout=1.5) as response:
            payload = response.read(1024 * 1024)
        root = ET.fromstring(payload)
        streams = []
        for stream in root.findall("./server/application/live/stream"):
            streams.append(
                {
                    "name": text_of(stream, "name", "unknown"),
                    "timeMs": int(text_of(stream, "time")),
                    "bandwidthIn": int(text_of(stream, "bw_in")),
                    "bytesIn": int(text_of(stream, "bytes_in")),
                    "bandwidthOut": int(text_of(stream, "bw_out")),
                    "bytesOut": int(text_of(stream, "bytes_out")),
                    "clients": int(text_of(stream, "nclients")),
                }
            )
        return {"nginx": "online", "activeStreams": streams, "checkedAt": int(time.time())}
    except Exception as exc:  # Status must remain best-effort.
        LOGGER.debug("RTMP status unavailable: %s", exc)
        return {"nginx": "offline", "activeStreams": [], "checkedAt": int(time.time())}


class RelayHTTPServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True


class RequestHandler(BaseHTTPRequestHandler):
    server_version = "RelayManager/1.0"

    def log_message(self, fmt: str, *args: Any) -> None:
        LOGGER.info("%s - %s", self.client_address[0], fmt % args)

    def send_json(self, status: HTTPStatus, payload: dict[str, Any]) -> None:
        encoded = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Content-Security-Policy", "default-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:")
        self.end_headers()
        self.wfile.write(encoded)

    def send_error_json(self, status: HTTPStatus, message: str) -> None:
        self.send_json(status, {"error": message})

    def do_GET(self) -> None:  # noqa: N802
        path = urlsplit(self.path).path
        if path == "/api/health":
            self.send_json(HTTPStatus.OK, {"status": "ok"})
            return
        if path == "/api/config":
            try:
                with CONFIG_LOCK:
                    self.send_json(HTTPStatus.OK, public_config(load_state()))
            except RuntimeError as exc:
                self.send_error_json(HTTPStatus.INTERNAL_SERVER_ERROR, str(exc))
            return
        if path == "/api/status":
            status = fetch_rtmp_status()
            try:
                state = load_state()
                status["enabledDestinations"] = sum(1 for item in state["destinations"] if item["enabled"])
            except RuntimeError:
                status["enabledDestinations"] = 0
            self.send_json(HTTPStatus.OK, status)
            return
        if path.startswith("/api/"):
            self.send_error_json(HTTPStatus.NOT_FOUND, "not found")
            return
        self.serve_static(path)

    def do_PUT(self) -> None:  # noqa: N802
        if urlsplit(self.path).path != "/api/config":
            self.send_error_json(HTTPStatus.NOT_FOUND, "not found")
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_error_json(HTTPStatus.BAD_REQUEST, "invalid content length")
            return
        if length <= 0 or length > MAX_BODY_SIZE:
            self.send_error_json(HTTPStatus.REQUEST_ENTITY_TOO_LARGE, "request body is empty or too large")
            return
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            result = apply_config(payload)
            response: dict[str, Any] = {"config": result.config}
            if result.warning:
                response["warning"] = result.warning
            self.send_json(HTTPStatus.OK, response)
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_error_json(HTTPStatus.BAD_REQUEST, "request body must be valid JSON")
        except ValidationError as exc:
            self.send_error_json(HTTPStatus.BAD_REQUEST, str(exc))
        except (OSError, RuntimeError, subprocess.SubprocessError) as exc:
            LOGGER.exception("Configuration update failed")
            self.send_error_json(HTTPStatus.INTERNAL_SERVER_ERROR, str(exc))

    def serve_static(self, request_path: str) -> None:
        relative = "index.html" if request_path == "/" else unquote(request_path.lstrip("/"))
        candidate = (STATIC_DIR / relative).resolve()
        try:
            candidate.relative_to(STATIC_DIR.resolve())
        except ValueError:
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        if not candidate.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        mime = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "text/javascript; charset=utf-8",
            ".png": "image/png",
            ".ico": "image/x-icon",
        }.get(candidate.suffix.lower(), "application/octet-stream")
        body = candidate.read_bytes()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache" if candidate.suffix == ".html" else "public, max-age=3600")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Content-Security-Policy", "default-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:")
        self.end_headers()
        self.wfile.write(body)


def prepare_runtime() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    GENERATED_CONFIG.parent.mkdir(parents=True, exist_ok=True)
    state = load_state()
    atomic_write(GENERATED_CONFIG, render_push_config(state), mode=0o600)
    check = run_nginx("-t")
    if check.returncode != 0:
        raise RuntimeError(f"Initial NGINX configuration is invalid: {check.stderr.strip()}")


def main() -> None:
    prepare_runtime()
    nginx = subprocess.Popen(["nginx", "-c", str(NGINX_CONFIG), "-g", "daemon off;"])
    server = RelayHTTPServer((APP_HOST, APP_PORT), RequestHandler)
    stopping = threading.Event()

    def stop(signum: int, _frame: Any) -> None:
        if stopping.is_set():
            return
        stopping.set()
        LOGGER.info("Received signal %s, stopping", signum)
        threading.Thread(target=server.shutdown, daemon=True).start()

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)

    def watch_nginx() -> None:
        return_code = nginx.wait()
        if not stopping.is_set():
            LOGGER.error("NGINX exited unexpectedly with status %s", return_code)
            os.kill(os.getpid(), signal.SIGTERM)

    threading.Thread(target=watch_nginx, daemon=True).start()
    LOGGER.info("Management interface listening on http://%s:%s", APP_HOST, APP_PORT)
    try:
        server.serve_forever(poll_interval=0.5)
    finally:
        server.server_close()
        if nginx.poll() is None:
            nginx.terminate()
            try:
                nginx.wait(timeout=10)
            except subprocess.TimeoutExpired:
                nginx.kill()
        LOGGER.info("Stopped")


if __name__ == "__main__":
    main()

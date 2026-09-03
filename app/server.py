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
STATE_BACKUP_PATH = DATA_DIR / "config.json.backup"
NGINX_CONFIG = Path(os.environ.get("NGINX_CONFIG", "/etc/nginx/nginx.conf"))
GENERATED_CONFIG = Path(
    os.environ.get("NGINX_GENERATED_CONFIG", "/tmp/nginx-generated/rtmp.conf")
)
STATIC_DIR = Path(__file__).with_name("static")
MAX_BODY_SIZE = 256 * 1024
MAX_DESTINATIONS = 20
MAX_ROUTES = 20
CONFIG_VERSION = 2
CONTROL_CHARS = re.compile(r"[\x00-\x1f\x7f]")
APPLICATION_NAME = re.compile(r"[A-Za-z0-9_-]{1,64}")

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
LOGGER = logging.getLogger("relay-manager")
CONFIG_LOCK = threading.RLock()


class ValidationError(ValueError):
    pass


class ConflictError(ValueError):
    pass


@dataclass
class ApplyResult:
    config: dict[str, Any]
    warning_code: str | None = None


def default_settings() -> dict[str, int]:
    return {"chunkSize": 4096, "pingSeconds": 30, "pingTimeoutSeconds": 10}


def new_route(name: str, application: str) -> dict[str, Any]:
    return {
        "id": uuid.uuid4().hex,
        "name": name,
        "application": application,
        "enabled": True,
        "allowPlay": True,
        "idleStreams": False,
        "waitKey": False,
        "dropIdlePublisherSeconds": 0,
        "pushReconnectSeconds": 1,
        "destinationIds": [],
    }


def empty_config() -> dict[str, Any]:
    return {
        "version": CONFIG_VERSION,
        "revision": 1,
        "settings": default_settings(),
        "routes": [],
        "destinations": [],
    }


def default_config() -> dict[str, Any]:
    config = empty_config()
    config["routes"] = [
        new_route("PlayStation", "app"),
        new_route("Generic RTMP", "live"),
    ]
    return config


def atomic_write(path: Path, content: str, mode: int = 0o600) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    temporary.write_text(content, encoding="utf-8")
    os.chmod(temporary, mode)
    os.replace(temporary, path)


def migrate_config(raw: Any) -> dict[str, Any]:
    if not isinstance(raw, dict):
        raise ValidationError("configuration must be an object")
    version = raw.get("version", 1)
    if version == CONFIG_VERSION:
        return raw
    if version != 1:
        raise ValidationError(f"unsupported configuration version: {version}")

    destinations = raw.get("destinations", [])
    if not isinstance(destinations, list):
        raise ValidationError("destinations must be a list")
    migrated_destinations = []
    destination_ids = []
    for item in destinations:
        if not isinstance(item, dict):
            raise ValidationError("destination must be an object")
        destination_id = item.get("id") or uuid.uuid4().hex
        destination_ids.append(destination_id)
        migrated_destinations.append(
            {
                **item,
                "id": destination_id,
                "mode": "serverKey",
            }
        )
    route = new_route("Generic RTMP", "live")
    route["destinationIds"] = destination_ids
    return {
        "version": CONFIG_VERSION,
        "revision": 1,
        "settings": default_settings(),
        "routes": [route],
        "destinations": migrated_destinations,
    }


def read_valid_state(path: Path) -> tuple[dict[str, Any], bool]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    migrated = migrate_config(raw)
    validated = validate_config(migrated, empty_config())
    return validated, raw.get("version", 1) != CONFIG_VERSION


def load_state() -> dict[str, Any]:
    if not STATE_PATH.exists():
        state = default_config()
        atomic_write(STATE_PATH, json.dumps(state, indent=2, ensure_ascii=False) + "\n")
        return state
    try:
        state, migrated = read_valid_state(STATE_PATH)
        if migrated:
            atomic_write(STATE_BACKUP_PATH, STATE_PATH.read_text(encoding="utf-8"))
            atomic_write(STATE_PATH, json.dumps(state, indent=2, ensure_ascii=False) + "\n")
        return state
    except (OSError, json.JSONDecodeError, ValidationError) as primary_error:
        if STATE_BACKUP_PATH.exists():
            try:
                state, _ = read_valid_state(STATE_BACKUP_PATH)
                atomic_write(STATE_PATH, json.dumps(state, indent=2, ensure_ascii=False) + "\n")
                LOGGER.warning("Recovered configuration from %s", STATE_BACKUP_PATH)
                return state
            except (OSError, json.JSONDecodeError, ValidationError):
                pass
        raise RuntimeError(f"Unable to load {STATE_PATH}: {primary_error}") from primary_error


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


def validate_full_push_url(value: Any) -> str:
    url = validate_text(value, "pushUrl", 2048)
    parsed = urlsplit(url)
    if parsed.scheme.lower() != "rtmp":
        raise ValidationError("pushUrl must use the rtmp:// scheme")
    if not parsed.hostname:
        raise ValidationError("pushUrl must include a host")
    if parsed.username or parsed.password:
        raise ValidationError("credentials are not allowed in pushUrl")
    if parsed.fragment:
        raise ValidationError("pushUrl must not include a fragment")
    try:
        _ = parsed.port
    except ValueError as exc:
        raise ValidationError("pushUrl has an invalid port") from exc
    return url


def validate_integer(value: Any, field: str, minimum: int, maximum: int) -> int:
    if isinstance(value, bool) or not isinstance(value, int):
        raise ValidationError(f"{field} must be an integer")
    if value < minimum or value > maximum:
        raise ValidationError(f"{field} must be between {minimum} and {maximum}")
    return value


def validate_boolean(value: Any, field: str) -> bool:
    if not isinstance(value, bool):
        raise ValidationError(f"{field} must be true or false")
    return value


def validate_application_name(value: Any) -> str:
    name = validate_text(value, "application", 64)
    if not APPLICATION_NAME.fullmatch(name):
        raise ValidationError("application may contain only letters, numbers, hyphens, and underscores")
    return name


def validate_config(payload: Any, existing: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(payload, dict):
        raise ValidationError("request body must be an object")
    if payload.get("version", CONFIG_VERSION) != CONFIG_VERSION:
        raise ValidationError(f"configuration version must be {CONFIG_VERSION}")

    revision = validate_integer(payload.get("revision", 1), "revision", 1, 2_147_483_647)
    raw_settings = payload.get("settings", {})
    if not isinstance(raw_settings, dict):
        raise ValidationError("settings must be an object")
    defaults = default_settings()
    settings = {
        "chunkSize": validate_integer(raw_settings.get("chunkSize", defaults["chunkSize"]), "chunkSize", 128, 1_048_576),
        "pingSeconds": validate_integer(raw_settings.get("pingSeconds", defaults["pingSeconds"]), "pingSeconds", 1, 3600),
        "pingTimeoutSeconds": validate_integer(raw_settings.get("pingTimeoutSeconds", defaults["pingTimeoutSeconds"]), "pingTimeoutSeconds", 1, 3600),
    }

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
        enabled = validate_boolean(item.get("enabled", True), "enabled")
        mode = item.get("mode", "serverKey")
        if mode not in {"serverKey", "fullUrl"}:
            raise ValidationError("destination mode must be serverKey or fullUrl")
        existing_item = existing_by_id.get(destination_id, {})

        destination: dict[str, Any] = {
            "id": destination_id,
            "name": name,
            "mode": mode,
            "enabled": enabled,
        }
        if mode == "serverKey":
            server_url = validate_server_url(item.get("serverUrl"))
            stream_key_value = item.get("streamKey", "")
            if stream_key_value == "" and existing_item.get("mode", "serverKey") == "serverKey":
                stream_key = existing_item.get("streamKey", "")
            else:
                stream_key = validate_text(stream_key_value, "streamKey", 1024)
            if not stream_key:
                raise ValidationError(f"streamKey is required for {name}")
            destination.update({"serverUrl": server_url, "streamKey": stream_key})
        else:
            push_url_value = item.get("pushUrl", "")
            if push_url_value == "" and existing_item.get("mode") == "fullUrl":
                push_url = existing_item.get("pushUrl", "")
            else:
                push_url = validate_full_push_url(push_url_value)
            if not push_url:
                raise ValidationError(f"pushUrl is required for {name}")
            destination["pushUrl"] = push_url
        result.append(destination)

    routes = payload.get("routes")
    if not isinstance(routes, list):
        raise ValidationError("routes must be a list")
    if len(routes) > MAX_ROUTES:
        raise ValidationError(f"a maximum of {MAX_ROUTES} routes is allowed")

    destination_id_set = {item["id"] for item in result}
    route_result: list[dict[str, Any]] = []
    seen_route_ids: set[str] = set()
    seen_applications: set[str] = set()
    for index, item in enumerate(routes):
        if not isinstance(item, dict):
            raise ValidationError(f"route {index + 1} must be an object")
        route_id = item.get("id") or uuid.uuid4().hex
        if not isinstance(route_id, str) or not re.fullmatch(r"[a-f0-9]{32}", route_id):
            raise ValidationError(f"route {index + 1} has an invalid id")
        if route_id in seen_route_ids:
            raise ValidationError("route ids must be unique")
        seen_route_ids.add(route_id)

        application = validate_application_name(item.get("application"))
        if application in seen_applications:
            raise ValidationError(f"application {application} is already configured")
        seen_applications.add(application)
        destination_ids = item.get("destinationIds", [])
        if not isinstance(destination_ids, list) or not all(isinstance(value, str) for value in destination_ids):
            raise ValidationError("destinationIds must be a list of strings")
        if len(destination_ids) != len(set(destination_ids)):
            raise ValidationError("destinationIds must be unique within a route")
        unknown = set(destination_ids) - destination_id_set
        if unknown:
            raise ValidationError("route references an unknown destination")

        route_result.append(
            {
                "id": route_id,
                "name": validate_text(item.get("name"), "route name", 60),
                "application": application,
                "enabled": validate_boolean(item.get("enabled", True), "route enabled"),
                "allowPlay": validate_boolean(item.get("allowPlay", True), "allowPlay"),
                "idleStreams": validate_boolean(item.get("idleStreams", False), "idleStreams"),
                "waitKey": validate_boolean(item.get("waitKey", False), "waitKey"),
                "dropIdlePublisherSeconds": validate_integer(item.get("dropIdlePublisherSeconds", 0), "dropIdlePublisherSeconds", 0, 3600),
                "pushReconnectSeconds": validate_integer(item.get("pushReconnectSeconds", 1), "pushReconnectSeconds", 1, 300),
                "destinationIds": destination_ids,
            }
        )

    return {
        "version": CONFIG_VERSION,
        "revision": revision,
        "settings": settings,
        "routes": route_result,
        "destinations": result,
    }


def nginx_quote(value: str) -> str:
    if CONTROL_CHARS.search(value):
        raise ValidationError("configuration value contains control characters")
    escaped = value.replace("\\", "\\\\").replace('"', '\\"').replace("$", "\\$")
    return f'"{escaped}"'


def render_rtmp_config(config: dict[str, Any]) -> str:
    lines = [
        "# Generated by RTMP Relay Manager. Do not edit manually.",
        f"# Updated: {time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}",
        f"chunk_size {config['settings']['chunkSize']};",
        f"ping {config['settings']['pingSeconds']}s;",
        f"ping_timeout {config['settings']['pingTimeoutSeconds']}s;",
    ]
    destinations = {item["id"]: item for item in config["destinations"]}
    for route in config["routes"]:
        if not route["enabled"]:
            continue
        lines.extend(
            [
                "",
                f"# Input route: {route['name']}",
                f"application {route['application']} {{",
                "    live on;",
                "    record off;",
                f"    idle_streams {'on' if route['idleStreams'] else 'off'};",
                f"    wait_key {'on' if route['waitKey'] else 'off'};",
                f"    push_reconnect {route['pushReconnectSeconds']}s;",
                "    allow publish all;",
                f"    {'allow' if route['allowPlay'] else 'deny'} play all;",
            ]
        )
        if route["dropIdlePublisherSeconds"]:
            lines.append(f"    drop_idle_publisher {route['dropIdlePublisherSeconds']}s;")
        for destination_id in route["destinationIds"]:
            destination = destinations[destination_id]
            if not destination["enabled"]:
                continue
            lines.append(f"    # Destination: {destination['name']}")
            if destination["mode"] == "fullUrl":
                lines.append(f"    push {nginx_quote(destination['pushUrl'])};")
            else:
                lines.append(
                    f"    push {nginx_quote(destination['serverUrl'])} "
                    f"playPath={nginx_quote(destination['streamKey'])};"
                )
        lines.append("}")
    return "\n".join(lines) + "\n"


def public_config(config: dict[str, Any]) -> dict[str, Any]:
    destinations = []
    for item in config["destinations"]:
        destination = {
            "id": item["id"],
            "name": item["name"],
            "mode": item["mode"],
            "enabled": item["enabled"],
        }
        if item["mode"] == "fullUrl":
            destination.update({"pushUrlSet": True, "pushUrlHint": mask_push_url(item["pushUrl"])})
        else:
            destination.update(
                {
                    "serverUrl": item["serverUrl"],
                    "streamKeySet": bool(item["streamKey"]),
                    "streamKeyHint": mask_key(item["streamKey"]),
                }
            )
        destinations.append(destination)
    return {
        "version": config["version"],
        "revision": config["revision"],
        "settings": config["settings"],
        "routes": config["routes"],
        "destinations": destinations,
    }


def mask_key(value: str) -> str:
    if len(value) <= 8:
        return "•" * min(len(value), 8)
    return f"{value[:3]}{'•' * 8}{value[-3:]}"


def mask_push_url(value: str) -> str:
    parsed = urlsplit(value)
    host = parsed.hostname or "host"
    if ":" in host:
        host = f"[{host}]"
    if parsed.port:
        host = f"{host}:{parsed.port}"
    return f"{parsed.scheme}://{host}/••••••"


def redact_nginx_error(message: str, config: dict[str, Any]) -> str:
    redacted = message
    for destination in config.get("destinations", []):
        if destination.get("mode") == "fullUrl":
            secret = destination.get("pushUrl")
            replacement = mask_push_url(secret) if isinstance(secret, str) else "[redacted]"
        else:
            secret = destination.get("streamKey")
            replacement = "[redacted]"
        if isinstance(secret, str) and secret:
            redacted = redacted.replace(secret, replacement)
    return redacted


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
        if not isinstance(payload, dict) or payload.get("revision") != existing["revision"]:
            raise ConflictError("configuration changed in another browser; reload and try again")
        validated = validate_config(payload, existing)
        validated["revision"] = existing["revision"] + 1
        rendered = render_rtmp_config(validated)
        old_generated = GENERATED_CONFIG.read_text(encoding="utf-8") if GENERATED_CONFIG.exists() else ""
        old_state = STATE_PATH.read_text(encoding="utf-8")

        atomic_write(GENERATED_CONFIG, rendered, mode=0o600)
        check = run_nginx("-t")
        if check.returncode != 0:
            atomic_write(GENERATED_CONFIG, old_generated, mode=0o600)
            LOGGER.error(
                "NGINX rejected generated configuration: %s",
                redact_nginx_error(check.stderr.strip(), validated),
            )
            raise ValidationError("NGINX rejected the generated configuration")

        try:
            atomic_write(STATE_BACKUP_PATH, old_state, mode=0o600)
            atomic_write(STATE_PATH, json.dumps(validated, indent=2, ensure_ascii=False) + "\n")
        except OSError:
            atomic_write(GENERATED_CONFIG, old_generated, mode=0o600)
            raise

        reload_result = run_nginx("-s", "reload")
        if reload_result.returncode != 0:
            atomic_write(GENERATED_CONFIG, old_generated, mode=0o600)
            atomic_write(STATE_PATH, old_state, mode=0o600)
            run_nginx("-s", "reload")
            LOGGER.error("NGINX reload failed: %s", reload_result.stderr.strip())
            raise RuntimeError("NGINX could not reload the generated configuration")

        status = fetch_rtmp_status()
        warning_code = None
        if status["activeStreams"]:
            warning_code = "streamReconnectRequired"
        return ApplyResult(public_config(validated), warning_code)


def text_of(node: ET.Element, name: str, default: str = "0") -> str:
    child = node.find(name)
    return child.text if child is not None and child.text is not None else default


def int_of(node: ET.Element, name: str, default: int = 0) -> int:
    try:
        return int(text_of(node, name, str(default)))
    except (TypeError, ValueError):
        return default


def optional_int_of(node: ET.Element, name: str) -> int | None:
    child = node.find(name)
    if child is None or child.text is None or child.text.strip() == "":
        return None
    try:
        return int(float(child.text))
    except (TypeError, ValueError):
        return None


def optional_text_of(node: ET.Element, name: str) -> str | None:
    child = node.find(name)
    if child is None or child.text is None:
        return None
    value = child.text.strip()
    return value or None


def parse_rtmp_status(payload: bytes) -> dict[str, Any]:
    root = ET.fromstring(payload)
    streams = []
    application_streams = []
    for application_node in root.findall("./server/application"):
        application_name = text_of(application_node, "name", "unknown")
        for stream_node in application_node.findall("./live/stream"):
            application_streams.append((application_name, stream_node))
    for application_name, stream in application_streams:
        video = stream.find("./meta/video")
        audio = stream.find("./meta/audio")
        clients = []
        for client in stream.findall("./client"):
            clients.append(
                {
                    "id": text_of(client, "id", "unknown"),
                    "address": optional_text_of(client, "address"),
                    "timeMs": int_of(client, "time"),
                    "dropped": int_of(client, "dropped"),
                    "avSyncMs": optional_int_of(client, "avsync"),
                    "timestampMs": optional_int_of(client, "timestamp"),
                    "role": "publishing" if client.find("publishing") is not None else "playing",
                    "active": client.find("active") is not None,
                }
            )

        streams.append(
            {
                "application": application_name,
                "name": text_of(stream, "name", "unknown"),
                "timeMs": int_of(stream, "time"),
                "bandwidthIn": int_of(stream, "bw_in"),
                "bytesIn": int_of(stream, "bytes_in"),
                "bandwidthOut": int_of(stream, "bw_out"),
                "bytesOut": int_of(stream, "bytes_out"),
                "clients": int_of(stream, "nclients"),
                "publishing": stream.find("publishing") is not None,
                "active": stream.find("active") is not None,
                "video": {
                    "codec": optional_text_of(video, "codec") if video is not None else None,
                    "profile": optional_text_of(video, "profile") if video is not None else None,
                    "level": optional_text_of(video, "level") if video is not None else None,
                    "width": optional_int_of(video, "width") if video is not None else None,
                    "height": optional_int_of(video, "height") if video is not None else None,
                    "frameRate": optional_int_of(video, "frame_rate") if video is not None else None,
                    "bitrate": optional_int_of(stream, "bw_video"),
                },
                "audio": {
                    "codec": optional_text_of(audio, "codec") if audio is not None else None,
                    "profile": optional_text_of(audio, "profile") if audio is not None else None,
                    "sampleRate": optional_int_of(audio, "sample_rate") if audio is not None else None,
                    "channels": optional_int_of(audio, "channels") if audio is not None else None,
                    "bitrate": optional_int_of(stream, "bw_audio"),
                },
                "connections": clients,
            }
        )

    return {
        "nginx": "online",
        "runtime": {
            "nginxVersion": optional_text_of(root, "nginx_version"),
            "rtmpVersion": optional_text_of(root, "nginx_rtmp_version"),
            "uptimeSeconds": int_of(root, "uptime"),
            "acceptedConnections": int_of(root, "naccepted"),
            "bandwidthIn": int_of(root, "bw_in"),
            "bytesIn": int_of(root, "bytes_in"),
            "bandwidthOut": int_of(root, "bw_out"),
            "bytesOut": int_of(root, "bytes_out"),
        },
        "activeStreams": streams,
        "checkedAt": int(time.time()),
    }


def fetch_rtmp_status() -> dict[str, Any]:
    try:
        with urlopen("http://127.0.0.1:8081/stat", timeout=1.5) as response:
            payload = response.read(1024 * 1024)
        return parse_rtmp_status(payload)
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
            rtmp_status = fetch_rtmp_status()
            healthy = rtmp_status.get("nginx") == "online"
            self.send_json(
                HTTPStatus.OK if healthy else HTTPStatus.SERVICE_UNAVAILABLE,
                {"status": "ok" if healthy else "degraded", "nginx": rtmp_status.get("nginx", "offline")},
            )
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
                status["enabledRoutes"] = sum(1 for item in state["routes"] if item["enabled"])
            except RuntimeError:
                status["enabledDestinations"] = 0
                status["enabledRoutes"] = 0
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
            if result.warning_code:
                response["warningCode"] = result.warning_code
            self.send_json(HTTPStatus.OK, response)
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_error_json(HTTPStatus.BAD_REQUEST, "request body must be valid JSON")
        except ValidationError as exc:
            self.send_error_json(HTTPStatus.BAD_REQUEST, str(exc))
        except ConflictError as exc:
            self.send_error_json(HTTPStatus.CONFLICT, str(exc))
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
        self.send_header("Cache-Control", "no-store")
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
    atomic_write(GENERATED_CONFIG, render_rtmp_config(state), mode=0o600)
    check = run_nginx("-t")
    if check.returncode != 0:
        raise RuntimeError(
            "Initial NGINX configuration is invalid: "
            f"{redact_nginx_error(check.stderr.strip(), state)}"
        )


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

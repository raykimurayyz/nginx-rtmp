# RTMP Relay Manager

A lightweight, Dockerized NGINX RTMP relay with a simple web interface for multi-platform live streaming.

**Source code and documentation:** [raykimurayyz/nginx-rtmp](https://github.com/raykimurayyz/nginx-rtmp)

## Features

- Receive an RTMP stream from OBS, PS5 workflows, cameras, or other publishers.
- Configure relay destinations from a clean web interface.
- Relay one input stream to multiple RTMP platforms simultaneously.
- Enable, disable, edit, and remove destinations without manually editing NGINX.
- Validate configuration before applying changes and restore the previous configuration on failure.
- View NGINX health, active streams, bitrate, duration, and client count.
- Run as a non-root user on both AMD64 and ARM64 systems.

## Quick start

```bash
docker volume create nginx-rtmp-data

docker run -d \
  --name nginx-rtmp \
  --restart unless-stopped \
  --security-opt no-new-privileges:true \
  --cap-drop ALL \
  -p 1935:1935 \
  -p 8080:8080 \
  -v nginx-rtmp-data:/data \
  raykimurayyz/nginx-rtmp:latest
```

Open the management interface:

```text
http://YOUR_DOCKER_HOST:8080
```

Configure OBS or another RTMP publisher:

```text
Server:     rtmp://YOUR_DOCKER_HOST:1935/live
Stream key: main
```

Then open the management page and add the RTMP server URL and stream key supplied by each destination platform.

## Docker Compose

```yaml
services:
  nginx-rtmp:
    image: raykimurayyz/nginx-rtmp:latest
    container_name: nginx-rtmp
    restart: unless-stopped
    ports:
      - "1935:1935"
      - "8080:8080"
    volumes:
      - nginx-rtmp-data:/data
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL

volumes:
  nginx-rtmp-data:
```

Start it with:

```bash
docker compose up -d
```

## Ports

| Port | Purpose |
| --- | --- |
| `1935/tcp` | RTMP input from OBS, PS5 workflows, cameras, or other publishers |
| `8080/tcp` | Web management interface and API |

## Persistent data

Configuration is stored in `/data/config.json`. Mount `/data` as a Docker volume to preserve destinations and stream keys when the container is recreated.

Stream keys must be available to NGINX when it connects to destination platforms, so they are stored as plain text inside the Docker volume. Protect access to the Docker host and its volumes.

## Image tags

- `latest` — the most recently published stable version.
- `vX.Y.Z` — an immutable application release, for example `v0.1.2`.
- `X.Y.Z` — the same release without the `v` prefix.
- `X.Y` — the latest patch release within a minor version.

For reproducible deployments, prefer a complete version tag:

```bash
docker pull raykimurayyz/nginx-rtmp:v0.1.2
```

## Supported platforms

- `linux/amd64`
- `linux/arm64`

## Important limitations

- The current version supports plain RTMP destinations. RTMPS, SRT, transcoding, and platform-specific signing are not included.
- If relay destinations are changed during a live stream, reconnect the input publisher once to guarantee that the new configuration takes effect.
- There is intentionally no login page. Run this container only on a trusted private network and do not expose the management port directly to the public internet.

## Upstream components

The image builds verified upstream releases of NGINX and nginx-rtmp-module. Their source code is not vendored or modified by this project.

Full documentation, source code, license notices, issue tracking, and release workflow are available on GitHub:

**[github.com/raykimurayyz/nginx-rtmp](https://github.com/raykimurayyz/nginx-rtmp)**


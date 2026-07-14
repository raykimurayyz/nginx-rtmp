# RTMP Relay Manager

[中文说明](README.zh-CN.md) · [Docker Hub: raykimurayyz/nginx-rtmp](https://hub.docker.com/r/raykimurayyz/nginx-rtmp)

A small, self-hosted web interface for receiving one RTMP input and relaying it to one or more streaming platforms. It is designed for trusted private networks and packages NGINX, nginx-rtmp-module, and a dependency-free management service into one Docker image.

The project does **not** vendor or modify NGINX or nginx-rtmp-module source code. Verified upstream release archives are downloaded only while the container image is being built.

## Features

- Receive streams from OBS, PS5 workflows, cameras, or other RTMP publishers.
- Add, edit, enable, disable, and remove relay destinations in a web page.
- Relay one input stream to multiple RTMP destinations simultaneously.
- Keep stream keys out of API responses and the browser after they are saved.
- Validate generated configuration with `nginx -t` before applying it.
- Restore the previous configuration if validation or reload fails.
- Display NGINX health, active input streams, bitrate, duration, and client count.
- Run as an unprivileged user with all Linux capabilities dropped by Compose.
- Build multi-platform images for `linux/amd64` and `linux/arm64` in GitHub Actions.

## Included upstream versions

| Component | Version | Source |
| --- | --- | --- |
| Debian | 13 Slim | Official Debian image |
| NGINX | 1.30.3 stable | `nginx.org` release archive |
| nginx-rtmp-module | 1.2.2 | Upstream tagged commit |

The download SHA-256 values and the exact RTMP module commit are pinned in the Dockerfile. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for licensing details.

## Quick start

Requirements:

- Docker Engine 24 or newer, or Docker Desktop
- Docker Compose v2

Start the service:

```bash
docker compose up -d --build
```

Open the management page:

```text
http://localhost:8080
```

Publish a stream from OBS or another encoder:

- Server: `rtmp://YOUR_DOCKER_HOST:1935/live`
- Stream key: any local stream name, for example `main`

Then add the destination server and stream key supplied by each streaming platform on the management page.

Stop the service:

```bash
docker compose down
```

Configuration is stored in the `relay-data` Docker volume and is preserved by `docker compose down`. To remove all saved configuration intentionally:

```bash
docker compose down -v
```

## Ports

| Port | Purpose |
| --- | --- |
| `1935/tcp` | RTMP input from OBS, PS5 workflow, or another publisher |
| `8080/tcp` | Web management interface and API |

The internal NGINX statistics endpoint listens only on the container loopback interface and is not published.

## Destination format

Enter the two values normally supplied by a streaming platform:

- **RTMP server URL**, for example `rtmp://live-push.example.com/live`
- **Stream key**, for example `abc123-secret`

The manager renders a controlled nginx-rtmp `push` directive using the server as the remote application and the stream key as `playPath`. Control characters are rejected, and all generated values are quoted and escaped.

Only plain RTMP destinations are supported in this version. RTMPS, SRT, platform-specific signing, and transcoding require a future FFmpeg-based relay mode.

## Applying changes during a live stream

NGINX configuration reload is graceful, but an already connected publisher can remain attached to an old worker. If destinations are changed while a stream is live, reconnect the OBS/PS5 input once to guarantee that the new destinations take effect. The interface displays this warning after saving.

## Private-network security model

There is intentionally no login screen. The service is intended only for a trusted LAN and must not be exposed directly to the public internet.

The following protections are still included:

- No arbitrary NGINX configuration editor or shell execution endpoint.
- Structured validation of names, RTMP URLs, stream keys, IDs, and request sizes.
- Atomic configuration writes, validation, reload, and rollback.
- Stream keys are masked and never returned by the configuration API.
- HTTP security headers on management responses.
- Non-root container process, `no-new-privileges`, and dropped capabilities.

Stream keys are stored as plain text in `/data/config.json` inside the Docker volume because NGINX must use them to establish outbound RTMP sessions. Protect access to the Docker host and its volumes.

## GitHub Actions

Two workflows are included:

- **CI** runs Python unit tests for pull requests and pushes to `main`; the container validation build runs only for pull requests.
- **Publish to Docker Hub** builds and publishes AMD64 and ARM64 images only when a strict `vX.Y.Z` tag such as `v1.0.0` is pushed, or when manually dispatched. Merging to `main` does not publish an image.

Before running the publishing workflow, create these GitHub Actions repository secrets:

- `DOCKERHUB_USERNAME`: your Docker Hub username
- `DOCKERHUB_TOKEN`: a Docker Hub personal access token with permission to write images

The workflow uses the GitHub repository name as the Docker Hub repository name. The published image name is:

```text
DOCKERHUB_USERNAME/GITHUB_REPOSITORY_NAME
```

Create that repository in Docker Hub before the first publish, and make it public if anonymous image pulls are desired.

Suggested release flow:

```bash
git tag v0.1.0
git push origin v0.1.0
```

For a tag such as `v1.2.3`, the workflow publishes `v1.2.3`, `1.2.3`, `1.2`, and `latest`, plus SBOM and provenance attestations. Dependabot checks Docker and GitHub Actions dependencies monthly.

## Updating NGINX or nginx-rtmp-module

Do not change only the visible version number. Update the corresponding version, immutable commit where applicable, and SHA-256 build arguments in the Dockerfile and Compose file. Then run:

```bash
python3 -m unittest discover -s tests -v
docker compose build --no-cache
docker compose up -d
docker compose ps
```

Finally, publish a test RTMP stream and verify every enabled destination.

## Development

The management service uses only the Python standard library, so its unit tests require no package installation:

```bash
python3 -m unittest discover -s tests -v
```

Project layout:

```text
app/server.py          Management API, state, NGINX validation and reload
app/static/            Web interface
nginx/nginx.conf       Fixed NGINX and RTMP configuration
tests/                 Unit tests
.github/workflows/     CI and multi-platform image publishing
Dockerfile             Reproducible upstream build and runtime image
docker-compose.yml     Local deployment
```

## License status

No license has yet been assigned to the original code in this repository. NGINX and nginx-rtmp-module remain subject to their respective 2-clause BSD licenses. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

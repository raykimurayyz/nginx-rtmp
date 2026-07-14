# RTMP Relay Manager

[English README](README.md)

这是一个适合自行部署的轻量直播转推管理工具。它接收一路 RTMP 直播流，通过网页配置将直播同时转推到一个或多个国内外直播平台。项目面向可信局域网使用，把 NGINX、nginx-rtmp-module 和无第三方依赖的管理服务打包在一个 Docker 镜像中。

本项目**不提交、不修改** NGINX 或 nginx-rtmp-module 源码。只有在构建 Docker 镜像时，才会下载并校验上游正式版本源码包。

## 功能

- 接收 OBS、PS5 相关方案、摄像机或其他设备的 RTMP 推流。
- 通过网页添加、编辑、启用、停用和删除推流目的地。
- 将一路输入直播流同时转推到多个 RTMP 平台。
- 串流密钥保存后不再通过 API 返回给浏览器。
- 应用配置前执行 `nginx -t` 检查。
- 检查或重载失败时自动恢复原配置。
- 显示 NGINX 状态、当前直播流、码率、持续时间和客户端数量。
- 容器使用非 root 用户运行，Compose 会移除全部 Linux capabilities。
- GitHub Actions 自动构建 `linux/amd64` 和 `linux/arm64` 镜像。

## 上游组件版本

| 组件 | 版本 | 来源 |
| --- | --- | --- |
| Debian | 13 Slim | Debian 官方镜像 |
| NGINX | 1.30.3 stable | `nginx.org` 官方发布包 |
| nginx-rtmp-module | 1.2.2 | 上游正式标签对应的固定提交 |

Dockerfile 固定了下载文件的 SHA-256 和 RTMP 模块的准确提交。许可证信息参见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## 快速启动

需要准备：

- Docker Engine 24 或更高版本，或者 Docker Desktop
- Docker Compose v2

启动服务：

```bash
docker compose up -d --build
```

打开管理页面：

```text
http://localhost:8080
```

在 OBS 或其他推流软件中填写：

- 服务器：`rtmp://你的Docker主机IP:1935/live`
- 串流密钥：任意本地串流名称，例如 `main`

然后在管理页面中添加直播平台提供的 RTMP 服务器地址和串流密钥。

停止服务：

```bash
docker compose down
```

配置保存在名为 `relay-data` 的 Docker 数据卷中，执行 `docker compose down` 不会删除配置。如果确定需要删除所有已保存配置：

```bash
docker compose down -v
```

## 端口

| 端口 | 用途 |
| --- | --- |
| `1935/tcp` | 接收 OBS、PS5 方案或其他设备的 RTMP 推流 |
| `8080/tcp` | 网页管理界面和 API |

NGINX 状态接口只监听容器内部回环地址，不对宿主机开放。

## 平台配置格式

在页面中填写直播平台通常提供的两个值：

- **RTMP 服务器地址**，例如 `rtmp://live-push.example.com/live`
- **串流密钥**，例如 `abc123-secret`

管理服务会把服务器地址作为远程应用地址，把串流密钥作为 `playPath`，生成受控的 nginx-rtmp `push` 配置。所有字段都会经过结构检查、控制字符检查、引用和转义。

当前版本只支持普通 RTMP 目的地。RTMPS、SRT、平台特有签名以及转码功能需要后续增加基于 FFmpeg 的转推模式。

## 直播过程中修改配置

NGINX 会进行平滑重载，但已经连接的推流端可能继续由旧工作进程处理。如果在直播过程中修改了推流目的地，请断开并重新连接一次 OBS 或 PS5 输入流，确保新配置生效。页面保存时也会显示此提示。

## 局域网安全模型

项目按照需求不提供登录页面，仅建议部署在可信局域网中，不要直接暴露到公网。

即使不做登录，项目仍然提供以下保护：

- 不提供任意 NGINX 配置编辑器或执行系统命令的接口。
- 检查平台名称、RTMP 地址、串流密钥、ID 和请求大小。
- 原子写入配置，依次执行检查、重载和失败回滚。
- 串流密钥会打码，并且配置 API 不返回完整密钥。
- 管理页面响应包含基本 HTTP 安全头。
- 容器使用非 root 用户、`no-new-privileges` 并移除 capabilities。

由于 NGINX 建立平台连接时必须使用串流密钥，密钥会以明文保存在 Docker 数据卷内的 `/data/config.json`。需要保护 Docker 主机及其数据卷访问权限。

## GitHub Actions 流水线

项目包含两条流水线：

- **CI**：提交到 `main` 或创建 Pull Request 时运行 Python 单元测试；Docker 镜像验证构建只在 Pull Request 中运行。
- **Publish to Docker Hub**：只有推送严格的 `vX.Y.Z` 标签（例如 `v1.0.0`）或手动触发时，才构建并发布 AMD64、ARM64 镜像到 Docker Hub。合并到 `main` 不再发布镜像。

运行发布流水线前，需要在 GitHub Actions 仓库 Secrets 中添加：

- `DOCKERHUB_USERNAME`：Docker Hub 用户名
- `DOCKERHUB_TOKEN`：具有镜像写入权限的 Docker Hub Personal Access Token

流水线会使用 GitHub 仓库名称作为 Docker Hub 仓库名称。发布后的镜像名称为：

```text
DOCKERHUB_USERNAME/GITHUB仓库名称
```

首次发布前需要在 Docker Hub 创建对应仓库。如果希望未登录用户也能拉取镜像，请将 Docker Hub 仓库设置为公开。

建议的版本发布方式：

```bash
git tag v0.1.0
git push origin v0.1.0
```

例如推送 `v1.2.3` 时，流水线会发布 `v1.2.3`、`1.2.3`、`1.2` 和 `latest`，同时生成 SBOM 和构建来源证明。Dependabot 每月检查 Docker 和 GitHub Actions 依赖更新。

## 更新 NGINX 或 RTMP 模块

不要只修改显示的版本号。需要同时更新 Dockerfile 中的版本、固定提交以及 SHA-256，并同步 Compose 文件，然后运行：

```bash
python3 -m unittest discover -s tests -v
docker compose build --no-cache
docker compose up -d
docker compose ps
```

最后发送一条测试直播流，检查每个已启用平台是否能正常收到直播。

## 本地开发

管理服务只使用 Python 标准库，运行单元测试不需要安装额外依赖：

```bash
python3 -m unittest discover -s tests -v
```

项目结构：

```text
app/server.py          管理 API、配置保存、NGINX 检查和重载
app/static/            网页管理界面
nginx/nginx.conf       固定的 NGINX 与 RTMP 配置
tests/                 单元测试
.github/workflows/     CI 和多架构镜像发布
Dockerfile             可复现的上游组件构建和运行镜像
docker-compose.yml     本地部署配置
```

## 项目许可证状态

当前尚未给本仓库的原创代码指定许可证。NGINX 与 nginx-rtmp-module 继续分别遵循各自的 BSD 2-Clause 许可证，详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

ARG DEBIAN_VERSION=13-slim

FROM debian:${DEBIAN_VERSION} AS builder

ARG NGINX_VERSION=1.30.3
ARG NGINX_SHA256=e5823dc6f45610993def93ebf6cfce68264af4958c77e874b7d20f3709001b8f
ARG NGINX_RTMP_VERSION=1.2.2
ARG NGINX_RTMP_COMMIT=23e1873aa62acb58b7881eed2a501f5bf35b82e9
ARG NGINX_RTMP_SHA256=b688919355c0acccdda24eb83c6306df3d450cb0b13664f16b8e3d1f521c3bb5

RUN apt-get -o Acquire::Retries=5 update \
    && apt-get -o Acquire::Retries=5 install --yes --no-install-recommends \
        build-essential \
        ca-certificates \
        curl \
        libpcre2-dev \
        libssl-dev \
        zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp/build

RUN curl --fail --location --show-error --silent --retry 5 --retry-all-errors \
        "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" \
        --output nginx.tar.gz \
    && echo "${NGINX_SHA256}  nginx.tar.gz" | sha256sum --check --strict

RUN curl --fail --location --show-error --silent --retry 5 --retry-all-errors \
        "https://codeload.github.com/arut/nginx-rtmp-module/tar.gz/${NGINX_RTMP_COMMIT}" \
        --output nginx-rtmp.tar.gz \
    && echo "${NGINX_RTMP_SHA256}  nginx-rtmp.tar.gz" | sha256sum --check --strict

RUN mkdir nginx nginx-rtmp \
    && tar --extract --gzip --file nginx.tar.gz --directory nginx --strip-components=1 \
    && tar --extract --gzip --file nginx-rtmp.tar.gz --directory nginx-rtmp --strip-components=1

WORKDIR /tmp/build/nginx

RUN ./configure \
        --prefix=/usr/local/nginx \
        --sbin-path=/usr/local/sbin/nginx \
        --conf-path=/etc/nginx/nginx.conf \
        --pid-path=/tmp/nginx.pid \
        --lock-path=/tmp/nginx.lock \
        --error-log-path=/dev/stderr \
        --http-log-path=/dev/stdout \
        --http-client-body-temp-path=/tmp/nginx-client-body \
        --http-proxy-temp-path=/tmp/nginx-proxy \
        --http-fastcgi-temp-path=/tmp/nginx-fastcgi \
        --with-http_ssl_module \
        --with-http_stub_status_module \
        --with-threads \
        --with-cc-opt="-O2 -fstack-protector-strong -Wformat -Werror=format-security" \
        --with-ld-opt="-Wl,-z,relro -Wl,-z,now" \
        --add-module=/tmp/build/nginx-rtmp \
    && make -j"$(nproc)" \
    && make install \
    && strip /usr/local/sbin/nginx

FROM debian:${DEBIAN_VERSION} AS runtime

ARG NGINX_VERSION=1.30.3
ARG NGINX_RTMP_VERSION=1.2.2

LABEL org.opencontainers.image.title="RTMP Relay Manager" \
      org.opencontainers.image.description="Web-managed NGINX RTMP relay for private networks" \
      io.github.rtmp-relay-manager.nginx.version="${NGINX_VERSION}" \
      io.github.rtmp-relay-manager.nginx-rtmp-module.version="${NGINX_RTMP_VERSION}"

RUN apt-get -o Acquire::Retries=5 update \
    && apt-get -o Acquire::Retries=5 install --yes --no-install-recommends \
        ca-certificates \
        libpcre2-8-0 \
        libssl3 \
        python3 \
        zlib1g \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 10001 streamer \
    && useradd --uid 10001 --gid streamer --no-create-home --home-dir /nonexistent --shell /usr/sbin/nologin streamer \
    && mkdir -p /data /etc/nginx/generated /opt/relay-manager/static /usr/share/licenses/nginx /usr/share/licenses/nginx-rtmp-module \
    && chown -R streamer:streamer /data /etc/nginx/generated

COPY --from=builder /usr/local/sbin/nginx /usr/local/sbin/nginx
COPY --from=builder /tmp/build/nginx/LICENSE /usr/share/licenses/nginx/LICENSE
COPY --from=builder /tmp/build/nginx-rtmp/LICENSE /usr/share/licenses/nginx-rtmp-module/LICENSE
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY app/server.py /opt/relay-manager/server.py
COPY app/static/ /opt/relay-manager/static/

ENV APP_HOST=0.0.0.0 \
    APP_PORT=8080 \
    DATA_DIR=/data \
    NGINX_CONFIG=/etc/nginx/nginx.conf \
    NGINX_GENERATED_CONFIG=/etc/nginx/generated/push.conf \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

EXPOSE 1935 8080

VOLUME ["/data"]

USER streamer:streamer

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD ["python3", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/api/health', timeout=2)"]

CMD ["python3", "/opt/relay-manager/server.py"]

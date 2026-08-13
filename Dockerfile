ARG ALPINE_VERSION=3.24
ARG ALPINE_MIRROR=dl-cdn.alpinelinux.org

FROM alpine:${ALPINE_VERSION} AS builder

ARG ALPINE_MIRROR
ARG NGINX_VERSION=1.30.3
ARG NGINX_SHA256=e5823dc6f45610993def93ebf6cfce68264af4958c77e874b7d20f3709001b8f
ARG NGINX_RTMP_VERSION=1.2.2
ARG NGINX_RTMP_COMMIT=23e1873aa62acb58b7881eed2a501f5bf35b82e9
ARG NGINX_RTMP_SHA256=b688919355c0acccdda24eb83c6306df3d450cb0b13664f16b8e3d1f521c3bb5

RUN sed -i "s|dl-cdn.alpinelinux.org|${ALPINE_MIRROR}|g" /etc/apk/repositories \
    && apk add --no-cache \
        build-base \
        ca-certificates \
        curl \
        linux-headers \
        openssl-dev \
        pcre2-dev \
        zlib-dev

WORKDIR /tmp/build

RUN curl --fail --location --show-error --silent --retry 5 --retry-all-errors \
        "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" \
        --output nginx.tar.gz \
    && echo "${NGINX_SHA256}  nginx.tar.gz" | sha256sum -c

RUN curl --fail --location --show-error --silent --retry 5 --retry-all-errors \
        "https://codeload.github.com/arut/nginx-rtmp-module/tar.gz/${NGINX_RTMP_COMMIT}" \
        --output nginx-rtmp.tar.gz \
    && echo "${NGINX_RTMP_SHA256}  nginx-rtmp.tar.gz" | sha256sum -c

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
        --http-uwsgi-temp-path=/tmp/nginx-uwsgi \
        --http-scgi-temp-path=/tmp/nginx-scgi \
        --with-http_ssl_module \
        --with-http_stub_status_module \
        --with-threads \
        --with-cc-opt="-O2 -fstack-protector-strong -Wformat -Werror=format-security" \
        --with-ld-opt="-Wl,-z,relro -Wl,-z,now" \
        --add-module=/tmp/build/nginx-rtmp \
    && make -j"$(nproc)" \
    && make install \
    && strip /usr/local/sbin/nginx

FROM alpine:${ALPINE_VERSION} AS runtime

ARG ALPINE_MIRROR
ARG NGINX_VERSION=1.30.3
ARG NGINX_RTMP_VERSION=1.2.2

LABEL org.opencontainers.image.title="RTMP Relay Manager" \
      org.opencontainers.image.description="Web-managed NGINX RTMP relay for private networks" \
      org.opencontainers.image.licenses="MIT" \
      io.github.rtmp-relay-manager.nginx.version="${NGINX_VERSION}" \
      io.github.rtmp-relay-manager.nginx-rtmp-module.version="${NGINX_RTMP_VERSION}"

RUN sed -i "s|dl-cdn.alpinelinux.org|${ALPINE_MIRROR}|g" /etc/apk/repositories \
    && apk upgrade --no-cache \
    && apk add --no-cache \
        ca-certificates \
        libcrypto3 \
        libssl3 \
        pcre2 \
        python3 \
        zlib \
    && addgroup -S -g 10001 streamer \
    && adduser -S -D -H -u 10001 -G streamer -s /sbin/nologin streamer \
    && mkdir -p /data /etc/nginx/generated /opt/relay-manager/static /usr/share/licenses/rtmp-relay-manager /usr/share/licenses/nginx /usr/share/licenses/nginx-rtmp-module \
    && chown -R streamer:streamer /data /etc/nginx/generated

COPY --from=builder /usr/local/sbin/nginx /usr/local/sbin/nginx
COPY LICENSE /usr/share/licenses/rtmp-relay-manager/LICENSE
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

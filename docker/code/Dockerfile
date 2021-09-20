FROM node:14-alpine AS node
FROM php:7.4-fpm-alpine

COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Config
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_DISABLE_XDEBUG_WARN=1

# Install additional packages
RUN buildDeps=" \
            freetype \
            libjpeg-turbo \
            libpng \
            freetype-dev \
            libjpeg-turbo-dev \
            libpng-dev \
            libzip-dev \
            icu-dev \
            icu-libs \
            oniguruma-dev \
            curl-dev \
            libxml2-dev \
        " \
  && set -xe \
  && apk add --update --no-cache $PHPIZE_DEPS $buildDeps

## Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd intl zip json mbstring curl simplexml session sockets mysqli pdo pdo_mysql \
    && pecl install apcu \
    && pecl install igbinary \
    && echo 'yes' | pecl install -f redis \
    && pecl install xdebug-3.0.4 \
    && docker-php-ext-enable apcu igbinary redis xdebug pdo_mysql

# fix work iconv library with alpine
RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/community/ --allow-untrusted gnu-libiconv
ENV LD_PRELOAD /usr/lib/preloadable_libiconv.so php

## Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && alias composer='XDEBUG_MODE=off \composer'

## Clean system
RUN apk del $buildDeps \
    && rm -rf /tmp/* /var/cache/apk/*

# Create workspace
RUN apk add shadow && usermod -u 1000 www-data && groupmod -g 1000 www-data
RUN mkdir -p /project
COPY init.sh /project/init.sh
RUN chmod a+x /project/init.sh

WORKDIR /project

EXPOSE 9000

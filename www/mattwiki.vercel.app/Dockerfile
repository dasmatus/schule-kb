# Stage 1: Build frontend assets
FROM oven/bun:1-alpine AS frontend-builder

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY vite.config.ts tsconfig.json ./
COPY resources resources
COPY public public

RUN bun run build

# Stage 2: PHP application
FROM php:8.5-fpm-alpine AS app

# Install system dependencies (nginx, supervisor, envsubst via gettext)
RUN apk add --no-cache \
    git \
    unzip \
    libpq-dev \
    nginx \
    supervisor \
    gettext

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    bcmath

# Configure OPcache for production
RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=10000'; \
    echo 'opcache.revalidate_freq=0'; \
    echo 'opcache.validate_timestamps=0'; \
} > /usr/local/etc/php/conf.d/opcache.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install PHP dependencies (without dev packages)
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist

# Copy application source
COPY . .

# Copy built frontend assets
COPY --from=frontend-builder /app/public/build public/build

# Optimise autoloader now that all files are present
RUN composer dump-autoload --optimize --no-dev

# Set correct permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 755 storage bootstrap/cache

# Install nginx and supervisor config
COPY docker/nginx.conf /etc/nginx/http.d/default.conf.template
COPY docker/supervisord.conf /etc/supervisord.conf

# Install entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Railway sets $PORT at runtime; default to 8080 for local docker run
EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]

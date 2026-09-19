#!/bin/sh
set -e

# Default PORT if Railway hasn't set it
export PORT="${PORT:-8080}"

# Substitute $PORT into the nginx config
envsubst '${PORT}' < /etc/nginx/http.d/default.conf.template > /etc/nginx/http.d/default.conf

# Run Laravel bootstrap tasks
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

exec supervisord -c /etc/supervisord.conf

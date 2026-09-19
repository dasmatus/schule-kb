<?php

namespace App\Providers;

use App\Services\NeonAuthService;
use Illuminate\Database\Connectors\PostgresConnector;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(NeonAuthService::class, fn () => new NeonAuthService(
            config('services.neon_auth.url')
        ));

        // Neon requires the endpoint ID injected into the DSN because PHP's
        // libpq on serverless platforms lacks SNI support. We override the
        // postgres connector to append it when a Neon host is detected.
        $this->app->bind('db.connector.pgsql', fn () => new class extends PostgresConnector
        {
            protected function getDsn(array $config): string
            {
                $dsn = parent::getDsn($config);
                $host = (string) ($config['host'] ?? '');

                if ($host && str_contains($host, '.neon.tech')) {
                    $endpoint = explode('.', $host)[0];
                    $dsn .= ";options='endpoint={$endpoint}'";
                }

                return $dsn;
            }
        });
    }
}

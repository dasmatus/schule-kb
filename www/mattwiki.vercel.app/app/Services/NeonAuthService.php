<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NeonAuthService
{
    public function __construct(private readonly string $baseUrl) {}

    private function client(): \Illuminate\Http\Client\PendingRequest
    {
        return Http::withHeaders(['Origin' => config('app.url')]);
    }

    /**
     * Sign in a user via Neon Auth.
     *
     * @return array{id: string, email: string, name: string}|null
     */
    public function signIn(string $email, string $password): ?array
    {
        $response = $this->client()->post("{$this->baseUrl}/sign-in/email", [
            'email' => $email,
            'password' => $password,
            'rememberMe' => true,
        ]);

        if (! $response->successful()) {
            return null;
        }

        return $response->json('user');
    }

    /**
     * Verify an access token and return the user, or null if invalid.
     *
     * @return array{id: string, email: string, name: string}|null
     */
    public function verifyToken(string $accessToken): ?array
    {
        $response = $this->client()->withToken($accessToken)->get("{$this->baseUrl}/api/v1/users/me");

        if (! $response->successful()) {
            return null;
        }

        return $response->json();
    }

    /**
     * Register a new user via Neon Auth.
     *
     * @return array{id: string, email: string, name: string}|null
     */
    public function signUp(string $email, string $password, string $name): ?array
    {
        $response = $this->client()->post("{$this->baseUrl}/sign-up/email", [
            'email' => $email,
            'password' => $password,
            'name' => $name,
        ]);

        if (! $response->successful()) {
            return null;
        }

        return $response->json('user');
    }
}

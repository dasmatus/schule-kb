<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\NeonAuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthSyncController extends Controller
{
    public function __construct(private readonly NeonAuthService $neonAuth) {}

    /**
     * Verify the Neon Auth access token and create a Laravel session.
     */
    public function sync(Request $request): JsonResponse
    {
        $request->validate([
            'access_token' => 'required|string',
            'username' => 'nullable|string|max:255',
        ]);

        $neonUser = $this->neonAuth->verifyToken($request->access_token);

        if (! $neonUser) {
            return response()->json(['error' => 'Invalid or expired token.'], 401);
        }

        $user = User::firstOrCreate(
            ['email' => $neonUser['email']],
            [
                'username' => $request->username ?? $neonUser['name'] ?? Str::before($neonUser['email'], '@'),
                'is_admin' => false,
            ],
        );

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json(['ok' => true]);
    }

    /**
     * Resolve a username to its email address so the frontend can authenticate with Neon Auth.
     */
    public function resolve(Request $request): JsonResponse
    {
        $email = User::where('username', $request->string('username'))->value('email');

        if (! $email) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        return response()->json(['email' => $email]);
    }
}

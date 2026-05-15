<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $adminEmail = env('ADMIN_EMAIL', 'admin@strategai.com');
        $adminPassword = env('ADMIN_PASSWORD', 'admin12345');

        if (
            ! hash_equals(strtolower($adminEmail), strtolower($credentials['email'])) ||
            ! hash_equals($adminPassword, $credentials['password'])
        ) {
            throw ValidationException::withMessages([
                'email' => ['The provided admin credentials are invalid.'],
            ]);
        }

        $user = User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'Admin',
                'password' => Hash::make(Str::random(32)),
                'credit_balance' => 0,
            ],
        );

        return response()->json([
            'message' => 'Admin login successful.',
            'token' => env('ADMIN_API_TOKEN', 'local-admin-token'),
            'user' => [
                'id' => $user->id,
                'name' => $user->name ?: 'Admin',
                'email' => $adminEmail,
                'role' => 'admin',
                'last_login_at' => now()->toISOString(),
            ],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->attributes->get('auth_user');

        return response()->json([
            'user' => [
                'id' => $user?->id,
                'name' => $user?->name ?: 'Admin',
                'email' => env('ADMIN_EMAIL', 'admin@strategai.com'),
                'role' => 'admin',
            ],
        ]);
    }

    public function logout(): JsonResponse
    {
        return response()->json([
            'message' => 'Admin logout successful.',
        ]);
    }
}

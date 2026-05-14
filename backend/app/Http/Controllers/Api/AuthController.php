<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiToken;
use App\Models\CreditTransaction;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'credit_balance' => 20,
        ]);

        CreditTransaction::query()->create([
            'user_id' => $user->id,
            'type' => 'signup_bonus',
            'credits' => 20,
            'amount' => 0,
            'description' => 'Welcome credits',
            'status' => 'completed',
        ]);

        [$plainToken] = $this->issueToken($user);

        return response()->json([
            'token' => $plainToken,
            'user' => $user,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()->where('email', $data['email'])->first();
        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password.'],
            ]);
        }

        [$plainToken] = $this->issueToken($user);

        return response()->json([
            'token' => $plainToken,
            'user' => $user,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $rawToken = $request->bearerToken();
        if ($rawToken) {
            ApiToken::query()->where('token', hash('sha256', $rawToken))->delete();
        }

        return response()->json(['message' => 'Logged out.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => $request->user()]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => ['required', 'email']]);
        $status = Password::sendResetLink($request->only('email'));

        return response()->json([
            'message' => __($status),
        ], $status === Password::RESET_LINK_SENT ? 200 : 422);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password): void {
                $user->forceFill(['password' => $password])->save();
            }
        );

        return response()->json([
            'message' => __($status),
        ], $status === Password::PASSWORD_RESET ? 200 : 422);
    }

    private function issueToken(User $user): array
    {
        $plainToken = Str::random(64);

        ApiToken::query()->create([
            'user_id' => $user->id,
            'name' => 'auth_token',
            'token' => hash('sha256', $plainToken),
        ]);

        return [$plainToken];
    }
}

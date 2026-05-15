<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/reset-password/{token}', function (Request $request, string $token) {
    $frontendUrl = rtrim(env('FRONTEND_URL', 'http://localhost:5173'), '/');
    $email = urlencode((string) $request->query('email', ''));

    return redirect("{$frontendUrl}/reset-password?token={$token}&email={$email}");
})->name('password.reset');
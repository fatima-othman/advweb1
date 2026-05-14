<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Feature2Controller;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\StrategyReportController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware('auth.token')->group(function (): void {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/credit-packages', [Feature2Controller::class, 'creditPackages']);
    Route::get('/credit-transactions', [Feature2Controller::class, 'transactions']);
    Route::get('/credits-overview', [Feature2Controller::class, 'creditsOverview']);
    Route::post('/credits/auto-recharge', [Feature2Controller::class, 'updateAutoRecharge']);

    Route::post('/stripe/setup-intent', [Feature2Controller::class, 'createSetupIntent']);
    Route::post('/stripe/payment-method', [Feature2Controller::class, 'savePaymentMethod']);
    Route::post('/stripe/checkout-session', [Feature2Controller::class, 'createCheckoutSession']);

    Route::apiResource('strategy-reports', StrategyReportController::class)->only(['index', 'store', 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
});

<?php

use App\Http\Controllers\Api\Feature1\AuthController;
use App\Http\Controllers\Api\Feature2\BillingController;
use App\Http\Controllers\Api\Feature2\CreditController;
use App\Http\Controllers\Api\Feature2\CreditPackageController;
use App\Http\Controllers\Api\Feature2\StrategyReportController;
use App\Http\Controllers\Api\Feature2\StripeWebhookController;
use App\Http\Controllers\Api\Feature2\TransactionController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\ReportController as ApiReportController;
use App\Http\Controllers\ProjectController as Feature3ProjectController;
use App\Http\Controllers\ReportController as Feature3ReportController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/stripe/webhook', [StripeWebhookController::class, 'handle']);
Route::post('/forgot-password', [PasswordResetController::class, 'forgotPassword']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

Route::apiResource('projects', Feature3ProjectController::class);
Route::post('reports/generate', [Feature3ReportController::class, 'generate']);
Route::get('reports/{id}', [Feature3ReportController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/user/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('reports', ApiReportController::class)->except(['show']);
    Route::apiResource('credit-packages', CreditPackageController::class);
    Route::apiResource('transactions', TransactionController::class);

    Route::post('/credits/deduct', [CreditController::class, 'deduct']);
    Route::post('/billing/setup-intent', [BillingController::class, 'createSetupIntent']);
    Route::post('/billing/payment-method', [BillingController::class, 'savePaymentMethod']);
    Route::post('/billing/checkout-session', [BillingController::class, 'createCheckoutSession']);
    Route::post('/billing/checkout-session/confirm', [BillingController::class, 'confirmCheckoutSession']);
    Route::post('/billing/auto-recharge', [BillingController::class, 'updateAutoRechargeSettings']);

    Route::get('/credit-transactions', [TransactionController::class, 'index']);
    Route::get('/credits-overview', function (\Illuminate\Http\Request $request) {
        return response()->json([
            'user' => $request->user()->fresh(),
            'transactions' => $request->user()->transactions()->latest()->get(),
        ]);
    });
    Route::post('/credits/auto-recharge', [BillingController::class, 'updateAutoRechargeSettings']);
    Route::post('/stripe/setup-intent', [BillingController::class, 'createSetupIntent']);
    Route::post('/stripe/payment-method', [BillingController::class, 'savePaymentMethod']);
    Route::post('/stripe/checkout-session', [BillingController::class, 'createCheckoutSession']);
    Route::post('/stripe/checkout-session/confirm', [BillingController::class, 'confirmCheckoutSession']);

    Route::get('/strategy-reports', [StrategyReportController::class, 'index']);
    Route::post('/strategy-reports', [StrategyReportController::class, 'store']);
    Route::get('/strategy-reports/{strategyReport}', [StrategyReportController::class, 'show']);
});

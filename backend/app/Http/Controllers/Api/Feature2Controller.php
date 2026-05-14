<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CreditPackage;
use App\Models\CreditTransaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Feature2Controller extends Controller
{
    public function creditPackages(): JsonResponse
    {
        return response()->json(CreditPackage::query()->where('is_active', true)->get());
    }

    public function transactions(Request $request): JsonResponse
    {
        $items = CreditTransaction::query()
            ->with('creditPackage')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($items);
    }

    public function creditsOverview(Request $request): JsonResponse
    {
        $user = $request->user();
        $transactions = CreditTransaction::query()
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'user' => $user,
            'transactions' => $transactions,
        ]);
    }

    public function updateAutoRecharge(Request $request): JsonResponse
    {
        $data = $request->validate([
            'enabled' => ['required', 'boolean'],
            'credit_package_id' => ['nullable', 'integer', 'exists:credit_packages,id'],
        ]);

        $user = $request->user();
        $user->update([
            'auto_recharge_enabled' => $data['enabled'],
            'auto_recharge_package_id' => $data['credit_package_id'] ?? null,
        ]);

        return response()->json([
            'message' => 'Auto recharge settings updated.',
            'user' => $user->fresh(),
        ]);
    }

    public function createSetupIntent(): JsonResponse
    {
        return response()->json([
            'client_secret' => 'dev_setup_intent_placeholder',
        ]);
    }

    public function savePaymentMethod(Request $request): JsonResponse
    {
        $data = $request->validate([
            'payment_method_id' => ['required', 'string', 'max:255'],
        ]);

        $request->user()->update([
            'stripe_payment_method_id' => $data['payment_method_id'],
        ]);

        return response()->json(['success' => true]);
    }

    public function createCheckoutSession(Request $request): JsonResponse
    {
        $data = $request->validate([
            'credit_package_id' => ['required', 'integer', 'exists:credit_packages,id'],
            'success_url' => ['required', 'url'],
            'cancel_url' => ['required', 'url'],
        ]);

        $package = CreditPackage::query()->findOrFail($data['credit_package_id']);
        $user = $request->user();

        $creditsToAdd = $package->credits ?? 1000000;
        $user->increment('credit_balance', $creditsToAdd);

        CreditTransaction::query()->create([
            'user_id' => $user->id,
            'credit_package_id' => $package->id,
            'type' => 'purchase',
            'credits' => $package->credits ?? 0,
            'amount' => $package->price,
            'description' => $package->name.' package purchase',
            'status' => 'completed',
        ]);

        return response()->json([
            'checkout_url' => $data['success_url'],
            'mock' => true,
        ]);
    }
}

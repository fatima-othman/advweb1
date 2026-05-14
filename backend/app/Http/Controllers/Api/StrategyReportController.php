<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CreditTransaction;
use App\Models\StrategyReport;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StrategyReportController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $items = StrategyReport::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($items);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'industry' => ['required', 'string', 'max:255'],
            'target_market' => ['nullable', 'string'],
            'objective' => ['nullable', 'string'],
            'timeline' => ['nullable', 'string'],
            'budget_range' => ['nullable', 'string'],
            'challenges' => ['nullable', 'string'],
        ]);

        $user = $request->user();
        if ($user->credit_balance < 5) {
            return response()->json([
                'message' => 'Insufficient credit balance.',
            ], 422);
        }

        $report = StrategyReport::query()->create([
            ...$data,
            'user_id' => $user->id,
            'summary' => 'AI strategy draft generated for '.$data['company_name'].'.',
            'priorities' => ['Define goals', 'Launch first campaign', 'Track KPI weekly'],
            'risks' => ['Budget pressure', 'Execution delays'],
            'kpis' => ['MRR', 'CAC', 'Conversion rate'],
        ]);

        $user->decrement('credit_balance', 5);

        CreditTransaction::query()->create([
            'user_id' => $user->id,
            'type' => 'report_generation',
            'credits' => -5,
            'amount' => 0,
            'description' => 'AI strategy generation',
            'status' => 'completed',
        ]);

        return response()->json($report, 201);
    }

    public function show(Request $request, StrategyReport $strategyReport): JsonResponse
    {
        if ((int) $strategyReport->user_id !== (int) $request->user()->id) {
            return response()->json(['message' => 'Not found.'], 404);
        }

        return response()->json($strategyReport);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StrategyReport extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'industry',
        'target_market',
        'objective',
        'timeline',
        'budget_range',
        'challenges',
        'summary',
        'priorities',
        'risks',
        'kpis',
    ];

    protected function casts(): array
    {
        return [
            'priorities' => 'array',
            'risks' => 'array',
            'kpis' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

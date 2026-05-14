<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditTransaction extends Model
{
    protected $fillable = [
        'user_id',
        'credit_package_id',
        'type',
        'credits',
        'amount',
        'description',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function creditPackage(): BelongsTo
    {
        return $this->belongsTo(CreditPackage::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreditPackage extends Model
{
    protected $fillable = [
        'name',
        'credits',
        'price',
        'billing_cycle',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'price' => 'decimal:2',
        ];
    }
}

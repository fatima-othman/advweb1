<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'business_type',
        'description',
        'stage',
        'employees',
        'budget',
        'market',
        'competitors',
        'language',
    ];

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
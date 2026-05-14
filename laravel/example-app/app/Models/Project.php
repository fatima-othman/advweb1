<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Report;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'reports',
        'country',
        'progress',
        'status',
    ];

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'name',
        'type',
        'date',
        'sections',
        'score',
        'swot',
        'recommendations',
        'kpis',
    ];

    protected $casts = [
        'swot' => 'array',
        'recommendations' => 'array',
        'kpis' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
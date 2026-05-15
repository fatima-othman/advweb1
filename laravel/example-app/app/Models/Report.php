<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'user_id',
        'project_id',
        'credits_used',
        'sections',
        'selected_sections',
    ];

    protected $casts = [
        'sections'          => 'array',
        'selected_sections' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
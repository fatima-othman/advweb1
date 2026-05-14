<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Report;

Route::get('/projects', function () {
    return Project::withCount('reports')
        ->orderBy('id', 'asc')
        ->get()
        ->map(function ($project) {
            $project->reports = $project->reports_count;
            unset($project->reports_count);
            return $project;
        });
});

Route::post('/projects', function (Request $request) {
    $project = Project::create([
        'name' => $request->name,
        'type' => $request->type,
        'reports' => $request->reports ?? 0,
        'country' => $request->country,
        'progress' => $request->progress ?? 0,
        'status' => $request->status ?? 'Active',
    ]);

    return response()->json([
        'message' => 'Project added successfully',
        'project' => $project,
    ]);
});

Route::put('/projects/{project}', function (Request $request, Project $project) {
    $project->update([
        'name' => $request->name,
        'type' => $request->type,
        'country' => $request->country,
    ]);

    return response()->json([
        'message' => 'Project updated successfully',
        'project' => $project,
    ]);
});

Route::delete('/projects/{project}', function (Project $project) {
    $project->delete();

    return response()->json([
        'message' => 'Project deleted successfully',
    ]);
});

Route::get('/reports', function () {
    return Report::with('project')->orderBy('id', 'asc')->get();
});
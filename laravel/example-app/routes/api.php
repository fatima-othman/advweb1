<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Project;

Route::get('/projects', function () {
    return Project::orderBy('id', 'asc')->get();
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
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Report;
use App\Models\Notification;

Route::get('/projects', function () {
    return Project::withCount('reports')
        ->orderBy('id', 'asc')
        ->get()
        ->map(function ($project) {
            return [
                'id' => $project->id,
                'name' => $project->name,
                'type' => $project->type,
                'reports' => $project->reports_count,
                'country' => $project->country,
                'progress' => $project->progress,
                'status' => $project->status,
            ];
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

Route::get('/comparison/{projectId}', function ($projectId) {
    return Report::with('project')
        ->where('project_id', $projectId)
        ->orderBy('id', 'asc')
        ->get();
});

Route::get('/notifications', function () {
    return Notification::latest()->get();
});

Route::post('/notifications', function (Request $request) {
    $notification = Notification::create([
        'title' => $request->title,
        'message' => $request->message,
        'is_read' => $request->is_read ?? false,
    ]);

    return response()->json([
        'message' => 'Notification created successfully',
        'notification' => $notification,
    ]);
});

Route::put('/notifications/read-all', function () {
    Notification::query()->update([
        'is_read' => true,
    ]);

    return response()->json([
        'message' => 'All notifications marked as read',
    ]);
});
Route::post('/reports', function (Request $request) {
    $report = Report::create([
        'project_id' => $request->project_id,
        'name' => $request->name,
        'type' => $request->type,
        'date' => $request->date,
        'sections' => $request->sections,
        'score' => $request->score,
        'swot' => $request->swot,
        'recommendations' => $request->recommendations,
        'kpis' => $request->kpis,
    ]);

    return response()->json([
        'message' => 'Report added successfully',
        'report' => $report,
    ]);
});
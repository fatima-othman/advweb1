<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // GET /api/projects
    public function index(Request $request)
    {
        $projects = Project::where('user_id', 1) // مؤقتاً — لاحقاً بنستخدم الـ auth
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($projects);
    }

    // POST /api/projects
    public function store(Request $request)
    {
        $request->validate([
            'name'          => 'required|string',
            'business_type' => 'required|string',
        ]);

        $project = Project::create([
            'user_id'       => 1, // مؤقتاً
            'name'          => $request->name,
            'business_type' => $request->business_type,
            'description'   => $request->description,
            'stage'         => $request->stage,
            'employees'     => $request->employees,
            'budget'        => $request->budget,
            'market'        => $request->market,
            'competitors'   => $request->competitors,
            'language'      => $request->language ?? 'English',
        ]);

        return response()->json($project, 201);
    }

    // GET /api/projects/:id 
    public function show($id)
    {
        $project = Project::where('id', $id)
            ->where('user_id', 1) // مؤقتاً
            ->firstOrFail();

        return response()->json($project);
    }

    // PUT /api/projects/:id
    public function update(Request $request, $id)
    {
        $project = Project::where('id', $id)
            ->where('user_id', 1)
            ->firstOrFail();

        $project->update($request->only([
            'name',
            'business_type',
            'description',
            'stage',
            'employees',
            'budget',
            'market',
            'competitors',
            'language',
        ]));

        return response()->json($project); 
    }

    // DELETE /api/projects/:id 
    public function destroy($id)
    {
        $project = Project::where('id', $id)
            ->where('user_id', 1) 
            ->firstOrFail();

        $project->delete();

        return response()->json(['message' => 'Project deleted']);
    }
}
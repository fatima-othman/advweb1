<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;

class ReportController extends Controller
{
    public function show($id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                'message' => 'Report not found'
            ], 404);
        }

        return response()->json($report);
    }
}
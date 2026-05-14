<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReportController;


Route::apiResource('projects', ProjectController::class);
Route::post('reports/generate', [ReportController::class, 'generate']);
Route::get('reports/{id}', [ReportController::class, 'show']);
<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ReportController extends Controller
{
    public function index()
    {
        return Report::where('user_id', 1)
            ->with('project')
            ->latest()
            ->get()
            ->map(function ($report) {
                $selectedSections = $report->selected_sections ?: array_keys($report->sections ?: []);
                $projectName = optional($report->project)->name ?: 'Project';

                return [
                    'id' => $report->id,
                    'name' => $report->title ?: "{$projectName} Strategy Report",
                    'project_id' => $report->project_id,
                    'projectId' => $report->project_id,
                    'project' => $report->project,
                    'type' => $selectedSections[0] ?? 'Strategy',
                    'date' => optional($report->created_at)->toDateString(),
                    'sections' => count($selectedSections),
                    'score' => 89,
                    'swot' => [
                        'strengths' => data_get($report->sections, 'swot', 'Strong business direction'),
                        'weaknesses' => 'Needs more detailed validation',
                        'opportunities' => 'Room for growth in the target market',
                        'threats' => 'Competitive pressure',
                    ],
                    'kpis' => [
                        'revenue' => 82,
                        'marketing' => 88,
                        'retention' => 79,
                    ],
                    'recommendations' => [
                        'Review market fit',
                        'Improve acquisition channels',
                        'Track weekly KPIs',
                    ],
                ];
            });
    }

    public function generate(Request $request)
    {
        $request->validate([
            'project_id'       => 'required|integer',
            'selected_sections' => 'required|array',
        ]);

        // جيب بيانات المشروع
        $project = Project::where('id', $request->project_id)
            ->where('user_id', 1)
            ->firstOrFail();

        // احسب الكريديت
        $creditCosts = [
            'swot'      => 5,
            'pricing'   => 5,
            'risk'      => 5,
            'kpi'       => 10,
            'marketing' => 20,
            'growth'    => 20,
        ];

        $isBundle = in_array('bundle', $request->selected_sections);
        $creditsUsed = $isBundle ? 50 : collect($request->selected_sections)
            ->sum(fn($s) => $creditCosts[$s] ?? 0);

        // بناء الـ Prompt
        $prompt = $this->buildPrompt($project, $request->selected_sections, $isBundle);

        // إرسال لـ Groq API
$response = Http::withoutVerifying()
    ->withHeaders([
        'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
        'Content-Type'  => 'application/json',
    ])->post('https://api.groq.com/openai/v1/chat/completions', [
        'model'    => 'llama-3.3-70b-versatile',
        'messages' => [
            ['role' => 'user', 'content' => $prompt]
        ],
        'max_tokens' => 4000,
    ]);

if (!$response->successful()) {
    $sections = $this->fallbackSections($project, $request->selected_sections, $isBundle);

    $report = Report::create([
        'user_id'          => 1,
        'project_id'       => $project->id,
        'credits_used'     => $creditsUsed,
        'sections'         => $sections,
        'selected_sections' => $request->selected_sections,
    ]);

    return response()->json($report, 201);
}

$text = $response->json()['choices'][0]['message']['content'];

        // parse الرد
       $text = $response->json()['choices'][0]['message']['content'];
        $sections = $this->parseSections($text);

        // حفظ التقرير
        $report = Report::create([
            'user_id'          => 1,
            'project_id'       => $project->id,
            'credits_used'     => $creditsUsed,
            'sections'         => $sections,
            'selected_sections' => $request->selected_sections,
        ]);

        return response()->json($report, 201);
    }

 private function buildPrompt($project, $selectedSections, $isBundle)
{
    $isArabic = $project->language === 'العربية';

    $sections = $isBundle
        ? ['swot', 'pricing', 'risk', 'kpi', 'marketing', 'growth']
        : $selectedSections;

    $sectionTitles = collect($sections)
        ->map(fn($s) => "[{$s}]")
        ->join(', ');

    if ($isArabic) {
        return "You are a professional business consultant.
IMPORTANT: Write ALL content in Arabic only. Do not use any other language.
IMPORTANT: Use ONLY these exact section markers in English: {$sectionTitles}

Business Info:
- Type: {$project->business_type}
- Stage: {$project->stage}
- Employees: {$project->employees}
- Budget: {$project->budget}
- Market: {$project->market}
- Competitors: {$project->competitors}

Write a detailed strategy report. Start each section with its marker in square brackets.
Example format:
[swot]
(Arabic content here...)

[marketing]
(Arabic content here...)

Only Arabic text in the content. No mixed languages. No intro or conclusion.";
    }

    return "You are a professional business consultant specialized in {$project->business_type} companies.
Business Type: {$project->business_type}
Stage: {$project->stage}
Employees: {$project->employees}
Budget: {$project->budget}
Target Market: {$project->market}
Competitors: {$project->competitors}

Write a comprehensive strategy report. Start each section with its marker in square brackets.
Required sections: {$sectionTitles}
No intro or conclusion. Only the requested sections.";
}

    private function parseSections($text)
    {
        $sections = [];
        preg_match_all('/\[([^\]]+)\](.*?)(?=\[|$)/s', $text, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $key           = strtolower(trim($match[1]));
            $key           = str_replace(' ', '_', $key);
            $sections[$key] = trim($match[2]);
        }

        return $sections;
    }

    private function fallbackSections(Project $project, array $selectedSections, bool $isBundle): array
    {
        $sections = $isBundle
            ? ['swot', 'pricing', 'risk', 'kpi', 'marketing', 'growth']
            : $selectedSections;

        $templates = [
            'swot' => "Strengths: {$project->name} has a focused business idea and a clear target direction.\nWeaknesses: The project needs more validation, stronger operations, and consistent tracking.\nOpportunities: There is room to grow through digital channels, partnerships, and customer loyalty.\nThreats: Competition, pricing pressure, and changing customer preferences should be monitored.",
            'pricing' => "Use a launch-friendly pricing strategy for {$project->business_type}. Start with competitive packages, track customer response, and adjust prices based on demand, margin, and competitor movement.",
            'risk' => "Key risks include high competition, limited budget, operational delays, and weak online visibility. Reduce risk through supplier planning, weekly KPI reviews, and clear marketing priorities.",
            'kpi' => "Recommended KPIs: monthly revenue, customer acquisition cost, repeat purchase rate, conversion rate, average order value, and social engagement growth.",
            'marketing' => "Focus marketing on the target market: {$project->market}. Use social media content, local promotions, customer stories, and simple offers that encourage first purchases and repeat visits.",
            'growth' => "Phase 1: validate demand and improve the offer. Phase 2: increase marketing consistency and customer retention. Phase 3: expand channels, partnerships, and team capacity.",
        ];

        return collect($sections)
            ->filter(fn($section) => isset($templates[$section]))
            ->mapWithKeys(fn($section) => [$section => $templates[$section]])
            ->all();
    }

    public function show($id)
    {
        $report = Report::where('id', $id)
            ->where('user_id', 1)
            ->with('project')
            ->firstOrFail();

        return response()->json($report);
    }
}

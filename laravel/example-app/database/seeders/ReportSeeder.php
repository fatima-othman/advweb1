<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Report;

class ReportSeeder extends Seeder
{
    public function run(): void
    {
        Report::create([
            'project_id' => 1,
            'name' => 'Q1 Growth Strategy',
            'type' => 'Growth',
            'date' => '2025-04-27',
            'sections' => 7,
            'score' => 89,
            'swot' => [
                'strengths' => 'Strong niche branding and repeat buyers',
                'weaknesses' => 'Limited paid acquisition channels',
                'opportunities' => 'Expand influencer and bundles strategy',
                'threats' => 'High cosmetics competition',
            ],
            'recommendations' => [
                'Increase influencer partnerships in Q2',
                'Launch bundle offers for skincare sets',
                'Improve paid acquisition testing',
            ],
            'kpis' => [
                'revenue' => 82,
                'marketing' => 91,
                'retention' => 85,
            ],
        ]);

        Report::create([
            'project_id' => 1,
            'name' => 'Pricing Optimization',
            'type' => 'Pricing',
            'date' => '2025-04-18',
            'sections' => 6,
            'score' => 84,
            'swot' => [
                'strengths' => 'Healthy margin flexibility',
                'weaknesses' => 'Weak premium tier differentiation',
                'opportunities' => 'Introduce bundles and subscriptions',
                'threats' => 'Price-sensitive audience segments',
            ],
            'recommendations' => [
                'Test monthly subscriptions',
                'Create premium pricing ladder',
                'Use limited-time pricing offers',
            ],
            'kpis' => [
                'revenue' => 76,
                'marketing' => 80,
                'retention' => 79,
            ],
        ]);

        Report::create([
            'project_id' => 2,
            'name' => 'SaaS Go-To-Market',
            'type' => 'Marketing',
            'date' => '2025-04-25',
            'sections' => 8,
            'score' => 91,
            'swot' => [
                'strengths' => 'Clear B2B positioning',
                'weaknesses' => 'Small sales team',
                'opportunities' => 'Partnership channels',
                'threats' => 'Long enterprise sales cycle',
            ],
            'recommendations' => [
                'Add partner-led acquisition motion',
                'Create product demo webinars',
                'Improve enterprise onboarding',
            ],
            'kpis' => [
                'revenue' => 88,
                'marketing' => 93,
                'retention' => 84,
            ],
        ]);
    }
}
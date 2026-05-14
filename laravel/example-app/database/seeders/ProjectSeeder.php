<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::create([
            'name' => "Sara’s Skincare Store",
            'type' => "E-commerce",
            'reports' => 4,
            'country' => "Saudi Arabia",
        ]);

        Project::create([
            'name' => "Rana’s Food Truck",
            'type' => "Food Business",
            'reports' => 2,
            'country' => "Jordan",
        ]);

        Project::create([
            'name' => "Bloom Fashion",
            'type' => "Retail",
            'reports' => 3,
            'country' => "Qatar",
        ]);
    }
}
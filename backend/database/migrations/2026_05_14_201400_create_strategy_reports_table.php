<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('strategy_reports', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('company_name');
            $table->string('industry');
            $table->string('target_market')->nullable();
            $table->string('objective')->nullable();
            $table->string('timeline')->nullable();
            $table->string('budget_range')->nullable();
            $table->text('challenges')->nullable();
            $table->text('summary')->nullable();
            $table->json('priorities')->nullable();
            $table->json('risks')->nullable();
            $table->json('kpis')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('strategy_reports');
    }
};

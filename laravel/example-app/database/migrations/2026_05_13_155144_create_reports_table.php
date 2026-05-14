<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {

            $table->id();

            $table->foreignId('project_id')
                  ->constrained()
                  ->onDelete('cascade');

            $table->string('name');

            $table->string('type');

            $table->date('date')->nullable();

            $table->integer('sections')->default(0);

            $table->integer('score')->default(0);

            $table->json('swot')->nullable();

            $table->json('recommendations')->nullable();

            $table->json('kpis')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
};
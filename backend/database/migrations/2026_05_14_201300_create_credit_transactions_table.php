<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_transactions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('credit_package_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type');
            $table->integer('credits')->default(0);
            $table->decimal('amount', 10, 2)->default(0);
            $table->string('description')->nullable();
            $table->string('status')->default('completed');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_transactions');
    }
};

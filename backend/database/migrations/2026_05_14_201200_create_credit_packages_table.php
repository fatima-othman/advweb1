<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_packages', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->integer('credits')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('billing_cycle')->default('one_time');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        DB::table('credit_packages')->insert([
            ['name' => 'Starter', 'credits' => 60, 'price' => 9.99, 'billing_cycle' => 'one_time', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Growth', 'credits' => 180, 'price' => 24.99, 'billing_cycle' => 'one_time', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Pro', 'credits' => null, 'price' => 49.00, 'billing_cycle' => 'monthly', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_packages');
    }
};

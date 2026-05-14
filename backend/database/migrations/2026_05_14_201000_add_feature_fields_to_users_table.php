<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->integer('credit_balance')->default(20)->after('password');
            $table->boolean('auto_recharge_enabled')->default(false)->after('credit_balance');
            $table->unsignedBigInteger('auto_recharge_package_id')->nullable()->after('auto_recharge_enabled');
            $table->string('stripe_customer_id')->nullable()->after('auto_recharge_package_id');
            $table->string('stripe_payment_method_id')->nullable()->after('stripe_customer_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn([
                'credit_balance',
                'auto_recharge_enabled',
                'auto_recharge_package_id',
                'stripe_customer_id',
                'stripe_payment_method_id',
            ]);
        });
    }
};

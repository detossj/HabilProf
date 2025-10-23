<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('supervisor', function (Blueprint $table) {
            $table->unsignedInteger('run_supervisor')->primary();
            $table->string('nombre_supervisor', 100);
            $table->unsignedInteger('run_empresa');
            $table->timestamps();

            $table->foregin('run_empresa')->references('run_empresa')->on('empresa')->cascadeOnUpdate()->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisor');
    }
};

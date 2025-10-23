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
        Schema::create('profesor_co_guia', function (Blueprint $table) {
            $table->unsignedInteger('run_profesor_co_guia')->primary();
            $table->string('nombre_profesor_co_guia', 100);
            $table->string('correo_profesor_co_guia', 254);
            $table->boolean('DINF')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profesor_co_guia');
    }
};

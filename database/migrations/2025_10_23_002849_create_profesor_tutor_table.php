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
        Schema::create('profesor_tutor', function (Blueprint $table) {
            $table->unsignedInteger('run_profesor_tutor')->primary();
            $table->string('nombre_profesor_tutor', 100);
            $table->string('correo_profesor_tutor', 254);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profesor_tutor');
    }
};

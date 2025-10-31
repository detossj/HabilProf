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
        Schema::create('profesor_comision', function (Blueprint $table) {
            $table->unsignedInteger('run_profesor_comision')->primary();
            $table->string('nombre_profesor_comision', 100);
            $table->string('correo_profesor_comision', 254);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profesor_comision');
    }
};

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
        Schema::create('habilitacion_prinv', function (Blueprint $table) {
            $table->unsignedInteger('id_habilitacion')->primary();
            $table->date('fecha_nota')->nullable();
            $table->decimal('nota_final', 3,1)->nullable();
            $table->char('semestre_inicio', 6);
            $table->string('descripcion', 4000);
            $table->string('titulo_proyecto', 255);

            $table->unsignedInteger('run_alumno');
            $table->unsignedInteger('run_profesor_guia');
            $table->unsignedInteger('run_profesor_comision');
            $table->unsignedInteger('run_profesor_co_guia')->nullable();
            $table->timestamps();

            $table->foreign('run_alumno')->references('run_alumno')->on('alumno')->cascadeOnUpdate()->cascadeOnDelete();
            $table->unsignedInteger('run_profesor_guia')->references('run_profesor_guia')->on('profesor_guia')->cascadeOnUpdate()->cascadeOnDelete();
            $table->unsignedInteger('run_profesor_comision')->references('run_profesor_comision')->on('profesor_comision')->cascadeOnUpdate()->cascadeOnDelete();
            $table->unsignedInteger('run_profesor_co_guia')->nullable()->references('run_profesor_co_guia')->on('profesor_co_guia')->cascadeOnUpdate()->cascadeOnDelete();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habilitacion_prinv');
    }
};

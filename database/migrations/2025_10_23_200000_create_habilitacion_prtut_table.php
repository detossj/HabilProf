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
        Schema::create('habilitacion_prtut', function (Blueprint $table) {
            $table->unsignedInteger('id_habilitacion')->primary();
            $table->date('fecha_nota')->nullable();
            $table->decimal('nota_final', 3,1)->nullable();
            $table->char('semestre_inicio', 6);
            $table->string('descripcion', 4000);

            $table->unsignedInteger('run_alumno');
            $table->unsignedInteger('run_profesor_tutor');
            $table->unsignedInteger('run_supervisor');
            $table->unsignedInteger('run_empresa');
            $table->timestamps();

            $table->foreign('run_alumno')->references('run_alumno')->on('alumno')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('run_profesor_tutor')->references('run_profesor_tutor')->on('profesor_tutor')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('run_supervisor')->references('run_supervisor')->on('supervisor')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('run_empresa')->references('run_empresa')->on('empresa')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habilitacion_prtut');
    }
};

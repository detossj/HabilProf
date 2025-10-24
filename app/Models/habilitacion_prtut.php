<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Habilitacion_prtut extends Model
{
    use HasFactory;
    protected $table = 'habilitacion_prtut';
    protected $primaryKey = 'id_habilitacion';
    protected $keyType = 'int';
    protected $fillable = ['descripcion','semestre_inicio','fecha_nota', 'nota_final', 'run_alumno', 'run_profesor_tutor', 'run_supervisor'];

    protected $casts = ['fecha_nota'=>'date', 'nota_final'=>'decimal:1'];
    public function alumno() {return $this->belongsTo(alumno::class, 'run_alumno', 'run_alumno');}
    public function profesortutor() {return $this->belongsTo(profesor_tutor::class, 'run_profesor_tutor', 'run_profesor_tutor');}
    public function supervisor() {return $this->belongsTo(supervisor::class, 'run_supervisor', 'run_supervisor');}
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class habilitacion_prinv extends Model
{
    use HasFactory;
    protected $table = 'habilitacion_prinv';
    protected $primaryKey = 'id_habilitacion';
    public $incrementing = false;
    protected $keyType = 'int';
    protected $fillable = ['descripcion','semestre_inicio','fecha_nota', 'nota_final', 'titulo_proyecto', 'run_alumno', 'run_profesor_guia', 'run_profesor_comision', 'run_profesor_co_guia'];

    protected $casts = ['fecha_nota'=>'date', 'nota_final'=>'decimal:1'];
    public function alumnos() {return $this->belongsTo(alumno::class, 'run_alumno', 'run_alumno');}
    public function profesorguia() {return $this->belongsTo(profesor_guia::class, 'run_profesor_guia', 'run_profesor_guia');}
    public function profesorcomision() {return $this->belongsTo(profesor_comision::class, 'run_profesor_comision', 'run_profesor_comision');}
    public function profesorcoguia() {return $this->belongsTo(profesor_co_guia::class, 'run_profesor_co_guia', 'run_profesor_co_guia');}
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Alumno extends Model
{
    use HasFactory;
    protected $table = 'alumno';
    protected $primaryKey = 'run_alumno';
    public $incrementing = false;
    protected $keyType = 'int';
    protected $fillable = ['run_alumno','nombre_alumno','correo_alumno'];

    public function prIng() {return $this->hasOne(habilitacion_pring::class, 'run_alumno', 'run_alumno');}
    public function prInv() {return $this->hasOne(habilitacion_prinv::class, 'run_alumno', 'run_alumno');}
    public function prTut() {return $this->hasOne(habilitacion_prtut::class, 'run_alumno', 'run_alumno');}
}

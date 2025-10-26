<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profesor_guia extends Model
{
    use HasFactory;

    protected $table = 'profesor_guia';
    protected $primaryKey = 'run_profesor_guia';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = ['run_profesor_guia', 'nombre_profesor_guia', 'correo_profesor_guia'];

    public function prings() {return $this->hasMany(habilitacion_pring::class, 'run_profesor_guia', 'run_profesor_guia');}
    public function prinvs(){return $this->hasMany(habilitacion_prinv::class, 'run_profesor_guia', 'run_profesor_guia');}
}

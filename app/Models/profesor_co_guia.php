<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profesor_co_guia extends Model
{
    use HasFactory;

    protected $table = 'profesor_co_guia';
    protected $primaryKey = 'run_profesor_co_guia';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = ['run_profesor_co_guia', 'nombre_profesor_co_guia', 'correo_profesor_co_guia'];

    public function pring() {return $this->hasMany(habilitacion_pring::class, 'run_profesor_co_guia', 'run_profesor_co_guia');}
    public function prinv(){return $this->hasMany(habilitacion_prinv::class, 'run_profesor_co_guia', 'run_profesor_co_guia');}
}

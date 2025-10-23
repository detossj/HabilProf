<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class profesor_comision extends Model
{
    use HasFactory;

    protected $table = 'profesor_comision';
    protected $primaryKey = 'run_profesor_comision';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = ['run_profesor_comision', 'nombre_profesor_comision', 'correo_profesor_comision'];

    public function pring() {return $this->hasMany(habilitacion_pring::class, 'run_profesor_comision', 'run_profesor_comision');}
    public function prinv(){return $this->hasMany(habilitacion_prinv::class, 'run_profesor_comision', 'run_profesor_comision');}
}

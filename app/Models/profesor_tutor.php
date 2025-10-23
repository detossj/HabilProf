<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profesor_tutor extends Model
{
    use HasFactory;

    protected $table = 'profesor_tutor';
    protected $primaryKey = 'run_profesor_tutor';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = ['run_profesor_tutor', 'nombre_profesor_tutor', 'correo_profesor_tutor'];

    public function prtut() {return $this->hasMany(habilitacion_prtut::class, 'run_profesor_tutor', 'run_profesor_tutor');}
}

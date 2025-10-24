<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Empresa extends Model
{
    use HasFactory;
    protected $table = 'empresa';
    protected $primaryKey = 'run_empresa';
    public $incrementing = false;
    protected $keyType = 'int';
    protected $fillable = ['run_empresa','nombre_empresa'];

    public function supervisores() {return $this->hasMany(supervisor::class, 'run_empresa', 'run_empresa');}
}

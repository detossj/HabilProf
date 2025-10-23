<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class supervisor extends Model
{
    use HasFactory;
    protected $table = 'supervisor';
    protected $primaryKey = 'run_supervisor';
    public $incrementing = false;
    protected $keyType = 'int';
    protected $fillable = ['run_supervisor','nombre_supervisor', 'run_empresa'];

    public function empresa() {return $this->belongsTo(empresa::class, 'run_empresa', 'run_empresa');}
}

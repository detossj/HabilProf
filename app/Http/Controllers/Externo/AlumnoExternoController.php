<?php

namespace App\Http\Controllers\Externo;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AlumnoExternoController extends Controller
{
    public function index()
    {
        $alumnos = DB::connection('mysql_sistemas_ucsc')
                    ->table('registro_alumno')
                    ->get();
        
        return response()->json([
            'sistema' => 'registro_alumno',
            'fuente' => 'Sistema externo de alumnos UCSC',
            'timestamp' => now()->toISOString(),
            'data' => $alumnos
        ]);
    }

    public function show($run)
    {
        $alumno = DB::connection('mysql_sistemas_ucsc')
                   ->table('registro_alumno')
                   ->where('run_alumno', $run)
                   ->first();
        
        if (!$alumno) {
            return response()->json([
                'sistema' => 'registro_alumno',
                'error' => 'Alumno no encontrado en sistema externo',
                'run_buscado' => $run
            ], 404);
        }

        return response()->json([
            'sistema' => 'registro_alumno',
            'fuente' => 'Sistema externo de alumnos UCSC',
            'timestamp' => now()->toISOString(),
            'data' => $alumno
        ]);
    }
}
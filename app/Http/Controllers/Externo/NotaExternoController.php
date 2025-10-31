<?php

namespace App\Http\Controllers\Externo;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class NotaExternoController extends Controller
{
    public function index()
    {
        $notas = DB::connection('mysql_sistemas_ucsc')
                  ->table('nota_en_linea')
                  ->get();
        
        return response()->json([
            'sistema' => 'nota_en_linea',
            'fuente' => 'Sistema externo de notas en línea UCSC',
            'timestamp' => now()->toISOString(),
            'data' => $notas
        ]);
    }

    public function porAlumno($runAlumno)
    {
        $notas = DB::connection('mysql_sistemas_ucsc')
                  ->table('nota_en_linea')
                  ->where('run_alumno', $runAlumno)
                  ->get();
        
        return response()->json([
            'sistema' => 'nota_en_linea',
            'fuente' => 'Sistema externo de notas en línea UCSC',
            'timestamp' => now()->toISOString(),
            'run_alumno' => $runAlumno,
            'data' => $notas
        ]);
    }
}
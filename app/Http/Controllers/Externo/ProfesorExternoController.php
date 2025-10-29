<?php

namespace App\Http\Controllers\Externo;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProfesorExternoController extends Controller
{
    public function guias()
    {
        $profesores = DB::connection('mysql_sistemas_ucsc')
                       ->table('registro_profesor_guia')
                       ->get();
        
        return response()->json([
            'sistema' => 'registro_profesor_guia',
            'fuente' => 'Sistema externo de profesores guía UCSC',
            'timestamp' => now()->toISOString(),
            'data' => $profesores
        ]);
    }

    public function coGuias()
    {
        $profesores = DB::connection('mysql_sistemas_ucsc')
                       ->table('registro_profesor_co_guia')
                       ->get();
        
        return response()->json([
            'sistema' => 'registro_profesor_co_guia',
            'fuente' => 'Sistema externo de profesores co-guía UCSC',
            'timestamp' => now()->toISOString(),
            'data' => $profesores
        ]);
    }

    public function comision()
    {
        $profesores = DB::connection('mysql_sistemas_ucsc')
                       ->table('registro_profesor_comision')
                       ->get();
        
        return response()->json([
            'sistema' => 'registro_profesor_comision',
            'fuente' => 'Sistema externo de profesores comisión UCSC',
            'timestamp' => now()->toISOString(),
            'data' => $profesores
        ]);
    }

    public function tutores()
    {
        $profesores = DB::connection('mysql_sistemas_ucsc')
                       ->table('registro_profesor_tutor')
                       ->get();
        
        return response()->json([
            'sistema' => 'registro_profesor_tutor',
            'fuente' => 'Sistema externo de profesores tutores UCSC',
            'timestamp' => now()->toISOString(),
            'data' => $profesores
        ]);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

// Importación de modelos
use App\Models\Habilitacion_pring;
use App\Models\Habilitacion_prinv;
use App\Models\Habilitacion_prtut;
use App\Models\Alumno;
use App\Models\Profesor_guia;
use App\Models\Profesor_co_guia;
use App\Models\Profesor_comision;
use App\Models\Profesor_tutor;
use App\Models\Supervisor;
use App\Models\Empresa;

class HabilitacionController extends Controller
{
    /**
     * Registrar una nueva habilitación (PrIng, PrInv o PrTut)
     */
    public function store(Request $request)
    {
        // Validar tipo de habilitación
        $validator = Validator::make($request->all(), [
            'tipo_habilitacion' => 'required|in:PrIng,PrInv,PrTut',
            'run_alumno' => 'required|integer|exists:alumno,run_alumno',
            'descripcion' => 'required|string',
            'semestre_inicio' => 'required|string|max:10',
            'fecha_nota' => 'nullable|date',
            'nota_final' => 'nullable|numeric|min:1|max:7',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $tipo = $request->tipo_habilitacion;

        try {
            switch ($tipo) {
                // -----------------------------
                // HABILITACIÓN PROFESIONAL DE INGENIERÍA
                // -----------------------------
                case 'PrIng':
                    $validator = Validator::make($request->all(), [
                        'titulo_proyecto' => 'required|string',
                        'run_profesor_guia' => 'required|integer|exists:profesor_guia,run_profesor_guia',
                        'run_profesor_comision' => 'nullable|integer|exists:profesor_comision,run_profesor_comision',
                        'run_profesor_co_guia' => 'nullable|integer|exists:profesor_co_guia,run_profesor_co_guia',
                    ]);

                    if ($validator->fails()) {
                        return response()->json([
                            'success' => false,
                            'errors' => $validator->errors(),
                        ], 422);
                    }

                    $habilitacion = Habilitacion_pring::create([
                        'descripcion' => $request->descripcion,
                        'semestre_inicio' => $request->semestre_inicio,
                        'fecha_nota' => $request->fecha_nota,
                        'nota_final' => $request->nota_final,
                        'titulo_proyecto' => $request->titulo_proyecto,
                        'run_alumno' => $request->run_alumno,
                        'run_profesor_guia' => $request->run_profesor_guia,
                        'run_profesor_comision' => $request->run_profesor_comision,
                        'run_profesor_co_guia' => $request->run_profesor_co_guia,
                    ]);
                    break;

                // -----------------------------
                // HABILITACIÓN PROFESIONAL DE INVESTIGACIÓN
                // -----------------------------
                case 'PrInv':
                    $validator = Validator::make($request->all(), [
                        'titulo_proyecto' => 'required|string',
                        'run_profesor_guia' => 'required|integer|exists:profesor_guia,run_profesor_guia',
                        'run_profesor_comision' => 'nullable|integer|exists:profesor_comision,run_profesor_comision',
                        'run_profesor_co_guia' => 'nullable|integer|exists:profesor_co_guia,run_profesor_co_guia',
                    ]);

                    if ($validator->fails()) {
                        return response()->json([
                            'success' => false,
                            'errors' => $validator->errors(),
                        ], 422);
                    }

                    $habilitacion = Habilitacion_prinv::create([
                        'descripcion' => $request->descripcion,
                        'semestre_inicio' => $request->semestre_inicio,
                        'fecha_nota' => $request->fecha_nota,
                        'nota_final' => $request->nota_final,
                        'titulo_proyecto' => $request->titulo_proyecto,
                        'run_alumno' => $request->run_alumno,
                        'run_profesor_guia' => $request->run_profesor_guia,
                        'run_profesor_comision' => $request->run_profesor_comision,
                        'run_profesor_co_guia' => $request->run_profesor_co_guia,
                    ]);
                    break;

                // -----------------------------
                // HABILITACIÓN PROFESIONAL DE TUTORÍA
                // -----------------------------
                case 'PrTut':
                    $validator = Validator::make($request->all(), [
                        'run_profesor_tutor' => 'required|integer|exists:profesor_tutor,run_profesor_tutor',
                        'run_supervisor' => 'required|integer|exists:supervisor,run_supervisor',
                        'run_empresa' => 'nullable|integer|exists:empresa,run_empresa',
                    ]);

                    if ($validator->fails()) {
                        return response()->json([
                            'success' => false,
                            'errors' => $validator->errors(),
                        ], 422);
                    }

                    $habilitacion = Habilitacion_prtut::create([
                        'descripcion' => $request->descripcion,
                        'semestre_inicio' => $request->semestre_inicio,
                        'fecha_nota' => $request->fecha_nota,
                        'nota_final' => $request->nota_final,
                        'run_alumno' => $request->run_alumno,
                        'run_profesor_tutor' => $request->run_profesor_tutor,
                        'run_supervisor' => $request->run_supervisor,
                    ]);
                    break;
            }

            return response()->json([
                'success' => true,
                'message' => 'Habilitación registrada correctamente.',
                'data' => $habilitacion,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar la habilitación.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Listar todas las habilitaciones (opcional, por tipo)
     */
    public function index(Request $request)
    {
        $tipo = $request->query('tipo');
        switch ($tipo) {
            case 'PrIng':
                $data = Habilitacion_pring::with(['alumno', 'profesorguia'])->get();
                break;
            case 'PrInv':
                $data = Habilitacion_prinv::with(['alumno', 'profesorguia'])->get();
                break;
            case 'PrTut':
                $data = Habilitacion_prtut::with(['alumno', 'profesortutor'])->get();
                break;
            default:
                $data = [
                    'pring' => Habilitacion_pring::count(),
                    'prinv' => Habilitacion_prinv::count(),
                    'prtut' => Habilitacion_prtut::count(),
                ];
        }

        return response()->json(['success' => true,'data' => $data,], 200);
    }
}
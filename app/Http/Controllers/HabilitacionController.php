<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Alumno;
use App\Models\Profesor_guia;
use App\Models\Profesor_co_guia;
use App\Models\Profesor_comision;
use App\Models\Profesor_tutor;
use App\Models\Empresa;
use App\Models\Supervisor;
use App\Models\Habilitacion_pring;
use App\Models\Habilitacion_prinv;
use App\Models\Habilitacion_prtut;
use Illuminate\Validation\Rule;

class HabilitacionController extends Controller
{
    public function store(Request $request)
    {
        // 🔹 Validación base
        $rules = [
            'id_habilitacion' => 'required|integer|max:2147483647|unique:habilitacion_pring,id_habilitacion|unique:habilitacion_prinv,id_habilitacion|unique:habilitacion_prtut,id_habilitacion',
            'tipo_habilitacion' => ['required', Rule::in(['PrIng', 'PrInv', 'PrTut'])],
            'run_alumno' => 'required|integer|min:1000000|max:99999999|exists:alumno,run_alumno',
            'semestre_inicio' => ['required','regex:/^(20[2-9][0-9]|20[3-9][0-9]|2[1-9][0-9]{2})-(1|2)$/'],
            'nota_final' => 'nullable|numeric|min:1|max:7',
            'fecha_nota' => 'nullable|date_format:Y-m-d|after:2024-12-31',
            'descripcion' => 'required|string|min:1|max:4000',
        ];

        // 🔹 Validaciones por tipo
        if (in_array($request->tipo_habilitacion, ['PrIng', 'PrInv'])) {
            $rules = array_merge($rules, [
                'titulo_proyecto' => 'required|string|min:1|max:255',
                'run_profesor_guia' => 'required|integer|min:1000000|max:99999999|exists:profesor_guia,run_profesor_guia',
                'run_profesor_comision' => 'required|integer|min:1000000|max:99999999|exists:profesor_comision,run_profesor_comision',
                'run_profesor_co_guia' => 'nullable|integer|min:1000000|max:99999999|exists:profesor_co_guia,run_profesor_co_guia',
            ]);
        }

        if ($request->tipo_habilitacion === 'PrTut') {
            $rules = array_merge($rules, [
                'run_empresa' => 'required|integer|min:1000000|max:99999999|exists:empresa,run_empresa',
                'nombre_empresa' => 'required|string|min:1|max:100',
                'run_supervisor' => 'required|integer|min:1000000|max:99999999|exists:supervisor,run_supervisor',
                'nombre_supervisor' => 'required|string|min:1|max:254',
                'run_profesor_tutor' => 'required|integer|min:1000000|max:99999999|exists:profesor_tutor,run_profesor_tutor',
            ]);
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 422);

        // 🔹 Verificar si el alumno ya tiene habilitación
        $run = $request->run_alumno;
        if (
            Habilitacion_pring::where('run_alumno', $run)->exists() ||
            Habilitacion_prinv::where('run_alumno', $run)->exists() ||
            Habilitacion_prtut::where('run_alumno', $run)->exists()
        ) {
            return response()->json(['message' => 'El alumno ya registra una habilitación profesional'], 400);
        }

        // 🔹 Inserción según tipo
        switch ($request->tipo_habilitacion) {
            case 'PrIng':
                Habilitacion_pring::create($request->only([
                    'id_habilitacion','fecha_nota','nota_final','semestre_inicio','descripcion',
                    'titulo_proyecto','run_alumno','run_profesor_guia','run_profesor_comision','run_profesor_co_guia'
                ]));
                break;

            case 'PrInv':
                Habilitacion_prinv::create($request->only([
                    'id_habilitacion','fecha_nota','nota_final','semestre_inicio','descripcion',
                    'titulo_proyecto','run_alumno','run_profesor_guia','run_profesor_comision','run_profesor_co_guia'
                ]));
                break;

            case 'PrTut':
                Habilitacion_prtut::create($request->only([
                    'id_habilitacion','fecha_nota','nota_final','semestre_inicio','descripcion',
                    'run_alumno','run_profesor_tutor','run_supervisor','run_empresa'
                ]));
                break;
        }

        return response()->json(['message' => 'Ingreso de información para habilitación profesional exitoso'], 201);
    }
}
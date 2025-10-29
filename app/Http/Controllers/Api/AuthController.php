<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rut' => 'required|string|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }
    
        $rut = $request->rut;
    
        // Buscar si el rut existe en Alumnos 
        $alumno = \App\Models\Alumno::where('run_alumno', $rut)->first();
    
        // Buscar si existe en cualquiera de los tipos de Profesor
        $profesor = collect([
            \App\Models\Profesor_guia::where('run_profesor_guia', $rut)->first(),
            \App\Models\Profesor_co_guia::where('run_profesor_co_guia', $rut)->first(),
            \App\Models\Profesor_comision::where('run_profesor_comision', $rut)->first(),
            \App\Models\Profesor_tutor::where('run_profesor_tutor', $rut)->first(),
        ])->filter()->first();
    
        if (!$alumno && !$profesor) {
            return response()->json([
                'success' => false,
                'message' => 'El RUT no se encuentra registrado en los sistemas UCSC.',
            ], 404);
        }
    
        // Definir datos base según tipo
        $role = $alumno ? 'alumno' : 'profesor';
        $name = $alumno->nombre_alumno ?? $profesor->nombre_profesor_guia 
            ?? $profesor->nombre_profesor_co_guia 
            ?? $profesor->nombre_profesor_comision 
            ?? $profesor->nombre_profesor_tutor ?? 'Sin nombre';
        $email = $alumno->correo_alumno ?? $profesor->correo_profesor_guia
            ?? $profesor->correo_profesor_co_guia
            ?? $profesor->correo_profesor_comision
            ?? $profesor->correo_profesor_tutor
            ?? "{$rut}@ucsc.cl";
    
        // Crear usuario
        $user = \App\Models\User::create([
            'name' => $name,
            'email' => $email,
            'rut' => $rut,
            'password' => bcrypt($request->password),
        ]);
    
        $user->assignRole($role);

        // Cargar el rol
        $user->load('roles');
        
        $token = $user->createToken('mobile')->plainTextToken;
        
        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token,
        ], 201);
        
    }
    
    
    public function login(Request $request)
    {
        $response = ["success" => false];
    
        $validator = Validator::make($request->all(), [
            'rut' => 'required|integer',
            'password' => 'required|string',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Datos inválidos',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        $user = User::where('rut', $request->rut)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'RUT o contraseña incorrectos',
            ], 401);
        }

        $user->hasRole('administrador');
    
        $token = $user->createToken('mobile')->plainTextToken;
    
        return response()->json([
            'success' => true,
            'message' => 'Inicio de sesión exitoso',
            'user' => $user,
            'token' => $token,
        ]);
    }
    

    public function logout() {

        $response = ['success' => false];

        auth()->user()->tokens()->delete();

        $response = [
            'success' => true,
            'message' => 'Sesión cerrada correctamente'
        ];

        return response()->json($response, 200);
    }
}

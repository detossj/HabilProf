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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'rut' => 'required|string|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'roleFromRegistro' => 'required|string|in:alumno,profesor',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }
    
        $validated = $validator->validated();
    
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'rut' => $validated['rut'],
            'password' => bcrypt($validated['password']),
        ]);
    
        $user->assignRole($validated['roleFromRegistro']);
    
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

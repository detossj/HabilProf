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
    public function register(Request $request) {

        $response = ["success" => false];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'password_confirmation' => 'required|string|min:6',
        ]);
        
        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $validated = $validator->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        $user->assignRole('client');

        $response['token'] = $user->createToken('mobile')->plainTextToken;
        $response['user'] = $user;
        $response['success'] = true;

        return response()->json($response, 201);
        
    }

    public function login(Request $request) {

        $response = ["success" => false];

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }
        

        $user = User::where('email', $request->email)->first();

        if(! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['El correo electrónico o la contraseña son incorrectos.'],
            ]);
        }

        $user->hasRole('client');

        $response['token'] = $user->createToken('mobile')->plainTextToken;
        $response['user'] = $user;
        $response['message'] = "Login success";
        $response['success'] = true;

        return response()->json($response, 200);
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

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Externo\AlumnoExternoController;
use App\Http\Controllers\Externo\ProfesorExternoController;
use App\Http\Controllers\Externo\NotaExternoController;


Route::prefix('v1')->group(function () {

    //::auth
    Route::post('/auth/register',[AuthController::class, 'register']);
    Route::post('/auth/login',[AuthController::class, 'login']);

    //Private
    Route::group(['middleware' => 'auth:sanctum'], function () {
        //::auth
        Route::post('/auth/logout',[AuthController::class, 'logout']);
    });
});

// Rutas para módulos fantasmas (sistemas externos)
Route::prefix('externo')->group(function () {
    // Sistema externo de registros de alumnos
    Route::get('/alumnos', [AlumnoExternoController::class, 'index']);
    Route::get('/alumnos/{run}', [AlumnoExternoController::class, 'show']);
    
    // Sistema externo de registros de profesores
    Route::get('/profesores/guias', [ProfesorExternoController::class, 'guias']);
    Route::get('/profesores/co-guias', [ProfesorExternoController::class, 'coGuias']);
    Route::get('/profesores/comision', [ProfesorExternoController::class, 'comision']);
    Route::get('/profesores/tutores', [ProfesorExternoController::class, 'tutores']);
    
    // Sistema externo de notas en línea
    Route::get('/notas', [NotaExternoController::class, 'index']);
    Route::get('/notas/alumno/{run}', [NotaExternoController::class, 'porAlumno']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
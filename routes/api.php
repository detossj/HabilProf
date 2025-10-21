<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;


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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

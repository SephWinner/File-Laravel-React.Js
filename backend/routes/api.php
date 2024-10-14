<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1.0.0')->group(function () {

    // Routes d'inscription et de connexion
    
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', action: [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group( function () {
        Route::get('readGroup', action: [GroupeController::class, 'index']);
        Route::get('show_file/{groupId}', action: [FileController::class, 'show_file']);
        Route::get('showUers', action: [MemberController::class, 'showUers']);

        Route::post('create', action: [GroupeController::class, 'create']);
        Route::post('invitation/{group_id}', action: [MemberController::class, 'invitation']);
        Route::post('send_file/{group_id}', action: [FileController::class, 'store']);
        
        Route::post('addMember/{user_id}/{group_id}', action: [MemberController::class, 'addMember']);
    });

});
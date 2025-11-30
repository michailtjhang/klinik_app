<?php

use App\Http\Controllers\DiagnosaController;
use App\Http\Controllers\PasienController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('data-pasien')->controller(PasienController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/{pasien_id}', 'update');
        Route::delete('/{pasien_id}', 'destroy');
        Route::get('/get-json', 'getDataPasienJson');
    });

    Route::prefix('diagnosa')->controller(DiagnosaController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        // Route::put('/{pasien_id}', 'update');
        // Route::delete('/{pasien_id}', 'destroy');
    });
});

require __DIR__.'/settings.php';

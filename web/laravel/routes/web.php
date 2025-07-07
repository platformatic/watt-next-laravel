<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Admin routes (for now without authentication)
Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('articles', ArticleController::class);
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//menggunakan metode binding agar SEO Friendly
Route::get('service/{homeService:slug}', [HomeServiceController::class, 'show']);
Route::apiResource('/services', HomeServiceController::class);

Route::get('category/{category:slug}', [CategoryController::class, 'show']);
Route::apiResource('/categories', CategoryController::class);

Route::post('/booking-transactions', [BookingtransactionController::class, 'store']);
Route::post('/check-booking', [BookingTransactionController::class, 'booking_details']);

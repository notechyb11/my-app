<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MealController;

Route::prefix('meals')->middleware('throttle:meals')->group(function () {
    // GET /api/meals/random
    Route::get('random', [MealController::class, 'random']);

    // GET /api/meals/{id}
    Route::get('{id}', [MealController::class, 'lookup'])->whereNumber('id');

    // GET /api/meals/search
    // e.g. /api/meals/search?s=Arrabiata
    Route::get('search', [MealController::class, 'search']);
});
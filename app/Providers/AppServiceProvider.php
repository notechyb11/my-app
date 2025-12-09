<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register a rate limiter for the meals API endpoints
        RateLimiter::for('meals', function ($request) {
            // 60 requests per minute per IP by default; for authenticated users use user id
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }
}

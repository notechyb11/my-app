<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class MealController extends Controller
{
    protected string $base = 'https://www.themealdb.com/api/json/v1/1/';

    /**
     * Proxy to www.themealdb.com/api/json/v1/1/random.php
     */
    public function random(): JsonResponse
    {
        $cacheKey = 'meal_random';

        if ($cached = Cache::get($cacheKey)) {
            return response()->json($cached);
        }

        $resp = Http::acceptJson()->get($this->base . 'random.php');

        if (! $resp->ok()) {
            return response()->json(['message' => 'Failed to fetch random meal'], 502);
        }

        $data = $resp->json();
        // short cache to reduce external calls but keep results fresh
        Cache::put($cacheKey, $data, 30);

        return response()->json($data);
    }

    /**
     * Proxy to www.themealdb.com/api/json/v1/1/lookup.php?i={id}
     */
    public function lookup(string $id): JsonResponse
    {
        $cacheKey = "meal_lookup_{$id}";

        if ($cached = Cache::get($cacheKey)) {
            return response()->json($cached);
        }

        $resp = Http::acceptJson()->get($this->base . 'lookup.php', ['i' => $id]);

        if (! $resp->ok()) {
            return response()->json(['message' => 'Failed to lookup meal'], 502);
        }

        $data = $resp->json();
        // meals rarely change: cache for 24 hours
        Cache::put($cacheKey, $data, 60 * 60 * 24);

        return response()->json($data);
    }

    /**
     * Proxy to www.themealdb.com/api/json/v1/1/search.php?s={query}
     * Accepts query parameter "s" (e.g. ?s=Arrabiata)
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->query('s', '');
        $safe = rawurlencode(strtolower(trim($query)));
        $cacheKey = "meal_search_{$safe}";

        if ($cached = Cache::get($cacheKey)) {
            return response()->json($cached);
        }

        $resp = Http::acceptJson()->get($this->base . 'search.php', ['s' => $query]);

        if (! $resp->ok()) {
            return response()->json(['message' => 'Failed to search meals'], 502);
        }

        $data = $resp->json();
        // cache search results for 10 minutes
        Cache::put($cacheKey, $data, 60 * 10);

        return response()->json($data);
    }
}
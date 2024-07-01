<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;

class Admin
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || !auth()->user()) {
            return redirect()->intended(RouteServiceProvider::HOME);
        }
        return $next($request);
    }
}

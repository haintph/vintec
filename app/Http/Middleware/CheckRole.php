<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!auth()->check()) {
            return redirect()->route('login')
                ->with('error', 'Vui lòng đăng nhập');
        }

        $user = auth()->user();
        
        foreach ($roles as $role) {
            if ($user->role === $role) {
                return $next($request);
            }
            
            // Admin có thể truy cập tất cả
            if ($user->isAdmin()) {
                return $next($request);
            }
        }

        abort(403, 'Bạn không có quyền truy cập');
    }
}
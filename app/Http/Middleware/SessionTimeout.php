<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionTimeout
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            // Laravel tự động xử lý session timeout
            // Chỉ cần kiểm tra nếu session hết hạn
            if (!$request->session()->has('_token')) {
                Auth::logout();
                return redirect()->route('login')
                    ->with('error', 'Phiên đăng nhập đã hết hạn');
            }
        }

        return $next($request);
    }
}
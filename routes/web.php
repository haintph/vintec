<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController; // THÊM import này
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public routes - Client
Route::get('/', function () {
    return view('client.index');
})->name('home');

Route::get('/product', function () {
    return view('client.products.index');
})->name('products');

Route::get('/show', function () {
    return view('client.products.show');
})->name('product.show');

// Auth routes - SỬA: Bỏ route conflict
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Dashboard routes
Route::middleware(['auth'])->group(function () {
    // Main dashboard route - hiển thị dashboard theo role
    Route::get('/dashboard', function () {
        $user = auth()->user();
        if ($user->isAdmin()) {
            // Hiển thị dashboard admin trực tiếp tại /dashboard
            $totalUsers = \App\Models\User::count();
            $adminCount = \App\Models\User::where('role', 'admin')->count();
            $managerCount = \App\Models\User::where('role', 'manager')->count();
            
            return view('admin.index', compact('totalUsers', 'adminCount', 'managerCount'));
        } else {
            // Hiển thị dashboard manager trực tiếp tại /dashboard
            $managerCount = \App\Models\User::where('role', 'manager')->count();
            
            return view('admin.manager.index', compact('managerCount'));
        }
    })->name('dashboard');

    // Routes riêng biệt nếu cần (optional)
    Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard'])
        ->middleware('role:admin')->name('admin.dashboard');
    
    Route::get('/manager/dashboard', [DashboardController::class, 'managerDashboard'])
        ->middleware('role:manager')->name('manager.dashboard');
});

// User management routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('users', UserController::class);
});

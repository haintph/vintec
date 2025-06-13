<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('client.index');
});
Route::get('/product', function () {
    return view('client.products.index');
});
Route::get('/show', function () {
    return view('client.products.show');
});
Route::get('/dashboard', function () {
    return view('admin.index');
});
Route::get('/login', function () {
    return view('client.login.login');
});
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Dashboard routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        } else {
            return redirect()->route('manager.dashboard');
        }
    })->name('dashboard');

    Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard'])
        ->middleware('role:admin')->name('admin.dashboard');

    Route::get('/manager/dashboard', [DashboardController::class, 'managerDashboard'])
        ->middleware('role:manager')->name('manager.dashboard');

    Route::middleware(['role:admin'])->group(function () {
        // Category Management
        Route::get('category-list', [CategoryController::class, 'list'])->name('category-list');
        Route::get('category-create', [CategoryController::class, 'create'])->name('category-create');
        Route::post('category_store', [CategoryController::class, 'store'])->name('category_store');
        Route::get('category_edit/{id}', [CategoryController::class, 'edit'])->name('category_edit');
        Route::put('category_update/{id}', [CategoryController::class, 'update'])->name('category_update');
        Route::delete('/destroy/{id}', [CategoryController::class, 'destroy'])->name('destroy');
        Route::get('category_detail/{id}', [CategoryController::class, 'detail'])->name('category_detail');

        // Additional routes
        Route::post('category_toggle/{id}', [CategoryController::class, 'toggleStatus'])->name('category_toggle');
        Route::get('categories-active', [CategoryController::class, 'getActiveCategories'])->name('categories-active');
    });
});

//Category management routes

// User management routes
Route::middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
});
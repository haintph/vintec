<?php

use App\Http\Controllers\{AuthController, BannerController, BannerFooterController, BrandController, CategoryController, CategoryPostController, CategorySolutionController, ClientController, DashboardController, LogoController, PostController, UserController};
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [ClientController::class, 'index'])->name('home');
Route::get('/product', [ClientController::class, 'products'])->name('products');
Route::get('/blog', [ClientController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [ClientController::class, 'show'])->name('blog.show');
Route::get('/show', [ClientController::class, 'productShow'])->name('product.show');
// Auth routes
Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'showLoginForm')->name('login');
    Route::post('/login', 'login');
    Route::get('/register', 'showRegisterForm')->name('register');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout')->name('logout');
});

// Authenticated routes
Route::middleware('auth')->group(function () {
    // Main dashboard route
    Route::get('/dashboard', function () {
        $user = auth()->user();
        if ($user->isAdmin()) {
            $totalUsers = \App\Models\User::count();
            $adminCount = \App\Models\User::where('role', 'admin')->count();
            $managerCount = \App\Models\User::where('role', 'manager')->count();
            return view('admin.index', compact('totalUsers', 'adminCount', 'managerCount'));
        } else {
            $managerCount = \App\Models\User::where('role', 'manager')->count();
            return view('admin.manager.index', compact('managerCount'));
        }
    })->name('dashboard');

    // Optional dashboard routes
    Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard'])
        ->middleware('role:admin')->name('admin.dashboard');
    Route::get('/manager/dashboard', [DashboardController::class, 'managerDashboard'])
        ->middleware('role:manager')->name('manager.dashboard');
});

// Admin only routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    // User management
    Route::resource('users', UserController::class);

    // Category management
    Route::controller(CategoryController::class)->group(function () {
        Route::get('category-list', 'list')->name('category-list');
        Route::get('category-create', 'create')->name('category-create');
        Route::post('category_store', 'store')->name('category_store');
        Route::get('category_edit/{id}', 'edit')->name('category_edit');
        Route::put('category_update/{id}', 'update')->name('category_update');
        Route::delete('/destroy/{id}', 'destroy')->name('destroy');
        Route::get('category_detail/{id}', 'detail')->name('category_detail');
        Route::post('category_toggle/{id}', 'toggleStatus')->name('category_toggle');
        Route::get('categories-active', 'getActiveCategories')->name('categories-active');
    });
    //Brands
    Route::controller(BrandController::class)->group(function () {
        Route::get('brand-list', 'list')->name('brand-list');
        Route::get('brand-create', 'create')->name('brand-create');
        Route::post('brand_store', 'store')->name('brand_store');
        Route::get('brand_edit/{id}', 'edit')->name('brand_edit');
        Route::put('brand_update/{id}', 'update')->name('brand_update');
        Route::get('brand_detail/{id}', 'detail')->name('brand_detail');
        Route::delete('brand_destroy/{id}', 'destroy')->name('brand_destroy');
        Route::get('brands-active', 'getActiveBrands')->name('brands-active');
        Route::post('admin/brands/cleanup-all-images', [BrandController::class, 'cleanupAllImages'])->name('brands.cleanup-all');
    });
    // Trong routes/web.php
    Route::resource('banner-footers', BannerFooterController::class)->names([
        'index' => 'bannerfooters.index',
        'create' => 'bannerfooters.create',
        'store' => 'bannerfooters.store',
        'show' => 'bannerfooters.show',
        'edit' => 'bannerfooters.edit',
        'update' => 'bannerfooters.update',
        'destroy' => 'bannerfooters.destroy',
    ]);
    Route::patch('banners/{banner}/toggle-status', [BannerFooterController::class, 'toggleStatus'])->name('banners.toggle-status');
    Route::delete('banners/bulk-delete', [BannerFooterController::class, 'bulkDelete'])->name('banners.bulk-delete');
    Route::patch('banners/bulk-toggle', [BannerFooterController::class, 'bulkToggleStatus'])->name('banners.bulk-toggle');
    Route::get('api/banners', [BannerFooterController::class, 'api'])->name('banners.api');
    // categories blog
    Route::get('/categories_blog', [CategoryPostController::class, 'index'])->name('cate_blog.index');
    Route::get('/categories_blog/create', [CategoryPostController::class, 'create'])->name('cate_blog.create');
    Route::post('/categories_blog', [CategoryPostController::class, 'store'])->name('cate_blog.store');
    Route::get('/categories_blog/{category}/edit', [CategoryPostController::class, 'edit'])->name('cate_blog.edit');
    Route::put('/categories_blog/{category}', [CategoryPostController::class, 'update'])->name('cate_blog.update');
    Route::delete('/categories_blog/{category}', [CategoryPostController::class, 'destroy'])->name('cate_blog.destroy');
    // Tags
    Route::get('/tags', [TagController::class, 'index'])->name('admin.tags.index');
    Route::get('/tags/create', [TagController::class, 'create'])->name('admin.tags.create');
    Route::post('/tags', [TagController::class, 'store'])->name('admin.tags.store');
    Route::get('/tags/{tag}/edit', [TagController::class, 'edit'])->name('admin.tags.edit');
    Route::put('/tags/{tag}', [TagController::class, 'update'])->name('admin.tags.update');
    Route::delete('/tags/{tag}', [TagController::class, 'destroy'])->name('admin.tags.destroy');
    //Post
    Route::prefix('admin')->name('admin.')->group(function () {
        // Danh sách bài viết
        Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
        // Tạo mới
        Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
        Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
        // Chi tiết (nếu cần)
        Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
        // Sửa
        Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
        Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
        // Xóa
        Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
        // Toggle xuất bản
        Route::post('/posts/{post}/toggle-publish', [PostController::class, 'togglePublish'])->name('posts.togglePublish');
    });
    // Additional routes
    Route::post('category_toggle/{id}', [CategoryController::class, 'toggleStatus'])->name('category_toggle');
    Route::get('categories-active', [CategoryController::class, 'getActiveCategories'])->name('categories-active');

    // Logo Management
    Route::get('logo-list', [LogoController::class, 'list'])->name('logo-list');
    Route::get('logo-create', [LogoController::class, 'create'])->name('logo-create');
    Route::post('logo_store', [LogoController::class, 'store'])->name('logo_store');
    Route::get('logo_edit/{id}', [LogoController::class, 'edit'])->name('logo_edit');
    Route::put('logo_update/{id}', [LogoController::class, 'update'])->name('logo_update');
    Route::delete('logo_destroy/{id}', [LogoController::class, 'destroy'])->name('logo_destroy');
    Route::get('logo_detail/{id}', [LogoController::class, 'detail'])->name('logo_detail');

    // Banner Management
    Route::get('banner-list', [BannerController::class, 'list'])->name('banner-list');
    Route::get('banner-create', [BannerController::class, 'create'])->name('banner-create');
    Route::post('banner_store', [BannerController::class, 'store'])->name('banner-store');
    Route::get('banner_edit/{id}', [BannerController::class, 'edit'])->name('banner_edit');
    Route::put('banner_update/{id}', [BannerController::class, 'update'])->name('banner_update');
    Route::delete('banner_destroy/{id}', [BannerController::class, 'destroy'])->name('banner_destroy');
    Route::get('banner_detail/{id}', [BannerController::class, 'detail'])->name('banner_detail');

    Route::get('category-solution-list', [CategorySolutionController::class, 'list'])->name('category-solution-list');
    Route::get('category-solution-create', [CategorySolutionController::class, 'create'])->name('category-solution-create');
    Route::post('category_solution_store', [CategorySolutionController::class, 'store'])->name('category_solution_store');
    Route::get('category_solution_edit/{id}', [CategorySolutionController::class, 'edit'])->name('category_solution_edit');
    Route::put('category_solution_update/{id}', [CategorySolutionController::class, 'update'])->name('category_solution_update');
    Route::delete('category_solution_destroy/{id}', [CategorySolutionController::class, 'destroy'])->name('category_solution_destroy');
    Route::get('category_solution_detail/{id}', [CategorySolutionController::class, 'detail'])->name('category_solution_detail');

    // Additional route for toggle status
    Route::patch('category_solution_toggle_status/{id}', [CategorySolutionController::class, 'toggleStatus'])->name('category_solution_toggle_status');
    Route::post('category_solution_bulk_action', [CategorySolutionController::class, 'bulkAction'])->name('category_solution_bulk_action');
});

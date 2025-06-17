<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\Logo;
use App\Models\Banner;

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
        // Share logos to all views EXCEPT admin views
        View::composer(['layouts.*', 'components.*', 'pages.*'], function ($view) {
            $logos = [
                'main' => Logo::getByType('main'),
                'small' => Logo::getByType('small'),
                'dark' => Logo::getByType('dark'),
                'light' => Logo::getByType('light'),
                'favicon' => Logo::getByType('favicon')
            ];
            $view->with('logos', $logos);
        });

        View::composer(['layouts.*', 'pages.*', 'client.*'], function ($view) {
            try {
                $banners = Banner::where('status', true)
                                ->orderBy('created_at', 'desc')
                                ->limit(5)
                                ->get();
                
                $view->with('banners', $banners);
            } catch (\Exception $e) {
                // Fallback nếu bảng chưa tồn tại
                $view->with('banners', collect([]));
            }
        });
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Logo extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'type', 
        'name',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    // Các loại logo
    const TYPES = [
        'main' => 'Logo Chính',
        'small' => 'Logo Nhỏ',
        'dark' => 'Logo Tối', 
        'light' => 'Logo Sáng',
        'favicon' => 'Favicon'
    ];

    // Accessor để lấy URL image
    public function getImageUrlAttribute()
    {
        if ($this->image && Storage::disk('public')->exists($this->image)) {
            return asset('storage/' . $this->image);
        }
        return $this->getDefaultLogo();
    }

    // Get default logo dựa vào type
    private function getDefaultLogo()
    {
        $defaults = [
            'main' => '/admin/assets/images/logo-dark.png',
            'small' => '/admin/assets/images/logo-sm.png',
            'dark' => '/admin/assets/images/logo-dark.png',
            'light' => '/admin/assets/images/logo-light.png',
            'favicon' => '/admin/assets/images/favicon.ico'
        ];

        return asset($defaults[$this->type] ?? $defaults['main']);
    }

    // Static method để lấy logo theo type
    public static function getByType($type)
    {
        $logo = self::where('type', $type)->where('is_active', true)->first();
        
        if ($logo) {
            return $logo->image_url;
        }

        // Return default nếu không có logo
        $defaults = [
            'main' => '/admin/assets/images/logo-dark.png',
            'small' => '/admin/assets/images/logo-sm.png',
            'dark' => '/admin/assets/images/logo-dark.png',
            'light' => '/admin/assets/images/logo-light.png',
            'favicon' => '/admin/assets/images/favicon.ico'
        ];

        return asset($defaults[$type] ?? $defaults['main']);
    }
}
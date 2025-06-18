<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'status'
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    // Accessor để lấy full URL của image
    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
    }

    // Scope để lấy banner active
    public function scopeActive($query)
    {
        return $query->where('status', true);
    }

    protected static function boot()
    {
        parent::boot();

        // Clear các view đã cache khi banner thay đổi
        static::saved(function () {
            Artisan::call('view:clear');
        });

        static::deleted(function () {
            Artisan::call('view:clear');
        });
    }
}
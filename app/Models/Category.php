<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'img_category',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Auto generate slug khi tạo/update
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($category) {
            $category->slug = Str::slug($category->name);
        });
        
        static::updating(function ($category) {
            if ($category->isDirty('name')) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    // Accessor để lấy URL đầy đủ của image
    public function getImageUrlAttribute()
    {
        if ($this->img_category) {
            return asset('storage/' . $this->img_category);
        }
        return null;
    }

    // Scope để lấy categories active
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope để lấy categories inactive
    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    // Method để check status
    public function isActive()
    {
        return $this->is_active === true;
    }

    // Route model binding bằng slug
    public function getRouteKeyName()
    {
        return 'slug';
    }
}

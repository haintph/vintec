<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BannerFooter extends Model
{
    use HasFactory;

    /**
     * Tên bảng trong database
     */
    protected $table = 'banners_footer';

    /**
     * Các trường có thể mass assignment
     */
    protected $fillable = [
        'img_banner',
        'is_active'
    ];

    /**
     * Casting các thuộc tính
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Accessor để lấy URL đầy đủ của ảnh
     */
    public function getImageUrlAttribute()
    {
        if ($this->img_banner) {
            return Storage::url($this->img_banner);
        }
        return asset('images/no-image.png'); // Ảnh mặc định nếu không có
    }

    /**
     * Accessor để lấy đường dẫn đầy đủ của ảnh
     */
    public function getFullImagePathAttribute()
    {
        if ($this->img_banner) {
            return public_path('storage/' . $this->img_banner);
        }
        return null;
    }

    /**
     * Scope để lấy các banner đang hoạt động
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope để lấy các banner không hoạt động
     */
    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    /**
     * Scope để sắp xếp theo thời gian tạo mới nhất
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Scope để sắp xếp theo thời gian tạo cũ nhất
     */
    public function scopeOldest($query)
    {
        return $query->orderBy('created_at', 'asc');
    }

    /**
     * Boot method để xử lý events
     */
    protected static function boot()
    {
        parent::boot();

        // Tự động xóa file ảnh khi xóa record
        static::deleting(function ($banner) {
            if ($banner->img_banner && Storage::disk('public')->exists($banner->img_banner)) {
                Storage::disk('public')->delete($banner->img_banner);
            }
        });
    }

    /**
     * Method để lấy trạng thái dạng text
     */
    public function getStatusTextAttribute()
    {
        return $this->is_active ? 'Hoạt động' : 'Không hoạt động';
    }

    /**
     * Method để lấy class CSS cho trạng thái
     */
    public function getStatusClassAttribute()
    {
        return $this->is_active ? 'badge bg-success' : 'badge bg-secondary';
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'color_code',
        'image',
        'price',
        'is_active'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    /**
     * Relationship với Product
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Accessor để lấy URL ảnh đầy đủ
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return asset('images/no-image.png');
        }

        // Nếu là URL đầy đủ (external)
        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        // Nếu là file local
        return Storage::url($this->image);
    }

    /**
     * Accessor để format giá tiền
     */
    public function getFormattedPriceAttribute()
    {
        return number_format($this->price, 0, ',', '.') . ' VNĐ';
    }

    /**
     * Scope để lấy các biến thể đang hoạt động
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope để sắp xếp theo tên
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('name');
    }
}

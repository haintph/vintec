<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_code',
        'name',
        'slug',
        'image', // Giữ lại cho backward compatibility
        'is_active',
        'description',
        'specs',
        'price', // ✅ Thêm giá
        'category_id',
        'meta_title',
        'meta_description',
        'meta_keywords'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2', // ✅ Ép kiểu để xử lý số tiền chính xác
    ];

    // ==================== RELATIONSHIPS ====================
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->ordered();
    }

    public function primaryImage()
    {
        return $this->hasOne(ProductImage::class)->where('is_primary', true);
    }

    /**
     * ✅ Relationship với ProductVariant
     */
    public function variants()
    {
        return $this->hasMany(ProductVariant::class)->orderBy('name');
    }

    /**
     * ✅ Relationship với ProductVariant đang hoạt động
     */
    public function activeVariants()
    {
        return $this->hasMany(ProductVariant::class)->where('is_active', true)->orderBy('name');
    }

    // ==================== MUTATORS ====================
    
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = $this->generateUniqueSlug($value);
    }

    // Generate unique slug
    private function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;

        while (static::where('slug', $slug)->where('id', '!=', $this->id ?? 0)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    // ==================== ACCESSORS ====================
    
    public function getImageUrlAttribute()
    {
        if ($this->primaryImage) {
            return $this->primaryImage->image_url;
        }

        if ($this->images->count() > 0) {
            return $this->images->first()->image_url;
        }

        return $this->image ? asset('storage/products/' . $this->image) : asset('images/no-image.png');
    }

    public function getMetaTitleAttribute($value)
    {
        return $value ?: $this->name;
    }

    public function getMetaDescriptionAttribute($value)
    {
        return $value ?: Str::limit(strip_tags($this->description), 160);
    }

    // (Tuỳ chọn) Accessor hiển thị giá định dạng đẹp
    public function getFormattedPriceAttribute()
    {
        return number_format($this->price, 0, ',', '.') . ' ₫';
    }

    /**
     * ✅ Lấy giá thấp nhất (so sánh giá gốc và giá biến thể)
     */
    public function getMinPriceAttribute()
    {
        if (!$this->relationLoaded('variants')) {
            $this->load('variants');
        }
        
        $variantPrices = $this->variants->pluck('price');
        $allPrices = $variantPrices->push($this->price);
        return $allPrices->min();
    }

    /**
     * ✅ Lấy giá cao nhất (so sánh giá gốc và giá biến thể)
     */
    public function getMaxPriceAttribute()
    {
        if (!$this->relationLoaded('variants')) {
            $this->load('variants');
        }
        
        $variantPrices = $this->variants->pluck('price');
        $allPrices = $variantPrices->push($this->price);
        return $allPrices->max();
    }

    /**
     * ✅ Hiển thị khoảng giá hoặc giá cố định
     */
    public function getPriceRangeAttribute()
    {
        if (!$this->hasVariants()) {
            return number_format($this->price, 0, ',', '.') . ' ₫';
        }

        $min = $this->min_price;
        $max = $this->max_price;

        if ($min == $max) {
            return number_format($min, 0, ',', '.') . ' ₫';
        }

        return number_format($min, 0, ',', '.') . ' - ' . number_format($max, 0, ',', '.') . ' ₫';
    }

    /**
     * ✅ Khoảng giá với format ngắn gọn
     */
    public function getPriceRangeShortAttribute()
    {
        if (!$this->hasVariants()) {
            return $this->formatted_price;
        }

        $min = $this->min_price;
        $max = $this->max_price;

        if ($min == $max) {
            return number_format($min, 0, ',', '.') . '₫';
        }

        return number_format($min, 0, ',', '.') . ' - ' . number_format($max, 0, ',', '.') . '₫';
    }

    // ==================== SCOPES ====================
    
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('product_code', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        });
    }

    public function scopeByCategory($query, $categoryId)
    {
        if ($categoryId) {
            return $query->where('category_id', $categoryId);
        }
        return $query;
    }

    /**
     * ✅ Scope lấy sản phẩm có biến thể
     */
    public function scopeWithVariants($query)
    {
        return $query->whereHas('variants');
    }

    /**
     * ✅ Scope lấy sản phẩm trong khoảng giá
     */
    public function scopePriceRange($query, $minPrice = null, $maxPrice = null)
    {
        if ($minPrice) {
            $query->where(function ($q) use ($minPrice) {
                $q->where('price', '>=', $minPrice)
                  ->orWhereHas('variants', function ($vq) use ($minPrice) {
                      $vq->where('price', '>=', $minPrice);
                  });
            });
        }

        if ($maxPrice) {
            $query->where(function ($q) use ($maxPrice) {
                $q->where('price', '<=', $maxPrice)
                  ->orWhereHas('variants', function ($vq) use ($maxPrice) {
                      $vq->where('price', '<=', $maxPrice);
                  });
            });
        }

        return $query;
    }

    // ==================== HELPER METHODS ====================

    /**
     * ✅ Kiểm tra sản phẩm có biến thể không
     */
    public function hasVariants()
    {
        if (!$this->relationLoaded('variants')) {
            return $this->variants()->count() > 0;
        }
        return $this->variants->count() > 0;
    }

    /**
     * ✅ Lấy biến thể rẻ nhất
     */
    public function getCheapestVariant()
    {
        return $this->variants()->orderBy('price')->first();
    }

    /**
     * ✅ Lấy biến thể đắt nhất
     */
    public function getMostExpensiveVariant()
    {
        return $this->variants()->orderBy('price', 'desc')->first();
    }

    /**
     * ✅ Lấy số lượng biến thể
     */
    public function getVariantsCountAttribute()
    {
        if (!$this->relationLoaded('variants')) {
            return $this->variants()->count();
        }
        return $this->variants->count();
    }

    /**
     * ✅ Lấy danh sách màu sắc từ biến thể
     */
    public function getAvailableColorsAttribute()
    {
        if (!$this->relationLoaded('activeVariants')) {
            $this->load('activeVariants');
        }
        
        return $this->activeVariants->pluck('name', 'color_code')->toArray();
    }

    /**
     * ✅ Lấy biến thể theo màu
     */
    public function getVariantByColor($colorName)
    {
        return $this->variants()->where('name', $colorName)->first();
    }

    /**
     * ✅ Lấy URL ảnh đại diện (ưu tiên biến thể)
     */
    public function getDisplayImageUrlAttribute()
    {
        // Ưu tiên ảnh của biến thể đầu tiên có ảnh
        $variantWithImage = $this->activeVariants()->whereNotNull('image')->first();
        if ($variantWithImage) {
            return $variantWithImage->image_url;
        }

        // Fallback về ảnh chính của sản phẩm
        return $this->image_url;
    }

    /**
     * ✅ Kiểm tra có variant nào active không
     */
    public function hasActiveVariants()
    {
        return $this->activeVariants()->count() > 0;
    }

    /**
     * ✅ Tổng số màu sắc available
     */
    public function getTotalColorsAttribute()
    {
        return $this->activeVariants()->count();
    }
}
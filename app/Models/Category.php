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

    // ==================== RELATIONSHIPS ====================

    /**
     * ✅ Relationship với Product - QUAN TRỌNG để filter hoạt động
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * ✅ Relationship với Product đang active
     */
    public function activeProducts()
    {
        return $this->hasMany(Product::class)->where('is_active', true);
    }

    // ==================== ACCESSORS ====================

    // Accessor để lấy URL đầy đủ của image
    public function getImageUrlAttribute()
    {
        if ($this->img_category) {
            return asset('storage/' . $this->img_category);
        }
        return asset('images/no-category.png'); // Default image
    }

    /**
     * ✅ Đếm số sản phẩm active trong category
     */
    public function getProductsCountAttribute()
    {
        return $this->activeProducts()->count();
    }

    /**
     * ✅ Đếm tổng số sản phẩm (bao gồm inactive)
     */
    public function getTotalProductsCountAttribute()
    {
        return $this->products()->count();
    }

    // ==================== SCOPES ====================

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

    /**
     * ✅ Scope lấy categories có sản phẩm
     */
    public function scopeWithProducts($query)
    {
        return $query->whereHas('activeProducts');
    }

    /**
     * ✅ Scope lấy categories có ít nhất X sản phẩm
     */
    public function scopeWithMinProducts($query, $minCount = 1)
    {
        return $query->whereHas('activeProducts', function ($q) use ($minCount) {
            // This will be processed at database level
        })->having(\DB::raw('(SELECT COUNT(*) FROM products WHERE category_id = categories.id AND is_active = 1)'), '>=', $minCount);
    }

    // ==================== HELPER METHODS ====================

    // Method để check status
    public function isActive()
    {
        return $this->is_active === true;
    }

    /**
     * ✅ Kiểm tra category có sản phẩm không
     */
    public function hasProducts()
    {
        return $this->products()->count() > 0;
    }

    /**
     * ✅ Kiểm tra category có sản phẩm active không
     */
    public function hasActiveProducts()
    {
        return $this->activeProducts()->count() > 0;
    }

    /**
     * ✅ Lấy sản phẩm nổi bật (featured) của category
     */
    public function getFeaturedProducts($limit = 4)
    {
        return $this->activeProducts()
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * ✅ Lấy sản phẩm mới nhất của category
     */
    public function getLatestProducts($limit = 10)
    {
        return $this->activeProducts()
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * ✅ Lấy sản phẩm bán chạy (có thể implement sau)
     */
    public function getBestSellingProducts($limit = 10)
    {
        return $this->activeProducts()
            ->orderBy('view_count', 'desc') // Giả sử có trường view_count
            ->limit($limit)
            ->get();
    }

    /**
     * ✅ Lấy khoảng giá của sản phẩm trong category
     */
    public function getPriceRangeAttribute()
    {
        $products = $this->activeProducts;

        if ($products->isEmpty()) {
            return null;
        }

        $prices = $products->pluck('price');
        $minPrice = $prices->min();
        $maxPrice = $prices->max();

        if ($minPrice == $maxPrice) {
            return number_format($minPrice, 0, ',', '.') . '₫';
        }

        return number_format($minPrice, 0, ',', '.') . ' - ' . number_format($maxPrice, 0, ',', '.') . '₫';
    }

    // Route model binding bằng slug
    public function getRouteKeyName()
    {
        return 'slug';
    }
}

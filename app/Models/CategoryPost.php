<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CategoryPost extends Model
{
    use HasFactory;

    protected $table = 'categories_post';

    // ✅ THÊM TẤT CẢ CÁC TRƯỜNG CẦN THIẾT VÀO FILLABLE
    protected $fillable = [
        'name',
        'slug',
        'description',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'canonical_url'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the posts for the category.
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'category_id');
    }

    /**
     * Get published posts for the category.
     */
    public function publishedPosts(): HasMany
    {
        return $this->hasMany(Post::class, 'category_id')
            ->published();
    }

    // ✅ THAY ĐỔI ROUTE KEY VỀ 'id' THAY VÌ 'slug'
    // Vì route của bạn đang dùng ID: /categories_blog/1
    public function getRouteKeyName()
    {
        return 'id';  // Thay đổi từ 'slug' thành 'id'
    }

    /**
     * Get post count attribute
     */
    public function getPostCountAttribute()
    {
        return $this->posts()->count();
    }

    /**
     * Get published post count attribute
     */
    public function getPublishedPostCountAttribute()
    {
        return $this->publishedPosts()->count();
    }
}

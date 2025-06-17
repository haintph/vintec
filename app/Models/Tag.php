<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    // Cho phép gán hàng loạt các trường, bao gồm cả SEO
    protected $fillable = [
        'name',
        'slug',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'canonical_url',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The posts that belong to the tag.
     */
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_tag')
            ->withTimestamps();
    }

    /**
     * Get published posts for the tag.
     */
    public function publishedPosts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_tag')
            ->published()
            ->withTimestamps();
    }

    /**
     * Get the route key for the model (for route model binding).
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get the count of all posts associated with the tag.
     */
    public function getPostCountAttribute()
    {
        return $this->posts()->count();
    }

    /**
     * Get the count of published posts associated with the tag.
     */
    public function getPublishedPostCountAttribute()
    {
        return $this->publishedPosts()->count();
    }
}

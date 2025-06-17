<?php
// app/Models/Post.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'canonical_url',
        'category_id',
        'thumbnail',
        'is_published',
        'published_at',
        'views',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'views' => 'integer',
    ];

    protected $dates = [
        'published_at',
    ];

    // Auto-generate slug from title when creating
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }

            // Set published_at to now if not set and is_published is true
            if ($post->is_published && empty($post->published_at)) {
                $post->published_at = now();
            }
        });

        static::updating(function ($post) {
            // Auto-update slug if title changed and slug is empty
            if ($post->isDirty('title') && empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });
    }

    // Relationships
    public function category()
    {
        return $this->belongsTo(CategoryPost::class, 'category_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tag')
            ->withTimestamps();
    }

    public function scopeDraft($query)
    {
        return $query->where('is_published', false);
    }

    public function scopeByCategory($query, $categorySlug)
    {
        return $query->whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        });
    }

    public function scopeByTag($query, $tagSlug)
    {
        return $query->whereHas('tags', function ($q) use ($tagSlug) {
            $q->where('slug', $tagSlug);
        });
    }

    // Accessors
    public function getExcerptAttribute($value)
    {
        if ($value) {
            return $value;
        }

        // Auto-generate excerpt from content if not set
        return Str::limit(strip_tags($this->content), 200);
    }

    public function getThumbnailUrlAttribute()
    {
        if ($this->thumbnail) {
            return asset('storage/' . $this->thumbnail);
        }

        return asset('images/blog-placeholder.jpg');
    }

    public function getReadingTimeAttribute()
    {
        $wordCount = str_word_count(strip_tags($this->content));
        $readingTime = ceil($wordCount / 200); // Assuming 200 words per minute

        return $readingTime . ' phút đọc';
    }

    // Route model binding by slug
    public function getRouteKeyName()
    {
        return 'slug';
    }
     public function scopePublished($query)
    {
        return $query->where('is_published', true)
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    /**
     * Scope để sắp xếp theo thời gian publish
     */
    public function scopeLatestPublished($query)
    {
        return $query->orderBy('published_at', 'desc');
    }

    /**
     * Scope để sắp xếp theo thời gian publish cũ nhất
     */
    public function scopeOldestPublished($query)
    {
        return $query->orderBy('published_at', 'asc');
    }

    /**
     * Accessor để lấy ngày hiển thị (ưu tiên published_at)
     */
    public function getDisplayDateAttribute()
    {
        return $this->published_at ?: $this->created_at;
    }
}

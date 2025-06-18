<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Solution extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'category_solution_id',
        'user_id',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'canonical_url',
        'status',
        'published_at',
        'is_featured',
        'allow_comments',
        'view_count',
        'like_count',
        'comment_count',
        'sort_order',
        'additional_data'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'allow_comments' => 'boolean',
        'view_count' => 'integer',
        'like_count' => 'integer',
        'comment_count' => 'integer',
        'sort_order' => 'integer',
        'additional_data' => 'array'
    ];

    protected $dates = [
        'published_at'
    ];

    /**
     * Relationship with CategorySolution (Many-to-One)
     */
    public function categorySolution(): BelongsTo
    {
        return $this->belongsTo(CategorySolution::class, 'category_solution_id');
    }

    /**
     * Relationship with User (Author)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship with TagSolution (Many-to-Many)
     */
    public function tagSolutions(): BelongsToMany
    {
        return $this->belongsToMany(TagSolution::class, 'solution_tag_solution')
                    ->withTimestamps();
    }

    /**
     * Scope for published solutions
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->where('published_at', '<=', now());
    }

    /**
     * Scope for draft solutions
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    /**
     * Scope for featured solutions
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope for solutions by category
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_solution_id', $categoryId);
    }

    /**
     * Scope for solutions by tag
     */
    public function scopeByTag($query, $tagId)
    {
        return $query->whereHas('tagSolutions', function ($q) use ($tagId) {
            $q->where('tag_solution_id', $tagId);
        });
    }

    /**
     * Scope for search
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'LIKE', "%{$search}%")
              ->orWhere('excerpt', 'LIKE', "%{$search}%")
              ->orWhere('content', 'LIKE', "%{$search}%");
        });
    }

    /**
     * Auto generate slug from title
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($solution) {
            if (empty($solution->slug)) {
                $solution->slug = static::generateUniqueSlug($solution->title);
            }
        });

        static::updating(function ($solution) {
            if ($solution->isDirty('title') && empty($solution->getOriginal('slug'))) {
                $solution->slug = static::generateUniqueSlug($solution->title);
            }
        });
    }

    /**
     * Generate unique slug
     */
    public static function generateUniqueSlug($title, $id = null)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while (static::where('slug', $slug)->where('id', '!=', $id)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Get the route key for the model
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get reading time estimate
     */
    public function getReadingTimeAttribute()
    {
        $wordsPerMinute = 200;
        $wordCount = str_word_count(strip_tags($this->content));
        $readingTime = ceil($wordCount / $wordsPerMinute);
        
        return $readingTime;
    }

    /**
     * Get excerpt with fallback
     */
    public function getExcerptAttribute($value)
    {
        if ($value) {
            return $value;
        }

        // Generate excerpt from content if not provided
        return Str::limit(strip_tags($this->content), 160);
    }

    /**
     * Get meta title with fallback
     */
    public function getMetaTitleAttribute($value)
    {
        return $value ?: $this->title;
    }

    /**
     * Get canonical URL with fallback
     */
    public function getCanonicalUrlAttribute($value)
    {
        return $value ?: url("/solution/{$this->slug}");
    }

    /**
     * Check if solution is published
     */
    public function isPublished()
    {
        return $this->status === 'published' && 
               $this->published_at && 
               $this->published_at <= now();
    }

    /**
     * Check if solution is scheduled
     */
    public function isScheduled()
    {
        return $this->status === 'scheduled' ||
               ($this->status === 'published' && $this->published_at > now());
    }

    /**
     * Increment view count
     */
    public function incrementViewCount()
    {
        $this->increment('view_count');
    }

    /**
     * Get status badge class
     */
    public function getStatusBadgeClass()
    {
        return match($this->status) {
            'published' => 'bg-success',
            'draft' => 'bg-secondary',
            'scheduled' => 'bg-warning',
            'archived' => 'bg-dark',
            default => 'bg-secondary'
        };
    }

    /**
     * Get status label
     */
    public function getStatusLabel()
    {
        return match($this->status) {
            'published' => 'Đã xuất bản',
            'draft' => 'Bản nháp',
            'scheduled' => 'Đã lên lịch',
            'archived' => 'Đã lưu trữ',
            default => 'Không xác định'
        };
    }
}
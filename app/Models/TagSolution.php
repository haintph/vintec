<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Str;

class TagSolution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug', 
        'description',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'canonical_url',
        'sort_order',
        'is_active',
        'post_count'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'post_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Boot method - auto generate slug
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($tag) {
            if (empty($tag->slug)) {
                $tag->slug = Str::slug($tag->name);
                
                // Ensure unique slug
                $originalSlug = $tag->slug;
                $counter = 1;
                while (static::where('slug', $tag->slug)->exists()) {
                    $tag->slug = $originalSlug . '-' . $counter;
                    $counter++;
                }
            }
        });

        static::updating(function ($tag) {
            if ($tag->isDirty('name') && empty($tag->slug)) {
                $tag->slug = Str::slug($tag->name);
                
                // Ensure unique slug (excluding current record)
                $originalSlug = $tag->slug;
                $counter = 1;
                while (static::where('slug', $tag->slug)->where('id', '!=', $tag->id)->exists()) {
                    $tag->slug = $originalSlug . '-' . $counter;
                    $counter++;
                }
            }
        });
    }

    /**
     * Scope for active tags
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for search
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function($q) use ($search) {
            $q->where('name', 'LIKE', "%{$search}%")
              ->orWhere('description', 'LIKE', "%{$search}%")
              ->orWhere('meta_title', 'LIKE', "%{$search}%")
              ->orWhere('meta_description', 'LIKE', "%{$search}%")
              ->orWhere('meta_keywords', 'LIKE', "%{$search}%")
              ->orWhere('slug', 'LIKE', "%{$search}%");
        });
    }

    /**
     * Get the URL for this tag
     */
    public function getUrlAttribute()
    {
        return url("/tag/{$this->slug}");
    }

    /**
     * Get formatted meta title
     */
    public function getFormattedMetaTitleAttribute()
    {
        return $this->meta_title ?: $this->name;
    }

    /**
     * Get formatted meta description
     */
    public function getFormattedMetaDescriptionAttribute()
    {
        return $this->meta_description ?: Str::limit($this->description, 160);
    }

    /**
     * Relationship with Solution (Many-to-Many)
     */
    public function solutions(): BelongsToMany
    {
        return $this->belongsToMany(Solution::class, 'solution_tag_solution')
                    ->withTimestamps();
    }

    /**
     * Get published solutions
     */
    public function publishedSolutions(): BelongsToMany
    {
        return $this->solutions()->published();
    }

    /**
     * Update post count
     */
    public function updatePostCount()
    {
        $this->update(['post_count' => $this->solutions()->published()->count()]);
    }
}
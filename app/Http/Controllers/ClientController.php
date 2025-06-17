<?php

namespace App\Http\Controllers;

use App\Models\BannerFooter;
use App\Models\Brand;
use App\Models\CategoryPost;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class ClientController extends Controller
{
    public function index()
    {
        // Lấy brands active để hiển thị trên trang chủ
        $brands = Brand::whereNotNull('image')
            ->take(6) // Lấy 6 brands
            ->get();

        // Lấy banner footer active để hiển thị
        $banners = BannerFooter::active()->latest()->get();

        // Lấy bài viết blog mới nhất để hiển thị trên trang chủ (chỉ bài viết đã publish)
        $latestPosts = Post::with(['category', 'tags'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->take(6) // Lấy 6 bài viết mới nhất
            ->get();

        return view('client.index', compact('brands', 'banners', 'latestPosts'));
    }

    public function products()
    {
        return view('client.products.index');
    }

    public function productShow()
    {
        return view('client.products.show');
    }

    public function blog(Request $request)
    {
        // Build query with relationships
        $query = Post::with(['category', 'tags']);

        // Filter published posts only
        $query->where('is_published', true)
              ->whereNotNull('published_at')
              ->where('published_at', '<=', now());

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->get('category'));
            });
        }

        // Tag filter
        if ($request->filled('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->get('tag'));
            });
        }

        // Sort options (dùng published_at thay vì created_at)
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'oldest':
                $query->orderBy('published_at', 'asc');
                break;
            case 'popular':
                $query->orderBy('views', 'desc');
                break;
            case 'latest':
            default:
                $query->orderBy('published_at', 'desc');
                break;
        }

        // Paginate and preserve query parameters
        $posts = $query->paginate(12)->appends(request()->query());

        // Get categories for filter dropdown
        $categories = $this->getCategories();

        // Get tags for filter dropdown
        $tags = $this->getTags();

        return view('client.blog.index', compact('posts', 'categories', 'tags'));
    }

    public function show($slug)
    {
        try {
            // Lấy bài viết - chỉ bài viết đã publish
            $post = Post::with(['category', 'tags'])
                ->where('is_published', true)
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->where('slug', $slug)
                ->firstOrFail();

            // Tăng lượt xem nếu có field views
            try {
                if (Schema::hasColumn('posts', 'views')) {
                    $post->increment('views');
                }
            } catch (\Exception $e) {
                // Bỏ qua nếu không có field views
            }

            // Lấy bài viết liên quan
            $relatedPosts = collect();

            // 1. Lấy bài viết cùng category trước (chỉ bài viết đã publish)
            if ($post->category_id) {
                $relatedPosts = Post::with(['category', 'tags'])
                    ->where('is_published', true)
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now())
                    ->where('category_id', $post->category_id)
                    ->where('id', '!=', $post->id)
                    ->orderBy('published_at', 'desc')
                    ->take(3)
                    ->get();
            }

            // 2. Nếu chưa đủ, lấy bài viết có cùng tags
            if ($relatedPosts->count() < 3 && $post->tags->count() > 0) {
                $tagIds = $post->tags->pluck('id');

                $additionalPosts = Post::with(['category', 'tags'])
                    ->where('is_published', true)
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now())
                    ->whereHas('tags', function ($query) use ($tagIds) {
                        $query->whereIn('tags.id', $tagIds);
                    })
                    ->where('id', '!=', $post->id)
                    ->whereNotIn('id', $relatedPosts->pluck('id'))
                    ->orderBy('published_at', 'desc')
                    ->take(3 - $relatedPosts->count())
                    ->get();

                $relatedPosts = $relatedPosts->merge($additionalPosts);
            }

            // 3. Nếu vẫn chưa đủ, lấy bài viết mới nhất (chỉ bài viết đã publish)
            if ($relatedPosts->count() < 3) {
                $latestPosts = Post::with(['category', 'tags'])
                    ->where('is_published', true)
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now())
                    ->where('id', '!=', $post->id)
                    ->whereNotIn('id', $relatedPosts->pluck('id'))
                    ->orderBy('published_at', 'desc')
                    ->take(3 - $relatedPosts->count())
                    ->get();

                $relatedPosts = $relatedPosts->merge($latestPosts);
            }

            return view('client.blog.show', compact('post', 'relatedPosts'));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            abort(404, 'Bài viết không tồn tại');
        } catch (\Exception $e) {
            Log::error('Error in blog show method: ' . $e->getMessage());
            abort(500, 'Có lỗi xảy ra khi tải bài viết');
        }
    }

    // Helper methods - THÊM CÁC METHOD NÀY
    private function getCategories()
    {
        try {
            // Sử dụng CategoryPost model như bạn đã có
            return CategoryPost::all();
        } catch (\Exception $e) {
            Log::error('Error getting categories: ' . $e->getMessage());
            return collect();
        }
    }

    private function getTags()
    {
        try {
            // Sử dụng Tag model
            return Tag::all();
        } catch (\Exception $e) {
            Log::error('Error getting tags: ' . $e->getMessage());
            return collect();
        }
    }

    // Thêm các method cho category và tag pages
    public function category(Request $request, $categorySlug)
    {
        try {
            // Find category
            $category = CategoryPost::where('slug', $categorySlug)->firstOrFail();
            
            // Get posts in this category (chỉ bài viết đã publish)
            $query = Post::with(['category', 'tags'])
                ->where('is_published', true)
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->where('category_id', $category->id);

            // Apply search if provided
            if ($request->filled('search')) {
                $search = $request->get('search');
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            }

            // Sort
            $sortBy = $request->get('sort', 'latest');
            switch ($sortBy) {
                case 'oldest':
                    $query->orderBy('published_at', 'asc');
                    break;
                case 'popular':
                    $query->orderBy('views', 'desc');
                    break;
                case 'latest':
                default:
                    $query->orderBy('published_at', 'desc');
                    break;
            }

            $posts = $query->paginate(12)->appends(request()->query());

            return view('client.blog.category', compact('posts', 'category'));
        } catch (\Exception $e) {
            Log::error('Error in category method: ' . $e->getMessage());
            abort(404, 'Danh mục không tồn tại');
        }
    }

    public function tag(Request $request, $tagSlug)
    {
        try {
            // Find tag
            $tag = Tag::where('slug', $tagSlug)->firstOrFail();
            
            // Get posts with this tag (chỉ bài viết đã publish)
            $query = Post::with(['category', 'tags'])
                ->where('is_published', true)
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->whereHas('tags', function ($q) use ($tagSlug) {
                    $q->where('slug', $tagSlug);
                });

            // Apply search if provided
            if ($request->filled('search')) {
                $search = $request->get('search');
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            }

            // Sort
            $sortBy = $request->get('sort', 'latest');
            switch ($sortBy) {
                case 'oldest':
                    $query->oldest();
                    break;
                case 'popular':
                    $query->orderBy('views', 'desc');
                    break;
                case 'latest':
                default:
                    $query->latest();
                    break;
            }

            $posts = $query->paginate(12)->appends(request()->query());

            return view('client.blog.tag', compact('posts', 'tag'));
        } catch (\Exception $e) {
            Log::error('Error in tag method: ' . $e->getMessage());
            abort(404, 'Thẻ không tồn tại');
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\BannerFooter;
use App\Models\Brand;
use App\Models\Category;
use App\Models\CategoryPost;
use App\Models\Post;
use App\Models\Product;
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
        $banners = Banner::active()->latest()->get();
        $bannerFooter = BannerFooter::active()->latest()->get();

        // Lấy bài viết blog mới nhất để hiển thị trên trang chủ (chỉ bài viết đã publish)
        $latestPosts = Post::with(['category', 'tags'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->take(3) // Lấy 3 bài viết mới nhất
            ->get();

        // Lấy các sản phẩm featured/nổi bật để hiển thị trên trang chủ
        $featuredProducts = Product::with(['category', 'primaryImage'])
            ->active() // Chỉ lấy sản phẩm active
            ->latest() // Sắp xếp theo mới nhất
            ->take(8) // Lấy 8 sản phẩm (có thể điều chỉnh số lượng)
            ->get();

        return view('client.index', compact('brands', 'banners', 'latestPosts', 'bannerFooter', 'featuredProducts'));
    }
    public function products(Request $request)
    {
        // Get all categories for filters
        $categories = Category::where('is_active', true)->get();

        // Base query for products
        $query = Product::with(['category', 'variants'])
            ->where('is_active', true);

        // Apply category filter
        if ($request->has('category') && !empty($request->category)) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Apply price range filter (presets) - Updated for VND
        if ($request->has('price_range') && !empty($request->price_range)) {
            switch ($request->price_range) {
                // New VND price ranges
                case '0-1000000':
                case 'under_1m':
                    $query->where('price', '<', 1000000); // Dưới 1 triệu
                    break;
                case '1000000-5000000':
                case '1m_5m':
                    $query->whereBetween('price', [1000000, 5000000]); // 1-5 triệu
                    break;
                case '5000000-10000000':
                case '5m_10m':
                    $query->whereBetween('price', [5000000, 10000000]); // 5-10 triệu
                    break;
                case '10000000-20000000':
                case '10m_20m':
                    $query->whereBetween('price', [10000000, 20000000]); // 10-20 triệu
                    break;
                case '20000000-999999999':
                case 'over_20m':
                    $query->where('price', '>', 20000000); // Trên 20 triệu
                    break;

                // Legacy USD ranges (for backward compatibility)
                case '0-100':
                case 'under_100':
                    $query->where('price', '<', 100);
                    break;
                case '100-500':
                    $query->whereBetween('price', [100, 500]);
                    break;
                case '500-1000':
                    $query->whereBetween('price', [500, 1000]);
                    break;
                case '1000-999999':
                case 'over_1000':
                    $query->where('price', '>', 1000);
                    break;
            }
        }

        // Apply custom price range filter (from sliders)
        if ($request->has('min_price') && !empty($request->min_price)) {
            $minPrice = is_numeric($request->min_price) ? (int)$request->min_price : 0;
            if ($minPrice >= 0) {
                $query->where('price', '>=', $minPrice);
            }
        }

        if ($request->has('max_price') && !empty($request->max_price)) {
            $maxPrice = is_numeric($request->max_price) ? (int)$request->max_price : 20000000;
            if ($maxPrice > 0) {
                $query->where('price', '<=', $maxPrice);
            }
        }

        // Apply search filter
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('product_code', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('description', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Apply sorting
        $sortBy = $request->get('sort', 'name_asc');
        switch ($sortBy) {
            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('name', 'asc');
                break;
        }

        // Paginate results
        $products = $query->paginate(12)->appends($request->query());

        // Handle AJAX requests
        if ($request->ajax() || $request->has('ajax')) {
            return response()->json([
                'success' => true,
                'html' => view('client.products.partials.products-grid', compact('products'))->render(),
                'pagination' => view('client.products.partials.pagination', compact('products'))->render(),
                'count' => $products->count(),
                'total' => $products->total(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'filters' => $request->only(['category', 'price_range', 'search', 'sort', 'min_price', 'max_price'])
            ]);
        }

        // Regular page load
        return view('client.products.index', compact('products', 'categories'));
    }

    // public function show($slug)
    // {
    //     $product = Product::with(['category', 'variants'])
    //         ->where('slug', $slug)
    //         ->where('is_active', true)
    //         ->firstOrFail();

    //     // Get related products from same category
    //     $relatedProducts = Product::with(['category', 'variants'])
    //         ->where('category_id', $product->category_id)
    //         ->where('id', '!=', $product->id)
    //         ->where('is_active', true)
    //         ->limit(4)
    //         ->get();

    //     return view('client.products.show', compact('product', 'relatedProducts'));
    // }

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
    public function showProduct($slug)
    {
        try {
            $product = Product::with(['category', 'primaryImage', 'images'])
                ->where('slug', $slug)
                ->active()
                ->firstOrFail();

            $relatedProducts = Product::with(['category', 'primaryImage'])
                ->where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->active()
                ->latest()
                ->take(4)
                ->get();

            return view('client.products.show', compact('product', 'relatedProducts'));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            abort(404, 'Sản phẩm không tồn tại');
        } catch (\Exception $e) {
            Log::error('Error in product show method: ' . $e->getMessage());
            abort(500, 'Có lỗi xảy ra khi tải sản phẩm');
        }
    }
}

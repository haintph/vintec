<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\BannerFooter;
use App\Models\Brand;
use App\Models\Category;
use App\Models\CategoryPost;
use App\Models\CategorySolution;
use App\Models\Post;
use App\Models\Product;
use App\Models\Solution;
use App\Models\Tag;
use App\Models\TagSolution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

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
            ->take(6) // Lấy 6 bài viết mới nhất
            ->get();

        // === THÊM SOLUTIONS ===

        $publishedSolutions = Solution::with(['categorySolution', 'tagSolutions', 'user'])
            ->published()
            ->orderBy('sort_order')
            ->orderBy('published_at', 'desc')
            ->take(6)
            ->get();

        // dd('Published Solutions count:', $publishedSolutions->count(), 'Data:', $publishedSolutions);

        // Nếu bạn muốn có thêm featured solutions riêng (4 cái nổi bật)
        $featuredSolutions = Solution::with(['categorySolution', 'tagSolutions', 'user'])
            ->published()
            ->featured() // Thêm scope featured nếu cần solutions nổi bật
            ->orderBy('sort_order')
            ->orderBy('published_at', 'desc')
            ->take(4) // Lấy 4 solutions nổi bật
            ->get();

        $featuredProducts = Product::with(['category', 'primaryImage'])
            ->active() // Chỉ lấy sản phẩm active
            ->latest() // Sắp xếp theo mới nhất
            ->take(8) // Lấy 8 sản phẩm (có thể điều chỉnh số lượng)
            ->get();

        return view('client.index', compact(
            'brands',
            'banners',
            'latestPosts',
            'bannerFooter',
            'featuredSolutions',
            'publishedSolutions',
            'featuredProducts'
        ));
    }

    // public function index()
    // {
    //     // Lấy brands active để hiển thị trên trang chủ
    //     $brands = Brand::whereNotNull('image')
    //         ->take(6) // Lấy 6 brands
    //         ->get();

    //     // Lấy banner footer active để hiển thị
    //     $banners = Banner::active()->latest()->get();
    //     $bannerFooter = BannerFooter::active()->latest()->get();

    //     // Lấy bài viết blog mới nhất để hiển thị trên trang chủ (chỉ bài viết đã publish)
    //     $latestPosts = Post::with(['category', 'tags'])
    //         ->where('is_published', true)
    //         ->whereNotNull('published_at')
    //         ->where('published_at', '<=', now())
    //         ->latest('published_at')
    //         ->take(3) // Lấy 3 bài viết mới nhất
    //         ->get();

    //     // Lấy các sản phẩm featured/nổi bật để hiển thị trên trang chủ
    //     $featuredProducts = Product::with(['category', 'primaryImage'])
    //         ->active() // Chỉ lấy sản phẩm active
    //         ->latest() // Sắp xếp theo mới nhất
    //         ->take(8) // Lấy 8 sản phẩm (có thể điều chỉnh số lượng)
    //         ->get();

    //     return view('client.index', compact('brands', 'banners', 'latestPosts', 'bannerFooter', 'featuredProducts'));
    // }
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
    /**
     * Hiển thị danh sách solutions
     */
    public function solutions(Request $request)
    {
        // Build query với relationships
        $query = Solution::with(['categorySolution', 'tagSolutions', 'user']);

        // Chỉ lấy solutions đã published
        $query->published();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->search($search);
        }

        // Category filter
        if ($request->filled('category')) {
            $query->whereHas('categorySolution', function ($q) use ($request) {
                $q->where('slug', $request->get('category'));
            });
        }

        // Tag filter
        if ($request->filled('tag')) {
            $query->whereHas('tagSolutions', function ($q) use ($request) {
                $q->where('slug', $request->get('tag'));
            });
        }

        // Sort options
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'oldest':
                $query->orderBy('published_at', 'asc');
                break;
            case 'popular':
                $query->orderBy('view_count', 'desc');
                break;
            case 'featured':
                $query->featured()
                    ->orderBy('published_at', 'desc');
                break;
            case 'latest':
            default:
                $query->orderBy('published_at', 'desc');
                break;
        }

        // === THÊM publishedSolutions cho load more ===
        $publishedSolutions = Solution::with(['categorySolution', 'tagSolutions', 'user'])
            ->published()
            ->orderBy('sort_order')
            ->orderBy('published_at', 'desc')
            ->take(6) // 6 solutions đầu tiên cho load more
            ->get();
        $featuredSolutions = Solution::with(['categorySolution', 'tagSolutions', 'user'])
            ->published()
            ->featured() // Thêm scope featured nếu cần solutions nổi bật
            ->orderBy('sort_order')
            ->orderBy('published_at', 'desc')
            ->take(4) // Lấy 4 solutions nổi bật
            ->get();
        // Paginate cho danh sách chính
        $solutions = $query->paginate(12)->appends(request()->query());

        // Get categories và tags cho filter
        $categories = $this->getSolutionCategories();
        $tags = $this->getSolutionTags();

        return view('client.solutions.index', compact(
            'solutions',
            'categories',
            'tags',
            'publishedSolutions','featuredSolutions' // ← Thêm biến này
        ));
    }

    /**
     * Hiển thị chi tiết solution
     */
    public function solutionShow($slug)
    {
        try {
            // DEBUG: Log để kiểm tra
            Log::info('Searching for solution with slug: ' . $slug);

            // Lấy solution theo slug - chỉ solutions đã publish
            $solution = Solution::with(['categorySolution', 'tagSolutions', 'user'])
                ->published()
                ->where('slug', $slug)
                ->first(); // Dùng first() thay vì firstOrFail() để debug

            // DEBUG: Kiểm tra kết quả
            if (!$solution) {
                Log::error('Solution not found with slug: ' . $slug);
                Log::info('Available solutions:', Solution::pluck('slug', 'id')->toArray());
                abort(404, 'Solution không tồn tại');
            }

            Log::info('Found solution: ' . $solution->title);

            // Tăng lượt xem
            $solution->incrementViewCount();

            // Lấy related solutions (logic tương tự ClientController::show cho posts)
            $relatedSolutions = collect();

            // 1. Lấy solutions cùng category trước
            if ($solution->category_solution_id) {
                $relatedSolutions = Solution::with(['categorySolution', 'tagSolutions', 'user'])
                    ->published()
                    ->byCategory($solution->category_solution_id) // Sử dụng scope
                    ->where('id', '!=', $solution->id)
                    ->orderBy('published_at', 'desc')
                    ->take(8) // Tăng lên 8 để có slideshow
                    ->get();
            }

            // 2. Nếu chưa đủ, lấy solutions có cùng tags
            if ($relatedSolutions->count() < 8 && $solution->tagSolutions->count() > 0) {
                $tagIds = $solution->tagSolutions->pluck('id');

                $additionalSolutions = Solution::with(['categorySolution', 'tagSolutions', 'user'])
                    ->published()
                    ->whereHas('tagSolutions', function ($query) use ($tagIds) {
                        $query->whereIn('tag_solution_id', $tagIds);
                    })
                    ->where('id', '!=', $solution->id)
                    ->whereNotIn('id', $relatedSolutions->pluck('id'))
                    ->orderBy('published_at', 'desc')
                    ->take(8 - $relatedSolutions->count())
                    ->get();

                $relatedSolutions = $relatedSolutions->merge($additionalSolutions);
            }

            // 3. Nếu vẫn chưa đủ, lấy solutions mới nhất
            if ($relatedSolutions->count() < 8) {
                $latestSolutions = Solution::with(['categorySolution', 'tagSolutions', 'user'])
                    ->published()
                    ->where('id', '!=', $solution->id)
                    ->whereNotIn('id', $relatedSolutions->pluck('id'))
                    ->orderBy('published_at', 'desc')
                    ->take(8 - $relatedSolutions->count())
                    ->get();

                $relatedSolutions = $relatedSolutions->merge($latestSolutions);
            }

            // Lấy categories và featured solutions cho sidebar
            $solutionCategories = $this->getSolutionCategories();
            $featuredSolutions = $this->getFeaturedSolutionsForSidebar();

            return view('client.solutions.show', compact(
                'solution',
                'relatedSolutions',
                'solutionCategories',
                'featuredSolutions'
            ));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('ModelNotFoundException: ' . $e->getMessage());
            abort(404, 'Solution không tồn tại');
        } catch (\Exception $e) {
            Log::error('Error in solution show method: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            abort(500, 'Có lỗi xảy ra khi tải solution');
        }
    }

    /**
     * API Search Solutions - Trả về JSON cho live search
     */
    public function searchSolutions(Request $request)
    {
        try {
            $query = $request->get('q', '');

            if (empty($query) || strlen($query) < 2) {
                return response()->json([]);
            }

            $solutions = Solution::with(['categorySolution'])
                ->published()
                ->where(function ($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                        ->orWhere('excerpt', 'LIKE', "%{$query}%")
                        ->orWhere('content', 'LIKE', "%{$query}%");
                })
                ->select('id', 'title', 'excerpt', 'slug', 'category_solution_id')
                ->orderBy('view_count', 'desc')
                ->orderBy('published_at', 'desc')
                ->limit(8)
                ->get();

            $results = $solutions->map(function ($solution) {
                return [
                    'id' => $solution->id,
                    'title' => $solution->title,
                    'excerpt' => $solution->excerpt ?: strip_tags(substr($solution->content ?? '', 0, 150)) . '...',
                    'slug' => $solution->slug,
                    'url' => route('solutions.show', $solution->slug),
                    'category' => $solution->categorySolution ? $solution->categorySolution->name : null
                ];
            });

            return response()->json($results);
        } catch (\Exception $e) {
            Log::error('Error in searchSolutions: ' . $e->getMessage());
            return response()->json([], 500);
        }
    }

    /**
     * Tìm kiếm tất cả (Posts + Solutions) - cho global search
     */
    public function searchAll(Request $request)
    {
        try {
            $query = $request->get('q', '');

            if (empty($query) || strlen($query) < 2) {
                return response()->json([
                    'solutions' => [],
                    'posts' => []
                ]);
            }

            // Search Solutions
            $solutions = Solution::with(['categorySolution'])
                ->published()
                ->where(function ($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                        ->orWhere('excerpt', 'LIKE', "%{$query}%")
                        ->orWhere('content', 'LIKE', "%{$query}%");
                })
                ->select('id', 'title', 'excerpt', 'slug', 'category_solution_id')
                ->orderBy('view_count', 'desc')
                ->limit(5)
                ->get();

            // Search Posts
            $posts = Post::with(['category'])
                ->where('is_published', true)
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->where(function ($q) use ($query) {
                    $q->where('title', 'LIKE', "%{$query}%")
                        ->orWhere('excerpt', 'LIKE', "%{$query}%")
                        ->orWhere('content', 'LIKE', "%{$query}%");
                })
                ->select('id', 'title', 'excerpt', 'slug', 'category_id')
                ->orderBy('views', 'desc')
                ->limit(5)
                ->get();

            $results = [
                'solutions' => $solutions->map(function ($solution) {
                    return [
                        'id' => $solution->id,
                        'title' => $solution->title,
                        'excerpt' => $solution->excerpt ?: strip_tags(substr($solution->content ?? '', 0, 150)) . '...',
                        'slug' => $solution->slug,
                        'url' => route('solutions.show', $solution->slug),
                        'type' => 'solution',
                        'category' => $solution->categorySolution ? $solution->categorySolution->name : null
                    ];
                }),
                'posts' => $posts->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'excerpt' => $post->excerpt ?: strip_tags(substr($post->content ?? '', 0, 150)) . '...',
                        'slug' => $post->slug,
                        'url' => route('blog.show', $post->slug),
                        'type' => 'post',
                        'category' => $post->category ? $post->category->name : null
                    ];
                })
            ];

            return response()->json($results);
        } catch (\Exception $e) {
            Log::error('Error in searchAll: ' . $e->getMessage());
            return response()->json(['solutions' => [], 'posts' => []], 500);
        }
    }

    /**
     * Hiển thị solutions theo category
     */
    public function solutionCategory(Request $request, $categorySlug)
    {
        try {
            $category = CategorySolution::where('slug', $categorySlug)->firstOrFail();

            $query = Solution::with(['categorySolution', 'tagSolutions', 'user'])
                ->published()
                ->byCategory($category->id);

            // Apply search if provided
            if ($request->filled('search')) {
                $search = $request->get('search');
                $query->search($search);
            }

            // Sort
            $sortBy = $request->get('sort', 'latest');
            switch ($sortBy) {
                case 'oldest':
                    $query->orderBy('published_at', 'asc');
                    break;
                case 'popular':
                    $query->orderBy('view_count', 'desc');
                    break;
                case 'latest':
                default:
                    $query->orderBy('published_at', 'desc');
                    break;
            }

            $solutions = $query->paginate(12)->appends(request()->query());

            return view('client.solutions.category', compact('solutions', 'category'));
        } catch (\Exception $e) {
            Log::error('Error in solution category method: ' . $e->getMessage());
            abort(404, 'Danh mục không tồn tại');
        }
    }

    /**
     * Hiển thị solutions theo tag
     */
    public function solutionTag(Request $request, $tagSlug)
    {
        try {
            $tag = TagSolution::where('slug', $tagSlug)->firstOrFail();

            $query = Solution::with(['categorySolution', 'tagSolutions', 'user'])
                ->published()
                ->byTag($tag->id);

            // Apply search if provided
            if ($request->filled('search')) {
                $search = $request->get('search');
                $query->search($search);
            }

            // Sort
            $sortBy = $request->get('sort', 'latest');
            switch ($sortBy) {
                case 'oldest':
                    $query->orderBy('published_at', 'asc');
                    break;
                case 'popular':
                    $query->orderBy('view_count', 'desc');
                    break;
                case 'latest':
                default:
                    $query->orderBy('published_at', 'desc');
                    break;
            }

            $solutions = $query->paginate(12)->appends(request()->query());

            return view('client.solutions.tag', compact('solutions', 'tag'));
        } catch (\Exception $e) {
            Log::error('Error in solution tag method: ' . $e->getMessage());
            abort(404, 'Thẻ không tồn tại');
        }
    }

    // === HELPER METHODS ===

    private function getSolutionCategories()
    {
        try {
            // Bỏ scope active() nếu không có cột is_active
            return CategorySolution::orderBy('name')->get();
        } catch (\Exception $e) {
            Log::error('Error getting solution categories: ' . $e->getMessage());
            return collect();
        }
    }

    private function getSolutionTags()
    {
        try {
            // Bỏ scope active() nếu không có cột is_active
            return TagSolution::orderBy('name')->get();
        } catch (\Exception $e) {
            Log::error('Error getting solution tags: ' . $e->getMessage());
            return collect();
        }
    }

    /**
     * Lấy featured solutions cho sidebar
     */
    private function getFeaturedSolutionsForSidebar()
    {
        try {
            return Solution::with(['categorySolution'])
                ->published()
                ->featured()
                ->orderBy('view_count', 'desc')
                ->orderBy('published_at', 'desc')
                ->take(5)
                ->get();
        } catch (\Exception $e) {
            Log::error('Error getting featured solutions for sidebar: ' . $e->getMessage());
            return collect();
        }
    }

    public function loadMoreSolutions(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = 6;
        $offset = ($page - 1) * $perPage;

        $solutions = Solution::with(['categorySolution', 'tagSolutions', 'user'])
            ->published()
            ->orderBy('sort_order')
            ->orderBy('published_at', 'desc')
            ->skip($offset)
            ->take($perPage)
            ->get();

        // SỬA CÁCH CHECK hasMore
        $totalSolutions = Solution::published()->count();
        $hasMore = ($offset + $perPage) < $totalSolutions;

        $html = '';
        foreach ($solutions as $index => $solution) {
            $imageUrl = $solution->featured_image
                ? Storage::url($solution->featured_image)
                : 'https://placehold.co/350x197';

            $detailUrl = route('solutions.show', $solution->slug);

            $html .= '
            <div class="custom-product-card" data-index="' . ($offset + $index) . '">
                <a href="' . $detailUrl . '" class="custom-product-link">
                    <div class="custom-product-image">
                        <img src="' . $imageUrl . '" alt="' . htmlspecialchars($solution->title) . '" />
                    </div>
                    <div class="custom-product-info">
                        <h3 class="custom-product-title">
                            ' . htmlspecialchars($solution->title) . '
                        </h3>
                    </div>
                </a>
            </div>';
        }

        return response()->json([
            'html' => $html,
            'hasMore' => $hasMore,
            'nextPage' => $page + 1,
            'debug' => [
                'page' => $page,
                'offset' => $offset,
                'perPage' => $perPage,
                'totalSolutions' => $totalSolutions,
                'solutionsReturned' => $solutions->count()
            ]
        ]);
    }
    public function lienhe()
    {
        // Trả về view liên hệ
        return view('client.contact.index');
    }
}

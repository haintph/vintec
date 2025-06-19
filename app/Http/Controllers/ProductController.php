<?php
// ==================== CONTROLLER: app/Http/Controllers/ProductController.php ====================

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;
use App\Http\Requests\ProductRequest;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Display a listing of products (List view)
     * Route: GET /admin/products
     */
    public function index(Request $request)
    {
        $query = Product::with('category')
            ->search($request->search)
            ->byCategory($request->category_id);

        if ($request->status !== null) {
            $query->where('is_active', $request->status);
        }

        $products = $query->orderBy('created_at', 'desc')->paginate(15);
        $categories = Category::where('is_active', true)->get();

        return view('admin.products.index', compact('products', 'categories'));
    }

    /**
     * Display products in grid view
     * Route: GET /admin/products/grid
     */
    public function grid(Request $request)
    {
        $query = Product::with('category')
            ->search($request->search)
            ->byCategory($request->category_id);

        if ($request->status !== null) {
            $query->where('is_active', $request->status);
        }

        $products = $query->orderBy('created_at', 'desc')->paginate(20);
        $categories = Category::where('is_active', true)->get();

        return view('admin.products.grid', compact('products', 'categories'));
    }

    /**
     * Show the form for creating a new product
     * Route: GET /admin/products/create
     */
    public function create()
    {
        $categories = Category::where('is_active', true)->get();
        return view('admin.products.create', compact('categories'));
    }

    /**
     * Store a newly created product
     * Route: POST /admin/products
     */
    public function store(ProductRequest $request)
    {
        try {
            $this->productService->store($request->validated());
            return redirect()->route('admin.products.index')
                           ->with('success', 'Sản phẩm đã được tạo thành công!');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified product
     * Route: GET /admin/products/{product}
     */
    public function show(Product $product)
    {
        $product->load(['category', 'images']);
        
        // Get related products
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->limit(6)
            ->get();

        return view('admin.products.show', compact('product', 'relatedProducts'));
    }

    /**
     * Show the form for editing the specified product
     * Route: GET /admin/products/{product}/edit
     */
    public function edit(Product $product)
    {
        $product->load('images');
        $categories = Category::where('is_active', true)->get();
        return view('admin.products.edit', compact('product', 'categories'));
    }

    /**
     * Update the specified product
     * Route: PUT/PATCH /admin/products/{product}
     */
    public function update(ProductRequest $request, Product $product)
    {
        try {
            $this->productService->update($product, $request->validated());
            return redirect()->route('admin.products.index')
                           ->with('success', 'Sản phẩm đã được cập nhật thành công!');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified product
     * Route: DELETE /admin/products/{product}
     */
    public function destroy(Product $product)
    {
        try {
            $this->productService->delete($product);
            return redirect()->route('admin.products.index')
                           ->with('success', 'Sản phẩm đã được xóa thành công!');
        } catch (\Exception $e) {
            return back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Bulk delete products
     * Route: POST /admin/products/bulk-delete
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:products,id'
        ]);

        try {
            $products = Product::whereIn('id', $request->ids)->get();
            foreach ($products as $product) {
                $this->productService->delete($product);
            }
            return response()->json(['success' => true, 'message' => 'Đã xóa các sản phẩm được chọn']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Bulk status update
     * Route: POST /admin/products/bulk-status
     */
    public function bulkStatus(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:products,id',
            'status' => 'required|boolean'
        ]);

        try {
            Product::whereIn('id', $request->ids)->update(['is_active' => $request->status]);
            $action = $request->status ? 'kích hoạt' : 'tạm ẩn';
            return response()->json(['success' => true, 'message' => "Đã {$action} các sản phẩm được chọn"]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Toggle product status
     * Route: PATCH /admin/products/{product}/toggle-status
     */
    public function toggleStatus(Product $product)
    {
        $product->update(['is_active' => !$product->is_active]);
        $status = $product->is_active ? 'kích hoạt' : 'tạm ẩn';
        return response()->json(['success' => true, 'message' => "Đã {$status} sản phẩm"]);
    }

    /**
     * Duplicate product
     * Route: POST /admin/products/{product}/duplicate
     */
    public function duplicate(Product $product)
    {
        try {
            $newProduct = $product->replicate();
            $newProduct->name = $product->name . ' (Copy)';
            $newProduct->product_code = $product->product_code . '-COPY-' . time();
            $newProduct->slug = null; // Will be auto-generated
            $newProduct->save();

            return response()->json([
                'success' => true, 
                'message' => 'Đã sao chép sản phẩm thành công',
                'redirect' => route('admin.products.edit', $newProduct)
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Quick update for inline editing
     * Route: PATCH /admin/products/{product}/quick-update
     */
    public function quickUpdate(Request $request, Product $product)
    {
        $request->validate([
            'field' => 'required|in:name,product_code,is_active',
            'value' => 'required'
        ]);

        try {
            $product->update([$request->field => $request->value]);
            return response()->json(['success' => true, 'message' => 'Đã cập nhật thành công']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Export products
     * Route: GET /admin/products/export
     */
    public function export(Request $request)
    {
        // Implementation for export functionality
        // You can use Laravel Excel or custom CSV export
        return response()->download(storage_path('app/exports/products.csv'));
    }

    /**
     * Import products
     * Route: POST /admin/products/import
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,xlsx'
        ]);

        try {
            // Implementation for import functionality
            return back()->with('success', 'Đã import sản phẩm thành công!');
        } catch (\Exception $e) {
            return back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Delete album image
     * Route: DELETE /admin/products/{product}/images/{image}
     */
    public function deleteImage(Product $product, ProductImage $image)
    {
        if ($image->product_id !== $product->id) {
            return response()->json(['success' => false, 'message' => 'Image không thuộc về sản phẩm này']);
        }

        try {
            $this->productService->deleteAlbumImage($image);
            return response()->json(['success' => true, 'message' => 'Đã xóa ảnh thành công']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Set primary image
     * Route: PATCH /admin/products/{product}/images/{image}/primary
     */
    public function setPrimaryImage(Product $product, ProductImage $image)
    {
        if ($image->product_id !== $product->id) {
            return response()->json(['success' => false, 'message' => 'Image không thuộc về sản phẩm này']);
        }

        try {
            // Reset all images to non-primary
            $product->images()->update(['is_primary' => false]);
            
            // Set new primary image
            $image->update(['is_primary' => true]);
            
            return response()->json(['success' => true, 'message' => 'Đã đặt làm ảnh chính']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Reorder images
     * Route: POST /admin/products/{product}/images/reorder
     */
    public function reorderImages(Request $request, Product $product)
    {
        $request->validate([
            'image_ids' => 'required|array',
            'image_ids.*' => 'exists:product_images,id'
        ]);

        try {
            $this->productService->reorderImages($product, $request->image_ids);
            return response()->json(['success' => true, 'message' => 'Đã cập nhật thứ tự ảnh']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }
}

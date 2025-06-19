<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of variants for a specific product
     * Route: GET /admin/products/{product}/variants
     */
    public function index(Product $product)
    {
        $variants = $product->variants()->orderBy('name')->get();

        return view('admin.products.variants.index', compact('product', 'variants'));
    }

    /**
     * Show the form for creating a new variant
     * Route: GET /admin/products/{product}/variants/create
     */
    public function create(Product $product)
    {
        return view('admin.products.variants.create', compact('product'));
    }

    /**
     * Store a newly created variant
     * Route: POST /admin/products/{product}/variants
     */
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'color_code' => 'nullable|string|regex:/^#[a-fA-F0-9]{6}$/',
            'price' => 'required|numeric|min:0|max:999999999',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean'
        ], [
            'name.required' => 'Tên biến thể là bắt buộc',
            'color_code.regex' => 'Mã màu phải có định dạng #RRGGBB',
            'price.required' => 'Giá là bắt buộc',
            'price.numeric' => 'Giá phải là số',
            'price.min' => 'Giá không được âm',
            'image.image' => 'File phải là hình ảnh',
            'image.max' => 'Kích thước ảnh tối đa 2MB'
        ]);

        try {
            // Upload image if provided
            if ($request->hasFile('image')) {
                $validated['image'] = $this->uploadVariantImage($request->file('image'), $product);
            }

            $validated['product_id'] = $product->id;
            $validated['is_active'] = $request->has('is_active');

            ProductVariant::create($validated);

            return redirect()->route('admin.products.variants.index', $product)
                ->with('success', 'Biến thể đã được tạo thành công!');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified variant
     * Route: GET /admin/products/{product}/variants/{variant}
     */
    public function show(Product $product, ProductVariant $variant)
    {
        // Kiểm tra variant thuộc về product
        if ($variant->product_id !== $product->id) {
            abort(404);
        }

        return view('admin.products.variants.show', compact('product', 'variant'));
    }

    /**
     * Show the form for editing the specified variant
     * Route: GET /admin/products/{product}/variants/{variant}/edit
     */
    public function edit(Product $product, ProductVariant $variant)
    {
        // Kiểm tra variant thuộc về product
        if ($variant->product_id !== $product->id) {
            abort(404);
        }

        return view('admin.products.variants.edit', compact('product', 'variant'));
    }

    /**
     * Update the specified variant
     * Route: PUT/PATCH /admin/products/{product}/variants/{variant}
     */
    public function update(Request $request, Product $product, ProductVariant $variant)
    {
        // Kiểm tra variant thuộc về product
        if ($variant->product_id !== $product->id) {
            abort(404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'color_code' => 'nullable|string|regex:/^#[a-fA-F0-9]{6}$/',
            'price' => 'required|numeric|min:0|max:999999999',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean'
        ], [
            'name.required' => 'Tên biến thể là bắt buộc',
            'color_code.regex' => 'Mã màu phải có định dạng #RRGGBB',
            'price.required' => 'Giá là bắt buộc',
            'price.numeric' => 'Giá phải là số',
            'price.min' => 'Giá không được âm',
            'image.image' => 'File phải là hình ảnh',
            'image.max' => 'Kích thước ảnh tối đa 2MB'
        ]);

        try {
            // Upload new image if provided
            if ($request->hasFile('image')) {
                // Delete old image
                if ($variant->image) {
                    Storage::disk('public')->delete($variant->image);
                }
                $validated['image'] = $this->uploadVariantImage($request->file('image'), $product);
            }

            $validated['is_active'] = $request->has('is_active');

            $variant->update($validated);

            return redirect()->route('admin.products.variants.index', $product)
                ->with('success', 'Biến thể đã được cập nhật thành công!');
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified variant
     * Route: DELETE /admin/products/{product}/variants/{variant}
     */
    public function destroy(Product $product, ProductVariant $variant)
    {
        // Kiểm tra variant thuộc về product
        if ($variant->product_id !== $product->id) {
            return response()->json([
                'success' => false,
                'message' => 'Biến thể không thuộc về sản phẩm này'
            ]);
        }

        try {
            // Delete image if exists
            if ($variant->image) {
                Storage::disk('public')->delete($variant->image);
            }

            $variantName = $variant->name;
            $variant->delete();

            return response()->json([
                'success' => true,
                'message' => "Đã xóa biến thể '{$variantName}' thành công"
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting variant: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Toggle variant status
     * Route: PATCH /admin/products/{product}/variants/{variant}/toggle-status
     */
    public function toggleStatus(Product $product, ProductVariant $variant)
    {
        // Kiểm tra variant thuộc về product
        if ($variant->product_id !== $product->id) {
            return response()->json(['success' => false, 'message' => 'Biến thể không thuộc về sản phẩm này']);
        }

        try {
            $variant->update(['is_active' => !$variant->is_active]);
            $status = $variant->is_active ? 'kích hoạt' : 'tạm ẩn';

            return response()->json([
                'success' => true,
                'message' => "Đã {$status} biến thể '{$variant->name}'",
                'is_active' => $variant->is_active
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Bulk delete variants
     * Route: POST /admin/products/{product}/variants/bulk-delete
     */
    public function bulkDelete(Request $request, Product $product)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:product_variants,id'
        ]);

        try {
            $variants = ProductVariant::whereIn('id', $request->ids)
                ->where('product_id', $product->id)
                ->get();

            foreach ($variants as $variant) {
                // Delete image if exists
                if ($variant->image) {
                    Storage::disk('public')->delete($variant->image);
                }
                $variant->delete();
            }

            return response()->json([
                'success' => true,
                'message' => 'Đã xóa ' . $variants->count() . ' biến thể được chọn'
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Bulk status update
     * Route: POST /admin/products/{product}/variants/bulk-status
     */
    public function bulkStatus(Request $request, Product $product)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:product_variants,id',
            'status' => 'required|boolean'
        ]);

        try {
            $count = ProductVariant::whereIn('id', $request->ids)
                ->where('product_id', $product->id)
                ->update(['is_active' => $request->status]);

            $action = $request->status ? 'kích hoạt' : 'tạm ẩn';

            return response()->json([
                'success' => true,
                'message' => "Đã {$action} {$count} biến thể được chọn"
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Duplicate variant
     * Route: POST /admin/products/{product}/variants/{variant}/duplicate
     */
    public function duplicate(Product $product, ProductVariant $variant)
    {
        // Kiểm tra variant thuộc về product
        if ($variant->product_id !== $product->id) {
            return response()->json(['success' => false, 'message' => 'Biến thể không thuộc về sản phẩm này']);
        }

        try {
            $newVariant = $variant->replicate();
            $newVariant->name = $variant->name . ' (Copy)';

            // Copy image if exists
            if ($variant->image) {
                $newImagePath = $this->copyVariantImage($variant->image, $product);
                $newVariant->image = $newImagePath;
            }

            $newVariant->save();

            return response()->json([
                'success' => true,
                'message' => 'Đã sao chép biến thể thành công',
                'redirect' => route('admin.products.variants.edit', [$product, $newVariant])
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
        }
    }

    /**
     * Get variant data for AJAX
     * Route: GET /admin/products/{product}/variants/{variant}/data
     */
    public function getData(Product $product, ProductVariant $variant)
    {
        // Kiểm tra variant thuộc về product
        if ($variant->product_id !== $product->id) {
            return response()->json(['error' => 'Biến thể không thuộc về sản phẩm này'], 404);
        }

        return response()->json([
            'id' => $variant->id,
            'name' => $variant->name,
            'color_code' => $variant->color_code,
            'price' => $variant->price,
            'formatted_price' => $variant->formatted_price,
            'image_url' => $variant->image_url,
            'is_active' => $variant->is_active,
            'created_at' => $variant->created_at->format('d/m/Y H:i'),
            'updated_at' => $variant->updated_at->format('d/m/Y H:i')
        ]);
    }

    // ==================== PRIVATE HELPER METHODS ====================

    /**
     * Upload variant image
     */
    private function uploadVariantImage($image, Product $product)
    {
        $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $path = "products/{$product->id}/variants/{$filename}";

        Storage::disk('public')->putFileAs(
            "products/{$product->id}/variants",
            $image,
            $filename
        );

        return $path;
    }

    /**
     * Copy variant image for duplication
     */
    private function copyVariantImage($originalPath, Product $product)
    {
        if (!Storage::disk('public')->exists($originalPath)) {
            return null;
        }

        $extension = pathinfo($originalPath, PATHINFO_EXTENSION);
        $filename = time() . '_' . uniqid() . '_copy.' . $extension;
        $newPath = "products/{$product->id}/variants/{$filename}";

        Storage::disk('public')->copy($originalPath, $newPath);

        return $newPath;
    }
}

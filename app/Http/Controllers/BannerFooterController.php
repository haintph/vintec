<?php

namespace App\Http\Controllers;

use App\Models\BannerFooter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;

class BannerFooterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View
    {
        $query = BannerFooter::query();

        // Filter theo trạng thái nếu có
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        // Search theo ID nếu có
        if ($request->has('search') && $request->search !== '') {
            $query->where('id', 'LIKE', '%' . $request->search . '%');
        }

        $banners = $query->latest()->paginate(10)->withQueryString();

        return view('admin.banner_ft.index', compact('banners'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('admin.banner_ft.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'img_banner' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'is_active' => 'nullable|boolean'
        ], [
            'img_banner.required' => 'Vui lòng chọn hình ảnh banner.',
            'img_banner.image' => 'File phải là hình ảnh.',
            'img_banner.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif, webp.',
            'img_banner.max' => 'Kích thước hình ảnh không được vượt quá 2MB.'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $imagePath = null;
            
            if ($request->hasFile('img_banner')) {
                $file = $request->file('img_banner');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $imagePath = $file->storeAs('banners', $filename, 'public');
            }

            BannerFooter::create([
                'img_banner' => $imagePath,
                'is_active' => $request->has('is_active') ? true : false
            ]);

            return redirect()->route('bannerfooters.index')
                ->with('success', 'Banner được tạo thành công!');

        } catch (\Exception $e) {
            // Xóa file đã upload nếu có lỗi
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            return redirect()->back()
                ->with('error', 'Có lỗi xảy ra: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(BannerFooter $banner): View
    {
        return view('admin.banner_ft.show', compact('banner'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BannerFooter $banner): View
    {
        return view('admin.banner_ft.edit', compact('banner'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BannerFooter $banner): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'img_banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'is_active' => 'nullable|boolean'
        ], [
            'img_banner.image' => 'File phải là hình ảnh.',
            'img_banner.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif, webp.',
            'img_banner.max' => 'Kích thước hình ảnh không được vượt quá 2MB.'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $data = [
                'is_active' => $request->has('is_active') ? true : false
            ];

            // Xử lý upload ảnh mới
            if ($request->hasFile('img_banner')) {
                // Xóa ảnh cũ
                if ($banner->img_banner && Storage::disk('public')->exists($banner->img_banner)) {
                    Storage::disk('public')->delete($banner->img_banner);
                }
                
                $file = $request->file('img_banner');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $data['img_banner'] = $file->storeAs('banners', $filename, 'public');
            }

            $banner->update($data);

            return redirect()->route('bannerfooters.index')
                ->with('success', 'Banner được cập nhật thành công!');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Có lỗi xảy ra: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BannerFooter $banner): RedirectResponse
    {
        try {
            // Xóa file ảnh (sẽ tự động xóa trong Model boot method)
            $banner->delete();

            return redirect()->route('bannerfooters.index')
                ->with('success', 'Banner đã được xóa thành công!');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Có lỗi xảy ra khi xóa banner: ' . $e->getMessage());
        }
    }

    /**
     * Toggle active status của banner
     */
    public function toggleStatus(BannerFooter $banner): JsonResponse
    {
        try {
            $banner->update([
                'is_active' => !$banner->is_active
            ]);

            return response()->json([
                'success' => true,
                'status' => $banner->is_active,
                'message' => $banner->is_active ? 'Banner đã được kích hoạt!' : 'Banner đã được vô hiệu hóa!'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk delete banners
     */
    public function bulkDelete(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:banners_footer,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Dữ liệu không hợp lệ!'
            ], 422);
        }

        try {
            BannerFooter::whereIn('id', $request->ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Đã xóa ' . count($request->ids) . ' banner thành công!'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk toggle status
     */
    public function bulkToggleStatus(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:banners_footer,id',
            'status' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Dữ liệu không hợp lệ!'
            ], 422);
        }

        try {
            BannerFooter::whereIn('id', $request->ids)->update([
                'is_active' => $request->status
            ]);

            $statusText = $request->status ? 'kích hoạt' : 'vô hiệu hóa';
            
            return response()->json([
                'success' => true,
                'message' => "Đã {$statusText} " . count($request->ids) . ' banner thành công!'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get banners for API
     */
    public function api(): JsonResponse
    {
        try {
            $banners = BannerFooter::active()
                ->latest()
                ->get()
                ->map(function ($banner) {
                    return [
                        'id' => $banner->id,
                        'image_url' => $banner->image_url,
                        'created_at' => $banner->created_at->format('d/m/Y H:i')
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $banners
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    // Hiển thị danh sách brands
    public function list()
    {
        $brands = Brand::latest()->paginate(10);
        return view('admin.brands.list', compact('brands'));
    }

    // Hiển thị form tạo brand mới
    public function create()
    {
        return view('admin.brands.create');
    }

    // Lưu brand mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->only(['name']);

        // Xử lý upload ảnh với tên custom
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();

            // Tạo tên file từ brand name
            $slug = Str::slug($request->name);
            $fileName = $slug . '.' . $extension;

            // Kiểm tra file trùng tên, thêm số nếu cần
            $counter = 1;
            while (Storage::disk('public')->exists('brands/' . $fileName)) {
                $fileName = $slug . '-' . $counter . '.' . $extension;
                $counter++;
            }

            // Store với tên custom
            $file->storeAs('brands', $fileName, 'public');
            $data['image'] = 'brands/' . $fileName;
        }

        Brand::create($data);

        return redirect()->route('brand-list')->with('success', 'Thương hiệu đã được tạo thành công!');
    }


    // Hiển thị form chỉnh sửa
    public function edit($id)
    {
        $brand = Brand::findOrFail($id);
        return view('admin.brands.edit', compact('brand'));
    }

    // Cập nhật brand
    public function update(Request $request, $id)
    {
        $brand = Brand::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->only(['name']);

        // Xử lý upload ảnh mới
        if ($request->hasFile('image')) {
            // Xóa ảnh cũ
            if ($brand->image) {
                Storage::disk('public')->delete($brand->image);
            }

            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();

            // Tạo tên file từ brand name mới
            $slug = Str::slug($request->name);
            $fileName = $slug . '.' . $extension;

            // Kiểm tra file trùng tên, thêm số nếu cần
            $counter = 1;
            while (Storage::disk('public')->exists('brands/' . $fileName)) {
                $fileName = $slug . '-' . $counter . '.' . $extension;
                $counter++;
            }

            // Store với tên custom
            $file->storeAs('brands', $fileName, 'public');
            $data['image'] = 'brands/' . $fileName;
        }
        // Nếu chỉ đổi tên brand mà không upload ảnh mới
        elseif ($brand->image && $request->name !== $brand->name) {
            // Đổi tên file ảnh hiện có theo tên brand mới
            $oldImagePath = $brand->image;
            $extension = pathinfo($oldImagePath, PATHINFO_EXTENSION);

            $newSlug = Str::slug($request->name);
            $newFileName = $newSlug . '.' . $extension;

            // Kiểm tra file trùng tên
            $counter = 1;
            while (Storage::disk('public')->exists('brands/' . $newFileName) && 'brands/' . $newFileName !== $oldImagePath) {
                $newFileName = $newSlug . '-' . $counter . '.' . $extension;
                $counter++;
            }

            // Đổi tên file trong storage nếu tên khác
            if ('brands/' . $newFileName !== $oldImagePath) {
                Storage::disk('public')->move($oldImagePath, 'brands/' . $newFileName);
                $data['image'] = 'brands/' . $newFileName;
            }
        }

        $brand->update($data);

        return redirect()->route('brand-list')->with('success', 'Thương hiệu đã được cập nhật thành công!');
    }

    // Xóa brand
    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);

        // Xóa ảnh nếu có
        if ($brand->image) {
            Storage::disk('public')->delete($brand->image);
        }

        $brand->delete();

        return redirect()->route('brand-list')->with('success', 'Thương hiệu đã được xóa thành công!');
    }

    // Hiển thị chi tiết brand
    public function detail($id)
    {
        $brand = Brand::findOrFail($id);
        return view('admin.brands.detail', compact('brand'));
    }

    // API: Lấy danh sách brands đang hoạt động
    public function getActiveBrands()
    {
        $brands = Brand::active()->select('id', 'name')->get();
        return response()->json($brands);
    }
    // Thêm method này vào BrandController

    public function cleanupAllImages()
    {
        $brands = Brand::whereNotNull('image')->get();
        $updated = 0;

        foreach ($brands as $brand) {
            if ($brand->image) {
                $oldImagePath = $brand->image;
                $extension = pathinfo($oldImagePath, PATHINFO_EXTENSION);

                // Tạo tên file mới từ brand name
                $newSlug = Str::slug($brand->name);
                $newFileName = $newSlug . '.' . $extension;
                $newImagePath = 'brands/' . $newFileName;

                // Kiểm tra file trùng tên
                $counter = 1;
                while (Storage::disk('public')->exists($newImagePath) && $newImagePath !== $oldImagePath) {
                    $newFileName = $newSlug . '-' . $counter . '.' . $extension;
                    $newImagePath = 'brands/' . $newFileName;
                    $counter++;
                }

                // Đổi tên file nếu khác tên cũ
                if ($newImagePath !== $oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
                    try {
                        Storage::disk('public')->move($oldImagePath, $newImagePath);
                        $brand->update(['image' => $newImagePath]);
                        $updated++;
                    } catch (\Exception $e) {
                        // Log error but continue
                        continue;
                    }
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => "Đã đổi tên {$updated} ảnh thành công!",
            'updated' => $updated
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function list()
    {
        $categories = Category::query()->latest('id')->paginate(8);
        return view('admin.categories.list', compact('categories'));
    }

    public function create()
    {
        return view('admin.categories.create');
    }

    // Phương thức xử lý ảnh
    public function uploadFile(Request $request, $filename)
    {
        if ($request->hasFile($filename)) {
            return $request->file($filename)->store('images');
        }
        return null;
    }

    public function store(Request $request)
    {
        // Validate dữ liệu đầu vào
        $validatedData = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name',
            'img_category' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'is_active' => 'required|boolean'
        ]);

        // Xử lý lưu ảnh nếu có
        $imagePath = null;
        if ($request->hasFile('img_category')) {
            $imagePath = $request->file('img_category')->store('categories', 'public');
        }

        // Lưu vào database
        Category::create([
            'name' => $validatedData['name'],
            'img_category' => $imagePath,
            'is_active' => $validatedData['is_active'],
        ]);

        return redirect()->route('category-list')->with('success', 'Thêm danh mục thành công!');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return view('admin.categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        // Validate dữ liệu đầu vào
        $validatedData = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name,' . $id,
            'img_category' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'is_active' => 'required|boolean'
        ]);

        // Xử lý ảnh nếu có ảnh mới
        if ($request->hasFile('img_category')) {
            // Xóa ảnh cũ nếu có
            if ($category->img_category) {
                Storage::disk('public')->delete($category->img_category);
            }
            // Lưu ảnh mới vào thư mục 'categories' trong storage
            $validatedData['img_category'] = $request->file('img_category')->store('categories', 'public');
        }

        // Cập nhật danh mục
        $category->update($validatedData);

        return redirect()->route('category-list')->with('success', 'Cập nhật danh mục thành công!');
    }

    public function detail($id)
    {
        $category = Category::findOrFail($id);
        return view('admin.categories.detail', compact('category'));
    }

    public function destroy($id)
    {
        // Tìm và xóa bản ghi
        $item = Category::findOrFail($id);

        // Xóa ảnh nếu có
        if ($item->img_category) {
            Storage::disk('public')->delete($item->img_category);
        }

        // Xóa bản ghi trong cơ sở dữ liệu (hard delete)
        $item->delete();

        // Chuyển hướng về trang danh sách và thông báo thành công
        return redirect()->route('category-list')->with('success', 'Đã xóa thành công!');
    }

    // Toggle status cho category
    public function toggleStatus($id)
    {
        $category = Category::findOrFail($id);
        $category->update(['is_active' => !$category->is_active]);
        
        $status = $category->is_active ? 'kích hoạt' : 'vô hiệu hóa'; 
        return redirect()->route('category-list')
            ->with('success', "Đã {$status} danh mục thành công!");
    }

    // Lấy chỉ categories active
    public function getActiveCategories()
    {
        $categories = Category::active()->orderBy('name')->get();
        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }
}

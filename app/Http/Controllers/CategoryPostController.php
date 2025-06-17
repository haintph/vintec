<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CategoryPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CategoryPostController extends Controller

{
    public function index()
    {
        $categories = CategoryPost::withCount('posts')->paginate(15);
        return view('admin.cate_blog.index', compact('categories'));
    }

    public function create()
    {
        return view('admin.cate_blog.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:categories_post,slug',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'canonical_url' => 'nullable|url'
        ]);

        // Generate slug if not provided
        if (!$request->slug) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        CategoryPost::create($validated);

        return redirect()->route('cate_blog.index')
            ->with('success', 'Danh mục đã được tạo thành công!');
    }

    public function edit($id)
    {
        $category = CategoryPost::find($id); // Hoặc findOrFail để vẫn báo lỗi rõ
        return view('admin.cate_blog.edit', compact('category'));
    }


    public function update(Request $request, CategoryPost $category)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|unique:categories_post,slug,' . $category->id,
                'description' => 'nullable|string',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|string',
                'canonical_url' => 'nullable|url'
            ]);

            // Nếu slug không có và tên bị thay đổi, thì tạo slug mới
            if (!$request->slug && $request->name !== $category->name) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $category->update($validated);

            return redirect()->route('cate_blog.index')
                ->with('success', 'Danh mục đã được cập nhật thành công!');
        } catch (\Exception $e) {
            Log::error('Category update failed: ' . $e->getMessage());

            return back()
                ->withInput()
                ->with('error', 'Có lỗi xảy ra khi cập nhật danh mục!');
        }
    }
    public function destroy(CategoryPost $category)
    {
        // Check if category has posts
        if ($category->posts()->exists()) {
            return back()->with('error', 'Không thể xóa danh mục còn bài viết!');
        }

        $category->delete();

        return redirect()->route('cate_blog.index')
            ->with('success', 'Danh mục đã được xóa!');
    }
}

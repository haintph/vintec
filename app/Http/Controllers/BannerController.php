<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;

class BannerController extends Controller
{
    // Hiển thị danh sách banner
    public function list()
    {
        $banners = Banner::latest()->paginate(10);
        return view('admin.banners.list', compact('banners'));
    }

    // Hiển thị form tạo banner mới
    public function create()
    {
        return view('admin.banners.create');
    }

    // Lưu banner mới
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => 'required|boolean'
        ]);

        $data = $request->only(['title', 'description', 'status']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        Banner::create($data);

        // Clear view cache để frontend cập nhật ngay
        Artisan::call('view:clear');

        return redirect()->route('banner-list')->with('success', 'Banner được tạo thành công!');
    }

    // Hiển thị form chỉnh sửa banner
    public function edit($id)
    {
        $banner = Banner::findOrFail($id);
        return view('admin.banners.edit', compact('banner'));
    }

    // Cập nhật banner
    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => 'required|boolean'
        ]);

        $data = $request->only(['title', 'description', 'status']);

        if ($request->hasFile('image')) {
            if ($banner->image) {
                Storage::disk('public')->delete($banner->image);
            }
            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        $banner->update($data);

        // Clear view cache
        Artisan::call('view:clear');

        return redirect()->route('banner-list')->with('success', 'Banner được cập nhật thành công!');
    }

    // Xóa banner
    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);

        if ($banner->image) {
            Storage::disk('public')->delete($banner->image);
        }

        $banner->delete();

        // Clear view cache
        Artisan::call('view:clear');

        return redirect()->route('banner-list')->with('success', 'Banner được xóa thành công!');
    }

    // Hiển thị chi tiết banner
    public function detail($id)
    {
        $banner = Banner::findOrFail($id);
        return view('admin.banners.detail', compact('banner'));
    }
}

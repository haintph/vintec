<?php

namespace App\Http\Controllers;

use App\Models\Logo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LogoController extends Controller
{
    public function list()
    {
        $logos = Logo::orderBy('type')->orderBy('created_at', 'desc')->paginate(10);
        return view('admin.logos.list', compact('logos'));
    }

    public function create()
    {
        $types = Logo::TYPES;
        return view('admin.logos.create', compact('types'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg,ico|max:2048',
            'type' => 'required|in:' . implode(',', array_keys(Logo::TYPES)),
            'name' => 'nullable|string|max:255'
        ]);

        // Upload image
        $imagePath = $request->file('image')->store('logos', 'public');

        // Deactivate other logos of same type
        Logo::where('type', $request->type)->update(['is_active' => false]);

        // Create new logo
        Logo::create([
            'image' => $imagePath,
            'type' => $request->type,
            'name' => $request->name,
            'is_active' => true
        ]);

        return redirect()->route('logo-list')->with('success', 'Logo đã được thêm thành công!');
    }

    public function detail($id)
    {
        $logo = Logo::findOrFail($id);
        return view('admin.logos.detail', compact('logo'));
    }

    public function edit($id)
    {
        $logo = Logo::findOrFail($id);
        $types = Logo::TYPES;
        return view('admin.logos.edit', compact('logo', 'types'));
    }

    public function update(Request $request, $id)
    {
        $logo = Logo::findOrFail($id);

        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg,ico|max:2048',
            'type' => 'required|in:' . implode(',', array_keys(Logo::TYPES)),
            'name' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        $data = $request->only(['type', 'name', 'is_active']);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($logo->image) {
                Storage::disk('public')->delete($logo->image);
            }
            $data['image'] = $request->file('image')->store('logos', 'public');
        }

        // If activating this logo, deactivate others of same type
        if ($request->is_active) {
            Logo::where('type', $request->type)->where('id', '!=', $id)->update(['is_active' => false]);
        }

        $logo->update($data);

        return redirect()->route('logo-list')->with('success', 'Logo đã được cập nhật thành công!');
    }

    public function destroy($id)
    {
        $logo = Logo::findOrFail($id);

        // Delete image file
        if ($logo->image) {
            Storage::disk('public')->delete($logo->image);
        }
        
        $logo->delete();

        return redirect()->route('logo-list')->with('success', 'Logo đã được xóa thành công!');
    }
}
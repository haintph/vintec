<?php

namespace App\Http\Controllers;

use App\Models\CategorySolution;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CategorySolutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function list(Request $request)
    {
        $query = CategorySolution::query();

        // Tìm kiếm theo tên, description, meta_title, meta_description
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('description', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('meta_title', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('meta_description', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('slug', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Lọc theo trạng thái
        if ($request->filled('status')) {
            $query->where('is_active', $request->get('status'));
        }

        // Sắp xếp
        $sortBy = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        
        // Validate sort parameters
        $allowedSortFields = ['created_at', 'updated_at', 'name', 'sort_order'];
        $allowedDirections = ['asc', 'desc'];
        
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'created_at';
        }
        
        if (!in_array($sortDirection, $allowedDirections)) {
            $sortDirection = 'desc';
        }

        $query->orderBy($sortBy, $sortDirection);

        // Pagination với giữ lại parameters
        $categories = $query->paginate(10)->appends($request->query());
        
        return view('admin.CategorySolution.list', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.CategorySolution.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:category_solutions,slug',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'canonical_url' => 'nullable|url',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);

        // Auto generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Ensure slug is unique
        $originalSlug = $validated['slug'];
        $counter = 1;
        while (CategorySolution::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }

        $category = CategorySolution::create($validated);

        return redirect()
            ->route('category-solution-list')
            ->with('success', 'Danh mục đã được tạo thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function detail($id)
    {
        $category = CategorySolution::findOrFail($id);
        
        return view('admin.CategorySolution.show', compact('category'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $category = CategorySolution::findOrFail($id);
        
        return view('admin.CategorySolution.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = CategorySolution::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                Rule::unique('category_solutions', 'slug')->ignore($category->id)
            ],
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'canonical_url' => 'nullable|url',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);

        // Auto generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Ensure slug is unique (excluding current record)
        $originalSlug = $validated['slug'];
        $counter = 1;
        while (CategorySolution::where('slug', $validated['slug'])
                              ->where('id', '!=', $category->id)
                              ->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }

        $category->update($validated);

        return redirect()
            ->route('category-solution-list')
            ->with('success', 'Danh mục đã được cập nhật thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = CategorySolution::findOrFail($id);
        
        // Check if category is being used by other models
        // Add your relationship checks here if needed
        // Example: if ($category->solutions()->count() > 0) { ... }
        
        $category->delete();

        return redirect()
            ->route('category-solution-list')
            ->with('success', 'Danh mục đã được xóa thành công!');
    }

    /**
     * Toggle active status
     */
    public function toggleStatus($id)
    {
        $category = CategorySolution::findOrFail($id);
        $category->update(['is_active' => !$category->is_active]);

        $status = $category->is_active ? 'kích hoạt' : 'vô hiệu hóa';
        
        return redirect()
            ->route('category-solution-list')
            ->with('success', "Danh mục đã được {$status} thành công!");
    }

    /**
     * Bulk actions
     */
    public function bulkAction(Request $request)
    {
        $request->validate([
            'action' => 'required|in:activate,deactivate,delete',
            'ids' => 'required|array',
            'ids.*' => 'exists:category_solutions,id'
        ]);

        $action = $request->get('action');
        $ids = $request->get('ids');
        
        switch ($action) {
            case 'activate':
                CategorySolution::whereIn('id', $ids)->update(['is_active' => true]);
                $message = 'Đã kích hoạt ' . count($ids) . ' danh mục.';
                break;
                
            case 'deactivate':
                CategorySolution::whereIn('id', $ids)->update(['is_active' => false]);
                $message = 'Đã vô hiệu hóa ' . count($ids) . ' danh mục.';
                break;
                
            case 'delete':
                CategorySolution::whereIn('id', $ids)->delete();
                $message = 'Đã xóa ' . count($ids) . ' danh mục.';
                break;
        }

        return redirect()
            ->route('category-solution-list')
            ->with('success', $message);
    }
}
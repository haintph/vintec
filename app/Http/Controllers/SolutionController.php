<?php

namespace App\Http\Controllers;

use App\Models\Solution;
use App\Models\CategorySolution;
use App\Models\TagSolution;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SolutionController extends Controller
{
    /**
     * Display a listing of solutions (Admin)
     */
    public function list(Request $request)
    {
        $query = Solution::with(['categorySolution', 'tagSolutions', 'user']);

        // Search
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->search($search);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category_solution_id', $request->get('category'));
        }

        // Filter by tag
        if ($request->filled('tag')) {
            $query->byTag($request->get('tag'));
        }

        // Filter by author
        if ($request->filled('author')) {
            $query->where('user_id', $request->get('author'));
        }

        // Filter by featured
        if ($request->filled('featured')) {
            $query->where('is_featured', $request->get('featured'));
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        
        $allowedSorts = ['title', 'created_at', 'published_at', 'view_count', 'status'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDirection);
        }

        $solutions = $query->paginate(15)->withQueryString();

        // Get filter data
        $categories = CategorySolution::active()->orderBy('name')->get();
        $tags = TagSolution::active()->orderBy('name')->get();
        $authors = User::orderBy('name')->get();

        return view('admin.solution.list', compact('solutions', 'categories', 'tags', 'authors'));
    }

    /**
     * Show the form for creating a new solution
     */
    public function create()
    {
        $categories = CategorySolution::active()->orderBy('sort_order')->orderBy('name')->get();
        $tags = TagSolution::active()->orderBy('sort_order')->orderBy('name')->get();

        return view('admin.solution.create', compact('categories', 'tags'));
    }

    /**
     * Store a newly created solution
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:solutions,slug',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_solution_id' => 'nullable|exists:category_solutions,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
            'canonical_url' => 'nullable|url',
            'status' => 'required|in:draft,published,scheduled,archived',
            'published_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'allow_comments' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
            'tag_solution_ids' => 'nullable|array',
            'tag_solution_ids.*' => 'exists:tag_solutions,id'
        ]);

        // Set defaults
        $validated['user_id'] = auth()->id();
        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        $validated['is_featured'] = $validated['is_featured'] ?? false;
        $validated['allow_comments'] = $validated['allow_comments'] ?? true;

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Solution::generateUniqueSlug($validated['title']);
        }

        // Handle published_at
        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $image = $request->file('featured_image');
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('solutions', $filename, 'public');
            $validated['featured_image'] = $path;
        }

        $solution = Solution::create($validated);

        // Attach tags
        if (!empty($validated['tag_solution_ids'])) {
            $solution->tagSolutions()->attach($validated['tag_solution_ids']);
        }

        // Update category post count
        // if ($solution->categorySolution && $solution->status === 'published') {
        //     $solution->categorySolution->updatePostCount();
        // }

        // Update tag post counts
        if ($solution->status === 'published') {
            foreach ($solution->tagSolutions as $tag) {
                $tag->updatePostCount();
            }
        }

        return redirect()->route('solution-list')->with('success', 'Solution đã được tạo thành công!');
    }

    /**
     * Display the specified solution (Admin detail)
     */
    public function detail($id)
    {
        $solution = Solution::with(['categorySolution', 'tagSolutions', 'user'])->findOrFail($id);
        
        return view('admin.solution.detail', compact('solution'));
    }

    /**
     * Show the form for editing the specified solution
     */
    public function edit($id)
    {
        $solution = Solution::with(['categorySolution', 'tagSolutions'])->findOrFail($id);
        $categories = CategorySolution::active()->orderBy('sort_order')->orderBy('name')->get();
        $tags = TagSolution::active()->orderBy('sort_order')->orderBy('name')->get();

        return view('admin.solution.edit', compact('solution', 'categories', 'tags'));
    }

    /**
     * Update the specified solution
     */
    public function update(Request $request, $id)
    {
        $solution = Solution::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                Rule::unique('solutions', 'slug')->ignore($solution->id)
            ],
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_solution_id' => 'nullable|exists:category_solutions,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
            'canonical_url' => 'nullable|url',
            'status' => 'required|in:draft,published,scheduled,archived',
            'published_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'allow_comments' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
            'tag_solution_ids' => 'nullable|array',
            'tag_solution_ids.*' => 'exists:tag_solutions,id'
        ]);

        // Handle slug
        if (empty($validated['slug'])) {
            $validated['slug'] = Solution::generateUniqueSlug($validated['title'], $solution->id);
        }

        // Handle published_at
        if ($validated['status'] === 'published' && empty($validated['published_at']) && $solution->status !== 'published') {
            $validated['published_at'] = now();
        }

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($solution->featured_image) {
                Storage::disk('public')->delete($solution->featured_image);
            }

            $image = $request->file('featured_image');
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('solutions', $filename, 'public');
            $validated['featured_image'] = $path;
        }

        $oldCategoryId = $solution->category_solution_id;
        $oldStatus = $solution->status;
        $oldTagIds = $solution->tagSolutions->pluck('id')->toArray();

        $solution->update($validated);

        // Update tags
        $newTagIds = $validated['tag_solution_ids'] ?? [];
        $solution->tagSolutions()->sync($newTagIds);

        // Update category post counts
        if ($oldCategoryId && $oldCategoryId != $solution->category_solution_id) {
            CategorySolution::find($oldCategoryId)->updatePostCount();
        }
        // if ($solution->categorySolution && $solution->status === 'published') {
        //     $solution->categorySolution->updatePostCount();
        // }

        // Update tag post counts
        $affectedTagIds = array_unique(array_merge($oldTagIds, $newTagIds));
        foreach ($affectedTagIds as $tagId) {
            TagSolution::find($tagId)->updatePostCount();
        }

        return redirect()->route('solution-list')->with('success', 'Solution đã được cập nhật thành công!');
    }

    /**
     * Remove the specified solution
     */
    public function destroy($id)
    {
        $solution = Solution::findOrFail($id);

        $categoryId = $solution->category_solution_id;
        $tagIds = $solution->tagSolutions->pluck('id')->toArray();

        // Delete featured image
        if ($solution->featured_image) {
            Storage::disk('public')->delete($solution->featured_image);
        }

        $solution->delete();

        // Update category post count
        // if ($categoryId) {
        //     CategorySolution::find($categoryId)->updatePostCount();
        // }

        // Update tag post counts
        foreach ($tagIds as $tagId) {
            TagSolution::find($tagId)->updatePostCount();
        }

        return redirect()->route('solution-list')->with('success', 'Solution đã được xóa thành công!');
    }

    /**
     * Toggle solution status
     */
    public function toggleStatus($id)
    {
        $solution = Solution::findOrFail($id);
        
        $newStatus = match($solution->status) {
            'published' => 'draft',
            'draft' => 'published',
            default => 'published'
        };

        if ($newStatus === 'published' && !$solution->published_at) {
            $solution->published_at = now();
        }

        $solution->update(['status' => $newStatus]);

        // Update post counts
        if ($solution->categorySolution) {
            $solution->categorySolution->updatePostCount();
        }
        foreach ($solution->tagSolutions as $tag) {
            $tag->updatePostCount();
        }

        return redirect()->back()->with('success', 'Trạng thái solution đã được cập nhật!');
    }

    /**
     * Bulk actions
     */
    public function bulkAction(Request $request)
    {
        $action = $request->input('action');
        $solutionIds = $request->input('solution_ids', []);

        if (empty($solutionIds)) {
            return redirect()->back()->with('error', 'Vui lòng chọn ít nhất một solution.');
        }

        $solutions = Solution::whereIn('id', $solutionIds)->get();

        switch ($action) {
            case 'publish':
                foreach ($solutions as $solution) {
                    $solution->update([
                        'status' => 'published',
                        'published_at' => $solution->published_at ?? now()
                    ]);
                }
                $message = 'Đã xuất bản ' . count($solutions) . ' solution(s).';
                break;

            case 'draft':
                Solution::whereIn('id', $solutionIds)->update(['status' => 'draft']);
                $message = 'Đã chuyển ' . count($solutions) . ' solution(s) thành bản nháp.';
                break;

            case 'feature':
                Solution::whereIn('id', $solutionIds)->update(['is_featured' => true]);
                $message = 'Đã đánh dấu nổi bật ' . count($solutions) . ' solution(s).';
                break;

            case 'unfeature':
                Solution::whereIn('id', $solutionIds)->update(['is_featured' => false]);
                $message = 'Đã bỏ đánh dấu nổi bật ' . count($solutions) . ' solution(s).';
                break;

            case 'delete':
                foreach ($solutions as $solution) {
                    if ($solution->featured_image) {
                        Storage::disk('public')->delete($solution->featured_image);
                    }
                }
                Solution::whereIn('id', $solutionIds)->delete();
                $message = 'Đã xóa ' . count($solutions) . ' solution(s).';
                break;

            default:
                return redirect()->back()->with('error', 'Hành động không hợp lệ.');
        }

        // Update all affected categories and tags post counts
        $this->updateAllPostCounts();

        return redirect()->back()->with('success', $message);
    }

    /**
     * Update all post counts
     */
    private function updateAllPostCounts()
    {
        CategorySolution::chunk(100, function ($categories) {
            foreach ($categories as $category) {
                $category->updatePostCount();
            }
        });

        TagSolution::chunk(100, function ($tags) {
            foreach ($tags as $tag) {
                $tag->updatePostCount();
            }
        });
    }
}
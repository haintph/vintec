<?php

namespace App\Http\Controllers;

use App\Models\TagSolution;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class TagSolutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function list(Request $request)
    {
        $query = TagSolution::query();

        // Search
        if ($request->filled('search')) {
            $query->search($request->get('search'));
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('is_active', $request->get('status'));
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        
        $allowedSortFields = ['created_at', 'updated_at', 'name', 'sort_order', 'post_count'];
        $allowedDirections = ['asc', 'desc'];
        
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'created_at';
        }
        
        if (!in_array($sortDirection, $allowedDirections)) {
            $sortDirection = 'desc';
        }

        $query->orderBy($sortBy, $sortDirection);

        $tags = $query->paginate(15)->appends($request->query());
        
        return view('admin.TagSolution.list', compact('tags'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.TagSolution.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:tag_solutions,slug',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
            'canonical_url' => 'nullable|url',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);

        // Set default values
        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        $validated['is_active'] = $validated['is_active'] ?? true;

        $tag = TagSolution::create($validated);

        return redirect()
            ->route('tag-solution-list')
            ->with('success', 'Tag đã được tạo thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function detail($id)
    {
        $tag = TagSolution::findOrFail($id);
        
        return view('admin.TagSolution.detail', compact('tag'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $tag = TagSolution::findOrFail($id);
        
        return view('admin.TagSolution.edit', compact('tag'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $tag = TagSolution::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                Rule::unique('tag_solutions', 'slug')->ignore($tag->id)
            ],
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
            'canonical_url' => 'nullable|url',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $tag->update($validated);

        return redirect()
            ->route('tag-solution-list')
            ->with('success', 'Tag đã được cập nhật thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tag = TagSolution::findOrFail($id);
        
        // Check if tag is being used
        if ($tag->post_count > 0) {
            return redirect()
                ->route('tag-solution-list')
                ->with('error', 'Không thể xóa tag này vì đang được sử dụng bởi ' . $tag->post_count . ' bài viết.');
        }
        
        $tag->delete();

        return redirect()
            ->route('tag-solution-list')
            ->with('success', 'Tag đã được xóa thành công!');
    }

    /**
     * Toggle active status
     */
    public function toggleStatus($id)
    {
        $tag = TagSolution::findOrFail($id);
        $tag->update(['is_active' => !$tag->is_active]);

        $status = $tag->is_active ? 'kích hoạt' : 'vô hiệu hóa';
        
        return redirect()
            ->route('tag-solution-list')
            ->with('success', "Tag đã được {$status} thành công!");
    }

    /**
     * Bulk actions
     */
    public function bulkAction(Request $request)
    {
        $request->validate([
            'action' => 'required|in:activate,deactivate,delete',
            'ids' => 'required|array',
            'ids.*' => 'exists:tag_solutions,id'
        ]);

        $action = $request->get('action');
        $ids = $request->get('ids');
        
        switch ($action) {
            case 'activate':
                TagSolution::whereIn('id', $ids)->update(['is_active' => true]);
                $message = 'Đã kích hoạt ' . count($ids) . ' tag.';
                break;
                
            case 'deactivate':
                TagSolution::whereIn('id', $ids)->update(['is_active' => false]);
                $message = 'Đã vô hiệu hóa ' . count($ids) . ' tag.';
                break;
                
            case 'delete':
                // Check if any tag is being used
                $usedTags = TagSolution::whereIn('id', $ids)->where('post_count', '>', 0)->count();
                if ($usedTags > 0) {
                    return redirect()
                        ->route('tag-solution-list')
                        ->with('error', "Không thể xóa {$usedTags} tag vì đang được sử dụng.");
                }
                
                TagSolution::whereIn('id', $ids)->delete();
                $message = 'Đã xóa ' . count($ids) . ' tag.';
                break;
        }

        return redirect()
            ->route('tag-solution-list')
            ->with('success', $message);
    }

    /**
     * Get popular tags
     */
    public function getPopularTags($limit = 10)
    {
        return TagSolution::active()
            ->orderBy('post_count', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Update post counts for all tags
     */
    public function updatePostCounts()
    {
        // This will be implemented when you have posts/solutions relationship
        TagSolution::chunk(100, function ($tags) {
            foreach ($tags as $tag) {
                $tag->updatePostCount();
            }
        });

        return redirect()
            ->route('tag-solution-list')
            ->with('success', 'Đã cập nhật số lượng bài viết cho tất cả tags!');
    }

    /**
     * Frontend: Display all tags
     */
    public function index(Request $request)
    {
        $query = TagSolution::active();

        // Search functionality
        if ($request->filled('search')) {
            $query->search($request->get('search'));
        }

        // Sorting
        $sort = $request->get('sort', 'name');
        switch ($sort) {
            case 'popular':
                $query->orderBy('post_count', 'desc');
                break;
            case 'latest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->orderBy('sort_order', 'asc')->orderBy('name', 'asc');
        }

        $tags = $query->paginate(16)->appends($request->query());
        
        // Get popular tags for sidebar
        $popularTags = $this->getPopularTags(10);

        return view('frontend.tags.index', compact('tags', 'popularTags'));
    }

    /**
     * Frontend: Show single tag with posts
     */
    public function show(Request $request, $slug)
    {
        $tag = TagSolution::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Get posts associated with this tag (this will be implemented with your post model)
        $postsQuery = collect(); // Placeholder - replace with actual post query
        /*
        $postsQuery = Post::whereHas('tags', function($q) use ($tag) {
            $q->where('tag_solutions.id', $tag->id);
        })->where('is_published', true);

        // Sorting
        $sort = $request->get('sort', 'latest');
        switch ($sort) {
            case 'popular':
                $postsQuery->orderBy('views', 'desc');
                break;
            case 'title':
                $postsQuery->orderBy('title', 'asc');
                break;
            default:
                $postsQuery->orderBy('created_at', 'desc');
        }
        */

        $posts = $postsQuery; // Replace with: $postsQuery->paginate(12)->appends($request->query());
        
        // Get related tags (tags that appear together with this tag)
        $relatedTags = TagSolution::active()
            ->where('id', '!=', $tag->id)
            ->orderBy('post_count', 'desc')
            ->limit(8)
            ->get();

        // Get popular tags
        $popularTags = $this->getPopularTags(6);

        return view('frontend.tags.show', compact('tag', 'posts', 'relatedTags', 'popularTags'));
    }

    /**
     * API: Get tags for frontend components
     */
    public function apiIndex(Request $request)
    {
        $query = TagSolution::active();

        if ($request->filled('search')) {
            $query->search($request->get('search'));
        }

        $limit = min($request->get('limit', 10), 50); // Max 50 tags
        $tags = $query->orderBy('post_count', 'desc')
            ->limit($limit)
            ->get(['id', 'name', 'slug', 'color', 'post_count']);

        return response()->json([
            'success' => true,
            'data' => $tags
        ]);
    }

    /**
     * API: Get tag details
     */
    public function apiShow($slug)
    {
        $tag = TagSolution::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $tag
        ]);
    }
}
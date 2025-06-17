<form action="{{ isset($tag) ? route('admin.tags.update', $tag) : route('admin.tags.store') }}" method="POST">
    @csrf
    @if (isset($tag))
        @method('PUT')
    @endif

    <div class="mb-3">
        <label for="name">Tên Tag</label>
        <input type="text" name="name" class="form-control" value="{{ old('name', $tag->name ?? '') }}">
    </div>

    <div class="mb-3">
        <label for="slug">Slug</label>
        <input type="text" name="slug" class="form-control" value="{{ old('slug', $tag->slug ?? '') }}">
    </div>

    <div class="mb-3">
        <label for="meta_title">Meta Title</label>
        <input type="text" name="meta_title" class="form-control" value="{{ old('meta_title', $tag->meta_title ?? '') }}">
    </div>

    <div class="mb-3">
        <label for="meta_description">Meta Description</label>
        <textarea name="meta_description" class="form-control">{{ old('meta_description', $tag->meta_description ?? '') }}</textarea>
    </div>

    <div class="mb-3">
        <label for="meta_keywords">Meta Keywords</label>
        <input type="text" name="meta_keywords" class="form-control" value="{{ old('meta_keywords', $tag->meta_keywords ?? '') }}">
    </div>

    <div class="mb-3">
        <label for="canonical_url">Canonical URL</label>
        <input type="url" name="canonical_url" class="form-control" value="{{ old('canonical_url', $tag->canonical_url ?? '') }}">
    </div>

    <button type="submit" class="btn btn-primary">
        {{ isset($tag) ? 'Cập nhật' : 'Tạo mới' }}
    </button>
</form>

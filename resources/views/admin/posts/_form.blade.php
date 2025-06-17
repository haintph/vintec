{{-- resources/views/admin/posts/_form.blade.php --}}

<div class="row">
    <!-- Main Content -->
    <div class="col-xl-8 col-lg-7">
        <!-- Basic Information -->
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    <iconify-icon icon="solar:document-text-broken" class="align-middle fs-18 me-2"></iconify-icon>
                    Thông tin cơ bản
                </h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="title" class="form-label">
                        <iconify-icon icon="solar:text-bold" class="align-middle fs-16 me-1"></iconify-icon>
                        Tiêu đề <span class="text-danger">*</span>
                    </label>
                    <input type="text" name="title" id="title" 
                        class="form-control @error('title') is-invalid @enderror"
                        value="{{ old('title', $post->title ?? '') }}" 
                        placeholder="Nhập tiêu đề bài viết" required>
                    @error('title')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="slug" class="form-label">
                        <iconify-icon icon="solar:link-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Slug
                    </label>
                    <input type="text" name="slug" id="slug" 
                        class="form-control @error('slug') is-invalid @enderror"
                        value="{{ old('slug', $post->slug ?? '') }}" 
                        placeholder="Slug sẽ được tự động tạo">
                    @error('slug')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="form-text text-muted">
                        <iconify-icon icon="solar:info-circle-broken" class="align-middle fs-14 me-1"></iconify-icon>
                        Để trống để tự động tạo từ tiêu đề
                    </small>
                </div>

                <div class="mb-3">
                    <label for="excerpt" class="form-label">
                        <iconify-icon icon="solar:text-field-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Tóm tắt
                    </label>
                    <textarea name="excerpt" id="excerpt" rows="3" 
                        class="form-control @error('excerpt') is-invalid @enderror"
                        placeholder="Viết tóm tắt ngắn gọn về bài viết">{{ old('excerpt', $post->excerpt ?? '') }}</textarea>
                    @error('excerpt')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="form-text text-muted">
                        Tóm tắt sẽ hiển thị trong danh sách bài viết và RSS feed
                        <span id="excerpt_counter" class="float-end">0/300 ký tự</span>
                    </small>
                </div>

                <div class="mb-3">
                    <label for="content" class="form-label">
                        <iconify-icon icon="solar:document-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Nội dung <span class="text-danger">*</span>
                    </label>
                    <textarea name="content" id="content" rows="12" 
                        class="form-control @error('content') is-invalid @enderror"
                        placeholder="Viết nội dung chi tiết của bài viết..." required>{{ old('content', $post->content ?? '') }}</textarea>
                    @error('content')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>
        </div>

        <!-- SEO Section -->
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    <iconify-icon icon="solar:graph-up-broken" class="align-middle fs-18 me-2"></iconify-icon>
                    Tối ưu SEO
                </h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="meta_title" class="form-label">
                        <iconify-icon icon="solar:text-bold" class="align-middle fs-16 me-1"></iconify-icon>
                        Meta Title
                    </label>
                    <input type="text" name="meta_title" id="meta_title" 
                        class="form-control @error('meta_title') is-invalid @enderror"
                        value="{{ old('meta_title', $post->meta_title ?? '') }}" 
                        placeholder="Tiêu đề SEO" maxlength="255">
                    @error('meta_title')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="form-text text-muted">
                        Tối đa 255 ký tự
                        <span id="meta_title_counter" class="float-end">0/255 ký tự</span>
                    </small>
                </div>

                <div class="mb-3">
                    <label for="meta_description" class="form-label">
                        <iconify-icon icon="solar:text-field-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Meta Description
                    </label>
                    <textarea name="meta_description" id="meta_description" rows="3" 
                        class="form-control @error('meta_description') is-invalid @enderror"
                        placeholder="Mô tả SEO" maxlength="160">{{ old('meta_description', $post->meta_description ?? '') }}</textarea>
                    @error('meta_description')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="form-text text-muted">
                        Khuyến nghị 150-160 ký tự
                        <span id="meta_description_counter" class="float-end">0/160 ký tự</span>
                    </small>
                </div>

                <div class="mb-3">
                    <label for="meta_keywords" class="form-label">
                        <iconify-icon icon="solar:hashtag-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Meta Keywords
                    </label>
                    <input type="text" name="meta_keywords" id="meta_keywords" 
                        class="form-control @error('meta_keywords') is-invalid @enderror"
                        value="{{ old('meta_keywords', $post->meta_keywords ?? '') }}" 
                        placeholder="Từ khóa SEO (cách nhau bởi dấu phẩy)">
                    @error('meta_keywords')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="canonical_url" class="form-label">
                        <iconify-icon icon="solar:global-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Canonical URL
                    </label>
                    <input type="url" name="canonical_url" id="canonical_url" 
                        class="form-control @error('canonical_url') is-invalid @enderror"
                        value="{{ old('canonical_url', $post->canonical_url ?? '') }}" 
                        placeholder="https://example.com/post/post-name">
                    @error('canonical_url')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <!-- SEO Preview -->
                <div class="card bg-light-subtle border-0">
                    <div class="card-header bg-transparent">
                        <h6 class="card-title mb-0">
                            <iconify-icon icon="solar:eye-broken" class="align-middle fs-16 me-1"></iconify-icon>
                            Preview SEO
                        </h6>
                    </div>
                    <div class="card-body">
                        <div id="seo-preview" class="seo-preview-box p-3 bg-white rounded border">
                            <h6 id="preview-title" class="text-primary mb-1 fs-16">
                                {{ old('meta_title', isset($post) ? $post->meta_title : 'Tiêu đề bài viết - Website') }}
                            </h6>
                            <p id="preview-url" class="text-success mb-1 fs-14">
                                {{ url('/post/') }}<span id="preview-slug">{{ old('slug', isset($post) ? $post->slug : 'post-slug') }}</span>
                            </p>
                            <p id="preview-description" class="text-muted mb-0 fs-14">
                                {{ old('meta_description', isset($post) ? $post->meta_description : 'Mô tả meta sẽ hiển thị ở đây...') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Sidebar -->
    <div class="col-xl-4 col-lg-5">
        <!-- Publishing Options -->
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    <iconify-icon icon="solar:settings-broken" class="align-middle fs-18 me-2"></iconify-icon>
                    Tùy chọn xuất bản
                </h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">
                        <iconify-icon icon="solar:calendar-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Ngày đăng
                    </label>
                    <input type="datetime-local" name="published_at" id="published_at"
                        class="form-control @error('published_at') is-invalid @enderror"
                        value="{{ old('published_at', isset($post->published_at) ? $post->published_at->format('Y-m-d\TH:i') : '') }}">
                    @error('published_at')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="form-text text-muted">Để trống để sử dụng thời gian hiện tại</small>
                </div>

                <div class="mb-3">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" 
                               id="is_published" name="is_published" value="1" 
                               {{ old('is_published', $post->is_published ?? true) ? 'checked' : '' }}>
                        <label class="form-check-label" for="is_published">
                            <iconify-icon icon="solar:eye-bold" class="align-middle fs-16 me-1"></iconify-icon>
                            Xuất bản ngay
                        </label>
                    </div>
                    <small class="form-text text-muted">Bài viết sẽ hiển thị công khai khi được xuất bản</small>
                </div>

                @if(isset($post))
                    <div class="bg-light p-3 rounded">
                        <h6 class="mb-2">
                            <iconify-icon icon="solar:info-square-broken" class="align-middle fs-16 me-1"></iconify-icon>
                            Thông tin bài viết
                        </h6>
                        <p class="mb-1"><strong>ID:</strong> #{{ $post->id }}</p>
                        <p class="mb-1"><strong>Lượt xem:</strong> {{ $post->views ?? 0 }}</p>
                        <p class="mb-1"><strong>Ngày tạo:</strong> {{ $post->created_at->format('d/m/Y H:i') }}</p>
                        <p class="mb-0"><strong>Cập nhật:</strong> {{ $post->updated_at->format('d/m/Y H:i') }}</p>
                    </div>
                @endif
            </div>
        </div>

        <!-- Categories & Tags -->
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    <iconify-icon icon="solar:folder-with-files-broken" class="align-middle fs-18 me-2"></iconify-icon>
                    Phân loại
                </h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="category_id" class="form-label">
                        <iconify-icon icon="solar:folder-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Chuyên mục
                    </label>
                    <select name="category_id" id="category_id" 
                        class="form-select @error('category_id') is-invalid @enderror">
                        <option value="">-- Chọn chuyên mục --</option>
                        @foreach ($categories as $cat)
                            <option value="{{ $cat->id }}" 
                                {{ old('category_id', $post->category_id ?? '') == $cat->id ? 'selected' : '' }}>
                                {{ $cat->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('category_id')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="tags" class="form-label">
                        <iconify-icon icon="solar:tag-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        Tags
                    </label>
                    <select name="tags[]" id="tags" multiple 
                        class="form-select @error('tags') is-invalid @enderror" size="6">
                        @foreach($tags as $tag)
                            <option value="{{ $tag->id }}" 
                                {{ in_array($tag->id, old('tags', $selectedTags ?? [])) ? 'selected' : '' }}>
                                {{ $tag->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('tags')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="form-text text-muted">Giữ Ctrl (Windows) hoặc Cmd (Mac) để chọn nhiều tags</small>
                </div>
            </div>
        </div>

        <!-- Featured Image -->
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    <iconify-icon icon="solar:gallery-broken" class="align-middle fs-18 me-2"></iconify-icon>
                    Ảnh đại diện
                </h4>
            </div>
            <div class="card-body">
                @if(isset($post) && $post->thumbnail)
                    <div class="mb-3">
                        <div class="position-relative">
                            <img src="{{ asset('storage/' . $post->thumbnail) }}" 
                                 alt="Current thumbnail" 
                                 class="img-fluid rounded border"
                                 id="current-thumbnail">
                            <div class="position-absolute top-0 end-0 p-2">
                                <span class="badge bg-success">
                                    <iconify-icon icon="solar:check-circle-bold" class="fs-12"></iconify-icon>
                                </span>
                            </div>
                        </div>
                        <small class="text-muted d-block mt-1">Ảnh hiện tại</small>
                    </div>
                @endif

                <div class="mb-3">
                    <input type="file" name="thumbnail" id="thumbnail" 
                        class="form-control @error('thumbnail') is-invalid @enderror"
                        accept="image/*">
                    @error('thumbnail')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="form-text text-muted">
                        <iconify-icon icon="solar:info-circle-broken" class="align-middle fs-14 me-1"></iconify-icon>
                        Định dạng: JPG, PNG, WebP. Tối đa 2MB
                    </small>
                </div>

                <!-- Image preview -->
                <div id="image-preview" class="d-none">
                    <div class="position-relative">
                        <img id="preview-image" class="img-fluid rounded border" alt="Preview">
                        <div class="position-absolute top-0 end-0 p-2">
                            <button type="button" class="btn btn-sm btn-danger" id="remove-image">
                                <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="fs-12"></iconify-icon>
                            </button>
                        </div>
                    </div>
                    <small class="text-muted d-block mt-1">Ảnh mới sẽ upload</small>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Auto generate slug from title
    const titleInput = document.getElementById('title');
    const slugInput = document.getElementById('slug');
    
    titleInput.addEventListener('input', function() {
        const title = this.value;
        
        // Only auto-generate if slug field is empty or user hasn't manually edited it
        if (!slugInput.dataset.userEdited) {
            const slug = title
                .toLowerCase()
                .replace(/đ/g, 'd')
                .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                .replace(/[ìíịỉĩ]/g, 'i')
                .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                .replace(/[ùúụủũưừứựửữ]/g, 'u')
                .replace(/[ỳýỵỷỹ]/g, 'y')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim('-');
            
            slugInput.value = slug;
            updateSeoPreview();
        }
    });

    // Mark slug as user-edited when manually changed
    slugInput.addEventListener('input', function() {
        slugInput.dataset.userEdited = 'true';
        updateSeoPreview();
    });

    // Character counter functions
    function updateCharCounter(inputId, counterId, maxLength) {
        const input = document.getElementById(inputId);
        const counter = document.getElementById(counterId);
        
        if (input && counter) {
            const updateCounter = function() {
                const length = input.value.length;
                counter.textContent = `${length}/${maxLength} ký tự`;
                
                // Reset classes
                counter.classList.remove('text-warning', 'text-danger');
                
                if (length > maxLength * 0.9) {
                    counter.classList.add('text-warning');
                }
                
                if (length > maxLength) {
                    counter.classList.add('text-danger');
                    counter.classList.remove('text-warning');
                }
            };
            
            // Initial count
            updateCounter();
            
            // Update on input
            input.addEventListener('input', updateCounter);
        }
    }

    // Initialize character counters
    updateCharCounter('meta_title', 'meta_title_counter', 255);
    updateCharCounter('meta_description', 'meta_description_counter', 160);
    updateCharCounter('excerpt', 'excerpt_counter', 300);

    // SEO Preview Update
    function updateSeoPreview() {
        const titleValue = document.getElementById('title').value;
        const slugValue = document.getElementById('slug').value;
        const metaTitleValue = document.getElementById('meta_title').value;
        const metaDescriptionValue = document.getElementById('meta_description').value;
        
        // Update preview title
        const previewTitle = document.getElementById('preview-title');
        previewTitle.textContent = metaTitleValue || (titleValue ? titleValue + ' - Website' : 'Tiêu đề bài viết - Website');
        
        // Update preview URL
        const previewSlug = document.getElementById('preview-slug');
        previewSlug.textContent = slugValue || 'post-slug';
        
        // Update preview description
        const previewDescription = document.getElementById('preview-description');
        previewDescription.textContent = metaDescriptionValue || 'Mô tả meta sẽ hiển thị ở đây...';
    }

    // Add event listeners for SEO preview
    document.getElementById('title').addEventListener('input', updateSeoPreview);
    document.getElementById('meta_title').addEventListener('input', updateSeoPreview);
    document.getElementById('meta_description').addEventListener('input', updateSeoPreview);
    
    // Initial SEO preview update
    updateSeoPreview();

    // Image upload preview
    const thumbnailInput = document.getElementById('thumbnail');
    const imagePreview = document.getElementById('image-preview');
    const previewImage = document.getElementById('preview-image');
    const removeImageBtn = document.getElementById('remove-image');
    const currentThumbnail = document.getElementById('current-thumbnail');

    thumbnailInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                imagePreview.classList.remove('d-none');
                if (currentThumbnail) {
                    currentThumbnail.parentElement.parentElement.classList.add('d-none');
                }
            };
            reader.readAsDataURL(file);
        }
    });

    removeImageBtn.addEventListener('click', function() {
        thumbnailInput.value = '';
        imagePreview.classList.add('d-none');
        if (currentThumbnail) {
            currentThumbnail.parentElement.parentElement.classList.remove('d-none');
        }
    });

    // Auto set current datetime for published_at if empty
    const publishedAtInput = document.getElementById('published_at');
    if (!publishedAtInput.value) {
        const now = new Date();
        const formatted = now.getFullYear() + '-' + 
                         String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                         String(now.getDate()).padStart(2, '0') + 'T' + 
                         String(now.getHours()).padStart(2, '0') + ':' + 
                         String(now.getMinutes()).padStart(2, '0');
        publishedAtInput.value = formatted;
    }
});
</script>

<style>
.seo-preview-box {
    font-family: Arial, sans-serif;
    line-height: 1.4;
}

.seo-preview-box h6 {
    cursor: pointer;
    text-decoration: underline;
}

.seo-preview-box h6:hover {
    text-decoration: none;
}

.form-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.bg-light-subtle {
    background-color: rgba(248, 249, 250, 0.5) !important;
}

.text-warning {
    color: #ffc107 !important;
}

.text-danger {
    color: #dc3545 !important;
}

.form-select[multiple] {
    background-image: none;
}

.form-select[multiple] option:checked {
    background-color: #0d6efd;
    color: white;
}

#image-preview img {
    max-height: 200px;
    object-fit: cover;
}

#current-thumbnail {
    max-height: 200px;
    object-fit: cover;
}

.position-relative .position-absolute {
    z-index: 1;
}
</style>
@endpush
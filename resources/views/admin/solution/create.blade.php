@extends('admin.layouts.masters')

@section('title', 'Tạo Solution Mới')

@section('content')
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">Tạo Solution Mới</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                            <li class="breadcrumb-item"><a href="{{ route('solution-list') }}">Solutions</a></li>
                            <li class="breadcrumb-item active">Tạo mới</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form -->
        <form action="{{ route('solution_store') }}" method="POST" enctype="multipart/form-data" id="solutionForm">
            @csrf
            <div class="row">
                <!-- Main Content -->
                <div class="col-lg-8">
                    <!-- Basic Information -->
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="fas fa-info-circle me-2"></i>
                                Thông tin cơ bản
                            </h5>
                        </div>
                        <div class="card-body">
                            <!-- Title -->
                            <div class="mb-3">
                                <label for="title" class="form-label">Tiêu đề <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('title') is-invalid @enderror" 
                                       id="title" name="title" value="{{ old('title') }}" 
                                       placeholder="Nhập tiêu đề solution" required>
                                @error('title')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Slug -->
                            <div class="mb-3">
                                <label for="slug" class="form-label">Slug</label>
                                <div class="input-group">
                                    <span class="input-group-text">{{ url('/solution/') }}/</span>
                                    <input type="text" class="form-control @error('slug') is-invalid @enderror" 
                                           id="slug" name="slug" value="{{ old('slug') }}" 
                                           placeholder="Slug sẽ được tạo tự động">
                                </div>
                                <div class="form-text">
                                    <i class="fas fa-info-circle me-1"></i>
                                    Để trống để tự động tạo từ tiêu đề
                                </div>
                                @error('slug')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Excerpt -->
                            <div class="mb-3">
                                <label for="excerpt" class="form-label">Tóm tắt</label>
                                <textarea class="form-control @error('excerpt') is-invalid @enderror" 
                                          id="excerpt" name="excerpt" rows="3"
                                          placeholder="Nhập tóm tắt ngắn về solution">{{ old('excerpt') }}</textarea>
                                <div class="d-flex justify-content-between">
                                    <div class="form-text">Tóm tắt hiển thị trong danh sách và chia sẻ</div>
                                    <small class="text-muted">
                                        <span id="excerpt_count">0</span>/500 ký tự
                                    </small>
                                </div>
                                @error('excerpt')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Content -->
                            <div class="mb-3">
                                <label for="content" class="form-label">Nội dung <span class="text-danger">*</span></label>
                                <textarea class="form-control @error('content') is-invalid @enderror" 
                                          id="content" name="content" rows="15" required>{{ old('content') }}</textarea>
                                @error('content')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Featured Image -->
                            <div class="mb-3">
                                <label for="featured_image" class="form-label">Ảnh đại diện</label>
                                <input type="file" class="form-control @error('featured_image') is-invalid @enderror" 
                                       id="featured_image" name="featured_image" accept="image/*">
                                <div class="form-text">
                                    Định dạng: JPG, PNG, GIF. Kích thước tối đa: 2MB
                                </div>
                                @error('featured_image')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                                
                                <!-- Image Preview -->
                                <div id="image_preview" class="mt-2" style="display: none;">
                                    <img id="preview_img" src="" alt="Preview" class="img-thumbnail" style="max-width: 200px;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SEO Settings -->
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="fas fa-search me-2"></i>
                                Tối ưu SEO
                            </h5>
                        </div>
                        <div class="card-body">
                            <!-- Meta Title -->
                            <div class="mb-3">
                                <label for="meta_title" class="form-label">Meta Title</label>
                                <input type="text" class="form-control @error('meta_title') is-invalid @enderror" 
                                       id="meta_title" name="meta_title" value="{{ old('meta_title') }}" 
                                       placeholder="Tiêu đề SEO (để trống sẽ dùng tiêu đề chính)">
                                <div class="d-flex justify-content-between">
                                    <div class="form-text">Tiêu đề hiển thị trên Google (50-60 ký tự)</div>
                                    <small class="text-muted">
                                        <span id="meta_title_count">0</span>/255 ký tự
                                    </small>
                                </div>
                                @error('meta_title')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Meta Description -->
                            <div class="mb-3">
                                <label for="meta_description" class="form-label">Meta Description</label>
                                <textarea class="form-control @error('meta_description') is-invalid @enderror" 
                                          id="meta_description" name="meta_description" rows="3"
                                          placeholder="Mô tả SEO hiển thị trên Google">{{ old('meta_description') }}</textarea>
                                <div class="d-flex justify-content-between">
                                    <div class="form-text">Mô tả hiển thị trên Google (150-160 ký tự)</div>
                                    <small class="text-muted">
                                        <span id="meta_description_count">0</span>/500 ký tự
                                    </small>
                                </div>
                                @error('meta_description')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Meta Keywords -->
                            <div class="mb-3">
                                <label for="meta_keywords" class="form-label">Meta Keywords</label>
                                <input type="text" class="form-control @error('meta_keywords') is-invalid @enderror" 
                                       id="meta_keywords" name="meta_keywords" value="{{ old('meta_keywords') }}" 
                                       placeholder="từ khóa 1, từ khóa 2, từ khóa 3">
                                <div class="form-text">Các từ khóa cách nhau bằng dấu phẩy</div>
                                @error('meta_keywords')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Canonical URL -->
                            <div class="mb-3">
                                <label for="canonical_url" class="form-label">Canonical URL</label>
                                <input type="url" class="form-control @error('canonical_url') is-invalid @enderror" 
                                       id="canonical_url" name="canonical_url" value="{{ old('canonical_url') }}" 
                                       placeholder="https://example.com/solution/slug">
                                <div class="form-text">URL chính thức của trang (để trống sẽ tự động tạo)</div>
                                @error('canonical_url')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- SEO Preview -->
                            <div class="card bg-light">
                                <div class="card-header">
                                    <h6 class="mb-0">
                                        <i class="fab fa-google me-2"></i>
                                        Preview SEO
                                    </h6>
                                </div>
                                <div class="card-body">
                                    <div class="seo-preview">
                                        <div class="seo-title text-primary" id="seo_title_preview">
                                            Tiêu đề Solution - Your Site
                                        </div>
                                        <div class="seo-url text-success small" id="seo_url_preview">
                                            {{ url('/solution/new-solution') }}
                                        </div>
                                        <div class="seo-description text-muted small" id="seo_description_preview">
                                            Mô tả ngắn về solution của bạn sẽ hiển thị ở đây...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="col-lg-4">
                    <!-- Publish Options -->
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="fas fa-rocket me-2"></i>
                                Tùy chọn xuất bản
                            </h5>
                        </div>
                        <div class="card-body">
                            <!-- Status -->
                            <div class="mb-3">
                                <label for="status" class="form-label">Trạng thái</label>
                                <select class="form-select @error('status') is-invalid @enderror" 
                                        id="status" name="status" required>
                                    <option value="draft" {{ old('status', 'draft') === 'draft' ? 'selected' : '' }}>
                                        Bản nháp
                                    </option>
                                    <option value="published" {{ old('status') === 'published' ? 'selected' : '' }}>
                                        Xuất bản
                                    </option>
                                    <option value="scheduled" {{ old('status') === 'scheduled' ? 'selected' : '' }}>
                                        Lên lịch
                                    </option>
                                </select>
                                @error('status')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Published At -->
                            <div class="mb-3" id="published_at_group">
                                <label for="published_at" class="form-label">Ngày đăng</label>
                                <input type="datetime-local" class="form-control @error('published_at') is-invalid @enderror" 
                                       id="published_at" name="published_at" value="{{ old('published_at') }}">
                                <div class="form-text">Để trống để xuất bản ngay</div>
                                @error('published_at')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Featured -->
                            <div class="mb-3">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="is_featured" 
                                           name="is_featured" value="1" {{ old('is_featured') ? 'checked' : '' }}>
                                    <label class="form-check-label" for="is_featured">
                                        <i class="fas fa-star text-warning me-1"></i>
                                        Đánh dấu nổi bật
                                    </label>
                                </div>
                            </div>

                            <!-- Allow Comments -->
                            <div class="mb-3">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="allow_comments" 
                                           name="allow_comments" value="1" {{ old('allow_comments', true) ? 'checked' : '' }}>
                                    <label class="form-check-label" for="allow_comments">
                                        <i class="fas fa-comments text-info me-1"></i>
                                        Cho phép bình luận
                                    </label>
                                </div>
                            </div>

                            <!-- Sort Order -->
                            <div class="mb-3">
                                <label for="sort_order" class="form-label">Thứ tự sắp xếp</label>
                                <input type="number" class="form-control @error('sort_order') is-invalid @enderror" 
                                       id="sort_order" name="sort_order" value="{{ old('sort_order', 0) }}" min="0">
                                <div class="form-text">Số thứ tự để sắp xếp solution</div>
                                @error('sort_order')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <!-- Category -->
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="fas fa-folder me-2"></i>
                                Phân loại
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="category_solution_id" class="form-label">Chuyên mục</label>
                                <select class="form-select @error('category_solution_id') is-invalid @enderror" 
                                        id="category_solution_id" name="category_solution_id">
                                    <option value="">-- Chọn chuyên mục --</option>
                                    @foreach($categories as $category)
                                        <option value="{{ $category->id }}" 
                                                {{ old('category_solution_id') == $category->id ? 'selected' : '' }}>
                                            {{ $category->name }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('category_solution_id')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <!-- Tags -->
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="fas fa-tags me-2"></i>
                                Tags
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <div class="tags-container" style="max-height: 200px; overflow-y: auto;">
                                    @foreach($tags as $tag)
                                        <div class="form-check mb-2">
                                            <input type="checkbox" class="form-check-input" 
                                                   id="tag_{{ $tag->id }}" name="tag_solution_ids[]" 
                                                   value="{{ $tag->id }}"
                                                   {{ in_array($tag->id, old('tag_solution_ids', [])) ? 'checked' : '' }}>
                                            <label class="form-check-label" for="tag_{{ $tag->id }}">
                                                <span class="badge bg-primary me-1">#</span>
                                                {{ $tag->name }}
                                                <small class="text-muted">({{ $tag->post_count }})</small>
                                            </label>
                                        </div>
                                    @endforeach
                                </div>
                                @if($tags->isEmpty())
                                    <p class="text-muted small">
                                        <i class="fas fa-info-circle me-1"></i>
                                        Chưa có tag nào. 
                                        <a href="{{ route('tag-solution-create') }}" target="_blank">Tạo tag mới</a>
                                    </p>
                                @endif
                            </div>
                        </div>
                    </div>

                    <!-- Statistics (if editing) -->
                    <div class="card" id="stats_card" style="display: none;">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="fas fa-chart-bar me-2"></i>
                                Thống kê bài viết
                            </h5>
                        </div>
                        <div class="card-body text-center">
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-2">
                                        <i class="fas fa-eye text-primary fs-4"></i>
                                    </div>
                                    <div>
                                        <div class="fw-bold">0</div>
                                        <small class="text-muted">Lượt xem</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-2">
                                        <i class="fas fa-heart text-danger fs-4"></i>
                                    </div>
                                    <div>
                                        <div class="fw-bold">0</div>
                                        <small class="text-muted">Lượt thích</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-2">
                                        <i class="fas fa-comments text-info fs-4"></i>
                                    </div>
                                    <div>
                                        <div class="fw-bold">0</div>
                                        <small class="text-muted">Bình luận</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <button type="button" class="btn btn-light" onclick="resetForm()">
                                        <i class="fas fa-undo me-2"></i>Reset
                                    </button>
                                </div>
                                <div>
                                    <a href="{{ route('solution-list') }}" class="btn btn-secondary me-2">
                                        <i class="fas fa-times me-2"></i>Hủy
                                    </a>
                                    <button type="submit" class="btn btn-primary" name="action" value="save">
                                        <i class="fas fa-save me-2"></i>Lưu Solution
                                    </button>
                                    <button type="submit" class="btn btn-success" name="action" value="save_and_publish">
                                        <i class="fas fa-rocket me-2"></i>Lưu & Xuất bản
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <!-- Scripts -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const titleInput = document.getElementById('title');
            const slugInput = document.getElementById('slug');
            const excerptInput = document.getElementById('excerpt');
            const metaTitleInput = document.getElementById('meta_title');
            const metaDescriptionInput = document.getElementById('meta_description');
            const canonicalUrlInput = document.getElementById('canonical_url');
            const statusSelect = document.getElementById('status');
            const publishedAtGroup = document.getElementById('published_at_group');
            const featuredImageInput = document.getElementById('featured_image');

            // Auto generate slug from title
            titleInput.addEventListener('input', function() {
                if (!slugInput.value || slugInput.value === slugify(titleInput.dataset.oldValue || '')) {
                    slugInput.value = slugify(this.value);
                }
                titleInput.dataset.oldValue = this.value;
                updateSEOPreview();
            });

            // Update SEO preview when inputs change
            [titleInput, slugInput, metaTitleInput, metaDescriptionInput, canonicalUrlInput].forEach(input => {
                input.addEventListener('input', updateSEOPreview);
            });

            // Character counters
            excerptInput.addEventListener('input', function() {
                updateCharCounter('excerpt_count', this.value.length);
            });

            metaTitleInput.addEventListener('input', function() {
                updateCharCounter('meta_title_count', this.value.length);
            });

            metaDescriptionInput.addEventListener('input', function() {
                updateCharCounter('meta_description_count', this.value.length);
            });

            // Show/hide published_at based on status
            statusSelect.addEventListener('change', function() {
                if (this.value === 'draft') {
                    publishedAtGroup.style.display = 'none';
                } else {
                    publishedAtGroup.style.display = 'block';
                }
            });

            // Featured image preview
            featuredImageInput.addEventListener('change', function() {
                const file = this.files[0];
                const preview = document.getElementById('image_preview');
                const previewImg = document.getElementById('preview_img');

                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImg.src = e.target.result;
                        preview.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                } else {
                    preview.style.display = 'none';
                }
            });

            // Initialize
            updateSEOPreview();
            updateCharCounter('excerpt_count', excerptInput.value.length);
            updateCharCounter('meta_title_count', metaTitleInput.value.length);
            updateCharCounter('meta_description_count', metaDescriptionInput.value.length);
        });

        function slugify(text) {
            return text
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[đĐ]/g, 'd')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim('-');
        }

        function updateCharCounter(elementId, count) {
            document.getElementById(elementId).textContent = count;
        }

        function updateSEOPreview() {
            const title = document.getElementById('title').value || 'Tiêu đề Solution';
            const slug = document.getElementById('slug').value || 'new-solution';
            const metaTitle = document.getElementById('meta_title').value || title;
            const metaDescription = document.getElementById('meta_description').value || 'Mô tả ngắn về solution của bạn sẽ hiển thị ở đây...';
            const canonicalUrl = document.getElementById('canonical_url').value || `{{ url('/solution') }}/${slug}`;

            document.getElementById('seo_title_preview').textContent = metaTitle + ' - Your Site';
            document.getElementById('seo_url_preview').textContent = canonicalUrl;
            document.getElementById('seo_description_preview').textContent = metaDescription;
        }

        function resetForm() {
            if (confirm('Bạn có chắc chắn muốn reset form không? Tất cả dữ liệu đã nhập sẽ bị mất.')) {
                document.getElementById('solutionForm').reset();
                document.getElementById('image_preview').style.display = 'none';
                updateCharCounter('excerpt_count', 0);
                updateCharCounter('meta_title_count', 0);
                updateCharCounter('meta_description_count', 0);
                updateSEOPreview();
            }
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                document.getElementById('solutionForm').submit();
            }
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                resetForm();
            }
        });
    </script>
@endsection
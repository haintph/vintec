@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">

        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="card-title">Edit Tag Solution: {{ $tag->name }}</h4>
                            <div class="btn-group">
                                <a href="{{ route('tag_solution_detail', $tag->id) }}" class="btn btn-sm btn-outline-info">
                                    <iconify-icon icon="solar:eye-broken" class="me-1"></iconify-icon>
                                    View Details
                                </a>
                                <a href="{{ route('tag-solution-list') }}" class="btn btn-sm btn-outline-primary">
                                    <iconify-icon icon="solar:arrow-left-broken" class="me-1"></iconify-icon>
                                    Back to List
                                </a>
                            </div>
                        </div>
                    </div>

                    @if (session('error'))
                        <div class="alert alert-danger mx-3">
                            {{ session('error') }}
                        </div>
                    @endif

                    @if ($errors->any())
                        <div class="alert alert-danger mx-3">
                            <ul class="mb-0">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('tag_solution_update', $tag->id) }}" method="POST" id="tagForm">
                        @csrf
                        @method('PUT')
                        
                        <div class="card-body">
                            <div class="row">
                                <!-- Left Column -->
                                <div class="col-lg-8">
                                    <!-- Basic Information -->
                                    <div class="card border mb-3">
                                        <div class="card-header bg-light">
                                            <h5 class="card-title mb-0">
                                                <iconify-icon icon="solar:info-circle-broken" class="me-2"></iconify-icon>
                                                Thông tin cơ bản
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="name" class="form-label">Tên Tag <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="name" name="name" 
                                                               value="{{ old('name', $tag->name) }}" placeholder="Nhập tên tag..." required>
                                                        <div class="form-text">Tên hiển thị của tag</div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="slug" class="form-label">Slug</label>
                                                        <input type="text" class="form-control" id="slug" name="slug" 
                                                               value="{{ old('slug', $tag->slug) }}" placeholder="Auto generate from name">
                                                        <div class="form-text">Để trống để tự động tạo từ tên tag</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="sort_order" class="form-label">Thứ tự sắp xếp</label>
                                                        <input type="number" class="form-control" id="sort_order" name="sort_order" 
                                                               value="{{ old('sort_order', $tag->sort_order) }}" min="0">
                                                        <div class="form-text">Số thứ tự để sắp xếp tag</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="description" class="form-label">Mô tả</label>
                                                <textarea class="form-control" id="description" name="description" rows="4" 
                                                          placeholder="Nhập mô tả về tag...">{{ old('description', $tag->description) }}</textarea>
                                                <div class="form-text">Mô tả chi tiết về tag này</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- SEO Settings -->
                                    <div class="card border mb-3">
                                        <div class="card-header bg-light">
                                            <h5 class="card-title mb-0">
                                                <iconify-icon icon="solar:seo-broken" class="me-2"></iconify-icon>
                                                Cài đặt SEO
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="mb-3">
                                                <label for="meta_title" class="form-label">Meta Title</label>
                                                <input type="text" class="form-control" id="meta_title" name="meta_title" 
                                                       value="{{ old('meta_title', $tag->meta_title) }}" maxlength="255" placeholder="Tiêu đề SEO...">
                                                <div class="d-flex justify-content-between">
                                                    <div class="form-text">Tối đa 255 ký tự</div>
                                                    <small class="text-muted"><span id="meta_title_count">{{ strlen(old('meta_title', $tag->meta_title ?? '')) }}</span>/255 ký tự</small>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="meta_description" class="form-label">Meta Description</label>
                                                <textarea class="form-control" id="meta_description" name="meta_description" rows="3"
                                                          maxlength="500" placeholder="Mô tả SEO...">{{ old('meta_description', $tag->meta_description) }}</textarea>
                                                <div class="d-flex justify-content-between">
                                                    <div class="form-text">Khuyến nghị 150-160 ký tự</div>
                                                    <small class="text-muted"><span id="meta_description_count">{{ strlen(old('meta_description', $tag->meta_description ?? '')) }}</span>/500 ký tự</small>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="meta_keywords" class="form-label">Meta Keywords</label>
                                                <input type="text" class="form-control" id="meta_keywords" name="meta_keywords" 
                                                       value="{{ old('meta_keywords', $tag->meta_keywords) }}" placeholder="keyword1, keyword2, keyword3...">
                                                <div class="form-text">Các từ khóa cách nhau bằng dấu phẩy</div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="canonical_url" class="form-label">Canonical URL</label>
                                                <input type="url" class="form-control" id="canonical_url" name="canonical_url" 
                                                       value="{{ old('canonical_url', $tag->canonical_url) }}" placeholder="https://example.com/tag/tag-name">
                                                <div class="form-text">URL chuẩn của trang tag</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="col-lg-4">
                                    <!-- Publish Settings -->
                                    <div class="card border mb-3">
                                        <div class="card-header bg-light">
                                            <h5 class="card-title mb-0">
                                                <iconify-icon icon="solar:settings-broken" class="me-2"></iconify-icon>
                                                Cài đặt
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="mb-3">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="is_active" name="is_active" 
                                                           value="1" {{ old('is_active', $tag->is_active) ? 'checked' : '' }}>
                                                    <label class="form-check-label" for="is_active">
                                                        Kích hoạt tag
                                                    </label>
                                                </div>
                                                <div class="form-text">Tag sẽ hiển thị công khai khi được kích hoạt</div>
                                            </div>

                                            <div class="d-grid gap-2">
                                                <button type="submit" class="btn btn-primary">
                                                    <iconify-icon icon="solar:pen-2-broken" class="me-1"></iconify-icon>
                                                    Cập nhật Tag
                                                </button>
                                                <button type="button" class="btn btn-outline-secondary" onclick="resetToOriginal()">
                                                    <iconify-icon icon="solar:refresh-broken" class="me-1"></iconify-icon>
                                                    Reset về ban đầu
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tag Stats -->
                                    <div class="card border mb-3">
                                        <div class="card-header bg-light">
                                            <h5 class="card-title mb-0">
                                                <iconify-icon icon="solar:chart-2-broken" class="me-2"></iconify-icon>
                                                Thống kê
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row text-center">
                                                <div class="col-6">
                                                    <div class="border-end">
                                                        <h4 class="text-primary mb-0">{{ $tag->post_count }}</h4>
                                                        <small class="text-muted">Bài viết</small>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <h4 class="text-info mb-0">#{{ $tag->id }}</h4>
                                                    <small class="text-muted">ID</small>
                                                </div>
                                            </div>
                                            <hr class="my-3">
                                            <div class="small text-muted">
                                                <div class="d-flex justify-content-between mb-1">
                                                    <span>Ngày tạo:</span>
                                                    <span>{{ $tag->created_at->format('d/m/Y H:i') }}</span>
                                                </div>
                                                <div class="d-flex justify-content-between">
                                                    <span>Cập nhật:</span>
                                                    <span>{{ $tag->updated_at->format('d/m/Y H:i') }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tag Preview -->
                                    <div class="card border mb-3">
                                        <div class="card-header bg-light">
                                            <h5 class="card-title mb-0">
                                                <iconify-icon icon="solar:eye-broken" class="me-2"></iconify-icon>
                                                Preview Tag
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div id="tag_preview" class="text-center p-3 border rounded" style="background-color: #f8f9fa;">
                                                <span class="badge bg-primary fs-6 px-3 py-2" id="preview_badge">
                                                    <iconify-icon icon="solar:hashtag-broken" class="me-1"></iconify-icon>
                                                    {{ $tag->name }}
                                                </span>
                                                <div class="mt-2">
                                                    <small class="text-muted" id="preview_url">URL: /tag/{{ $tag->slug }}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- SEO Preview -->
                                    <div class="card border">
                                        <div class="card-header bg-light">
                                            <h5 class="card-title mb-0">
                                                <iconify-icon icon="solar:magnifer-broken" class="me-2"></iconify-icon>
                                                Preview SEO
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="border rounded p-3" style="background-color: #f8f9fa;">
                                                <div class="mb-1">
                                                    <a href="#" class="text-decoration-none" id="seo_title_preview">{{ $tag->formatted_meta_title }}</a>
                                                </div>
                                                <div class="mb-1">
                                                    <small class="text-success" id="seo_url_preview">{{ $tag->canonical_url ?: $tag->url }}</small>
                                                </div>
                                                <div>
                                                    <small class="text-muted" id="seo_description_preview">{{ $tag->formatted_meta_description }}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
    <!-- End Container Fluid -->

    <!-- Enhanced JavaScript -->
    <script>
        // Store original values for reset functionality
        const originalValues = {
            name: '{{ $tag->name }}',
            slug: '{{ $tag->slug }}',
            sort_order: '{{ $tag->sort_order }}',
            description: '{{ $tag->description ?? "" }}',
            meta_title: '{{ $tag->meta_title ?? "" }}',
            meta_description: '{{ $tag->meta_description ?? "" }}',
            meta_keywords: '{{ $tag->meta_keywords ?? "" }}',
            canonical_url: '{{ $tag->canonical_url ?? "" }}',
            is_active: {{ $tag->is_active ? 'true' : 'false' }}
        };

        document.addEventListener('DOMContentLoaded', function() {
            const nameInput = document.getElementById('name');
            const slugInput = document.getElementById('slug');
            const metaTitleInput = document.getElementById('meta_title');
            const metaDescriptionInput = document.getElementById('meta_description');
            const canonicalUrlInput = document.getElementById('canonical_url');

            // Auto generate slug from name (only if user hasn't manually changed it)
            let slugManuallyChanged = false;
            
            slugInput.addEventListener('input', function() {
                slugManuallyChanged = true;
                updatePreviews();
            });

            nameInput.addEventListener('input', function() {
                if (!slugManuallyChanged) {
                    slugInput.value = slugify(this.value);
                }
                updatePreviews();
            });

            // Character counters
            metaTitleInput.addEventListener('input', function() {
                updateCharCounter('meta_title_count', this.value.length);
                updatePreviews();
            });

            metaDescriptionInput.addEventListener('input', function() {
                updateCharCounter('meta_description_count', this.value.length);
                updatePreviews();
            });

            // Update previews on input changes
            document.getElementById('description').addEventListener('input', updatePreviews);
            canonicalUrlInput.addEventListener('input', updatePreviews);

            // Mark form as dirty when changes are made
            let formDirty = false;
            const formInputs = document.querySelectorAll('#tagForm input, #tagForm textarea, #tagForm select');
            formInputs.forEach(input => {
                input.addEventListener('input', () => formDirty = true);
                input.addEventListener('change', () => formDirty = true);
            });

            // Warn user about unsaved changes
            window.addEventListener('beforeunload', function(e) {
                if (formDirty) {
                    e.preventDefault();
                    e.returnValue = '';
                }
            });

            // Remove warning when form is submitted
            document.getElementById('tagForm').addEventListener('submit', function() {
                formDirty = false;
            });

            // Initial update
            updatePreviews();
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
            const element = document.getElementById(elementId);
            element.textContent = count;
            
            // Add warning color if approaching limit
            const parent = element.closest('.d-flex').querySelector('.text-muted');
            if (elementId === 'meta_title_count' && count > 230) {
                parent.classList.add('text-warning');
            } else if (elementId === 'meta_description_count' && count > 450) {
                parent.classList.add('text-warning');
            } else {
                parent.classList.remove('text-warning');
            }
        }

        function updatePreviews() {
            const name = document.getElementById('name').value || originalValues.name;
            const slug = document.getElementById('slug').value || originalValues.slug;
            const metaTitle = document.getElementById('meta_title').value || name;
            const metaDescription = document.getElementById('meta_description').value || 'Tag description...';
            const canonicalUrl = document.getElementById('canonical_url').value || `https://example.com/tag/${slug}`;

            // Update tag preview
            const previewBadge = document.getElementById('preview_badge');
            previewBadge.innerHTML = `<iconify-icon icon="solar:hashtag-broken" class="me-1"></iconify-icon>${name}`;

            document.getElementById('preview_url').textContent = `URL: /tag/${slug}`;

            // Update SEO preview
            document.getElementById('seo_title_preview').textContent = metaTitle;
            document.getElementById('seo_url_preview').textContent = canonicalUrl;
            document.getElementById('seo_description_preview').textContent = metaDescription;
        }

        function resetToOriginal() {
            if (confirm('Bạn có chắc chắn muốn reset về giá trị ban đầu không? Tất cả thay đổi chưa lưu sẽ bị mất.')) {
                // Reset all form fields to original values
                document.getElementById('name').value = originalValues.name;
                document.getElementById('slug').value = originalValues.slug;
                document.getElementById('sort_order').value = originalValues.sort_order;
                document.getElementById('description').value = originalValues.description;
                document.getElementById('meta_title').value = originalValues.meta_title;
                document.getElementById('meta_description').value = originalValues.meta_description;
                document.getElementById('meta_keywords').value = originalValues.meta_keywords;
                document.getElementById('canonical_url').value = originalValues.canonical_url;
                document.getElementById('is_active').checked = originalValues.is_active;

                // Update character counters
                updateCharCounter('meta_title_count', originalValues.meta_title.length);
                updateCharCounter('meta_description_count', originalValues.meta_description.length);
                
                // Update previews
                updatePreviews();
                
                // Mark form as clean
                formDirty = false;
            }
        }

        // Form validation
        document.getElementById('tagForm').addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            
            if (!name) {
                e.preventDefault();
                alert('Vui lòng nhập tên tag!');
                document.getElementById('name').focus();
                return false;
            }

            if (name.length < 2) {
                e.preventDefault();
                alert('Tên tag phải có ít nhất 2 ký tự!');
                document.getElementById('name').focus();
                return false;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<iconify-icon icon="solar:loader-broken" class="me-1"></iconify-icon>Đang cập nhật...';
            submitBtn.disabled = true;

            // Restore button if form validation fails
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        document.getElementById('tagForm').dispatchEvent(new Event('submit'));
                        break;
                    case 'r':
                        e.preventDefault();
                        resetToOriginal();
                        break;
                }
            }
        });
    </script>

    <!-- ========== Footer Start ========== -->
    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center">
                    <script>document.write(new Date().getFullYear())</script> &copy; Larkon. 
                    Crafted by <iconify-icon icon="iconamoon:heart-duotone" class="fs-18 align-middle text-danger"></iconify-icon> 
                    <a href="https://1.envato.market/techzaa" class="fw-bold footer-text" target="_blank">Techzaa</a>
                </div>
            </div>
        </div>
    </footer>
    <!-- ========== Footer End ========== -->
@endsection
@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">

        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="card-title">Create New Tag Solution</h4>
                            <a href="{{ route('tag-solution-list') }}" class="btn btn-sm btn-outline-primary">
                                <iconify-icon icon="solar:arrow-left-broken" class="me-1"></iconify-icon>
                                Back to List
                            </a>
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

                    <form action="{{ route('tag_solution_store') }}" method="POST" id="tagForm">
                        @csrf
                        
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
                                                               value="{{ old('name') }}" placeholder="Nhập tên tag..." required>
                                                        <div class="form-text">Tên hiển thị của tag</div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="slug" class="form-label">Slug</label>
                                                        <input type="text" class="form-control" id="slug" name="slug" 
                                                               value="{{ old('slug') }}" placeholder="Auto generate from name">
                                                        <div class="form-text">Để trống để tự động tạo từ tên tag</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="sort_order" class="form-label">Thứ tự sắp xếp</label>
                                                        <input type="number" class="form-control" id="sort_order" name="sort_order" 
                                                               value="{{ old('sort_order', 0) }}" min="0">
                                                        <div class="form-text">Số thứ tự để sắp xếp tag</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="description" class="form-label">Mô tả</label>
                                                <textarea class="form-control" id="description" name="description" rows="4" 
                                                          placeholder="Nhập mô tả về tag...">{{ old('description') }}</textarea>
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
                                                       value="{{ old('meta_title') }}" maxlength="255" placeholder="Tiêu đề SEO...">
                                                <div class="d-flex justify-content-between">
                                                    <div class="form-text">Tối đa 255 ký tự</div>
                                                    <small class="text-muted"><span id="meta_title_count">0</span>/255 ký tự</small>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="meta_description" class="form-label">Meta Description</label>
                                                <textarea class="form-control" id="meta_description" name="meta_description" rows="3"
                                                          maxlength="500" placeholder="Mô tả SEO...">{{ old('meta_description') }}</textarea>
                                                <div class="d-flex justify-content-between">
                                                    <div class="form-text">Khuyến nghị 150-160 ký tự</div>
                                                    <small class="text-muted"><span id="meta_description_count">0</span>/500 ký tự</small>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="meta_keywords" class="form-label">Meta Keywords</label>
                                                <input type="text" class="form-control" id="meta_keywords" name="meta_keywords" 
                                                       value="{{ old('meta_keywords') }}" placeholder="keyword1, keyword2, keyword3...">
                                                <div class="form-text">Các từ khóa cách nhau bằng dấu phẩy</div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="canonical_url" class="form-label">Canonical URL</label>
                                                <input type="url" class="form-control" id="canonical_url" name="canonical_url" 
                                                       value="{{ old('canonical_url') }}" placeholder="https://example.com/tag/tag-name">
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
                                                           value="1" {{ old('is_active', true) ? 'checked' : '' }}>
                                                    <label class="form-check-label" for="is_active">
                                                        Kích hoạt tag
                                                    </label>
                                                </div>
                                                <div class="form-text">Tag sẽ hiển thị công khai khi được kích hoạt</div>
                                            </div>

                                            <div class="d-grid gap-2">
                                                <button type="submit" class="btn btn-primary">
                                                    <iconify-icon icon="solar:check-circle-broken" class="me-1"></iconify-icon>
                                                    Tạo Tag
                                                </button>
                                                <button type="button" class="btn btn-outline-secondary" onclick="resetForm()">
                                                    <iconify-icon icon="solar:refresh-broken" class="me-1"></iconify-icon>
                                                    Reset Form
                                                </button>
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
                                                    New Tag
                                                </span>
                                                <div class="mt-2">
                                                    <small class="text-muted" id="preview_url">URL: /tag/new-tag</small>
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
                                                    <a href="#" class="text-decoration-none" id="seo_title_preview">New Tag</a>
                                                </div>
                                                <div class="mb-1">
                                                    <small class="text-success" id="seo_url_preview">https://example.com/tag/new-tag</small>
                                                </div>
                                                <div>
                                                    <small class="text-muted" id="seo_description_preview">Tag description...</small>
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
        document.addEventListener('DOMContentLoaded', function() {
            const nameInput = document.getElementById('name');
            const slugInput = document.getElementById('slug');
            const metaTitleInput = document.getElementById('meta_title');
            const metaDescriptionInput = document.getElementById('meta_description');
            const canonicalUrlInput = document.getElementById('canonical_url');

            // Auto generate slug from name
            nameInput.addEventListener('input', function() {
                if (!slugInput.value || slugInput.value === slugify(nameInput.dataset.oldValue || '')) {
                    slugInput.value = slugify(this.value);
                }
                nameInput.dataset.oldValue = this.value;
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
            slugInput.addEventListener('input', updatePreviews);
            document.getElementById('description').addEventListener('input', updatePreviews);
            canonicalUrlInput.addEventListener('input', updatePreviews);

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
            document.getElementById(elementId).textContent = count;
        }

        function updatePreviews() {
            const name = document.getElementById('name').value || 'New Tag';
            const slug = document.getElementById('slug').value || 'new-tag';
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

        function resetForm() {
            if (confirm('Bạn có chắc chắn muốn reset form không? Tất cả dữ liệu đã nhập sẽ bị mất.')) {
                document.getElementById('tagForm').reset();
                updateCharCounter('meta_title_count', 0);
                updateCharCounter('meta_description_count', 0);
                updatePreviews();
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
            submitBtn.innerHTML = '<iconify-icon icon="solar:loader-broken" class="me-1"></iconify-icon>Đang tạo...';
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
                        resetForm();
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
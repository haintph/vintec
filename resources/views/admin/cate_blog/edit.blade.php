@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <h3>Edit Category</h3>
            </div>

            <div class="col-xl-9 col-lg-8 ">
                <form action="{{ route('cate_blog.update', $category->id) }}" method="post">
                    @csrf
                    @method('PUT')

                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Cập nhật Danh mục</h4>
                        </div>
                        <div class="card-body">
                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif

                            @if (session('success'))
                                <div class="alert alert-success">
                                    {{ session('success') }}
                                </div>
                            @endif

                            <div class="row">
                                <!-- Thông tin cơ bản -->
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Tên danh mục <span
                                                class="text-danger">*</span></label>
                                        <input type="text" name="name" id="name"
                                            class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name', $category->name) }}" placeholder="Nhập tên danh mục"
                                            required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="slug" class="form-label">Slug</label>
                                        <input type="text" name="slug" id="slug"
                                            class="form-control @error('slug') is-invalid @enderror"
                                            value="{{ old('slug', $category->slug) }}"
                                            placeholder="Slug sẽ được tự động tạo nếu để trống">
                                        @error('slug')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Để trống để tự động tạo từ tên danh mục khi thay
                                            đổi tên</small>
                                    </div>

                                    <div class="mb-3">
                                        <label for="description" class="form-label">Mô tả</label>
                                        <textarea name="description" id="description" rows="4"
                                            class="form-control @error('description') is-invalid @enderror" placeholder="Nhập mô tả cho danh mục">{{ old('description', $category->description) }}</textarea>
                                        @error('description')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <!-- SEO Fields -->
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="meta_title" class="form-label">Meta Title</label>
                                        <input type="text" name="meta_title" id="meta_title"
                                            class="form-control @error('meta_title') is-invalid @enderror"
                                            value="{{ old('meta_title', $category->meta_title) }}" placeholder="Tiêu đề SEO"
                                            maxlength="255">
                                        @error('meta_title')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Tối đa 255 ký tự</small>
                                    </div>

                                    <div class="mb-3">
                                        <label for="meta_description" class="form-label">Meta Description</label>
                                        <textarea name="meta_description" id="meta_description" rows="3"
                                            class="form-control @error('meta_description') is-invalid @enderror" placeholder="Mô tả SEO">{{ old('meta_description', $category->meta_description) }}</textarea>
                                        @error('meta_description')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Khuyến nghị 150-160 ký tự</small>
                                    </div>

                                    <div class="mb-3">
                                        <label for="meta_keywords" class="form-label">Meta Keywords</label>
                                        <input type="text" name="meta_keywords" id="meta_keywords"
                                            class="form-control @error('meta_keywords') is-invalid @enderror"
                                            value="{{ old('meta_keywords', $category->meta_keywords) }}"
                                            placeholder="Từ khóa SEO (cách nhau bởi dấu phẩy)">
                                        @error('meta_keywords')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="canonical_url" class="form-label">Canonical URL</label>
                                        <input type="url" name="canonical_url" id="canonical_url"
                                            class="form-control @error('canonical_url') is-invalid @enderror"
                                            value="{{ old('canonical_url', $category->canonical_url) }}"
                                            placeholder="https://example.com/category-name">
                                        @error('canonical_url')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Thông tin Danh mục</label>
                                        <div class="bg-light p-3 rounded">
                                            <p class="mb-1"><strong>ID:</strong> #{{ $category->id }}</p>
                                            <p class="mb-1"><strong>Slug hiện tại:</strong> {{ $category->slug }}</p>
                                            <p class="mb-1"><strong>Số bài viết:</strong>
                                                {{ $category->posts_count ?? $category->posts->count() }}</p>
                                            <p class="mb-1"><strong>Ngày tạo:</strong>
                                                {{ $category->created_at->format('d/m/Y H:i') }}</p>
                                            <p class="mb-0"><strong>Cập nhật lần cuối:</strong>
                                                {{ $category->updated_at->format('d/m/Y H:i') }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="alert alert-info">
                                        <h6 class="alert-heading">
                                            <iconify-icon icon="solar:info-circle-bold"
                                                class="fs-18 align-middle"></iconify-icon>
                                            Lưu ý khi cập nhật Danh mục
                                        </h6>
                                        <ul class="mb-0">
                                            <li>Thay đổi tên danh mục sẽ ảnh hưởng đến hiển thị trên website</li>
                                            <li>Nếu để trống slug và thay đổi tên, slug mới sẽ được tự động tạo</li>
                                            <li>Thay đổi slug sẽ ảnh hưởng đến URL của trang danh mục</li>
                                            <li>Cập nhật thông tin SEO giúp tối ưu hóa trang danh mục trên công cụ tìm kiếm
                                            </li>
                                            <li><strong>{{ $category->posts->count() }} bài viết</strong> đang sử dụng danh
                                                mục này</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-3 bg-light mb-3 rounded">
                        <div class="row justify-content-end g-2">
                            <div class="col-lg-2">
                                <button type="submit" class="btn btn-success w-100">
                                    <iconify-icon icon="solar:diskette-bold" class="me-1"></iconify-icon>
                                    Update Category
                                </button>
                            </div>
                            <div class="col-lg-2">
                                <a href="{{ route('cate_blog.index') }}" class="btn btn-secondary w-100">
                                    <iconify-icon icon="solar:arrow-left-bold" class="me-1"></iconify-icon>
                                    Back to List
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- End Container Fluid -->

    <script>
        // Store original name to track changes
        const originalName = "{{ $category->name }}";
        const originalSlug = "{{ $category->slug }}";

        // Auto generate slug from name only if name changes and slug is empty
        document.getElementById('name').addEventListener('input', function() {
            const name = this.value;
            const slugField = document.getElementById('slug');

            // Only auto-generate if slug field is empty AND name has changed from original
            if (!slugField.value && name !== originalName) {
                const slug = name
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

                slugField.value = slug;
            }
        });

        // Character counter for meta fields
        function updateCharCounter(inputId, counterId, maxLength) {
            const input = document.getElementById(inputId);
            const counter = document.getElementById(counterId);

            if (input && counter) {
                // Update counter on page load
                const updateCounter = function() {
                    const length = input.value.length;
                    counter.textContent = `${length}/${maxLength} ký tự`;

                    // Reset classes
                    counter.classList.remove('text-warning', 'text-danger');

                    if (length > maxLength) {
                        counter.classList.add('text-danger');
                    } else if (length > maxLength * 0.9) {
                        counter.classList.add('text-warning');
                    }
                };

                // Initial update
                updateCounter();

                // Update on input
                input.addEventListener('input', updateCounter);
            }
        }

        // Add character counters
        document.addEventListener('DOMContentLoaded', function() {
            // Add counter elements if they don't exist
            const metaTitle = document.getElementById('meta_title');
            const metaDescription = document.getElementById('meta_description');

            if (metaTitle) {
                const titleHelp = metaTitle.nextElementSibling;
                if (titleHelp && titleHelp.classList.contains('form-text')) {
                    const counter = document.createElement('span');
                    counter.id = 'meta_title_counter';
                    counter.className = 'float-end small';
                    titleHelp.appendChild(counter);

                    updateCharCounter('meta_title', 'meta_title_counter', 255);
                }
            }

            if (metaDescription) {
                const descHelp = metaDescription.nextElementSibling;
                if (descHelp && descHelp.classList.contains('form-text')) {
                    const counter = document.createElement('span');
                    counter.id = 'meta_description_counter';
                    counter.className = 'float-end small';
                    descHelp.appendChild(counter);

                    updateCharCounter('meta_description', 'meta_description_counter', 160);
                }
            }
        });

        // Confirmation before leaving if form has changes
        let formChanged = false;
        const formInputs = document.querySelectorAll('input, textarea');

        formInputs.forEach(input => {
            input.addEventListener('change', function() {
                formChanged = true;
            });
        });

        window.addEventListener('beforeunload', function(e) {
            if (formChanged) {
                e.preventDefault();
                e.returnValue = 'Bạn có thay đổi chưa được lưu. Bạn có chắc muốn rời khỏi trang?';
            }
        });

        // Remove warning when form is submitted
        document.querySelector('form').addEventListener('submit', function() {
            formChanged = false;
        });
    </script>

    <!-- Footer -->
    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center">
                    <script>
                        document.write(new Date().getFullYear())
                    </script> &copy; Larkon. Crafted by
                    <iconify-icon icon="iconamoon:heart-duotone" class="fs-18 align-middle text-danger"></iconify-icon>
                    <a href="https://1.envato.market/techzaa" class="fw-bold footer-text" target="_blank">Techzaa</a>
                </div>
            </div>
        </div>
    </footer>
@endsection

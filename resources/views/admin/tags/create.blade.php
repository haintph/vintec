@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <h3>{{ isset($tag) ? 'Chỉnh Sửa Tag' : 'Tạo Tag Mới' }}</h3>                  
            </div>

            <div class="col-xl-9 col-lg-8 ">
                <form action="{{ isset($tag) ? route('admin.tags.update', $tag) : route('admin.tags.store') }}" 
                      method="post">
                    @csrf
                    @if(isset($tag))
                        @method('PUT')
                    @endif
                    
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">
                                <iconify-icon icon="solar:tag-broken" class="align-middle fs-18 me-2"></iconify-icon>
                                Thông tin Tag
                            </h4>
                        </div>
                        <div class="card-body">
                            @if ($errors->any())
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <iconify-icon icon="solar:danger-triangle-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                    <strong>Có lỗi xảy ra:</strong>
                                    <ul class="mb-0 mt-2">
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            @endif

                            <div class="row">
                                <!-- Thông tin cơ bản -->
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">
                                            <iconify-icon icon="solar:tag-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                            Tên Tag <span class="text-danger">*</span>
                                        </label>
                                        <input type="text" name="name" id="name" 
                                            class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name', isset($tag) ? $tag->name : '') }}"
                                            placeholder="Nhập tên tag" required>
                                        @error('name')
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
                                            value="{{ old('slug', isset($tag) ? $tag->slug : '') }}"
                                            placeholder="Slug sẽ được tự động tạo nếu để trống">
                                        @error('slug')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">
                                            <iconify-icon icon="solar:info-circle-broken" class="align-middle fs-14 me-1"></iconify-icon>
                                            Để trống để tự động tạo từ tên tag
                                        </small>
                                    </div>

                                    <div class="mb-3">
                                        <label for="meta_keywords" class="form-label">
                                            <iconify-icon icon="solar:hashtag-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                            Meta Keywords
                                        </label>
                                        <input type="text" name="meta_keywords" id="meta_keywords" 
                                            class="form-control @error('meta_keywords') is-invalid @enderror"
                                            value="{{ old('meta_keywords', isset($tag) ? $tag->meta_keywords : '') }}"
                                            placeholder="Từ khóa SEO (cách nhau bởi dấu phẩy)">
                                        @error('meta_keywords')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Ví dụ: web design, laravel, php</small>
                                    </div>
                                </div>

                                <!-- SEO Fields -->
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="meta_title" class="form-label">
                                            <iconify-icon icon="solar:text-bold" class="align-middle fs-16 me-1"></iconify-icon>
                                            Meta Title
                                        </label>
                                        <input type="text" name="meta_title" id="meta_title" 
                                            class="form-control @error('meta_title') is-invalid @enderror"
                                            value="{{ old('meta_title', isset($tag) ? $tag->meta_title : '') }}"
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
                                            placeholder="Mô tả SEO" maxlength="160">{{ old('meta_description', isset($tag) ? $tag->meta_description : '') }}</textarea>
                                        @error('meta_description')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">
                                            Khuyến nghị 150-160 ký tự
                                            <span id="meta_description_counter" class="float-end">0/160 ký tự</span>
                                        </small>
                                    </div>

                                    <div class="mb-3">
                                        <label for="canonical_url" class="form-label">
                                            <iconify-icon icon="solar:global-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                            Canonical URL
                                        </label>
                                        <input type="url" name="canonical_url" id="canonical_url" 
                                            class="form-control @error('canonical_url') is-invalid @enderror"
                                            value="{{ old('canonical_url', isset($tag) ? $tag->canonical_url : '') }}"
                                            placeholder="https://example.com/tag/tag-name">
                                        @error('canonical_url')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">URL chuẩn của trang tag</small>
                                    </div>

                                    @if(isset($tag))
                                        <div class="mb-3">
                                            <label class="form-label">
                                                <iconify-icon icon="solar:info-square-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                                Thông tin Tag
                                            </label>
                                            <div class="bg-light p-3 rounded">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <p class="mb-1">
                                                            <strong>
                                                                <iconify-icon icon="solar:hashtag-broken" class="align-middle fs-14 me-1"></iconify-icon>
                                                                ID:
                                                            </strong> 
                                                            #{{ $tag->id }}
                                                        </p>
                                                        <p class="mb-1">
                                                            <strong>
                                                                <iconify-icon icon="solar:document-text-broken" class="align-middle fs-14 me-1"></iconify-icon>
                                                                Số bài viết:
                                                            </strong> 
                                                            {{ $tag->posts_count ?? 0 }}
                                                        </p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p class="mb-1">
                                                            <strong>
                                                                <iconify-icon icon="solar:calendar-add-broken" class="align-middle fs-14 me-1"></iconify-icon>
                                                                Ngày tạo:
                                                            </strong> 
                                                            {{ $tag->created_at->format('d/m/Y H:i') }}
                                                        </p>
                                                        <p class="mb-0">
                                                            <strong>
                                                                <iconify-icon icon="solar:calendar-broken" class="align-middle fs-14 me-1"></iconify-icon>
                                                                Cập nhật:
                                                            </strong> 
                                                            {{ $tag->updated_at->format('d/m/Y H:i') }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                </div>

                                <!-- SEO Preview -->
                                <div class="col-lg-12">
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
                                                    {{ old('meta_title', isset($tag) ? $tag->meta_title : 'Tên Tag - Website') }}
                                                </h6>
                                                <p id="preview-url" class="text-success mb-1 fs-14">
                                                    {{ url('/tag/') }}<span id="preview-slug">{{ old('slug', isset($tag) ? $tag->slug : 'tag-slug') }}</span>
                                                </p>
                                                <p id="preview-description" class="text-muted mb-0 fs-14">
                                                    {{ old('meta_description', isset($tag) ? $tag->meta_description : 'Mô tả meta sẽ hiển thị ở đây...') }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="alert alert-info">
                                        <h6 class="alert-heading">
                                            <iconify-icon icon="solar:info-circle-bold" class="fs-18 align-middle"></iconify-icon>
                                            Lưu ý về Tag
                                        </h6>
                                        <ul class="mb-0">
                                            <li>Tên tag là trường bắt buộc và sẽ hiển thị trên website</li>
                                            <li>Slug sẽ được tự động tạo từ tên tag nếu bạn không nhập</li>
                                            <li>Các thông tin SEO giúp tối ưu hóa trang tag trên công cụ tìm kiếm</li>
                                            <li>Tags giúp phân loại và tổ chức nội dung bài viết</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-3 bg-light mb-3 rounded">
                        <div class="row justify-content-end g-2">
                            <div class="col-lg-2">
                                <a href="{{ route('admin.tags.index') }}" class="btn btn-outline-secondary w-100">
                                    <iconify-icon icon="solar:arrow-left-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                    Hủy
                                </a>
                            </div>
                            <div class="col-lg-2">
                                <button type="submit" class="btn btn-primary w-100">
                                    <iconify-icon icon="solar:diskette-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                    {{ isset($tag) ? 'Cập nhật' : 'Tạo mới' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- End Container Fluid -->
    
    <!-- ========== Footer Start ========== -->
    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center">
                    <script>document.write(new Date().getFullYear())</script> &copy; Larkon. Crafted by 
                    <iconify-icon icon="iconamoon:heart-duotone" class="fs-18 align-middle text-danger"></iconify-icon> 
                    <a href="https://1.envato.market/techzaa" class="fw-bold footer-text" target="_blank">Techzaa</a>
                </div>
            </div>
        </div>
    </footer>
    <!-- ========== Footer End ========== -->
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Auto generate slug from name
    const nameInput = document.getElementById('name');
    const slugInput = document.getElementById('slug');
    
    nameInput.addEventListener('input', function() {
        const name = this.value;
        
        // Only auto-generate if slug field is empty or user hasn't manually edited it
        if (!slugInput.dataset.userEdited) {
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

    // SEO Preview Update
    function updateSeoPreview() {
        const nameValue = document.getElementById('name').value;
        const slugValue = document.getElementById('slug').value;
        const metaTitleValue = document.getElementById('meta_title').value;
        const metaDescriptionValue = document.getElementById('meta_description').value;
        
        // Update preview title
        const previewTitle = document.getElementById('preview-title');
        previewTitle.textContent = metaTitleValue || (nameValue ? nameValue + ' - Website' : 'Tên Tag - Website');
        
        // Update preview URL
        const previewSlug = document.getElementById('preview-slug');
        previewSlug.textContent = slugValue || 'tag-slug';
        
        // Update preview description
        const previewDescription = document.getElementById('preview-description');
        previewDescription.textContent = metaDescriptionValue || 'Mô tả meta sẽ hiển thị ở đây...';
    }

    // Add event listeners for SEO preview
    document.getElementById('name').addEventListener('input', updateSeoPreview);
    document.getElementById('meta_title').addEventListener('input', updateSeoPreview);
    document.getElementById('meta_description').addEventListener('input', updateSeoPreview);
    
    // Initial SEO preview update
    updateSeoPreview();

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
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
}

.alert-info {
    border-left: 4px solid #0dcaf0;
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
</style>
@endpush
@extends('admin.layouts.masters')

@section('title', $product->name)

@push('meta')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@endpush

@section('content')
    <div class="container-fluid">
        <!-- Flash Messages & Errors -->
        {{-- @include('admin.partials.alerts') --}}

        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3">{{ $product->name }}</h1>
            <div>
                <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-warning me-2">
                    <i class="fas fa-edit"></i> Chỉnh sửa
                </a>
                <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i> Quay lại
                </a>
            </div>
        </div>

        <div class="row">
            <!-- Left Column - Product Info -->
            <div class="col-md-8">
                <!-- Basic Info -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Thông tin cơ bản</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Mã sản phẩm:</strong> {{ $product->product_code }}</p>
                                <p><strong>Tên sản phẩm:</strong> {{ $product->name }}</p>
                                <p><strong>Slug:</strong> <code>{{ $product->slug }}</code></p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Danh mục:</strong>
                                    <span class="badge bg-info">{{ $product->category->name }}</span>
                                </p>
                                <p><strong>Giá sản phẩm:</strong>
                                    <span class="badge bg-success fs-6">
                                        {{ number_format($product->price ?? 0, 0, ',', '.') }} VNĐ
                                    </span>
                                </p>
                                <p><strong>Trạng thái:</strong>
                                    <span class="badge {{ $product->is_active ? 'bg-success' : 'bg-secondary' }}">
                                        {{ $product->is_active ? 'Hoạt động' : 'Tạm ẩn' }}
                                    </span>
                                </p>
                                <p><strong>Ngày tạo:</strong> {{ $product->created_at->format('d/m/Y H:i') }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Description -->
                @if ($product->description)
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Mô tả sản phẩm</h5>
                        </div>
                        <div class="card-body">
                            <p>{{ $product->description }}</p>
                        </div>
                    </div>
                @endif

                <!-- Specifications -->
                @if ($product->specs)
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Thông số kỹ thuật</h5>
                        </div>
                        <div class="card-body">
                            @php
                                $specs = is_string($product->specs)
                                    ? json_decode($product->specs, true)
                                    : $product->specs;
                            @endphp

                            @if (is_array($specs))
                                <div class="row">
                                    @foreach ($specs as $key => $value)
                                        <div class="col-md-6 mb-2">
                                            <strong>{{ ucfirst($key) }}:</strong>
                                            @if (is_array($value))
                                                {{ implode(', ', $value) }}
                                            @else
                                                {{ $value }}
                                            @endif
                                        </div>
                                    @endforeach

                                </div>
                            @else
                                <pre>{{ $product->specs }}</pre>
                            @endif
                        </div>
                    </div>
                @endif

                <!-- SEO Info -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Thông tin SEO</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <strong>Meta Title:</strong>
                            <p class="mb-1">{{ $product->meta_title ?: 'Chưa thiết lập' }}</p>
                            <small class="text-muted">{{ strlen($product->meta_title ?: '') }}/60 ký tự</small>
                        </div>
                        <div class="mb-3">
                            <strong>Meta Description:</strong>
                            <p class="mb-1">{{ $product->meta_description ?: 'Chưa thiết lập' }}</p>
                            <small class="text-muted">{{ strlen($product->meta_description ?: '') }}/160 ký tự</small>
                        </div>
                        <div class="mb-3">
                            <strong>Meta Keywords:</strong>
                            <p>{{ $product->meta_keywords ?: 'Chưa thiết lập' }}</p>
                        </div>
                        <div class="mb-3">
                            <strong>URL Preview:</strong>
                            <p class="text-primary">{{ url('/products/' . $product->slug) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="col-md-4">
                <!-- Product Album Section -->
                <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5>Album ảnh sản phẩm</h5>
                        <span class="badge bg-info">{{ $product->images->count() }} ảnh</span>
                    </div>
                    <div class="card-body">
                        @if ($product->images->count() > 0)
                            <!-- Main Image Display -->
                            <div class="main-image-container text-center mb-3">
                                @php
                                    $primaryImage =
                                        $product->images->where('is_primary', true)->first() ?:
                                        $product->images->first();
                                @endphp
                                <img id="main-image" src="{{ $primaryImage->image_url }}" class="img-fluid rounded shadow"
                                    style="max-height: 300px; cursor: pointer;" onclick="openLightbox(0)">
                                <p id="main-image-alt" class="mt-2 text-muted small">
                                    {{ $primaryImage->alt_text ?: $product->name }}
                                </p>
                            </div>

                            <!-- Thumbnail Gallery -->
                            <div class="thumbnail-gallery">
                                <h6 class="mb-2">Tất cả ảnh ({{ $product->images->count() }})</h6>
                                <div class="row g-2">
                                    @foreach ($product->images as $index => $image)
                                        <div class="col-4">
                                            <div class="thumbnail-item position-relative {{ $image->is_primary ? 'primary' : '' }}"
                                                data-image="{{ $image->image_url }}"
                                                data-alt="{{ $image->alt_text ?: $product->name }}"
                                                data-index="{{ $index }}">
                                                <img src="{{ $image->thumbnail_url ?? $image->image_url }}"
                                                    class="img-thumbnail w-100"
                                                    style="height: 60px; object-fit: cover; cursor: pointer;">
                                                @if ($image->is_primary)
                                                    <span class="position-absolute top-0 start-0 badge bg-success m-1"
                                                        style="font-size: 0.6em;">Chính</span>
                                                @endif
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>

                            <!-- Image Actions -->
                            <div class="mt-3 pt-3 border-top">
                                <div class="btn-group w-100" role="group">
                                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="openLightbox(0)">
                                        <i class="fas fa-expand"></i> Toàn màn hình
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary btn-sm"
                                        onclick="downloadImage()">
                                        <i class="fas fa-download"></i> Tải ảnh
                                    </button>
                                    <a href="{{ route('admin.products.edit', $product) }}"
                                        class="btn btn-outline-warning btn-sm">
                                        <i class="fas fa-edit"></i> Chỉnh sửa
                                    </a>
                                </div>
                            </div>
                        @else
                            <div class="text-center py-4">
                                <i class="fas fa-images fa-3x text-muted mb-3"></i>
                                <h6>Chưa có ảnh nào</h6>
                                <p class="text-muted">Sản phẩm này chưa có album ảnh.</p>
                                <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-primary">
                                    <i class="fas fa-plus"></i> Thêm ảnh
                                </a>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Thao tác nhanh</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <button type="button" class="btn btn-outline-primary btn-sm toggle-status"
                                data-id="{{ $product->id }}">
                                {{ $product->is_active ? 'Tạm ẩn' : 'Kích hoạt' }} sản phẩm
                            </button>
                            <button type="button" class="btn btn-outline-info btn-sm"
                                onclick="copyToClipboard('{{ $product->slug }}', 'Slug')">
                                Copy Slug
                            </button>
                            <button type="button" class="btn btn-outline-success btn-sm"
                                onclick="copyToClipboard('{{ url('/products/' . $product->slug) }}', 'URL')">
                                Copy URL
                            </button>
                            <form action="{{ route('admin.products.destroy', $product) }}" method="POST"
                                onsubmit="return confirm('Bạn có chắc muốn xóa sản phẩm này?')" class="mt-2">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-outline-danger btn-sm w-100">
                                    <i class="fas fa-trash"></i> Xóa sản phẩm
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Related Products -->
                @if (isset($relatedProducts) && $relatedProducts->count() > 0)
                    <div class="card">
                        <div class="card-header">
                            <h5>Sản phẩm liên quan</h5>
                        </div>
                        <div class="card-body">
                            @foreach ($relatedProducts as $related)
                                <div class="d-flex align-items-center mb-2">
                                    <img src="{{ $related->image_url }}" class="me-2 rounded"
                                        style="width: 40px; height: 40px; object-fit: cover;">
                                    <div class="flex-grow-1">
                                        <div class="fw-bold small">{{ Str::limit($related->name, 30) }}</div>
                                        <small class="text-muted">{{ $related->product_code }}</small>
                                    </div>
                                    <a href="{{ route('admin.products.show', $related) }}"
                                        class="btn btn-sm btn-outline-primary">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>

    <!-- Lightbox Modal -->
    <div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content bg-dark">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-white">Album - {{ $product->name }}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center p-0">
                    <div class="lightbox-container position-relative" style="min-height: 70vh;">
                        <img id="lightbox-image" src="" class="img-fluid" style="max-height: 70vh;">

                        <!-- Navigation Arrows -->
                        @if ($product->images->count() > 1)
                            <button class="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3"
                                id="prev-btn" onclick="previousImage()" style="z-index: 10;">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3"
                                id="next-btn" onclick="nextImage()" style="z-index: 10;">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        @endif

                        <!-- Image Counter -->
                        <div class="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                            <span class="badge bg-dark bg-opacity-75 text-white" id="image-counter">1 /
                                {{ $product->images->count() }}</span>
                        </div>

                        <!-- Loading Spinner -->
                        <div class="position-absolute top-50 start-50 translate-middle" id="loading-spinner"
                            style="display: none;">
                            <div class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 justify-content-center">
                    <div class="lightbox-thumbnails d-flex gap-2 overflow-auto" style="max-width: 100%;">
                        @foreach ($product->images as $index => $image)
                            <img src="{{ $image->thumbnail_url ?? $image->image_url }}"
                                class="lightbox-thumb border rounded"
                                style="width: 60px; height: 60px; object-fit: cover; cursor: pointer;"
                                onclick="goToImage({{ $index }})" data-index="{{ $index }}">
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CSS Styles -->
    <style>
        .thumbnail-item {
            border-radius: 6px;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .thumbnail-item:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .thumbnail-item.active {
            border: 3px solid #007bff !important;
        }

        .thumbnail-item.primary::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid #28a745;
            border-radius: 6px;
            pointer-events: none;
        }

        .main-image-container img {
            transition: transform 0.3s ease;
        }

        .main-image-container img:hover {
            transform: scale(1.02);
        }

        .lightbox-container {
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lightbox-thumbnails {
            max-height: 80px;
            padding: 10px 0;
        }

        .lightbox-thumb {
            flex-shrink: 0;
            transition: all 0.3s ease;
        }

        .lightbox-thumb:hover {
            transform: scale(1.1);
        }

        .lightbox-thumb.active {
            border-color: #007bff !important;
            border-width: 3px !important;
        }

        .modal-xl .modal-dialog {
            max-width: 90%;
        }

        .lightbox-container .btn {
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }

        .lightbox-container .btn:hover {
            opacity: 1;
        }

        @media (max-width: 768px) {
            .thumbnail-gallery .col-4 {
                margin-bottom: 0.5rem;
            }

            .lightbox-container .btn {
                padding: 0.375rem 0.75rem;
                font-size: 0.875rem;
            }

            .lightbox-thumbnails {
                gap: 0.5rem;
            }

            .lightbox-thumb {
                width: 50px;
                height: 50px;
            }

            .main-image-container img {
                max-height: 200px !important;
            }
        }
    </style>

    <!-- JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const mainImage = document.getElementById('main-image');
            const mainImageAlt = document.getElementById('main-image-alt');
            const thumbnails = document.querySelectorAll('.thumbnail-item');

            // Gallery data
            const galleryImages = [
                @foreach ($product->images as $image)
                    {
                        url: '{{ $image->image_url }}',
                        thumbnail: '{{ $image->thumbnail_url ?? $image->image_url }}',
                        alt: '{{ $image->alt_text ?: $product->name }}',
                        is_primary: {{ $image->is_primary ? 'true' : 'false' }}
                    },
                @endforeach
            ];

            let currentImageIndex = 0;

            // Set initial active thumbnail
            if (thumbnails.length > 0) {
                const primaryIndex = galleryImages.findIndex(img => img.is_primary);
                currentImageIndex = primaryIndex >= 0 ? primaryIndex : 0;
                thumbnails[currentImageIndex].classList.add('active');
            }

            // Thumbnail click handlers
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function() {
                    const imageUrl = this.dataset.image;
                    const altText = this.dataset.alt;

                    // Update main image
                    if (mainImage) {
                        showLoadingSpinner();
                        mainImage.onload = hideLoadingSpinner;
                        mainImage.src = imageUrl;
                        mainImageAlt.textContent = altText;
                    }

                    // Update active thumbnail
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');

                    currentImageIndex = index;
                });
            });

            // Lightbox functionality
            window.openLightbox = function(index = 0) {
                currentImageIndex = index;
                updateLightboxImage();

                const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
                modal.show();
            };

            window.previousImage = function() {
                currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
                updateLightboxImage();
            };

            window.nextImage = function() {
                currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
                updateLightboxImage();
            };

            window.goToImage = function(index) {
                currentImageIndex = index;
                updateLightboxImage();
            };

            function updateLightboxImage() {
                const lightboxImage = document.getElementById('lightbox-image');
                const imageCounter = document.getElementById('image-counter');
                const thumbs = document.querySelectorAll('.lightbox-thumb');

                if (galleryImages[currentImageIndex]) {
                    showLoadingSpinner();
                    lightboxImage.onload = hideLoadingSpinner;
                    lightboxImage.src = galleryImages[currentImageIndex].url;
                    lightboxImage.alt = galleryImages[currentImageIndex].alt;
                    imageCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;

                    // Update active thumbnail in lightbox
                    thumbs.forEach((thumb, index) => {
                        thumb.classList.toggle('active', index === currentImageIndex);
                    });
                }
            }

            function showLoadingSpinner() {
                const spinner = document.getElementById('loading-spinner');
                if (spinner) spinner.style.display = 'block';
            }

            function hideLoadingSpinner() {
                const spinner = document.getElementById('loading-spinner');
                if (spinner) spinner.style.display = 'none';
            }

            // Keyboard navigation for lightbox
            document.addEventListener('keydown', function(e) {
                const modal = document.getElementById('lightboxModal');
                if (modal && modal.classList.contains('show')) {
                    if (e.key === 'ArrowLeft') {
                        previousImage();
                    } else if (e.key === 'ArrowRight') {
                        nextImage();
                    } else if (e.key === 'Escape') {
                        const bsModal = bootstrap.Modal.getInstance(modal);
                        bsModal.hide();
                    }
                }
            });
        });

        // Utility functions
        function copyToClipboard(text, label = 'Nội dung') {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    showAlert(`Đã copy ${label}: ${text}`, 'success');
                }).catch(function() {
                    fallbackCopyTextToClipboard(text, label);
                });
            } else {
                fallbackCopyTextToClipboard(text, label);
            }
        }

        function fallbackCopyTextToClipboard(text, label) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
                showAlert(`Đã copy ${label}: ${text}`, 'success');
            } catch (err) {
                alert('Không thể copy. Vui lòng copy thủ công: ' + text);
            }

            document.body.removeChild(textArea);
        }

        // Download current image
        function downloadImage() {
            const mainImage = document.getElementById('main-image');
            if (mainImage) {
                const link = document.createElement('a');
                link.href = mainImage.src;
                link.download = `{{ $product->slug }}-image-${currentImageIndex + 1}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

        // Toggle status functionality
        document.querySelector('.toggle-status')?.addEventListener('click', function() {
            const productId = this.dataset.id;
            const button = this;

            button.disabled = true;

            fetch(`/admin/products/${productId}/toggle-status`, {
                    method: 'PATCH',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showAlert(data.message, 'success');
                        setTimeout(() => location.reload(), 1000);
                    } else {
                        showAlert(data.message || 'Có lỗi xảy ra', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showAlert('Có lỗi xảy ra khi kết nối tới server', 'error');
                })
                .finally(() => {
                    button.disabled = false;
                });
        });

        // Alert function (if not already defined)
        function showAlert(message, type = 'success') {
            const icons = {
                'success': 'fas fa-check-circle',
                'error': 'fas fa-exclamation-circle',
                'warning': 'fas fa-exclamation-triangle',
                'info': 'fas fa-info-circle'
            };

            const alertClass = type === 'error' ? 'alert-danger' : `alert-${type}`;

            const alertHtml = `
                <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                    <i class="${icons[type]} me-2"></i>
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;

            const container = document.querySelector('.container-fluid');
            if (container) {
                container.insertAdjacentHTML('afterbegin', alertHtml);

                setTimeout(function() {
                    const newAlert = container.querySelector('.alert');
                    if (newAlert) {
                        const bsAlert = new bootstrap.Alert(newAlert);
                        bsAlert.close();
                    }
                }, 5000);
            }
        }
    </script>
@endsection

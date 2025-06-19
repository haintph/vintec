@extends('admin.layouts.masters')

@section('title', 'Thêm sản phẩm')

@section('content')
    {{-- Success Messages --}}
    @if (session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    {{-- Error Messages --}}
    @if (session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            {{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    {{-- Validation Errors --}}
    @if ($errors->any())
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            <strong>Có lỗi xảy ra:</strong>
            <ul class="mb-0 mt-2">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    {{-- Warning Messages --}}
    @if (session('warning'))
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            {{ session('warning') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    {{-- Info Messages --}}
    @if (session('info'))
        <div class="alert alert-info alert-dismissible fade show" role="alert">
            <i class="fas fa-info-circle me-2"></i>
            {{ session('info') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    {{-- JavaScript để tự động ẩn sau 5 giây --}}
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Tự động ẩn alert success sau 5 giây
            const alerts = document.querySelectorAll('.alert-success, .alert-info');
            alerts.forEach(function(alert) {
                setTimeout(function() {
                    if (alert) {
                        const bsAlert = new bootstrap.Alert(alert);
                        bsAlert.close();
                    }
                }, 5000);
            });
        });

        // Function để hiển thị alert động
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

            // Thêm vào đầu container
            const container = document.querySelector('.container-fluid') || document.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('afterbegin', alertHtml);

                // Tự động ẩn sau 5 giây
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
    <div class="container-fluid">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3">Thêm sản phẩm mới</h1>
            <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Quay lại
            </a>
        </div>

        <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <!-- Left Column -->
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Thông tin sản phẩm</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Mã sản phẩm <span class="text-danger">*</span></label>
                                        <input type="text"
                                            class="form-control @error('product_code') is-invalid @enderror"
                                            name="product_code" value="{{ old('product_code') }}" required>
                                        @error('product_code')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Danh mục <span class="text-danger">*</span></label>
                                        <select class="form-select @error('category_id') is-invalid @enderror"
                                            name="category_id" required>
                                            <option value="">Chọn danh mục</option>
                                            @foreach ($categories as $category)
                                                <option value="{{ $category->id }}"
                                                    {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                                    {{ $category->name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('category_id')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Tên sản phẩm <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('name') is-invalid @enderror"
                                    name="name" value="{{ old('name') }}" required>
                                @error('name')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Giá sản phẩm <span class="text-danger">*</span></label>
                                <input type="number" step="0.01" min="0"
                                    class="form-control @error('price') is-invalid @enderror" name="price"
                                    value="{{ old('price', 0) }}" required placeholder="Nhập giá sản phẩm">
                                @error('price')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                                <small class="text-muted">Giá sản phẩm tính bằng VNĐ</small>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Mô tả</label>
                                <textarea class="form-control @error('description') is-invalid @enderror" name="description" rows="4">{{ old('description') }}</textarea>
                                @error('description')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <script>
                                document.addEventListener('DOMContentLoaded', function() {
                                    const container = document.getElementById('specs-container');
                                    const addBtn = document.getElementById('add-spec');
                                    const specsJson = document.getElementById('specs-json');
                                    const form = specsJson.closest('form');

                                    addBtn.addEventListener('click', function() {
                                        const div = document.createElement('div');
                                        div.classList.add('d-flex', 'mb-2', 'spec-item');
                                        div.innerHTML = `
                <input type="text" class="form-control me-2" placeholder="Thuộc tính">
                <input type="text" class="form-control me-2" placeholder="Giá trị">
                <button type="button" class="btn btn-danger btn-sm remove-spec">X</button>
            `;
                                        container.appendChild(div);
                                    });

                                    container.addEventListener('click', function(e) {
                                        if (e.target.classList.contains('remove-spec')) {
                                            e.target.closest('.spec-item').remove();
                                        }
                                    });

                                    form.addEventListener('submit', function() {
                                        const data = {};
                                        const items = container.querySelectorAll('.spec-item');
                                        items.forEach(item => {
                                            const inputs = item.querySelectorAll('input');
                                            const key = inputs[0].value.trim();
                                            let value = inputs[1].value.trim();

                                            if (!key) return; // skip nếu không có key

                                            // Nếu có dấu phẩy thì coi như array
                                            if (value.includes(',')) {
                                                value = value.split(',').map(v => v.trim());
                                            }

                                            data[key] = value;
                                        });

                                        specsJson.value = JSON.stringify(data);
                                    });
                                });
                            </script>
                            <div class="mb-3">
                                <label class="form-label">Thông số kỹ thuật</label>
                                <div id="specs-container">
                                    <!-- Dòng đầu tiên mặc định -->
                                    @php
                                        $specs = old('specs') ? json_decode(old('specs'), true) : [];
                                    @endphp

                                    @if (!empty($specs))
                                        @foreach ($specs as $key => $value)
                                            <div class="d-flex mb-2 spec-item">
                                                <input type="text" class="form-control me-2" placeholder="Thuộc tính"
                                                    value="{{ $key }}">
                                                <input type="text" class="form-control me-2" placeholder="Giá trị"
                                                    value="{{ is_array($value) ? implode(', ', $value) : $value }}">
                                                <button type="button"
                                                    class="btn btn-danger btn-sm remove-spec">X</button>
                                            </div>
                                        @endforeach
                                    @else
                                        <div class="d-flex mb-2 spec-item">
                                            <input type="text" class="form-control me-2" placeholder="Thuộc tính">
                                            <input type="text" class="form-control me-2" placeholder="Giá trị">
                                            <button type="button" class="btn btn-danger btn-sm remove-spec">X</button>
                                        </div>
                                    @endif
                                </div>

                                <button type="button" class="btn btn-primary btn-sm mb-2" id="add-spec">Thêm
                                    dòng</button>

                                {{-- Hidden input chứa JSON sẽ được tạo ra từ JS --}}
                                <textarea name="specs" id="specs-json" class="form-control d-none @error('specs') is-invalid @enderror">{{ old('specs') }}</textarea>
                                @error('specs')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="col-md-4">
                    <!-- Image Upload -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5>Hình ảnh</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <input type="file" class="form-control @error('image') is-invalid @enderror"
                                    name="image" accept="image/*">
                                @error('image')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <!-- Album Images Section -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5>Album ảnh sản phẩm</h5>
                        </div>
                        <div class="card-body">
                            <!-- Upload Multiple Images -->
                            <div class="mb-3">
                                <label class="form-label">Chọn nhiều ảnh</label>
                                <input type="file" class="form-control" name="album_images[]" multiple
                                    accept="image/*" id="album-images-input">
                                <small class="text-muted">Có thể chọn tối đa 10 ảnh, mỗi ảnh tối đa 2MB</small>
                            </div>

                            <!-- Preview Container -->
                            <div id="album-preview" class="row">
                                @if (isset($product) && $product->images->count() > 0)
                                    @foreach ($product->images as $index => $image)
                                        <div class="col-md-3 mb-3 album-item" data-id="{{ $image->id }}">
                                            <div class="card">
                                                <div class="position-relative">
                                                    <img src="{{ $image->thumbnail_url }}" class="card-img-top"
                                                        style="height: 150px; object-fit: cover;">

                                                    <!-- Primary Badge -->
                                                    @if ($image->is_primary)
                                                        <span
                                                            class="position-absolute top-0 start-0 badge bg-success m-1">Ảnh
                                                            chính</span>
                                                    @endif

                                                    <!-- Action Buttons -->
                                                    <div class="position-absolute top-0 end-0 m-1">
                                                        <div class="btn-group-vertical" role="group">
                                                            @if (!$image->is_primary)
                                                                <button type="button"
                                                                    class="btn btn-sm btn-warning set-primary"
                                                                    data-id="{{ $image->id }}"
                                                                    title="Đặt làm ảnh chính">
                                                                    <i class="fas fa-star"></i>
                                                                </button>
                                                            @endif
                                                            <button type="button"
                                                                class="btn btn-sm btn-danger delete-image"
                                                                data-id="{{ $image->id }}" title="Xóa ảnh">
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <!-- Drag Handle -->
                                                    <div class="position-absolute bottom-0 start-0 m-1">
                                                        <i class="fas fa-grip-vertical text-white bg-dark px-1 rounded drag-handle"
                                                            style="cursor: move;" title="Kéo để sắp xếp"></i>
                                                    </div>
                                                </div>
                                                <div class="card-body p-2">
                                                    <input type="text" class="form-control form-control-sm"
                                                        placeholder="Alt text..." value="{{ $image->alt_text }}"
                                                        onchange="updateAltText({{ $image->id }}, this.value)">
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                @endif
                            </div>

                            <!-- Primary Image Selection for New Images -->
                            <div class="mb-3" id="primary-selection" style="display: none;">
                                <label class="form-label">Chọn ảnh chính</label>
                                <select class="form-select" name="primary_image_index" id="primary-image-select">
                                    <option value="0">Ảnh đầu tiên</option>
                                </select>
                            </div>

                            <!-- Hidden inputs for alt texts -->
                            <div id="alt-texts-container"></div>
                        </div>
                    </div>

                    {{-- JavaScript cho Album Images --}}
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            const albumInput = document.getElementById('album-images-input');
                            const albumPreview = document.getElementById('album-preview');
                            const primarySelection = document.getElementById('primary-selection');
                            const primarySelect = document.getElementById('primary-image-select');
                            const altTextsContainer = document.getElementById('alt-texts-container');

                            let selectedFiles = [];
                            let dragSrcEl = null;

                            // Handle file selection
                            albumInput.addEventListener('change', function(e) {
                                const files = Array.from(e.target.files);

                                if (files.length > 10) {
                                    showAlert('Chỉ được chọn tối đa 10 ảnh', 'error');
                                    return;
                                }

                                selectedFiles = files;
                                previewImages(files);
                            });

                            function previewImages(files) {
                                // Clear existing preview for new uploads
                                if (!document.querySelector('.album-item[data-id]')) {
                                    albumPreview.innerHTML = '';
                                }

                                primarySelect.innerHTML = '<option value="0">Ảnh đầu tiên</option>';
                                altTextsContainer.innerHTML = '';

                                files.forEach((file, index) => {
                                    if (file.type.startsWith('image/')) {
                                        const reader = new FileReader();
                                        reader.onload = function(e) {
                                            createImagePreview(e.target.result, index, file.name);
                                        };
                                        reader.readAsDataURL(file);

                                        // Add to primary selection
                                        const option = document.createElement('option');
                                        option.value = index;
                                        option.textContent = `Ảnh ${index + 1}`;
                                        primarySelect.appendChild(option);

                                        // Create hidden input for alt text
                                        const altInput = document.createElement('input');
                                        altInput.type = 'hidden';
                                        altInput.name = `album_alt_texts[${index}]`;
                                        altInput.id = `alt-text-${index}`;
                                        altTextsContainer.appendChild(altInput);
                                    }
                                });

                                primarySelection.style.display = files.length > 0 ? 'block' : 'none';
                            }

                            function createImagePreview(src, index, fileName) {
                                const col = document.createElement('div');
                                col.className = 'col-md-3 mb-3 album-item-new';
                                col.innerHTML = `
            <div class="card">
                <div class="position-relative">
                    <img src="${src}" class="card-img-top" style="height: 150px; object-fit: cover;">
                    <div class="position-absolute top-0 end-0 m-1">
                        <button type="button" class="btn btn-sm btn-danger remove-preview" 
                                onclick="removePreview(this, ${index})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="position-absolute bottom-0 start-0 m-1">
                        <small class="badge bg-primary">Ảnh ${index + 1}</small>
                    </div>
                </div>
                <div class="card-body p-2">
                    <input type="text" class="form-control form-control-sm" 
                           placeholder="Alt text..." 
                           onchange="updateNewAltText(${index}, this.value)">
                    <small class="text-muted d-block mt-1">${fileName}</small>
                </div>
            </div>
        `;
                                albumPreview.appendChild(col);
                            }

                            // Remove preview
                            window.removePreview = function(button, index) {
                                selectedFiles.splice(index, 1);
                                button.closest('.album-item-new').remove();

                                // Update file input
                                const dt = new DataTransfer();
                                selectedFiles.forEach(file => dt.items.add(file));
                                albumInput.files = dt.files;

                                // Refresh preview
                                previewImages(selectedFiles);
                            };

                            // Update alt text for new images
                            window.updateNewAltText = function(index, value) {
                                const altInput = document.getElementById(`alt-text-${index}`);
                                if (altInput) {
                                    altInput.value = value;
                                }
                            };

                            // Handle existing images

                            // Delete existing image
                            document.addEventListener('click', function(e) {
                                if (e.target.closest('.delete-image')) {
                                    const button = e.target.closest('.delete-image');
                                    const imageId = button.dataset.id;
                                    const productId = '{{ isset($product) ? $product->id : '' }}';

                                    if (confirm('Bạn có chắc muốn xóa ảnh này?')) {
                                        deleteImage(productId, imageId, button);
                                    }
                                }
                            });

                            // Set primary image
                            document.addEventListener('click', function(e) {
                                if (e.target.closest('.set-primary')) {
                                    const button = e.target.closest('.set-primary');
                                    const imageId = button.dataset.id;
                                    const productId = '{{ isset($product) ? $product->id : '' }}';

                                    setPrimaryImage(productId, imageId);
                                }
                            });

                            function deleteImage(productId, imageId, button) {
                                fetch(`/admin/products/${productId}/images/${imageId}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            button.closest('.album-item').remove();
                                            showAlert(data.message, 'success');
                                        } else {
                                            showAlert(data.message, 'error');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                        showAlert('Có lỗi xảy ra', 'error');
                                    });
                            }

                            function setPrimaryImage(productId, imageId) {
                                fetch(`/admin/products/${productId}/images/${imageId}/primary`, {
                                        method: 'PATCH',
                                        headers: {
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            // Refresh page to update UI
                                            location.reload();
                                        } else {
                                            showAlert(data.message, 'error');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                        showAlert('Có lỗi xảy ra', 'error');
                                    });
                            }

                            // Update alt text for existing images
                            window.updateAltText = function(imageId, value) {
                                // You can implement AJAX update here if needed
                                console.log(`Update alt text for image ${imageId}: ${value}`);
                            };

                            // Drag and drop functionality for reordering (existing images)
                            function initDragAndDrop() {
                                const albumItems = document.querySelectorAll('.album-item[data-id]');

                                albumItems.forEach(item => {
                                    const dragHandle = item.querySelector('.drag-handle');
                                    if (dragHandle) {
                                        dragHandle.addEventListener('mousedown', function() {
                                            item.setAttribute('draggable', true);
                                        });

                                        dragHandle.addEventListener('mouseup', function() {
                                            item.setAttribute('draggable', false);
                                        });
                                    }

                                    item.addEventListener('dragstart', handleDragStart);
                                    item.addEventListener('dragover', handleDragOver);
                                    item.addEventListener('drop', handleDrop);
                                    item.addEventListener('dragend', handleDragEnd);
                                });
                            }

                            function handleDragStart(e) {
                                dragSrcEl = this;
                                e.dataTransfer.effectAllowed = 'move';
                                e.dataTransfer.setData('text/html', this.outerHTML);
                            }

                            function handleDragOver(e) {
                                if (e.preventDefault) {
                                    e.preventDefault();
                                }
                                e.dataTransfer.dropEffect = 'move';
                                return false;
                            }

                            function handleDrop(e) {
                                if (e.stopPropagation) {
                                    e.stopPropagation();
                                }

                                if (dragSrcEl !== this) {
                                    this.parentNode.removeChild(dragSrcEl);
                                    this.parentNode.insertBefore(dragSrcEl, this);

                                    // Update order
                                    updateImageOrder();
                                }
                                return false;
                            }

                            function handleDragEnd(e) {
                                const items = document.querySelectorAll('.album-item[data-id]');
                                items.forEach(item => {
                                    item.setAttribute('draggable', false);
                                });
                            }

                            function updateImageOrder() {
                                const items = document.querySelectorAll('.album-item[data-id]');
                                const imageIds = Array.from(items).map(item => item.dataset.id);
                                const productId = '{{ isset($product) ? $product->id : '' }}';

                                fetch(`/admin/products/${productId}/images/reorder`, {
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            image_ids: imageIds
                                        })
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            showAlert(data.message, 'success');
                                        } else {
                                            showAlert(data.message, 'error');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                        showAlert('Có lỗi xảy ra', 'error');
                                    });
                            }

                            // Initialize drag and drop for existing images
                            initDragAndDrop();
                        });
                    </script>


                    <!-- SEO Settings -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5>Cài đặt SEO</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Meta Title</label>
                                <input type="text" class="form-control" name="meta_title"
                                    value="{{ old('meta_title') }}" maxlength="60">
                                <small class="text-muted">Tối đa 60 ký tự</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Meta Description</label>
                                <textarea class="form-control" name="meta_description" rows="3" maxlength="160">{{ old('meta_description') }}</textarea>
                                <small class="text-muted">Tối đa 160 ký tự</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Meta Keywords</label>
                                <input type="text" class="form-control" name="meta_keywords"
                                    value="{{ old('meta_keywords') }}">
                            </div>
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="card">
                        <div class="card-header">
                            <h5>Trạng thái</h5>
                        </div>
                        <div class="card-body">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="is_active" value="1"
                                    {{ old('is_active', true) ? 'checked' : '' }}>
                                <label class="form-check-label">Kích hoạt sản phẩm</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Lưu sản phẩm
                    </button>
                    <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Hủy</a>
                </div>
            </div>
        </form>
    </div>
@endsection

{{-- resources/views/admin/products/variants/create.blade.php --}}
@extends('admin.layouts.masters')

@section('title', 'Thêm biến thể - ' . $product->name)

@section('content')
    <div class="container-fluid">
        {{-- Hiển thị thông báo lỗi từ session --}}
        @if (session('error'))
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ session('error') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif

        {{-- Hiển thị thông báo thành công từ session --}}
        @if (session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i>
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif

        {{-- Hiển thị lỗi validation --}}
        @if ($errors->any())
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Có lỗi xảy ra:</strong>
                <ul class="mb-0 mt-2">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif

        {{-- Hiển thị lỗi cho từng field cụ thể --}}
        @error('field_name')
            <div class="invalid-feedback d-block">
                <i class="fas fa-exclamation-circle me-1"></i>
                {{ $message }}
            </div>
        @enderror
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="mb-0">Thêm biến thể cho: {{ $product->name }}</h4>
                    </div>

                    <form action="{{ route('admin.products.variants.store', $product) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="card-body">
                            @if (session('error'))
                                <div class="alert alert-danger">{{ session('error') }}</div>
                            @endif

                            <div class="row">
                                <div class="col-md-8">
                                    <!-- Name -->
                                    <div class="mb-3">
                                        <label class="form-label">Tên biến thể <span class="text-danger">*</span></label>
                                        <input type="text" name="name"
                                            class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name') }}" required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Price -->
                                    <div class="mb-3">
                                        <label class="form-label">Giá <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="number" name="price"
                                                class="form-control @error('price') is-invalid @enderror"
                                                value="{{ old('price') }}" min="0" step="1000" required>
                                            <span class="input-group-text">VNĐ</span>
                                        </div>
                                        @error('price')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Color -->
                                    <div class="mb-3">
                                        <label class="form-label">Mã màu</label>
                                        <div class="input-group">
                                            <input type="color" name="color_code"
                                                class="form-control form-control-color @error('color_code') is-invalid @enderror"
                                                value="{{ old('color_code', '#000000') }}">
                                            <input type="text" class="form-control"
                                                value="{{ old('color_code', '#000000') }}" id="color-text" readonly>
                                        </div>
                                        @error('color_code')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Status -->
                                    <div class="mb-3">
                                        <div class="form-check">
                                            {{-- Hidden input để đảm bảo luôn có giá trị gửi đi --}}
                                            <input type="hidden" name="is_active" value="0">
                                            <input type="checkbox" name="is_active" class="form-check-input" value="1"
                                                {{ old('is_active', $variant->is_active ?? false) ? 'checked' : '' }}>
                                            <label class="form-check-label">Kích hoạt</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <!-- Image -->
                                    <div class="mb-3">
                                        <label class="form-label">Hình ảnh</label>
                                        <input type="file" name="image"
                                            class="form-control @error('image') is-invalid @enderror" accept="image/*"
                                            onchange="previewImage(this)">
                                        @error('image')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror

                                        <!-- Image Preview -->
                                        <div class="mt-2">
                                            <img id="image-preview" src="{{ asset('images/no-image.png') }}"
                                                class="img-thumbnail"
                                                style="width: 200px; height: 200px; object-fit: cover;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Lưu
                            </button>
                            <a href="{{ route('admin.products.variants.index', $product) }}" class="btn btn-secondary">
                                Hủy
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Color picker sync
        document.querySelector('input[name="color_code"]').addEventListener('input', function() {
            document.getElementById('color-text').value = this.value;
        });

        // Image preview
        function previewImage(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('image-preview').src = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
@endsection

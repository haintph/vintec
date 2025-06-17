@extends('admin.layouts.masters')
@section('content')
    <style>
        .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            max-width: 100%;
            height: 200px;
            border: 2px dashed #ccc;
            border-radius: 10px;
            overflow: hidden;
            background-color: #f8f9fa;
            padding: 10px;
        }

        .preview-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: transform 0.3s ease-in-out;
            border-radius: 8px;
        }

        .preview-img:hover {
            transform: scale(1.05);
        }
    </style>

    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <h3>Chỉnh sửa Banner</h3>
            </div>

            <div class="col-xl-9 col-lg-8">
                <form action="{{ route('banner_update', $banner->id) }}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Thông tin Banner</h4>
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

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Tiêu đề <span class="text-danger">*</span></label>
                                        <input type="text" name="title" id="title" class="form-control @error('title') is-invalid @enderror"
                                               value="{{ old('title', $banner->title) }}" placeholder="VD: Banner khuyến mãi mùa hè" required>
                                        @error('title')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="status" class="form-label">Trạng thái <span class="text-danger">*</span></label>
                                        <select name="status" id="status" class="form-control @error('status') is-invalid @enderror" required>
                                            <option value="1" {{ old('status', $banner->status) ? 'selected' : '' }}>
                                                Hoạt động
                                            </option>
                                            <option value="0" {{ !old('status', $banner->status) ? 'selected' : '' }}>
                                                Không hoạt động
                                            </option>
                                        </select>
                                        @error('status')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="description" class="form-label">Mô tả</label>
                                        <textarea name="description" id="description" class="form-control @error('description') is-invalid @enderror"
                                                  rows="4" placeholder="Mô tả chi tiết về banner...">{{ old('description', $banner->description) }}</textarea>
                                        @error('description')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <label class="form-label">Hình ảnh Banner</label>
                                    
                                    <div class="image-container mb-3">
                                        @if($banner->image)
                                            <img id="imagePreview" src="{{ $banner->image_url }}"
                                                 alt="Banner hiện tại" class="preview-img">
                                        @else
                                            <img id="imagePreview" src="" alt="Banner Preview" class="preview-img" style="display: none;">
                                            <div class="text-muted text-center">
                                                <iconify-icon icon="solar:gallery-broken" class="fs-48"></iconify-icon>
                                                <p class="mb-0">Chưa có hình ảnh</p>
                                            </div>
                                        @endif
                                    </div>
                                    
                                    <input type="file" name="image" id="image" 
                                           class="form-control @error('image') is-invalid @enderror"
                                           onchange="previewImage(event)" accept="image/*">
                                    @error('image')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                    <small class="form-text text-muted">
                                        Để trống để giữ hình ảnh hiện tại. Định dạng: JPEG, PNG, JPG, GIF, WEBP. Dung lượng tối đa: 2MB
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-3 bg-light mb-3 rounded">
                        <div class="row justify-content-end g-2">
                            <div class="col-lg-2">
                                <button type="submit" class="btn btn-outline-secondary w-100">Update</button>
                            </div>
                            <div class="col-lg-2">
                                <a href="{{ route('banner-list') }}" class="btn btn-primary w-100">Cancel</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        function previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const image = document.getElementById('imagePreview');
                    image.src = e.target.result;
                    image.style.display = 'block';
                    
                    const container = image.parentElement;
                    const placeholder = container.querySelector('.text-muted');
                    if (placeholder && placeholder !== image.nextElementSibling) {
                        placeholder.style.display = 'none';
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    </script>

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
@endsection
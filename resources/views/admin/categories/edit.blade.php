@extends('admin.layouts.masters')
@section('content')
    <style>
        .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            max-width: 300px;
            height: 180px;
            border: 2px dashed #ccc;
            border-radius: 10px;
            overflow: hidden;
            background-color: #f8f9fa;
            padding: 10px;
        }

        .preview-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease-in-out;
            border-radius: 8px;
        }

        .preview-img:hover {
            transform: scale(1.05);
        }

        .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }
    </style>
    
    <!-- Start Container Fluid -->
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <h3>Edit Category</h3>
            </div>

            <div class="col-xl-9 col-lg-8 ">
                <form action="{{ route('category_update', $category->id) }}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Thông tin chung</h4>
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
                                        <label for="category-title" class="form-label">Tên danh mục <span class="text-danger">*</span></label>
                                        <input type="text" name="name" class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name', $category->name) }}" placeholder="Enter Title" required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Slug hiện tại: <code>{{ $category->slug }}</code></small>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <label for="crater" class="form-label">Trạng thái</label>
                                    <select class="form-control @error('is_active') is-invalid @enderror" name="is_active">
                                        <option value="">Chọn trạng thái</option>
                                        <option value="1" {{ old('is_active', $category->is_active) == 1 ? 'selected' : '' }}>Hoạt động</option>
                                        <option value="0" {{ old('is_active', $category->is_active) == 0 ? 'selected' : '' }}>Ngừng hoạt động</option>
                                    </select>
                                    @error('is_active')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="col-lg-6">
                                    <label class="form-label">Hình ảnh danh mục</label><br>

                                    <!-- Khung hiển thị ảnh -->
                                    <div class="image-container">
                                        @if($category->img_category)
                                            <img id="imagePreview" src="{{ asset('storage/' . $category->img_category) }}"
                                                alt="Hình ảnh danh mục" class="preview-img">
                                        @else
                                            <img id="imagePreview" src="" alt="Hình ảnh danh mục" class="preview-img" style="display: none;">
                                            <div class="text-muted text-center">
                                                <iconify-icon icon="solar:gallery-broken" class="fs-48"></iconify-icon>
                                                <p class="mb-0">Chưa có hình ảnh</p>
                                            </div>
                                        @endif
                                    </div>

                                    <!-- Input chọn ảnh -->
                                    <input type="file" name="img_category" id="img_category" 
                                        class="form-control mt-2 @error('img_category') is-invalid @enderror"
                                        onchange="previewImage(event)" accept="image/*">
                                    @error('img_category')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                    <small class="form-text text-muted">Để trống để giữ hình ảnh hiện tại. Định dạng: JPEG, PNG, JPG, GIF, WEBP. Dung lượng tối đa: 2MB</small>
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
                                <a href="{{ route('category-list') }}" class="btn btn-primary w-100">Cancel</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- End Container Fluid -->

    <script>
        function previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const image = document.getElementById('imagePreview');
                    image.src = e.target.result;
                    image.style.display = 'block';
                    
                    // Ẩn placeholder text nếu có
                    const container = image.parentElement;
                    const placeholder = container.querySelector('.text-muted');
                    if (placeholder && placeholder !== image) {
                        placeholder.style.display = 'none';
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    </script>

    <!-- Footer -->
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
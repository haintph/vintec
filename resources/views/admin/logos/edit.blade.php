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
                <h3>Chỉnh sửa Logo</h3>
            </div>

            <div class="col-xl-9 col-lg-8">
                <form action="{{ route('logo_update', $logo->id) }}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Thông tin Logo</h4>
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
                                        <label for="type" class="form-label">Loại Logo <span class="text-danger">*</span></label>
                                        <select name="type" id="type" class="form-control @error('type') is-invalid @enderror" required>
                                            @foreach($types as $key => $value)
                                                <option value="{{ $key }}" 
                                                        {{ old('type', $logo->type) == $key ? 'selected' : '' }}>
                                                    {{ $value }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('type')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Tên mô tả</label>
                                        <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror"
                                               value="{{ old('name', $logo->name) }}" placeholder="VD: Logo header chính">
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">Trạng thái</label>
                                        <select name="is_active" class="form-control @error('is_active') is-invalid @enderror">
                                            <option value="1" {{ old('is_active', $logo->is_active) ? 'selected' : '' }}>
                                                Hoạt động
                                            </option>
                                            <option value="0" {{ !old('is_active', $logo->is_active) ? 'selected' : '' }}>
                                                Không hoạt động
                                            </option>
                                        </select>
                                        @error('is_active')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <label class="form-label">Hình ảnh Logo</label>
                                    
                                    <div class="image-container mb-3">
                                        @if($logo->image)
                                            <img id="imagePreview" src="{{ $logo->image_url }}"
                                                 alt="Logo hiện tại" class="preview-img">
                                        @else
                                            <img id="imagePreview" src="" alt="Logo Preview" class="preview-img" style="display: none;">
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
                                        Để trống để giữ hình ảnh hiện tại. Định dạng: JPEG, PNG, JPG, GIF, WEBP, SVG, ICO. Dung lượng tối đa: 2MB
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
                                <a href="{{ route('logo-list') }}" class="btn btn-primary w-100">Cancel</a>
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
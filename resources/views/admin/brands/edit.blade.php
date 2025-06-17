@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <h3>{{ isset($brand) ? 'Edit Brand' : 'Create Brand' }}</h3>                  
            </div>

            <div class="col-xl-9 col-lg-8 ">
                <form action="{{ isset($brand) ? route('brand_update', $brand->id) : route('brand_store') }}" 
                      method="post" enctype="multipart/form-data">
                    @csrf
                    @if(isset($brand))
                        @method('PUT')
                    @endif
                    
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Thông tin thương hiệu</h4>
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
                                        <label for="brand-name" class="form-label">Tên thương hiệu <span class="text-danger">*</span></label>
                                        <input type="text" name="name" id="brand-name"
                                            class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name', isset($brand) ? $brand->name : '') }}" 
                                            placeholder="Nhập tên thương hiệu" required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Tên thương hiệu sẽ hiển thị công khai</small>
                                    </div>
                                </div>

                                @if(isset($brand) && isset($brand->status))
                                <div class="col-lg-6">
                                    <label for="status" class="form-label">Trạng thái</label>
                                    <select class="form-control @error('status') is-invalid @enderror" name="status" id="status">
                                        <option value="1" {{ old('status', isset($brand) ? $brand->status : 1) == '1' ? 'selected' : '' }}>Hoạt động</option>
                                        <option value="0" {{ old('status', isset($brand) ? $brand->status : 1) == '0' ? 'selected' : '' }}>Ngừng hoạt động</option>
                                    </select>
                                    @error('status')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                                @endif

                                <div class="col-lg-6">
                                    <label class="form-label">Logo/Hình ảnh thương hiệu</label><br>
                                    <input type="file" name="image" id="brand_image" 
                                        class="form-control @error('image') is-invalid @enderror"
                                        onchange="previewImage(event)" accept="image/*">
                                    @error('image')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                    <small class="form-text text-muted">Định dạng: JPEG, PNG, JPG, GIF, SVG. Dung lượng tối đa: 2MB</small>
                                    
                                    <!-- Preview ảnh hiện tại (nếu edit) -->
                                    @if(isset($brand) && $brand->image)
                                        <div class="mt-2">
                                            <p class="mb-1 text-muted">Ảnh hiện tại:</p>
                                            <img src="{{ asset('storage/' . $brand->image) }}" 
                                                 alt="{{ $brand->name }}" 
                                                 id="currentImage"
                                                 class="img-thumbnail"
                                                 style="max-width: 200px; max-height: 100px;">
                                        </div>
                                    @endif
                                    
                                    <!-- Preview ảnh mới -->
                                    <img id="imagePreview" src="" alt="Image Preview"
                                        style="max-width: 300px; max-height: 150px; display: none; margin-top: 10px;" 
                                        class="img-thumbnail">
                                </div>

                                @if(isset($brand) && isset($brand->description))
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="description" class="form-label">Mô tả thương hiệu</label>
                                        <textarea name="description" id="description" rows="4"
                                            class="form-control @error('description') is-invalid @enderror"
                                            placeholder="Nhập mô tả về thương hiệu...">{{ old('description', isset($brand) ? $brand->description : '') }}</textarea>
                                        @error('description')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Mô tả ngắn về thương hiệu (không bắt buộc)</small>
                                    </div>
                                </div>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="p-3 bg-light mb-3 rounded">
                        <div class="row justify-content-end g-2">
                            <div class="col-lg-2">
                                <button type="submit" class="btn btn-outline-secondary w-100">
                                    {{ isset($brand) ? 'Update' : 'Create' }}
                                </button>
                            </div>
                            <div class="col-lg-2">
                                <a href="{{ route('brand-list') }}" class="btn btn-primary w-100">Cancel</a>
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
                    const imagePreview = document.getElementById('imagePreview');
                    const currentImage = document.getElementById('currentImage');
                    
                    // Hiển thị ảnh preview mới
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    
                    // Ẩn ảnh hiện tại nếu có
                    if (currentImage) {
                        currentImage.style.display = 'none';
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
@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <h3>{{ isset($banner) ? 'Edit Banner Footer' : 'Create Banner Footer' }}</h3>                  
            </div>

            <div class="col-xl-9 col-lg-8 ">
                <form action="{{ isset($banner) ? route('bannerfooters.update', $banner->id) : route('bannerfooters.store') }}" 
                      method="post" enctype="multipart/form-data">
                    @csrf
                    @if(isset($banner))
                        @method('PUT')
                    @endif
                    
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Thông tin Banner Footer</h4>
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
                                    <label class="form-label">Hình ảnh Banner <span class="text-danger">*</span></label><br>
                                    <input type="file" name="img_banner" id="banner_image" 
                                        class="form-control @error('img_banner') is-invalid @enderror"
                                        onchange="previewImage(event)" accept="image/*" 
                                        {{ !isset($banner) ? 'required' : '' }}>
                                    @error('img_banner')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                    <small class="form-text text-muted">Định dạng: JPEG, PNG, JPG, GIF, WEBP. Dung lượng tối đa: 2MB</small>
                                    
                                    <!-- Preview ảnh hiện tại (nếu edit) -->
                                    @if(isset($banner) && $banner->img_banner)
                                        <div class="mt-2">
                                            <p class="mb-1 text-muted">Ảnh hiện tại:</p>
                                            <img src="{{ $banner->image_url }}" 
                                                 alt="Banner hiện tại" 
                                                 id="currentImage"
                                                 class="img-thumbnail"
                                                 style="max-width: 300px; max-height: 150px;">
                                        </div>
                                    @endif
                                    
                                    <!-- Preview ảnh mới -->
                                    <img id="imagePreview" src="" alt="Image Preview"
                                        style="max-width: 300px; max-height: 150px; display: none; margin-top: 10px;" 
                                        class="img-thumbnail">
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="status" class="form-label">Trạng thái</label>
                                        <select class="form-control @error('is_active') is-invalid @enderror" name="is_active" id="status">
                                            <option value="1" {{ old('is_active', isset($banner) ? $banner->is_active : 1) == '1' ? 'selected' : '' }}>Hoạt động</option>
                                            <option value="0" {{ old('is_active', isset($banner) ? $banner->is_active : 1) == '0' ? 'selected' : '' }}>Ngừng hoạt động</option>
                                        </select>
                                        @error('is_active')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Chọn trạng thái hiển thị của banner</small>
                                    </div>

                                    @if(isset($banner))
                                        <div class="mb-3">
                                            <label class="form-label">Thông tin Banner</label>
                                            <div class="bg-light p-3 rounded">
                                                <p class="mb-1"><strong>ID:</strong> #{{ $banner->id }}</p>
                                                <p class="mb-1"><strong>Ngày tạo:</strong> {{ $banner->created_at->format('d/m/Y H:i') }}</p>
                                                <p class="mb-0"><strong>Cập nhật lần cuối:</strong> {{ $banner->updated_at->format('d/m/Y H:i') }}</p>
                                            </div>
                                        </div>
                                    @endif
                                </div>

                                <div class="col-lg-12">
                                    <div class="alert alert-info">
                                        <h6 class="alert-heading">
                                            <iconify-icon icon="solar:info-circle-bold" class="fs-18 align-middle"></iconify-icon>
                                            Lưu ý về Banner Footer
                                        </h6>
                                        <ul class="mb-0">
                                            <li>Banner Footer sẽ hiển thị ở cuối trang website</li>
                                            <li>Kích thước ảnh khuyến nghị: 1200x400px để có chất lượng tốt nhất</li>
                                            <li>Chỉ banner có trạng thái "Hoạt động" mới được hiển thị</li>
                                            <li>Ảnh sẽ được tự động tối ưu khi upload</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-3 bg-light mb-3 rounded">
                        <div class="row justify-content-end g-2">
                            <div class="col-lg-2">
                                <button type="submit" class="btn btn-outline-secondary w-100">
                                    {{ isset($banner) ? 'Update' : 'Create' }}
                                </button>
                            </div>
                            <div class="col-lg-2">
                                <a href="{{ route('bannerfooters.index') }}" class="btn btn-primary w-100">Cancel</a>
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
                // Kiểm tra kích thước file (2MB)
                if (file.size > 2 * 1024 * 1024) {
                    alert('Kích thước file quá lớn! Vui lòng chọn file nhỏ hơn 2MB.');
                    event.target.value = '';
                    return;
                }

                // Kiểm tra định dạng file
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Định dạng file không được hỗ trợ! Vui lòng chọn file JPEG, PNG, JPG, GIF hoặc WEBP.');
                    event.target.value = '';
                    return;
                }

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

        // Reset preview khi reload trang
        document.addEventListener('DOMContentLoaded', function() {
            const fileInput = document.getElementById('banner_image');
            if (fileInput && !fileInput.files.length) {
                const imagePreview = document.getElementById('imagePreview');
                const currentImage = document.getElementById('currentImage');
                
                if (imagePreview) {
                    imagePreview.style.display = 'none';
                }
                if (currentImage) {
                    currentImage.style.display = 'block';
                }
            }
        });
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
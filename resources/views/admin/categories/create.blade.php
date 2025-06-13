@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <h3>Create Category</h3>                  
            </div>

            <div class="col-xl-9 col-lg-8 ">
                <form action="{{ route('category_store') }}" method="post" enctype="multipart/form-data">
                    @csrf
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
                                            value="{{ old('name') }}" placeholder="Enter Title" required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Slug sẽ được tự động tạo từ tên</small>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <label for="crater" class="form-label">Trạng thái</label>
                                    <select class="form-control @error('is_active') is-invalid @enderror" name="is_active">
                                        {{-- <option value="">Chọn trạng thái</option> --}}
                                        <option value="1" {{ old('is_active') == '1' ? 'selected' : '' }}>Hoạt động</option>
                                        <option value="0" {{ old('is_active') == '0' ? 'selected' : '' }}>Ngừng hoạt động</option>
                                    </select>
                                    @error('is_active')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="col-lg-6">
                                    <label class="form-label">Image</label><br>
                                    <input type="file" name="img_category" id="img_category" 
                                        class="form-control @error('img_category') is-invalid @enderror"
                                        onchange="previewImage(event)" accept="image/*">
                                    @error('img_category')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                    <small class="form-text text-muted">Định dạng: JPEG, PNG, JPG, GIF, WEBP. Dung lượng tối đa: 2MB</small>
                                    <br>
                                    <img id="imagePreview" src="" alt="Image Preview"
                                        style="max-width: 300px; max-height: 150px; display: none; margin-top: 10px;" class="img-thumbnail">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-3 bg-light mb-3 rounded">
                        <div class="row justify-content-end g-2">
                            <div class="col-lg-2">
                                <button type="submit" class="btn btn-outline-secondary w-100">Create</button>
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
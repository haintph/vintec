@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <h3>Edit Category Solution</h3>
                
                <!-- Thông tin danh mục -->
                <div class="card mt-3">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Thông tin Danh mục</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-2">
                            <strong>ID:</strong> #{{ $category->id }}
                        </div>
                        <div class="mb-2">
                            <strong>Slug hiện tại:</strong> 
                            <code>{{ $category->slug }}</code>
                        </div>
                        <div class="mb-2">
                            <strong>Số bài viết:</strong> 
                            <span class="badge bg-info">1</span>
                        </div>
                        <div class="mb-2">
                            <strong>Ngày tạo:</strong> 
                            {{ $category->created_at->format('d/m/Y H:i') }}
                        </div>
                        <div class="mb-0">
                            <strong>Cập nhật lần cuối:</strong> 
                            {{ $category->updated_at->format('d/m/Y H:i') }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-9 col-lg-8">
                <form action="{{ route('category_solution_update', $category->id) }}" method="post">
                    @csrf
                    @method('PUT')
                    
                    <!-- Thông tin chung -->
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
                                        <label for="name" class="form-label">Tên danh mục <span class="text-danger">*</span></label>
                                        <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name', $category->name) }}" placeholder="Tin tức hôm nay" required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Slug hiện tại: <code>{{ $category->slug }}</code></small>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="slug" class="form-label">Slug</label>
                                        <input type="text" name="slug" id="slug" class="form-control @error('slug') is-invalid @enderror"
                                            value="{{ old('slug', $category->slug) }}" placeholder="tin-hom-nay">
                                        @error('slug')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Để trống để tự động tạo từ tên danh mục khi thay đổi tên</small>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="description" class="form-label">Mô tả</label>
                                        <textarea name="description" id="description" rows="4" 
                                            class="form-control @error('description') is-invalid @enderror"
                                            placeholder="Tin tức hôm nay">{{ old('description', $category->description) }}</textarea>
                                        @error('description')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="sort_order" class="form-label">Thứ tự sắp xếp</label>
                                        <input type="number" name="sort_order" id="sort_order" 
                                            class="form-control @error('sort_order') is-invalid @enderror"
                                            value="{{ old('sort_order', $category->sort_order) }}" min="0">
                                        @error('sort_order')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="is_active" class="form-label">Trạng thái</label>
                                        <select class="form-control @error('is_active') is-invalid @enderror" name="is_active" id="is_active">
                                            <option value="1" {{ old('is_active', $category->is_active) == 1 ? 'selected' : '' }}>Hoạt động</option>
                                            <option value="0" {{ old('is_active', $category->is_active) == 0 ? 'selected' : '' }}>Ngừng hoạt động</option>
                                        </select>
                                        @error('is_active')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SEO Settings -->
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Cài đặt SEO</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="meta_title" class="form-label">Meta Title</label>
                                        <input type="text" name="meta_title" id="meta_title" 
                                            class="form-control @error('meta_title') is-invalid @enderror"
                                            value="{{ old('meta_title', $category->meta_title) }}" placeholder="Tin tức hôm nay">
                                        @error('meta_title')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <div class="text-end">
                                            <small class="text-muted">Tối đa 255 ký tự</small>
                                            <span id="meta_title_count" class="text-info">{{ strlen(old('meta_title', $category->meta_title)) }}/255 ký tự</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="canonical_url" class="form-label">Canonical URL</label>
                                        <input type="url" name="canonical_url" id="canonical_url" 
                                            class="form-control @error('canonical_url') is-invalid @enderror"
                                            value="{{ old('canonical_url', $category->canonical_url) }}" placeholder="https://example.com/category-name">
                                        @error('canonical_url')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="meta_description" class="form-label">Meta Description</label>
                                        <textarea name="meta_description" id="meta_description" rows="3" 
                                            class="form-control @error('meta_description') is-invalid @enderror"
                                            placeholder="Mô tả SEO">{{ old('meta_description', $category->meta_description) }}</textarea>
                                        @error('meta_description')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <div class="text-end">
                                            <small class="text-muted">Khuyến nghị 150-160 ký tự</small>
                                            <span id="meta_description_count" class="text-info">{{ strlen(old('meta_description', $category->meta_description)) }}/160 ký tự</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <label for="meta_keywords" class="form-label">Meta Keywords</label>
                                        <input type="text" name="meta_keywords" id="meta_keywords" 
                                            class="form-control @error('meta_keywords') is-invalid @enderror"
                                            value="{{ old('meta_keywords', $category->meta_keywords) }}" placeholder="tinhot,tinnong,tinhomnay">
                                        @error('meta_keywords')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="form-text text-muted">Phân cách bằng dấu phẩy</small>
                                    </div>
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
                                <a href="{{ route('category-solution-list') }}" class="btn btn-primary w-100">Cancel</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- End Container Fluid -->

    <script>
        // Auto generate slug from name
        document.getElementById('name').addEventListener('input', function() {
            const name = this.value;
            const slug = name.toLowerCase()
                .replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a')
                .replace(/[éèẻẽẹêếềểễệ]/g, 'e')
                .replace(/[íìỉĩị]/g, 'i')
                .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
                .replace(/[úùủũụưứừửữự]/g, 'u')
                .replace(/[ýỳỷỹỵ]/g, 'y')
                .replace(/đ/g, 'd')
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            
            document.getElementById('slug').value = slug;
        });

        // Character count for meta fields
        document.getElementById('meta_title').addEventListener('input', function() {
            const count = this.value.length;
            document.getElementById('meta_title_count').textContent = count + '/255 ký tự';
            document.getElementById('meta_title_count').className = count > 255 ? 'text-danger' : 'text-info';
        });

        document.getElementById('meta_description').addEventListener('input', function() {
            const count = this.value.length;
            document.getElementById('meta_description_count').textContent = count + '/160 ký tự';
            document.getElementById('meta_description_count').className = count > 160 ? 'text-danger' : (count >= 150 ? 'text-success' : 'text-info');
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
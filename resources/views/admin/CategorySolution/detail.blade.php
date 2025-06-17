@extends('admin.layouts.masters')
@section('content')
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4 class="card-title">Category Solution Details: {{ $category->name }}</h4>
                        <div class="d-flex gap-2">
                            <a href="{{ route('category_solution_edit', $category->id) }}" class="btn btn-primary btn-sm">
                                <iconify-icon icon="solar:pen-2-broken" class="me-1"></iconify-icon> Edit
                            </a>
                            <a href="{{ route('category-solution-list') }}" class="btn btn-light btn-sm">
                                <iconify-icon icon="solar:arrow-left-broken" class="me-1"></iconify-icon> Back to List
                            </a>
                        </div>
                    </div>
                    
                    <div class="card-body">
                        <div class="row">
                            <!-- Left Column - Basic Info -->
                            <div class="col-md-6">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <h5 class="card-title mb-0">Thông tin cơ bản</h5>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <th width="35%">ID:</th>
                                                    <td><span class="badge bg-info">#{{ $category->id }}</span></td>
                                                </tr>
                                                <tr>
                                                    <th>Tên danh mục:</th>
                                                    <td><strong>{{ $category->name }}</strong></td>
                                                </tr>
                                                <tr>
                                                    <th>Slug:</th>
                                                    <td><code class="text-primary">{{ $category->slug }}</code></td>
                                                </tr>
                                                <tr>
                                                    <th>Thứ tự:</th>
                                                    <td><span class="badge bg-info">{{ $category->sort_order }}</span></td>
                                                </tr>
                                                <tr>
                                                    <th>Trạng thái:</th>
                                                    <td>
                                                        <span class="badge bg-{{ $category->is_active ? 'success' : 'secondary' }}">
                                                            {{ $category->is_active ? 'Hoạt động' : 'Không hoạt động' }}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Ngày tạo:</th>
                                                    <td>{{ $category->created_at->format('d/m/Y H:i:s') }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Cập nhật lần cuối:</th>
                                                    <td>{{ $category->updated_at->format('d/m/Y H:i:s') }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column - SEO Info -->
                            <div class="col-md-6">
                                <div class="card h-100">
                                    <div class="card-header">
                                        <h5 class="card-title mb-0">Thông tin SEO</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <label class="form-label fw-bold">Meta Title:</label>
                                            <p class="mb-1">{{ $category->meta_title ?: 'Chưa thiết lập' }}</p>
                                            @if($category->meta_title)
                                                <small class="text-muted">{{ strlen($category->meta_title) }} ký tự</small>
                                            @endif
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label fw-bold">Meta Description:</label>
                                            <p class="mb-1">{{ $category->meta_description ?: 'Chưa thiết lập' }}</p>
                                            @if($category->meta_description)
                                                <small class="text-muted">{{ strlen($category->meta_description) }} ký tự</small>
                                            @endif
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label fw-bold">Meta Keywords:</label>
                                            <p class="mb-0">
                                                @if($category->meta_keywords)
                                                    @foreach(explode(',', $category->meta_keywords) as $keyword)
                                                        <span class="badge bg-light text-dark me-1">{{ trim($keyword) }}</span>
                                                    @endforeach
                                                @else
                                                    Chưa thiết lập
                                                @endif
                                            </p>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label fw-bold">Canonical URL:</label>
                                            <p class="mb-0">
                                                @if($category->canonical_url)
                                                    <a href="{{ $category->canonical_url }}" target="_blank" class="text-primary">
                                                        {{ $category->canonical_url }}
                                                        <iconify-icon icon="solar:external-link-broken" class="ms-1"></iconify-icon>
                                                    </a>
                                                @else
                                                    Chưa thiết lập
                                                @endif
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        @if($category->description)
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title mb-0">Mô tả</h5>
                                    </div>
                                    <div class="card-body">
                                        <p class="mb-0">{{ $category->description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endif

                        <!-- Action buttons -->
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <h6 class="card-title">Hành động</h6>
                                        <br>
                                        <div class="d-flex gap-2 flex-wrap">
                                            <a href="{{ route('category_solution_edit', $category->id) }}" class="btn btn-primary">
                                                <iconify-icon icon="solar:pen-2-broken" class="me-1"></iconify-icon> Chỉnh sửa
                                            </a>

                                            <form action="{{ route('category_solution_toggle_status', $category->id) }}" method="POST" style="display: inline;">
                                                @csrf
                                                @method('PATCH')
                                                <button type="submit" class="btn btn-{{ $category->is_active ? 'warning' : 'success' }}"
                                                    onclick="return confirm('Bạn có chắc muốn {{ $category->is_active ? 'vô hiệu hóa' : 'kích hoạt' }} danh mục này?')">
                                                    <iconify-icon icon="solar:{{ $category->is_active ? 'pause' : 'play' }}-broken" class="me-1"></iconify-icon>
                                                    {{ $category->is_active ? 'Vô hiệu hóa' : 'Kích hoạt' }}
                                                </button>
                                            </form>

                                            <form action="{{ route('category_solution_destroy', $category->id) }}" method="POST" style="display: inline;">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger"
                                                    onclick="return confirm('Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác!')">
                                                    <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="me-1"></iconify-icon>
                                                    Xóa danh mục
                                                </button>
                                            </form>

                                            <a href="{{ route('category-solution-list') }}" class="btn btn-outline-secondary">
                                                <iconify-icon icon="solar:arrow-left-broken" class="me-1"></iconify-icon> Quay lại danh sách
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
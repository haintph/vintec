@extends('admin.layouts.masters')

@section('title', 'Danh sách sản phẩm')

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
            <h1 class="h3">Danh sách sản phẩm</h1>
            <a href="{{ route('admin.products.create') }}" class="btn btn-primary">
                <i class="fas fa-plus"></i> Thêm sản phẩm
            </a>
        </div>

        <!-- Search & Filter -->
        <div class="card mb-4">
            <div class="card-body">
                <form method="GET" class="row g-3">
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="search" value="{{ request('search') }}"
                            placeholder="Tìm kiếm...">
                    </div>
                    <div class="col-md-3">
                        <select name="category_id" class="form-select">
                            <option value="">Tất cả danh mục</option>
                            @foreach ($categories as $category)
                                <option value="{{ $category->id }}"
                                    {{ request('category_id') == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-outline-primary">Lọc</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Products Table -->
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th width="80">Ảnh</th>
                                <th>Mã SP</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá sản phẩm</th>
                                <th>Danh mục</th>
                                <th width="120">Biến thể</th>
                                <th width="100">Trạng thái</th>
                                <th width="200">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($products as $product)
                                <tr>
                                    <td>
                                        <img src="{{ $product->image_url }}" class="img-thumbnail"
                                            style="width: 50px; height: 50px; object-fit: cover;">
                                    </td>
                                    <td>{{ $product->product_code }}</td>
                                    <td>
                                        <strong>{{ $product->name }}</strong>
                                        <br><small class="text-muted">{{ Str::limit($product->description, 50) }}</small>
                                    </td>
                                    <td>{{ $product->price }}</td>
                                    <td><span class="badge bg-info">{{ $product->category->name }}</span></td>
                                    <td>
                                        @php
                                            $variantCount = $product->variants_count ?? $product->variants->count();
                                        @endphp
                                        
                                        @if($variantCount > 0)
                                            <span class="badge bg-primary">{{ $variantCount }} biến thể</span>
                                            <br>
                                            <small class="text-muted">
                                                @foreach($product->variants->take(2) as $variant)
                                                    <span class="badge badge-outline-secondary mt-1">{{ $variant->name }}</span>
                                                @endforeach
                                                @if($variantCount > 2)
                                                    <span class="text-muted">+{{ $variantCount - 2 }} khác</span>
                                                @endif
                                            </small>
                                        @else
                                            <span class="badge bg-secondary">Chưa có biến thể</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge {{ $product->is_active ? 'bg-success' : 'bg-secondary' }}">
                                            {{ $product->is_active ? 'Hoạt động' : 'Tạm ẩn' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <a href="{{ route('admin.products.show', $product) }}"
                                                class="btn btn-sm btn-info" title="Xem">
                                                <i class="fas fa-eye"></i>
                                            </a>
                                            <a href="{{ route('admin.products.edit', $product) }}"
                                                class="btn btn-sm btn-warning" title="Sửa">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <a href="{{ route('admin.products.variants.index', $product) }}"
                                                class="btn btn-sm btn-success" title="Quản lý biến thể">
                                                <i class="fas fa-cogs"></i>
                                            </a>
                                            <form action="{{ route('admin.products.destroy', $product) }}" method="POST"
                                                class="d-inline" onsubmit="return confirm('Bạn có chắc muốn xóa?')">
                                                @csrf @method('DELETE')
                                                <button type="submit" class="btn btn-sm btn-danger" title="Xóa">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="8" class="text-center">Không có sản phẩm nào</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
                {{ $products->links() }}
            </div>
        </div>
    </div>

    {{-- CSS cho badge outline --}}
    <style>
        .badge-outline-secondary {
            color: #6c757d;
            border: 1px solid #6c757d;
            background-color: transparent;
            font-size: 0.7em;
            padding: 0.2em 0.4em;
            border-radius: 0.25rem;
        }
    </style>
@endsection
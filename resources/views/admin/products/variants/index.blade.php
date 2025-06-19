{{-- resources/views/admin/products/variants/index.blade.php --}}
@extends('admin.layouts.masters')

@section('title', 'Biến thể sản phẩm: ' . $product->name)

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">Biến thể: {{ $product->name }}</h4>
                    <div>
                        <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">
                            <i class="fas fa-arrow-left"></i> Quay lại
                        </a>
                        <a href="{{ route('admin.products.variants.create', $product) }}" class="btn btn-primary">
                            <i class="fas fa-plus"></i> Thêm biến thể
                        </a>
                    </div>
                </div>

                <div class="card-body">
                    @if(session('success'))
                        <div class="alert alert-success">{{ session('success') }}</div>
                    @endif

                    @if($variants->count() > 0)
                        <!-- Bulk Actions -->
                        <div class="mb-3">
                            <button class="btn btn-sm btn-success" onclick="bulkAction('activate')">
                                <i class="fas fa-check"></i> Kích hoạt
                            </button>
                            <button class="btn btn-sm btn-warning" onclick="bulkAction('deactivate')">
                                <i class="fas fa-times"></i> Tạm ẩn
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="bulkDelete()">
                                <i class="fas fa-trash"></i> Xóa
                            </button>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="30">
                                            <input type="checkbox" id="select-all">
                                        </th>
                                        <th width="80">Ảnh</th>
                                        <th>Tên</th>
                                        <th width="100">Màu</th>
                                        <th width="120">Giá</th>
                                        <th width="80">Trạng thái</th>
                                        <th width="150">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($variants as $variant)
                                    <tr>
                                        <td>
                                            <input type="checkbox" class="variant-checkbox" value="{{ $variant->id }}">
                                        </td>
                                        <td>
                                            <img src="{{ $variant->image_url }}" alt="{{ $variant->name }}" 
                                                 class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;">
                                        </td>
                                        <td>{{ $variant->name }}</td>
                                        <td>
                                            @if($variant->color_code)
                                                <div class="d-flex align-items-center">
                                                    <div style="width: 20px; height: 20px; background: {{ $variant->color_code }}; border-radius: 3px; margin-right: 5px;"></div>
                                                    <small>{{ $variant->color_code }}</small>
                                                </div>
                                            @else
                                                <span class="text-muted">-</span>
                                            @endif
                                        </td>
                                        <td>{{ $variant->formatted_price }}</td>
                                        <td>
                                            <button class="btn btn-sm {{ $variant->is_active ? 'btn-success' : 'btn-secondary' }}"
                                                    onclick="toggleStatus({{ $variant->id }})">
                                                {{ $variant->is_active ? 'Hoạt động' : 'Tạm ẩn' }}
                                            </button>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <a href="{{ route('admin.products.variants.edit', [$product, $variant]) }}" 
                                                   class="btn btn-sm btn-warning">
                                                    <i class="fas fa-edit"></i>
                                                </a>
                                                <button class="btn btn-sm btn-info" onclick="duplicateVariant({{ $variant->id }})">
                                                    <i class="fas fa-copy"></i>
                                                </button>
                                                <button class="btn btn-sm btn-danger" onclick="deleteVariant({{ $variant->id }}, '{{ $variant->name }}')">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <div class="text-center py-4">
                            <p class="text-muted">Chưa có biến thể nào.</p>
                            <a href="{{ route('admin.products.variants.create', $product) }}" class="btn btn-primary">
                                Thêm biến thể đầu tiên
                            </a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// Select all checkbox
document.getElementById('select-all').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.variant-checkbox');
    checkboxes.forEach(cb => cb.checked = this.checked);
});

// Toggle status
function toggleStatus(id) {
    fetch(`/admin/products/{{ $product->id }}/variants/${id}/toggle-status`, {
        method: 'PATCH',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert(data.message);
        }
    });
}

// Delete variant
function deleteVariant(id, name) {
    if (confirm(`Bạn có chắc muốn xóa biến thể "${name}"?`)) {
        fetch(`/admin/products/{{ $product->id }}/variants/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) location.reload();
        });
    }
}

// Duplicate variant
function duplicateVariant(id) {
    fetch(`/admin/products/{{ $product->id }}/variants/${id}/duplicate`, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success && data.redirect) {
            window.location.href = data.redirect;
        }
    });
}

// Bulk actions
function bulkAction(action) {
    const selected = Array.from(document.querySelectorAll('.variant-checkbox:checked')).map(cb => cb.value);
    if (selected.length === 0) {
        alert('Vui lòng chọn ít nhất một biến thể');
        return;
    }

    const status = action === 'activate';
    fetch(`/admin/products/{{ $product->id }}/variants/bulk-status`, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: selected, status: status })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) location.reload();
    });
}

function bulkDelete() {
    const selected = Array.from(document.querySelectorAll('.variant-checkbox:checked')).map(cb => cb.value);
    if (selected.length === 0) {
        alert('Vui lòng chọn ít nhất một biến thể');
        return;
    }

    if (confirm(`Bạn có chắc muốn xóa ${selected.length} biến thể đã chọn?`)) {
        fetch(`/admin/products/{{ $product->id }}/variants/bulk-delete`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: selected })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) location.reload();
        });
    }
}
</script>
@endsection
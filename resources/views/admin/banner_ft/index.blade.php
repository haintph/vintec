@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">

        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">All Banner Footer List</h4>

                        <a href="{{ route('bannerfooters.create') }}" class="btn btn-sm btn-primary">
                            Add Banner
                        </a>

                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle btn btn-sm btn-outline-light" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                This Month
                            </a>
                            
                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <a href="#!" class="dropdown-item">Download</a>
                                <!-- item-->
                                <a href="#!" class="dropdown-item">Export</a>
                                <!-- item-->
                                <a href="#!" class="dropdown-item">Import</a>
                            </div>
                        </div>
                    </div>
                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    <div>
                        <div class="table-responsive">
                            <table class="table align-middle mb-0 table-hover table-centered">
                                <thead class="bg-light-subtle">
                                    <tr>
                                        <th style="width: 20px;">
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="customCheck1">
                                                <label class="form-check-label" for="customCheck1"></label>
                                            </div>
                                        </th>
                                        <th>ID</th>
                                        <th>Banner Image</th>
                                        <th>Time update</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($banners as $banner)
                                        <tr>
                                            <td>
                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input" id="customCheck{{ $banner->id }}">
                                                    <label class="form-check-label" for="customCheck{{ $banner->id }}"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center gap-2">
                                                    <p class="text-dark fw-medium fs-15 mb-0">#{{ $banner->id }}</p>
                                                </div>
                                            </td>
                                            <td>
                                                @if($banner->img_banner)
                                                    <img src="{{ $banner->image_url }}" 
                                                         alt="Banner #{{ $banner->id }}" 
                                                         class="rounded" 
                                                         style="width: 80px; height: 50px; object-fit: cover;">
                                                @else
                                                    <span class="text-muted">No image</span>
                                                @endif
                                            </td>
                                            <td>{{ $banner->updated_at->format('d/m/Y H:i') }}</td>
                                            <td>
                                                <span class="badge bg-{{ $banner->is_active ? 'success' : 'secondary' }}">
                                                    {{ $banner->status_text }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <a href="{{ route('bannerfooters.show', $banner->id) }}"
                                                        class="btn btn-light btn-sm" title="View Details">
                                                        <iconify-icon icon="solar:eye-broken"
                                                            class="align-middle fs-18"></iconify-icon>
                                                    </a> <!-- Detail -->

                                                    <a href="{{ route('bannerfooters.edit', $banner->id) }}"
                                                        class="btn btn-soft-primary btn-sm" title="Edit Banner">
                                                        <iconify-icon icon="solar:pen-2-broken"
                                                            class="align-middle fs-18"></iconify-icon>
                                                    </a> <!-- Edit -->

                                                    <button type="button" 
                                                        class="btn btn-soft-{{ $banner->is_active ? 'warning' : 'success' }} btn-sm toggle-status" 
                                                        title="{{ $banner->is_active ? 'Deactivate' : 'Activate' }} Banner"
                                                        data-id="{{ $banner->id }}"
                                                        data-status="{{ $banner->is_active }}">
                                                        <iconify-icon icon="solar:{{ $banner->is_active ? 'eye-closed' : 'eye' }}-broken"
                                                            class="align-middle fs-18"></iconify-icon>
                                                    </button> <!-- Toggle Status -->

                                                    <form action="{{ route('bannerfooters.destroy', $banner->id) }}" method="POST"
                                                        style="display: inline;">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button onclick="return confirm('Bạn có chắc chắn muốn xóa banner này?')"
                                                            type="submit" class="btn btn-soft-danger btn-sm" title="Delete Banner">
                                                            <iconify-icon icon="solar:trash-bin-minimalistic-2-broken"
                                                                class="align-middle fs-18"></iconify-icon>
                                                        </button>
                                                    </form>
                                                </div>
                                            </td>

                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="6" class="text-center py-4">
                                                <div class="d-flex flex-column align-items-center">
                                                    <iconify-icon icon="solar:gallery-broken" class="fs-48 text-muted mb-2"></iconify-icon>
                                                    <p class="text-muted mb-0">Chưa có banner nào</p>
                                                    <a href="{{ route('bannerfooters.create') }}" class="btn btn-primary btn-sm mt-2">
                                                        Thêm banner đầu tiên
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforelse

                                </tbody>
                            </table>
                        </div>
                        <!-- end table-responsive -->
                    </div>
                    @if($banners->hasPages())
                        <div class="card-footer border-top">
                            {{ $banners->links() }}
                        </div>
                    @endif
                </div>
            </div>
        </div>

    </div>
    <!-- End Container Fluid -->

    <!-- ========== Footer Start ========== -->
    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center">
                    <script>
                        document.write(new Date().getFullYear())
                    </script> &copy; Larkon. Crafted by <iconify-icon icon="iconamoon:heart-duotone"
                        class="fs-18 align-middle text-danger"></iconify-icon> <a href="https://1.envato.market/techzaa"
                        class="fw-bold footer-text" target="_blank">Techzaa</a>
                </div>
            </div>
        </div>
    </footer>
    <!-- ========== Footer End ========== -->

    <!-- Toggle Status Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.toggle-status').forEach(button => {
                button.addEventListener('click', function() {
                    const bannerId = this.dataset.id;
                    const currentStatus = this.dataset.status === '1';
                    
                    fetch(`/banners/${bannerId}/toggle-status`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            location.reload(); // Reload để cập nhật UI
                        } else {
                            alert('Có lỗi xảy ra: ' + data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Có lỗi xảy ra khi cập nhật trạng thái');
                    });
                });
            });
        });
    </script>
@endsection
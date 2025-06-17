@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">

        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">All Brands List</h4>

                        <a href="{{ route('brand-create') }}" class="btn btn-sm btn-primary">
                            Add Brand
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
                                        <th>Brands</th>
                                        <th>Image</th>
                                        <th>Time update</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($brands as $brand)
                                        <tr>
                                            <td>
                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input" id="customCheck{{ $brand->id }}">
                                                    <label class="form-check-label" for="customCheck{{ $brand->id }}"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center gap-2">
                                                    
                                                    <p class="text-dark fw-medium fs-15 mb-0">{{ $brand->name }}</p>
                                                </div>
                                            </td>
                                            <td>
                                                @if($brand->image)
                                                    <img src="{{ asset('storage/' . $brand->image) }}" 
                                                         alt="{{ $brand->name }}" 
                                                         class="rounded" 
                                                         style="width: 50px; height: 50px; object-fit: cover;">
                                                @else
                                                    <span class="text-muted">No image</span>
                                                @endif
                                            </td>
                                            <td>{{ $brand->updated_at->format('d/m/Y H:i') }}</td>
                                            <td>
                                                @if(isset($brand->status))
                                                    <span class="badge bg-{{ $brand->status ? 'success' : 'secondary' }}">
                                                        {{ $brand->status ? 'Hoạt động' : 'Không hoạt động' }}
                                                    </span>
                                                @else
                                                    <span class="badge bg-success">Hoạt động</span>
                                                @endif
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <a href="{{ route('brand_detail', $brand->id) }}"
                                                        class="btn btn-light btn-sm" title="View Details">
                                                        <iconify-icon icon="solar:eye-broken"
                                                            class="align-middle fs-18"></iconify-icon>
                                                    </a> <!-- Detail -->

                                                    <a href="{{ route('brand_edit', $brand->id) }}"
                                                        class="btn btn-soft-primary btn-sm" title="Edit Brand">
                                                        <iconify-icon icon="solar:pen-2-broken"
                                                            class="align-middle fs-18"></iconify-icon>
                                                    </a> <!-- Edit -->

                                                    <form action="{{ route('brand_destroy', $brand->id) }}" method="POST"
                                                        style="display: inline;">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button onclick="return confirm('Bạn có chắc chắn muốn xóa thương hiệu này?')"
                                                            type="submit" class="btn btn-soft-danger btn-sm" title="Delete Brand">
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
                                                    <iconify-icon icon="solar:brand-broken" class="fs-48 text-muted mb-2"></iconify-icon>
                                                    <p class="text-muted mb-0">Chưa có thương hiệu nào</p>
                                                    <a href="{{ route('brand-create') }}" class="btn btn-primary btn-sm mt-2">
                                                        Thêm thương hiệu đầu tiên
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
                    @if($brands->hasPages())
                        <div class="card-footer border-top">
                            {{ $brands->links() }}
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
@endsection
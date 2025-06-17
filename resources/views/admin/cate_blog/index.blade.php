@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">

        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">Quản Lý Danh Mục Blog</h4>

                        <a href="{{ route('cate_blog.create') }}" class="btn btn-sm btn-primary">
                            <iconify-icon icon="solar:add-circle-broken" class="align-middle fs-16 me-1"></iconify-icon>
                            Thêm Danh Mục
                        </a>

                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle btn btn-sm btn-outline-light" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <iconify-icon icon="solar:filter-broken" class="align-middle fs-16"></iconify-icon>
                                Lọc
                            </a>

                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <a href="#!" class="dropdown-item">Tất cả</a>
                                <!-- item-->
                                <a href="#!" class="dropdown-item">Có bài viết</a>
                                <!-- item-->
                                <a href="#!" class="dropdown-item">Trống</a>
                            </div>
                        </div>
                    </div>

                    @if (session('success'))
                        <div class="alert alert-success alert-dismissible fade show mx-3 mt-3" role="alert">
                            <iconify-icon icon="solar:check-circle-broken" class="align-middle fs-16 me-1"></iconify-icon>
                            {{ session('success') }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @endif

                    @if (session('error'))
                        <div class="alert alert-danger alert-dismissible fade show mx-3 mt-3" role="alert">
                            <iconify-icon icon="solar:danger-triangle-broken"
                                class="align-middle fs-16 me-1"></iconify-icon>
                            {{ session('error') }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
                                        <th>Tên Danh Mục</th>
                                        <th>Slug</th>
                                        <th>Mô Tả</th>
                                        <th>Số Bài Viết</th>
                                        <th>Ngày Tạo</th>
                                        <th>Thao Tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($categories as $category)
                                        <tr>
                                            <td>
                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input"
                                                        id="customCheck{{ $category->id }}">
                                                    <label class="form-check-label"
                                                        for="customCheck{{ $category->id }}"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center gap-2">
                                                    <div class="avatar-sm">
                                                        <div
                                                            class="avatar-title bg-primary-subtle text-primary fs-20 rounded">
                                                            <iconify-icon
                                                                icon="solar:folder-with-files-broken"></iconify-icon>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p class="text-dark fw-medium fs-15 mb-0">{{ $category->name }}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="badge bg-light text-dark">{{ $category->slug }}</span>
                                            </td>
                                            <td>
                                                @if ($category->description)
                                                    <p class="mb-0 text-muted text-truncate" style="max-width: 200px;"
                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                        title="{{ $category->description }}">
                                                        {{ Str::limit($category->description, 50) }}
                                                    </p>
                                                @else
                                                    <span class="text-muted fst-italic">Chưa có mô tả</span>
                                                @endif
                                            </td>
                                            <td>
                                                <span
                                                    class="badge bg-{{ $category->posts_count > 0 ? 'success' : 'secondary' }}-subtle text-{{ $category->posts_count > 0 ? 'success' : 'secondary' }}">
                                                    {{ $category->posts_count }} bài viết
                                                </span>
                                            </td>
                                            <td>{{ $category->created_at->format('d/m/Y') }}</td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <a href="{{ route('cate_blog.edit', $category->id) }}"
                                                        class="btn btn-soft-primary btn-sm" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Chỉnh sửa">
                                                        <iconify-icon icon="solar:pen-2-broken"
                                                            class="align-middle fs-18"></iconify-icon>
                                                    </a>

                                                    @if ($category->posts_count == 0)
                                                        <form action="{{ route('cate_blog.destroy', $category->id) }}"
                                                            method="POST" style="display: inline;">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button
                                                                onclick="return confirm('Bạn có chắc chắn muốn xóa danh mục \'{{ $category->name }}\'?')"
                                                                type="submit" class="btn btn-soft-danger btn-sm"
                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                title="Xóa">
                                                                <iconify-icon icon="solar:trash-bin-minimalistic-2-broken"
                                                                    class="align-middle fs-18"></iconify-icon>
                                                            </button>
                                                        </form>
                                                    @else
                                                        <button type="button" class="btn btn-soft-danger btn-sm" disabled
                                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                                            title="Không thể xóa danh mục có bài viết">
                                                            <iconify-icon icon="solar:trash-bin-minimalistic-2-broken"
                                                                class="align-middle fs-18"></iconify-icon>
                                                        </button>
                                                    @endif

                                                    <!-- SEO Preview -->

                                                    <head>
                                                        <script src="https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js"></script>
                                                    </head>

                                                    <body>
                                                        <button type="button" class="btn btn-soft-info btn-sm"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#seoModal{{ $category->id }}" title="Xem SEO">
                                                            <iconify-icon icon="mdi:magnify"
                                                                style="font-size: 18px;"></iconify-icon>
                                                        </button>
                                                    </body>

                                                </div>
                                            </td>
                                        </tr>

                                        <!-- SEO Modal -->
                                        <div class="modal fade" id="seoModal{{ $category->id }}" tabindex="-1"
                                            aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">SEO Preview - {{ $category->name }}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-3">
                                                            <label class="form-label fw-semibold">Meta Title:</label>
                                                            <p class="text-muted">{{ $category->seo_title }}</p>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label fw-semibold">Meta Description:</label>
                                                            <p class="text-muted">
                                                                {{ $category->seo_description ?: 'Chưa có mô tả SEO' }}</p>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label fw-semibold">Meta Keywords:</label>
                                                            <p class="text-muted">
                                                                {{ $category->meta_keywords ?: 'Chưa có từ khóa' }}</p>
                                                        </div>
                                                        <div>
                                                            <label class="form-label fw-semibold">Canonical URL:</label>
                                                            <p class="text-muted">
                                                                {{ $category->canonical_url ?: url('/category/' . $category->slug) }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    @empty
                                        <tr>
                                            <td colspan="7" class="text-center py-5">
                                                <div class="d-flex flex-column align-items-center">
                                                    <iconify-icon icon="solar:folder-with-files-broken"
                                                        class="fs-48 text-muted mb-2"></iconify-icon>
                                                    <h5 class="text-muted mb-1">Chưa có danh mục nào</h5>
                                                    <p class="text-muted mb-3">Hãy tạo danh mục đầu tiên cho blog của bạn
                                                    </p>
                                                    <a href="{{ route('cate_blog.create') }}"
                                                        class="btn btn-primary btn-sm">
                                                        <iconify-icon icon="solar:add-circle-broken"
                                                            class="align-middle fs-16 me-1"></iconify-icon>
                                                        Thêm danh mục đầu tiên
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
                    @if ($categories->hasPages())
                        <div class="card-footer border-top">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    Hiển thị {{ $categories->firstItem() }} - {{ $categories->lastItem() }}
                                    trong tổng số {{ $categories->total() }} danh mục
                                </div>
                                {{ $categories->links() }}
                            </div>
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

@push('scripts')
    <script>
        // Initialize tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });
    </script>
@endpush

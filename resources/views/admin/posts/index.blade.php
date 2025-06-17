@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">

        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">Quản Lý Bài Viết</h4>

                        <a href="{{ route('admin.posts.create') }}" class="btn btn-sm btn-primary">
                            <iconify-icon icon="solar:add-circle-broken" class="align-middle fs-16 me-1"></iconify-icon>
                            Thêm Bài Viết
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
                                <a href="#!" class="dropdown-item">Đã xuất bản</a>
                                <!-- item-->
                                <a href="#!" class="dropdown-item">Bản nháp</a>
                                <!-- item-->
                                <a href="#!" class="dropdown-item">Chờ duyệt</a>
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
                                        <th>Tiêu Đề</th>
                                        <th>Chuyên Mục</th>
                                        <th>Tags</th>
                                        <th>Trạng Thái</th>
                                        <th>Ngày Đăng</th>
                                        <th>Thao Tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($posts as $post)
                                        <tr>
                                            <td>
                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input"
                                                        id="customCheck{{ $post->id }}">
                                                    <label class="form-check-label"
                                                        for="customCheck{{ $post->id }}"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center gap-2">
                                                    <div class="avatar-sm">
                                                        <div
                                                            class="avatar-title bg-{{ $post->is_published ? 'success' : 'warning' }}-subtle text-{{ $post->is_published ? 'success' : 'warning' }} fs-20 rounded">
                                                            <iconify-icon
                                                                icon="{{ $post->is_published ? 'solar:document-text-bold' : 'solar:document-text-broken' }}"></iconify-icon>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p class="text-dark fw-medium fs-15 mb-0">
                                                            {{ Str::limit($post->title, 50) }}
                                                        </p>
                                                        <p class="text-muted fs-13 mb-0">
                                                            {{ Str::limit(strip_tags($post->excerpt ?? $post->content), 80) }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                @if($post->category)
                                                    <span class="badge bg-primary-subtle text-primary">
                                                        <iconify-icon icon="solar:folder-with-files-broken" class="fs-12 me-1"></iconify-icon>
                                                        {{ $post->category->name }}
                                                    </span>
                                                @else
                                                    <span class="text-muted fst-italic">Chưa phân loại</span>
                                                @endif
                                            </td>
                                            <td>
                                                <div class="d-flex flex-wrap gap-1">
                                                    @forelse($post->tags as $tag)
                                                        <span class="badge bg-info-subtle text-info fs-12">
                                                            <iconify-icon icon="solar:tag-broken" class="fs-10 me-1"></iconify-icon>
                                                            {{ $tag->name }}
                                                        </span>
                                                    @empty
                                                        <span class="text-muted fst-italic">Không có tag</span>
                                                    @endforelse
                                                </div>
                                            </td>
                                            <td>
                                                @if($post->is_published)
                                                    <span class="badge bg-success-subtle text-success">
                                                        <iconify-icon icon="solar:eye-bold" class="fs-12 me-1"></iconify-icon>
                                                        Đã xuất bản
                                                    </span>
                                                @else
                                                    <span class="badge bg-warning-subtle text-warning">
                                                        <iconify-icon icon="solar:document-text-broken" class="fs-12 me-1"></iconify-icon>
                                                        Bản nháp
                                                    </span>
                                                @endif
                                            </td>
                                            <td>
                                                @if($post->published_at)
                                                    <div>
                                                        <p class="mb-0 text-dark fs-14">{{ $post->published_at->format('d/m/Y') }}</p>
                                                        <p class="mb-0 text-muted fs-12">{{ $post->published_at->format('H:i') }}</p>
                                                    </div>
                                                @else
                                                    <span class="text-muted fst-italic">Chưa xuất bản</span>
                                                @endif
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <!-- Preview Button -->
                                                    @if($post->is_published)
                                                        <a href="#" target="_blank" class="btn btn-soft-info btn-sm" 
                                                           data-bs-toggle="tooltip" data-bs-placement="top" title="Xem trước">
                                                            <iconify-icon icon="solar:eye-broken"
                                                                class="align-middle fs-18"></iconify-icon>
                                                        </a>
                                                    @endif

                                                    <!-- Edit Button -->
                                                    <a href="{{ route('admin.posts.edit', $post) }}"
                                                        class="btn btn-soft-primary btn-sm" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Chỉnh sửa">
                                                        <iconify-icon icon="solar:pen-2-broken"
                                                            class="align-middle fs-18"></iconify-icon>
                                                    </a>

                                                    <!-- Publish/Unpublish Toggle -->
                                                    <form action="{{ route('admin.posts.togglePublish', $post) }}" 
                                                          method="POST" style="display: inline;">
                                                        @csrf
                                                        <button type="submit" 
                                                                class="btn btn-soft-{{ $post->is_published ? 'warning' : 'success' }} btn-sm"
                                                                data-bs-toggle="tooltip" data-bs-placement="top" 
                                                                title="{{ $post->is_published ? 'Ẩn bài viết' : 'Xuất bản' }}"
                                                                onclick="return confirm('Bạn có chắc chắn muốn {{ $post->is_published ? 'ẩn' : 'xuất bản' }} bài viết này?')">
                                                            <iconify-icon icon="{{ $post->is_published ? 'solar:eye-closed-broken' : 'solar:eye-bold' }}"
                                                                class="align-middle fs-18"></iconify-icon>
                                                        </button>
                                                    </form>

                                                    <!-- Delete Button -->
                                                    <form action="{{ route('admin.posts.destroy', $post) }}"
                                                        method="POST" style="display: inline;">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button
                                                            onclick="return confirm('Bạn có chắc chắn muốn xóa bài viết \'{{ $post->title }}\'?')"
                                                            type="submit" class="btn btn-soft-danger btn-sm"
                                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                                            title="Xóa">
                                                            <iconify-icon icon="solar:trash-bin-minimalistic-2-broken"
                                                                class="align-middle fs-18"></iconify-icon>
                                                        </button>
                                                    </form>

                                                    <!-- SEO Preview -->
                                                    <button type="button" class="btn btn-soft-secondary btn-sm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#seoModal{{ $post->id }}" 
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title="Xem SEO">
                                                        <iconify-icon icon="mdi:magnify"
                                                            class="align-middle fs-18"></iconify-icon>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        <!-- SEO Modal -->
                                        <div class="modal fade" id="seoModal{{ $post->id }}" tabindex="-1"
                                            aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">SEO Preview - {{ Str::limit($post->title, 30) }}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-3">
                                                            <label class="form-label fw-semibold">Meta Title:</label>
                                                            <p class="text-muted">{{ $post->meta_title ?: $post->title }}</p>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label fw-semibold">Meta Description:</label>
                                                            <p class="text-muted">
                                                                {{ $post->meta_description ?: Str::limit(strip_tags($post->excerpt ?? $post->content), 160) }}
                                                            </p>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label fw-semibold">Meta Keywords:</label>
                                                            <p class="text-muted">
                                                                {{ $post->meta_keywords ?: ($post->tags->count() > 0 ? $post->tags->pluck('name')->implode(', ') : 'Chưa có từ khóa') }}
                                                            </p>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label fw-semibold">Canonical URL:</label>
                                                            <p class="text-muted">
                                                                {{ $post->canonical_url ?: url('/post/' . $post->slug) }}
                                                            </p>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label fw-semibold">Open Graph Image:</label>
                                                            @if($post->featured_image)
                                                                <div class="mt-2">
                                                                    <img src="{{ asset($post->featured_image) }}" alt="Featured Image" class="img-fluid rounded" style="max-height: 200px;">
                                                                </div>
                                                            @else
                                                                <p class="text-muted">Chưa có ảnh đại diện</p>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    @empty
                                        <tr>
                                            <td colspan="7" class="text-center py-5">
                                                <div class="d-flex flex-column align-items-center">
                                                    <iconify-icon icon="solar:document-text-broken"
                                                        class="fs-48 text-muted mb-2"></iconify-icon>
                                                    <h5 class="text-muted mb-1">Chưa có bài viết nào</h5>
                                                    <p class="text-muted mb-3">Hãy tạo bài viết đầu tiên cho blog của bạn
                                                    </p>
                                                    <a href="{{ route('admin.posts.create') }}"
                                                        class="btn btn-primary btn-sm">
                                                        <iconify-icon icon="solar:add-circle-broken"
                                                            class="align-middle fs-16 me-1"></iconify-icon>
                                                        Thêm bài viết đầu tiên
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
                    @if ($posts->hasPages())
                        <div class="card-footer border-top">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    Hiển thị {{ $posts->firstItem() }} - {{ $posts->lastItem() }}
                                    trong tổng số {{ $posts->total() }} bài viết
                                </div>
                                {{ $posts->links() }}
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

        // Select all checkboxes functionality
        document.getElementById('customCheck1').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });

        // Individual checkbox change
        document.querySelectorAll('tbody input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
                const checkedCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
                const masterCheckbox = document.getElementById('customCheck1');
                
                if (checkedCheckboxes.length === 0) {
                    masterCheckbox.indeterminate = false;
                    masterCheckbox.checked = false;
                } else if (checkedCheckboxes.length === allCheckboxes.length) {
                    masterCheckbox.indeterminate = false;
                    masterCheckbox.checked = true;
                } else {
                    masterCheckbox.indeterminate = true;
                }
            });
        });
    </script>
@endpush
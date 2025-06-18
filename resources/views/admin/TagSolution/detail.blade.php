@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">

        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded avatar-lg d-flex align-items-center justify-content-center"
                                     style="background-color: {{ $tag->color }}20; border: 3px solid {{ $tag->color }};">
                                    <iconify-icon icon="solar:hashtag-broken" class="fs-24" style="color: {{ $tag->color }}"></iconify-icon>
                                </div>
                                <div>
                                    <h4 class="card-title mb-1">{{ $tag->name }}</h4>
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="badge bg-{{ $tag->is_active ? 'success' : 'secondary' }}">
                                            {{ $tag->is_active ? 'Hoạt động' : 'Không hoạt động' }}
                                        </span>
                                        <span class="badge bg-info-subtle text-info">{{ $tag->post_count }} bài viết</span>
                                        <code class="text-muted">{{ $tag->slug }}</code>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-group">
                                <a href="{{ route('tag_solution_edit', $tag->id) }}" class="btn btn-sm btn-primary">
                                    <iconify-icon icon="solar:pen-2-broken" class="me-1"></iconify-icon>
                                    Edit Tag
                                </a>
                                <button type="button" class="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split" 
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a class="dropdown-item" href="{{ $tag->url }}" target="_blank">
                                            <iconify-icon icon="solar:external-link-broken" class="me-1"></iconify-icon>
                                            Xem trên site
                                        </a>
                                    </li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li>
                                        <form action="{{ route('tag_solution_toggle_status', $tag->id) }}" method="POST" style="display: inline;">
                                            @csrf
                                            @method('PATCH')
                                            <button type="submit" class="dropdown-item">
                                                <iconify-icon icon="solar:{{ $tag->is_active ? 'pause' : 'play' }}-broken" class="me-1"></iconify-icon>
                                                {{ $tag->is_active ? 'Vô hiệu hóa' : 'Kích hoạt' }}
                                            </button>
                                        </form>
                                    </li>
                                    @if($tag->post_count == 0)
                                        <li>
                                            <form action="{{ route('tag_solution_destroy', $tag->id) }}" method="POST" 
                                                  onsubmit="return confirm('Bạn có chắc chắn muốn xóa tag này không?')" style="display: inline;">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="dropdown-item text-danger">
                                                    <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="me-1"></iconify-icon>
                                                    Xóa tag
                                                </button>
                                            </form>
                                        </li>
                                    @endif
                                </ul>
                                <a href="{{ route('tag-solution-list') }}" class="btn btn-sm btn-outline-secondary ms-2">
                                    <iconify-icon icon="solar:arrow-left-broken" class="me-1"></iconify-icon>
                                    Back to List
                                </a>
                            </div>
                        </div>
                    </div>

                    @if (session('success'))
                        <div class="alert alert-success mx-3">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if (session('error'))
                        <div class="alert alert-danger mx-3">
                            {{ session('error') }}
                        </div>
                    @endif

                    <div class="card-body">
                        <div class="row">
                            <!-- Left Column - Basic Info -->
                            <div class="col-lg-8">
                                <!-- Basic Information -->
                                <div class="card border mb-4">
                                    <div class="card-header bg-light">
                                        <h5 class="card-title mb-0">
                                            <iconify-icon icon="solar:info-circle-broken" class="me-2"></iconify-icon>
                                            Thông tin cơ bản
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label fw-semibold">Tên Tag</label>
                                                    <p class="mb-0">{{ $tag->name }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label fw-semibold">Slug</label>
                                                    <p class="mb-0"><code>{{ $tag->slug }}</code></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label fw-semibold">Thứ tự sắp xếp</label>
                                                    <p class="mb-0"><span class="badge bg-secondary">{{ $tag->sort_order }}</span></p>
                                                </div>
                                            </div>
                                        </div>

                                        @if($tag->description)
                                            <div class="mb-3">
                                                <label class="form-label fw-semibold">Mô tả</label>
                                                <div class="border rounded p-3 bg-light">
                                                    {{ $tag->description }}
                                                </div>
                                            </div>
                                        @endif
                                    </div>
                                </div>

                                <!-- SEO Information -->
                                <div class="card border mb-4">
                                    <div class="card-header bg-light">
                                        <h5 class="card-title mb-0">
                                            <iconify-icon icon="solar:seo-broken" class="me-2"></iconify-icon>
                                            Thông tin SEO
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <label class="form-label fw-semibold">Meta Title</label>
                                            <p class="mb-0">{{ $tag->meta_title ?: $tag->name }}</p>
                                            <small class="text-muted">{{ strlen($tag->meta_title ?: $tag->name) }} ký tự</small>
                                        </div>

                                        @if($tag->meta_description)
                                            <div class="mb-3">
                                                <label class="form-label fw-semibold">Meta Description</label>
                                                <div class="border rounded p-3 bg-light">
                                                    {{ $tag->meta_description }}
                                                </div>
                                                <small class="text-muted">{{ strlen($tag->meta_description) }} ký tự</small>
                                            </div>
                                        @endif

                                        @if($tag->meta_keywords)
                                            <div class="mb-3">
                                                <label class="form-label fw-semibold">Meta Keywords</label>
                                                <div class="d-flex flex-wrap gap-1">
                                                    @foreach(explode(',', $tag->meta_keywords) as $keyword)
                                                        <span class="badge bg-light text-dark border">{{ trim($keyword) }}</span>
                                                    @endforeach
                                                </div>
                                            </div>
                                        @endif

                                        @if($tag->canonical_url)
                                            <div class="mb-3">
                                                <label class="form-label fw-semibold">Canonical URL</label>
                                                <p class="mb-0">
                                                    <a href="{{ $tag->canonical_url }}" target="_blank" class="text-decoration-none">
                                                        {{ $tag->canonical_url }}
                                                        <iconify-icon icon="solar:external-link-broken" class="ms-1"></iconify-icon>
                                                    </a>
                                                </p>
                                            </div>
                                        @endif
                                    </div>
                                </div>

                                <!-- SEO Preview -->
                                <div class="card border">
                                    <div class="card-header bg-light">
                                        <h5 class="card-title mb-0">
                                            <iconify-icon icon="solar:magnifer-broken" class="me-2"></iconify-icon>
                                            Google Search Preview
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="border rounded p-4" style="background-color: #f8f9fa; font-family: Arial, sans-serif;">
                                            <div class="mb-1">
                                                <a href="#" class="text-decoration-none" style="color: #1a0dab; font-size: 18px; line-height: 1.3;">
                                                    {{ $tag->formatted_meta_title }}
                                                </a>
                                            </div>
                                            <div class="mb-1">
                                                <span style="color: #006621; font-size: 14px;">{{ $tag->canonical_url ?: $tag->url }}</span>
                                            </div>
                                            <div style="color: #545454; font-size: 14px; line-height: 1.4;">
                                                {{ $tag->formatted_meta_description }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column - Stats & Actions -->
                            <div class="col-lg-4">
                                <!-- Statistics -->
                                <div class="card border mb-4">
                                    <div class="card-header bg-light">
                                        <h5 class="card-title mb-0">
                                            <iconify-icon icon="solar:chart-2-broken" class="me-2"></iconify-icon>
                                            Thống kê
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row text-center">
                                            <div class="col-6">
                                                <div class="border-end">
                                                    <h3 class="text-primary mb-1">{{ $tag->post_count }}</h3>
                                                    <small class="text-muted">Bài viết</small>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h3 class="text-info mb-1">#{{ $tag->id }}</h3>
                                                <small class="text-muted">Tag ID</small>
                                            </div>
                                        </div>
                                        <hr class="my-3">
                                        <div class="small">
                                            <div class="d-flex justify-content-between mb-2">
                                                <span class="text-muted">Ngày tạo:</span>
                                                <span class="fw-semibold">{{ $tag->created_at->format('d/m/Y H:i') }}</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <span class="text-muted">Cập nhật:</span>
                                                <span class="fw-semibold">{{ $tag->updated_at->format('d/m/Y H:i') }}</span>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <span class="text-muted">Trạng thái:</span>
                                                <span class="badge bg-{{ $tag->is_active ? 'success' : 'secondary' }}">
                                                    {{ $tag->is_active ? 'Hoạt động' : 'Không hoạt động' }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tag Display -->
                                <div class="card border mb-4">
                                    <div class="card-header bg-light">
                                        <h5 class="card-title mb-0">
                                            <iconify-icon icon="solar:eye-broken" class="me-2"></iconify-icon>
                                            Hiển thị Tag
                                        </h5>
                                    </div>
                                    <div class="card-body text-center">
                                        <div class="p-4 border rounded" style="background-color: #f8f9fa;">
                                            <span class="badge bg-primary fs-5 px-4 py-3">
                                                <iconify-icon icon="solar:hashtag-broken" class="me-2"></iconify-icon>
                                                {{ $tag->name }}
                                            </span>
                                            <div class="mt-3">
                                                <small class="text-muted">URL: <code>/tag/{{ $tag->slug }}</code></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quick Actions -->
                                <div class="card border mb-4">
                                    <div class="card-header bg-light">
                                        <h5 class="card-title mb-0">
                                            <iconify-icon icon="solar:bolt-broken" class="me-2"></iconify-icon>
                                            Thao tác nhanh
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="d-grid gap-2">
                                            <a href="{{ route('tag_solution_edit', $tag->id) }}" class="btn btn-primary btn-sm">
                                                <iconify-icon icon="solar:pen-2-broken" class="me-1"></iconify-icon>
                                                Chỉnh sửa Tag
                                            </a>
                                            
                                            <button type="button" class="btn btn-outline-info btn-sm" onclick="copyToClipboard('{{ $tag->url }}')">
                                                <iconify-icon icon="solar:copy-broken" class="me-1"></iconify-icon>
                                                Copy URL
                                            </button>

                                            @if($tag->post_count > 0)
                                                <a href="#" class="btn btn-outline-secondary btn-sm">
                                                    <iconify-icon icon="solar:document-text-broken" class="me-1"></iconify-icon>
                                                    Xem bài viết ({{ $tag->post_count }})
                                                </a>
                                            @endif

                                            <form action="{{ route('tag_solution_toggle_status', $tag->id) }}" method="POST" style="display: inline;">
                                                @csrf
                                                @method('PATCH')
                                                <button type="submit" class="btn btn-outline-{{ $tag->is_active ? 'warning' : 'success' }} btn-sm w-100">
                                                    <iconify-icon icon="solar:{{ $tag->is_active ? 'pause' : 'play' }}-broken" class="me-1"></iconify-icon>
                                                    {{ $tag->is_active ? 'Vô hiệu hóa' : 'Kích hoạt' }}
                                                </button>
                                            </form>

                                            @if($tag->post_count == 0)
                                                <form action="{{ route('tag_solution_destroy', $tag->id) }}" method="POST" 
                                                      onsubmit="return confirm('Bạn có chắc chắn muốn xóa tag này không? Hành động này không thể hoàn tác!')" 
                                                      style="display: inline;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-outline-danger btn-sm w-100">
                                                        <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="me-1"></iconify-icon>
                                                        Xóa Tag
                                                    </button>
                                                </form>
                                            @else
                                                <button type="button" class="btn btn-outline-danger btn-sm w-100" disabled title="Không thể xóa tag đang có bài viết">
                                                    <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="me-1"></iconify-icon>
                                                    Không thể xóa
                                                </button>
                                            @endif
                                        </div>
                                    </div>
                                </div>

                                <!-- Related Information -->
                                @if($tag->post_count > 0)
                                    <div class="card border">
                                        <div class="card-header bg-light">
                                            <h5 class="card-title mb-0">
                                                <iconify-icon icon="solar:document-text-broken" class="me-2"></iconify-icon>
                                                Bài viết liên quan
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="text-center py-4">
                                                <iconify-icon icon="solar:document-text-broken" class="fs-48 text-muted mb-3"></iconify-icon>
                                                <p class="text-muted mb-3">Tag này đang được sử dụng bởi <strong>{{ $tag->post_count }}</strong> bài viết</p>
                                                <a href="#" class="btn btn-outline-primary btn-sm">
                                                    <iconify-icon icon="solar:eye-broken" class="me-1"></iconify-icon>
                                                    Xem tất cả bài viết
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- End Container Fluid -->

    <!-- JavaScript for functionality -->
    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(function() {
                // Show success toast
                const toast = document.createElement('div');
                toast.className = 'position-fixed top-0 end-0 p-3';
                toast.style.zIndex = '9999';
                toast.innerHTML = `
                    <div class="toast show" role="alert">
                        <div class="toast-header">
                            <iconify-icon icon="solar:check-circle-broken" class="text-success me-2"></iconify-icon>
                            <strong class="me-auto">Thành công</strong>
                            <button type="button" class="btn-close" onclick="this.closest('.position-fixed').remove()"></button>
                        </div>
                        <div class="toast-body">
                            URL đã được sao chép vào clipboard!
                        </div>
                    </div>
                `;
                document.body.appendChild(toast);
                
                // Auto remove after 3 seconds
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            }).catch(function(err) {
                alert('Không thể sao chép URL: ' + err);
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'e':
                        e.preventDefault();
                        window.location.href = '{{ route("tag_solution_edit", $tag->id) }}';
                        break;
                    case 'b':
                        e.preventDefault();
                        window.location.href = '{{ route("tag-solution-list") }}';
                        break;
                }
            }
        });

        // Add tooltips to buttons
        document.addEventListener('DOMContentLoaded', function() {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });
    </script>

    <!-- ========== Footer Start ========== -->
    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center">
                    <script>document.write(new Date().getFullYear())</script> &copy; Larkon. 
                    Crafted by <iconify-icon icon="iconamoon:heart-duotone" class="fs-18 align-middle text-danger"></iconify-icon> 
                    <a href="https://1.envato.market/techzaa" class="fw-bold footer-text" target="_blank">Techzaa</a>
                </div>
            </div>
        </div>
    </footer>
    <!-- ========== Footer End ========== -->
@endsection
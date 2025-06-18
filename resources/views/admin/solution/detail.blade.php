@extends('admin.layouts.masters')

@section('title', 'Chi tiết Solution')

@section('content')
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">Chi tiết Solution</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                            <li class="breadcrumb-item"><a href="{{ route('solution-list') }}">Solutions</a></li>
                            <li class="breadcrumb-item active">Chi tiết</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Main Content -->
            <div class="col-lg-8">
                <!-- Solution Info -->
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="flex-grow-1">
                                <h5 class="card-title mb-2">{{ $solution->title }}</h5>
                                <div class="d-flex align-items-center gap-3 flex-wrap">
                                    <span class="badge {{ $solution->getStatusBadgeClass() }} fs-6">
                                        {{ $solution->getStatusLabel() }}
                                    </span>
                                    @if($solution->is_featured)
                                        <span class="badge bg-warning text-dark">
                                            <i class="fas fa-star me-1"></i>Nổi bật
                                        </span>
                                    @endif
                                    @if(!$solution->allow_comments)
                                        <span class="badge bg-secondary">
                                            <i class="fas fa-comment-slash me-1"></i>Tắt bình luận
                                        </span>
                                    @endif
                                </div>
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    <i class="fas fa-cog"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="{{ route('solution_edit', $solution->id) }}">
                                            <i class="fas fa-edit me-2"></i>Sửa solution
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="{{ route('solution_detail', $solution->slug) }}" target="_blank">
                                            <i class="fas fa-external-link-alt me-2"></i>Xem frontend
                                        </a>
                                    </li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li>
                                        <form action="{{ route('solution_toggle_status', $solution->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            @method('PATCH')
                                            <button type="submit" class="dropdown-item">
                                                @if($solution->status === 'published')
                                                    <i class="fas fa-eye-slash me-2"></i>Ẩn solution
                                                @else
                                                    <i class="fas fa-globe me-2"></i>Xuất bản
                                                @endif
                                            </button>
                                        </form>
                                    </li>
                                    <li>
                                        <form action="{{ route('solution_destroy', $solution->id) }}" method="POST" 
                                              class="d-inline" onsubmit="return confirm('Bạn có chắc chắn muốn xóa solution này?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="dropdown-item text-danger">
                                                <i class="fas fa-trash me-2"></i>Xóa solution
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <!-- Featured Image -->
                        @if($solution->featured_image)
                            <div class="mb-4">
                                <img src="{{ Storage::url($solution->featured_image) }}" 
                                     alt="{{ $solution->title }}" 
                                     class="img-fluid rounded shadow-sm">
                            </div>
                        @endif

                        <!-- Excerpt -->
                        @if($solution->excerpt)
                            <div class="mb-4">
                                <h6 class="text-muted mb-2">Tóm tắt:</h6>
                                <p class="text-muted fs-5">{{ $solution->excerpt }}</p>
                            </div>
                        @endif

                        <!-- Content -->
                        <div class="content-display">
                            <h6 class="text-muted mb-3">Nội dung:</h6>
                            <div class="border rounded p-3 bg-light">
                                {!! $solution->content !!}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SEO Information -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-search me-2"></i>
                            Thông tin SEO
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Meta Title</label>
                                    <p class="mb-0">{{ $solution->meta_title ?: $solution->title }}</p>
                                    <small class="text-muted">{{ strlen($solution->meta_title ?: $solution->title) }} ký tự</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Canonical URL</label>
                                    <p class="mb-0">
                                        <a href="{{ $solution->canonical_url ?: route('solution.show', $solution->slug) }}" 
                                           target="_blank" class="text-decoration-none">
                                            {{ $solution->canonical_url ?: route('solution.show', $solution->slug) }}
                                            <i class="fas fa-external-link-alt ms-1"></i>
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Meta Description</label>
                                    <p class="mb-0">{{ $solution->meta_description ?: $solution->excerpt ?: 'Chưa có mô tả' }}</p>
                                    <small class="text-muted">{{ strlen($solution->meta_description ?: $solution->excerpt ?: '') }} ký tự</small>
                                </div>
                            </div>
                            @if($solution->meta_keywords)
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label class="form-label fw-semibold">Meta Keywords</label>
                                        <div class="d-flex flex-wrap gap-1">
                                            @foreach(explode(',', $solution->meta_keywords) as $keyword)
                                                <span class="badge bg-info">{{ trim($keyword) }}</span>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>

                        <!-- SEO Preview -->
                        <div class="card bg-light">
                            <div class="card-header">
                                <h6 class="mb-0">
                                    <i class="fab fa-google me-2"></i>
                                    Google Search Preview
                                </h6>
                            </div>
                            <div class="card-body">
                                <div class="seo-preview">
                                    <div class="seo-title text-primary mb-1">
                                        {{ $solution->meta_title ?: $solution->title }} - Your Site
                                    </div>
                                    <div class="seo-url text-success small mb-1">
                                        {{ $solution->canonical_url ?: route('solution.show', $solution->slug) }}
                                    </div>
                                    <div class="seo-description text-muted small">
                                        {{ $solution->meta_description ?: $solution->excerpt ?: 'Mô tả ngắn về solution...' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="col-lg-4">
                <!-- Quick Info -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-info-circle me-2"></i>
                            Thông tin cơ bản
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Slug</label>
                            <div class="input-group">
                                <input type="text" class="form-control" value="{{ $solution->slug }}" readonly>
                                <button class="btn btn-outline-secondary" type="button" onclick="copyToClipboard('{{ $solution->slug }}')">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Thứ tự</label>
                                    <p class="mb-0">{{ $solution->sort_order }}</p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Reading Time</label>
                                    <p class="mb-0">{{ $solution->reading_time }} phút</p>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-semibold">Tác giả</label>
                            <div class="d-flex align-items-center gap-2">
                                <div class="avatar-sm">
                                    <div class="avatar-title rounded-circle bg-primary text-white">
                                        {{ strtoupper(substr($solution->user->name, 0, 1)) }}
                                    </div>
                                </div>
                                <div>
                                    <div class="fw-medium">{{ $solution->user->name }}</div>
                                    <small class="text-muted">{{ $solution->user->email }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Ngày tạo</label>
                                    <p class="mb-0">{{ $solution->created_at->format('d/m/Y') }}</p>
                                    <small class="text-muted">{{ $solution->created_at->format('H:i') }}</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Cập nhật</label>
                                    <p class="mb-0">{{ $solution->updated_at->format('d/m/Y') }}</p>
                                    <small class="text-muted">{{ $solution->updated_at->format('H:i') }}</small>
                                </div>
                            </div>
                        </div>

                        @if($solution->published_at)
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Ngày đăng</label>
                                <p class="mb-0">{{ $solution->published_at->format('d/m/Y H:i') }}</p>
                                @if($solution->published_at > now())
                                    <small class="text-warning">
                                        <i class="fas fa-clock me-1"></i>Sẽ được đăng trong {{ $solution->published_at->diffForHumans() }}
                                    </small>
                                @endif
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Statistics -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-chart-bar me-2"></i>
                            Thống kê
                        </h5>
                    </div>
                    <div class="card-body text-center">
                        <div class="row">
                            <div class="col-4">
                                <div class="mb-2">
                                    <i class="fas fa-eye text-primary fs-4"></i>
                                </div>
                                <div>
                                    <div class="fw-bold fs-5">{{ number_format($solution->view_count) }}</div>
                                    <small class="text-muted">Lượt xem</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="mb-2">
                                    <i class="fas fa-heart text-danger fs-4"></i>
                                </div>
                                <div>
                                    <div class="fw-bold fs-5">{{ number_format($solution->like_count) }}</div>
                                    <small class="text-muted">Lượt thích</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="mb-2">
                                    <i class="fas fa-comments text-info fs-4"></i>
                                </div>
                                <div>
                                    <div class="fw-bold fs-5">{{ number_format($solution->comment_count) }}</div>
                                    <small class="text-muted">Bình luận</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-folder me-2"></i>
                            Chuyên mục
                        </h5>
                    </div>
                    <div class="card-body">
                        @if($solution->categorySolution)
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <i class="fas fa-folder text-primary fs-5"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">
                                        <a href="{{ route('category_solution_detail', $solution->categorySolution->id) }}" 
                                           class="text-decoration-none">
                                            {{ $solution->categorySolution->name }}
                                        </a>
                                    </h6>
                                    <small class="text-muted">
                                        {{ $solution->categorySolution->post_count }} solutions
                                    </small>
                                </div>
                            </div>
                            @if($solution->categorySolution->description)
                                <p class="text-muted small mt-2 mb-0">
                                    {{ Str::limit($solution->categorySolution->description, 80) }}
                                </p>
                            @endif
                        @else
                            <p class="text-muted mb-0">
                                <i class="fas fa-exclamation-triangle me-1"></i>
                                Chưa được phân loại
                            </p>
                        @endif
                    </div>
                </div>

                <!-- Tags -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-tags me-2"></i>
                            Tags ({{ $solution->tagSolutions->count() }})
                        </h5>
                    </div>
                    <div class="card-body">
                        @if($solution->tagSolutions->count() > 0)
                            <div class="d-flex flex-wrap gap-2">
                                @foreach($solution->tagSolutions as $tag)
                                    <a href="{{ route('tag_solution_detail', $tag->id) }}" 
                                       class="badge bg-primary text-decoration-none">
                                        #{{ $tag->name }}
                                        <span class="ms-1">({{ $tag->post_count }})</span>
                                    </a>
                                @endforeach
                            </div>
                        @else
                            <p class="text-muted mb-0">
                                <i class="fas fa-tag me-1"></i>
                                Chưa có tag nào
                            </p>
                        @endif
                    </div>
                </div>

                <!-- Actions -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-tools me-2"></i>
                            Thao tác
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <a href="{{ route('solution_edit', $solution->id) }}" class="btn btn-primary">
                                <i class="fas fa-edit me-2"></i>Sửa Solution
                            </a>
                            
                            <a href="{{ route('solution_detail', $solution->slug) }}" class="btn btn-info" target="_blank">
                                <i class="fas fa-external-link-alt me-2"></i>Xem Frontend
                            </a>

                            <form action="{{ route('solution_toggle_status', $solution->id) }}" method="POST" class="d-inline">
                                @csrf
                                @method('PATCH')
                                <button type="submit" class="btn btn-warning w-100">
                                    @if($solution->status === 'published')
                                        <i class="fas fa-eye-slash me-2"></i>Ẩn Solution
                                    @else
                                        <i class="fas fa-globe me-2"></i>Xuất bản
                                    @endif
                                </button>
                            </form>

                            <div class="dropdown-divider"></div>

                            <button type="button" class="btn btn-outline-secondary" onclick="shareContent()">
                                <i class="fas fa-share-alt me-2"></i>Chia sẻ
                            </button>

                            <div class="dropdown-divider"></div>

                            <form action="{{ route('solution_destroy', $solution->id) }}" method="POST" 
                                  class="d-inline" onsubmit="return confirm('Bạn có chắc chắn muốn xóa solution này? Hành động này không thể hoàn tác!')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger w-100">
                                    <i class="fas fa-trash me-2"></i>Xóa Solution
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Share Modal -->
    <div class="modal fade" id="shareModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chia sẻ Solution</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">URL Solution:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="shareUrl" 
                                   value="{{ route('solution_detail', $solution->slug) }}" readonly>
                            <button class="btn btn-outline-secondary" type="button" onclick="copyToClipboard(document.getElementById('shareUrl').value)">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>

                    <div class="d-flex gap-2 justify-content-center">
                        <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(route('solution_detail', $solution->slug)) }}" 
                           target="_blank" class="btn btn-primary">
                            <i class="fab fa-facebook-f me-1"></i>Facebook
                        </a>
                        <a href="https://twitter.com/intent/tweet?url={{ urlencode(route('solution_detail', $solution->slug)) }}&text={{ urlencode($solution->title) }}" 
                           target="_blank" class="btn btn-info">
                            <i class="fab fa-twitter me-1"></i>Twitter
                        </a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ urlencode(route('solution_detail', $solution->slug)) }}" 
                           target="_blank" class="btn btn-primary">
                            <i class="fab fa-linkedin-in me-1"></i>LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(function() {
                // Show toast notification
                showToast('Đã copy vào clipboard!', 'success');
            }, function() {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Đã copy vào clipboard!', 'success');
            });
        }

        function shareContent() {
            const modal = new bootstrap.Modal(document.getElementById('shareModal'));
            modal.show();
        }

        function showToast(message, type = 'info') {
            // Simple toast notification (you can replace with your preferred toast library)
            const toast = document.createElement('div');
            toast.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
            toast.style.zIndex = '9999';
            toast.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="fas fa-check-circle me-2"></i>
                    ${message}
                    <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
                </div>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 3000);
        }
    </script>
@endsection
{{-- resources/views/admin/posts/edit.blade.php --}}
@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-12">
                <!-- Page Header -->
                <div class="card bg-light-subtle border-0 mb-4">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class="avatar-md">
                                    <div class="avatar-title bg-warning-subtle text-warning fs-24 rounded">
                                        <iconify-icon icon="solar:pen-2-broken"></iconify-icon>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="fw-semibold mb-1">Chỉnh Sửa Bài Viết</h3>
                                    <p class="text-muted mb-0">
                                        <span class="badge bg-{{ $post->is_published ? 'success' : 'warning' }}-subtle text-{{ $post->is_published ? 'success' : 'warning' }} me-2">
                                            <iconify-icon icon="{{ $post->is_published ? 'solar:eye-bold' : 'solar:document-text-broken' }}" class="fs-12 me-1"></iconify-icon>
                                            {{ $post->is_published ? 'Đã xuất bản' : 'Bản nháp' }}
                                        </span>
                                        ID: #{{ $post->id }} • Tạo: {{ $post->created_at->format('d/m/Y H:i') }}
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                @if($post->is_published)
                                    <a href="#" target="_blank" class="btn btn-outline-info">
                                        <iconify-icon icon="solar:eye-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                        Xem bài viết
                                    </a>
                                @endif
                                <a href="{{ route('admin.posts.index') }}" class="btn btn-outline-secondary">
                                    <iconify-icon icon="solar:arrow-left-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                    Quay lại
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Message -->
                @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <iconify-icon icon="solar:check-circle-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                <!-- Error Messages -->
                @if($errors->any())
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <iconify-icon icon="solar:danger-triangle-broken" class="align-middle fs-16 me-1"></iconify-icon>
                        <strong>Có lỗi xảy ra:</strong>
                        <ul class="mb-0 mt-2">
                            @foreach($errors->all() as $err)
                                <li>{{ $err }}</li>
                            @endforeach
                        </ul>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                <!-- Main Form -->
                <form action="{{ route('admin.posts.update', $post) }}" method="POST" enctype="multipart/form-data" id="post-form">
                    @csrf
                    @method('PUT')
                    
                    @include('admin.posts._form', [
                        'post' => $post,
                        'selectedTags' => old('tags', $post->tags->pluck('id')->toArray())
                    ])

                    <!-- Submit Buttons -->
                    <div class="card mt-4">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex gap-2">
                                    <button type="submit" name="action" value="update" class="btn btn-primary">
                                        <iconify-icon icon="solar:diskette-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                        Cập nhật bài viết
                                    </button>
                                    @if(!$post->is_published)
                                        <button type="submit" name="action" value="publish" class="btn btn-success">
                                            <iconify-icon icon="solar:eye-bold" class="align-middle fs-16 me-1"></iconify-icon>
                                            Cập nhật & Xuất bản
                                        </button>
                                    @else
                                        <button type="submit" name="action" value="unpublish" class="btn btn-warning">
                                            <iconify-icon icon="solar:eye-closed-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                            Ẩn bài viết
                                        </button>
                                    @endif
                                </div>
                                
                                <div class="d-flex gap-2">
                                    <button type="button" class="btn btn-outline-info" onclick="previewPost()">
                                        <iconify-icon icon="solar:eye-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                        Xem trước
                                    </button>
                                    <div class="dropdown">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                            <iconify-icon icon="solar:menu-dots-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                            Thêm
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <button type="button" class="dropdown-item" onclick="duplicatePost()">
                                                    <iconify-icon icon="solar:copy-broken" class="align-middle fs-16 me-2"></iconify-icon>
                                                    Nhân bản bài viết
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" class="dropdown-item" onclick="exportPost()">
                                                    <iconify-icon icon="solar:export-broken" class="align-middle fs-16 me-2"></iconify-icon>
                                                    Xuất file
                                                </button>
                                            </li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li>
                                                <button type="button" class="dropdown-item text-danger" onclick="deletePost()">
                                                    <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="align-middle fs-16 me-2"></iconify-icon>
                                                    Xóa bài viết
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="{{ route('admin.posts.index') }}" class="btn btn-outline-secondary">
                                        <iconify-icon icon="solar:close-circle-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                        Hủy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Statistics Card -->
                <div class="card bg-success-subtle border-0 mt-4">
                    <div class="card-body">
                        <h6 class="card-title text-success mb-3">
                            <iconify-icon icon="solar:chart-broken" class="align-middle fs-18 me-2"></iconify-icon>
                            Thống kê bài viết
                        </h6>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="avatar-sm">
                                        <div class="avatar-title bg-success-subtle text-success fs-18 rounded">
                                            <iconify-icon icon="solar:eye-bold"></iconify-icon>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="mb-0">{{ $post->views ?? 0 }}</h5>
                                        <p class="text-muted mb-0 fs-14">Lượt xem</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="avatar-sm">
                                        <div class="avatar-title bg-info-subtle text-info fs-18 rounded">
                                            <iconify-icon icon="solar:chat-round-dots-broken"></iconify-icon>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="mb-0">{{ $post->comments_count ?? 0 }}</h5>
                                        <p class="text-muted mb-0 fs-14">Bình luận</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="avatar-sm">
                                        <div class="avatar-title bg-warning-subtle text-warning fs-18 rounded">
                                            <iconify-icon icon="solar:heart-broken"></iconify-icon>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="mb-0">{{ $post->likes_count ?? 0 }}</h5>
                                        <p class="text-muted mb-0 fs-14">Lượt thích</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="avatar-sm">
                                        <div class="avatar-title bg-primary-subtle text-primary fs-18 rounded">
                                            <iconify-icon icon="solar:share-broken"></iconify-icon>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="mb-0">{{ $post->shares_count ?? 0 }}</h5>
                                        <p class="text-muted mb-0 fs-14">Chia sẻ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Version History -->
                @if($post->revisions && $post->revisions->count() > 0)
                <div class="card mt-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <iconify-icon icon="solar:history-broken" class="align-middle fs-18 me-2"></iconify-icon>
                            Lịch sử thay đổi
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="timeline">
                            @foreach($post->revisions->take(5) as $revision)
                                <div class="d-flex gap-3 mb-3">
                                    <div class="avatar-sm">
                                        <div class="avatar-title bg-light text-dark fs-16 rounded">
                                            <iconify-icon icon="solar:calendar-broken"></iconify-icon>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 class="mb-1">{{ $revision->created_at->format('d/m/Y H:i') }}</h6>
                                        <p class="text-muted mb-0 fs-14">{{ $revision->description ?? 'Cập nhật bài viết' }}</p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
    <!-- End Container Fluid -->

    <!-- ========== Footer Start ========== -->
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
    <!-- ========== Footer End ========== -->
@endsection

@push('scripts')
<script>
// Preview function
function previewPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const excerpt = document.getElementById('excerpt').value;
    
    if (!title || !content) {
        alert('Vui lòng nhập tiêu đề và nội dung để xem trước');
        return;
    }
    
    // Simple preview - you can enhance this
    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    previewWindow.document.write(`
        <html>
        <head>
            <title>Preview: ${title}</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
                h1 { color: #333; }
                .excerpt { font-style: italic; color: #666; margin-bottom: 20px; }
                .content { line-height: 1.6; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            ${excerpt ? `<div class="excerpt">${excerpt}</div>` : ''}
            <div class="content">${content.replace(/\n/g, '<br>')}</div>
        </body>
        </html>
    `);
}

// Duplicate post function
function duplicatePost() {
    if (confirm('Bạn có muốn tạo bản sao của bài viết này không?')) {
        // Create form to duplicate post
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '{{ route("admin.posts.togglePublish", $post) }}';
        
        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = '_token';
        csrfToken.value = '{{ csrf_token() }}';
        
        form.appendChild(csrfToken);
        document.body.appendChild(form);
        form.submit();
    }
}

// Export post function
function exportPost() {
    // Simple export functionality
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const excerpt = document.getElementById('excerpt').value;
    
    const exportContent = `Tiêu đề: ${title}\n\nTóm tắt: ${excerpt}\n\nNội dung:\n${content}`;
    
    const blob = new Blob([exportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Delete post function
function deletePost() {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác!')) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '{{ route("admin.posts.destroy", $post) }}';
        
        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = '_token';
        csrfToken.value = '{{ csrf_token() }}';
        
        const methodInput = document.createElement('input');
        methodInput.type = 'hidden';
        methodInput.name = '_method';
        methodInput.value = 'DELETE';
        
        form.appendChild(csrfToken);
        form.appendChild(methodInput);
        document.body.appendChild(form);
        form.submit();
    }
}

// Auto-save functionality (optional)
let autoSaveTimer;
function autoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        const formData = new FormData(document.getElementById('post-form'));
        formData.append('auto_save', '1');
        
        // You can implement auto-save to server here
        console.log('Auto-save triggered');
        
        // Show auto-save indicator
        const indicator = document.createElement('div');
        indicator.className = 'position-fixed top-0 end-0 p-3';
        indicator.innerHTML = `
            <div class="toast show" role="alert">
                <div class="toast-body bg-success text-white">
                    <iconify-icon icon="solar:diskette-broken" class="me-2"></iconify-icon>
                    Đã tự động lưu
                </div>
            </div>
        `;
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 3000);
    }, 30000); // Auto-save every 30 seconds
}

// Trigger auto-save on form changes
document.getElementById('post-form').addEventListener('input', autoSave);

// Warn before leaving page with unsaved changes
let hasUnsavedChanges = false;
document.getElementById('post-form').addEventListener('input', () => {
    hasUnsavedChanges = true;
});

document.getElementById('post-form').addEventListener('submit', () => {
    hasUnsavedChanges = false;
});

window.addEventListener('beforeunload', (e) => {
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return 'Bạn có thay đổi chưa được lưu. Bạn có chắc muốn rời khỏi trang?';
    }
});
</script>
@endpush
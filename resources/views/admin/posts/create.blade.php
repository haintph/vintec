{{-- resources/views/admin/posts/create.blade.php --}}
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
                                    <div class="avatar-title bg-primary-subtle text-primary fs-24 rounded">
                                        <iconify-icon icon="solar:document-add-broken"></iconify-icon>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="fw-semibold mb-1">Tạo Bài Viết Mới</h3>
                                    <p class="text-muted mb-0">Viết và xuất bản bài viết mới cho blog của bạn</p>
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <a href="{{ route('admin.posts.index') }}" class="btn btn-outline-secondary">
                                    <iconify-icon icon="solar:arrow-left-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                    Quay lại
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

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
                <form action="{{ route('admin.posts.store') }}" method="POST" enctype="multipart/form-data" id="post-form">
                    @csrf
                    
                    @include('admin.posts._form', [
                        'post' => null,
                        'selectedTags' => old('tags', [])
                    ])

                    <!-- Submit Buttons -->
                    <div class="card mt-4">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex gap-2">
                                    <button type="submit" name="action" value="publish" class="btn btn-primary">
                                        <iconify-icon icon="solar:diskette-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                        Lưu & Xuất bản
                                    </button>
                                    <button type="submit" name="action" value="draft" class="btn btn-outline-primary">
                                        <iconify-icon icon="solar:document-text-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                        Lưu nháp
                                    </button>
                                </div>
                                
                                <div class="d-flex gap-2">
                                    <button type="button" class="btn btn-outline-info" onclick="previewPost()">
                                        <iconify-icon icon="solar:eye-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                        Xem trước
                                    </button>
                                    <a href="{{ route('admin.posts.index') }}" class="btn btn-outline-secondary">
                                        <iconify-icon icon="solar:close-circle-broken" class="align-middle fs-16 me-1"></iconify-icon>
                                        Hủy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Tips Card -->
                <div class="card bg-info-subtle border-0 mt-4">
                    <div class="card-body">
                        <h6 class="card-title text-info mb-3">
                            <iconify-icon icon="solar:lightbulb-broken" class="align-middle fs-18 me-2"></iconify-icon>
                            Mẹo viết bài hiệu quả
                        </h6>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="d-flex gap-2 mb-2">
                                    <iconify-icon icon="solar:check-circle-bold" class="text-success fs-16 mt-1"></iconify-icon>
                                    <div>
                                        <h6 class="mb-1">Tiêu đề hấp dẫn</h6>
                                        <p class="text-muted mb-0 fs-14">Sử dụng từ khóa chính và tạo sự tò mò</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="d-flex gap-2 mb-2">
                                    <iconify-icon icon="solar:check-circle-bold" class="text-success fs-16 mt-1"></iconify-icon>
                                    <div>
                                        <h6 class="mb-1">Cấu trúc rõ ràng</h6>
                                        <p class="text-muted mb-0 fs-14">Chia thành đoạn ngắn, sử dụng tiêu đề phụ</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="d-flex gap-2 mb-2">
                                    <iconify-icon icon="solar:check-circle-bold" class="text-success fs-16 mt-1"></iconify-icon>
                                    <div>
                                        <h6 class="mb-1">SEO tối ưu</h6>
                                        <p class="text-muted mb-0 fs-14">Điền đầy đủ meta title, description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

// Auto-save functionality (optional)
let autoSaveTimer;
function autoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        const formData = new FormData(document.getElementById('post-form'));
        formData.append('auto_save', '1');
        
        // You can implement auto-save to server here
        console.log('Auto-save triggered');
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
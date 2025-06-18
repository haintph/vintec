@extends('admin.layouts.masters')

@section('title', 'Quản lý Solutions')

@section('content')
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">Quản lý Solutions</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                            <li class="breadcrumb-item active">Solutions</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <h5 class="card-title mb-0">
                                    <i class="fas fa-filter me-2"></i>
                                    Bộ lọc & Tìm kiếm
                                </h5>
                            </div>
                            <div class="col-auto">
                                <a href="{{ route('solution-create') }}" class="btn btn-primary">
                                    <i class="fas fa-plus me-2"></i>Tạo Solution
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form method="GET" class="row g-3">
                            <div class="col-md-3">
                                <label for="search" class="form-label">Tìm kiếm</label>
                                <input type="text" class="form-control" id="search" name="search" 
                                       value="{{ request('search') }}" placeholder="Tìm theo tiêu đề, nội dung...">
                            </div>

                            <div class="col-md-2">
                                <label for="status" class="form-label">Trạng thái</label>
                                <select class="form-select" id="status" name="status">
                                    <option value="">Tất cả trạng thái</option>
                                    <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>Bản nháp</option>
                                    <option value="published" {{ request('status') == 'published' ? 'selected' : '' }}>Đã xuất bản</option>
                                    <option value="scheduled" {{ request('status') == 'scheduled' ? 'selected' : '' }}>Đã lên lịch</option>
                                    <option value="archived" {{ request('status') == 'archived' ? 'selected' : '' }}>Đã lưu trữ</option>
                                </select>
                            </div>

                            <div class="col-md-2">
                                <label for="category" class="form-label">Chuyên mục</label>
                                <select class="form-select" id="category" name="category">
                                    <option value="">Tất cả chuyên mục</option>
                                    @foreach($categories as $category)
                                        <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                                            {{ $category->name }} ({{ $category->post_count }})
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="col-md-2">
                                <label for="tag" class="form-label">Tag</label>
                                <select class="form-select" id="tag" name="tag">
                                    <option value="">Tất cả tags</option>
                                    @foreach($tags as $tag)
                                        <option value="{{ $tag->id }}" {{ request('tag') == $tag->id ? 'selected' : '' }}>
                                            {{ $tag->name }} ({{ $tag->post_count }})
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="col-md-2">
                                <label for="author" class="form-label">Tác giả</label>
                                <select class="form-select" id="author" name="author">
                                    <option value="">Tất cả tác giả</option>
                                    @foreach($authors as $author)
                                        <option value="{{ $author->id }}" {{ request('author') == $author->id ? 'selected' : '' }}>
                                            {{ $author->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="col-md-1">
                                <label for="featured" class="form-label">Nổi bật</label>
                                <select class="form-select" id="featured" name="featured">
                                    <option value="">Tất cả</option>
                                    <option value="1" {{ request('featured') == '1' ? 'selected' : '' }}>Nổi bật</option>
                                    <option value="0" {{ request('featured') == '0' ? 'selected' : '' }}>Thường</option>
                                </select>
                            </div>

                            <div class="col-md-2">
                                <label for="sort_by" class="form-label">Sắp xếp theo</label>
                                <select class="form-select" id="sort_by" name="sort_by">
                                    <option value="created_at" {{ request('sort_by') == 'created_at' ? 'selected' : '' }}>Ngày tạo</option>
                                    <option value="published_at" {{ request('sort_by') == 'published_at' ? 'selected' : '' }}>Ngày đăng</option>
                                    <option value="title" {{ request('sort_by') == 'title' ? 'selected' : '' }}>Tiêu đề</option>
                                    <option value="view_count" {{ request('sort_by') == 'view_count' ? 'selected' : '' }}>Lượt xem</option>
                                    <option value="status" {{ request('sort_by') == 'status' ? 'selected' : '' }}>Trạng thái</option>
                                </select>
                            </div>

                            <div class="col-md-2">
                                <label for="sort_direction" class="form-label">Thứ tự</label>
                                <select class="form-select" id="sort_direction" name="sort_direction">
                                    <option value="desc" {{ request('sort_direction') == 'desc' ? 'selected' : '' }}>Giảm dần</option>
                                    <option value="asc" {{ request('sort_direction') == 'asc' ? 'selected' : '' }}>Tăng dần</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-search me-2"></i>Tìm kiếm
                                </button>
                                <a href="{{ route('solution-list') }}" class="btn btn-secondary">
                                    <i class="fas fa-refresh me-2"></i>Reset
                                </a>
                            </div>
                        </form>

                        @if(request()->hasAny(['search', 'status', 'category', 'tag', 'author', 'featured', 'sort_by']))
                            <div class="mt-3 pt-3 border-top">
                                <h6 class="text-muted mb-2">Kết quả lọc:</h6>
                                <div class="d-flex flex-wrap gap-2">
                                    @if(request('search'))
                                        <span class="badge bg-info">Tìm kiếm: "{{ request('search') }}"</span>
                                    @endif
                                    @if(request('status'))
                                        <span class="badge bg-primary">Trạng thái: {{ ucfirst(request('status')) }}</span>
                                    @endif
                                    @if(request('category'))
                                        <span class="badge bg-success">Chuyên mục: {{ $categories->find(request('category'))->name ?? 'N/A' }}</span>
                                    @endif
                                    @if(request('tag'))
                                        <span class="badge bg-warning">Tag: {{ $tags->find(request('tag'))->name ?? 'N/A' }}</span>
                                    @endif
                                    @if(request('author'))
                                        <span class="badge bg-secondary">Tác giả: {{ $authors->find(request('author'))->name ?? 'N/A' }}</span>
                                    @endif
                                    @if(request('featured') !== null)
                                        <span class="badge bg-danger">{{ request('featured') == '1' ? 'Nổi bật' : 'Thường' }}</span>
                                    @endif
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <!-- Solutions List -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <h5 class="card-title mb-0">
                                    Danh sách Solutions
                                    <span class="badge bg-primary ms-2">{{ $solutions->total() }}</span>
                                </h5>
                            </div>
                            <div class="col-auto">
                                <div class="d-flex gap-2">
                                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="selectAll()">
                                        <i class="fas fa-check-square me-1"></i>Chọn tất cả
                                    </button>
                                    <div class="dropdown">
                                        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" 
                                                id="bulkActionDropdown" data-bs-toggle="dropdown" disabled>
                                            <i class="fas fa-cogs me-1"></i>Bulk Actions
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#" onclick="bulkAction('publish')">
                                                <i class="fas fa-globe text-success me-2"></i>Xuất bản
                                            </a></li>
                                            <li><a class="dropdown-item" href="#" onclick="bulkAction('draft')">
                                                <i class="fas fa-edit text-warning me-2"></i>Chuyển thành bản nháp
                                            </a></li>
                                            <li><a class="dropdown-item" href="#" onclick="bulkAction('feature')">
                                                <i class="fas fa-star text-primary me-2"></i>Đánh dấu nổi bật
                                            </a></li>
                                            <li><a class="dropdown-item" href="#" onclick="bulkAction('unfeature')">
                                                <i class="far fa-star text-muted me-2"></i>Bỏ đánh dấu nổi bật
                                            </a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><a class="dropdown-item text-danger" href="#" onclick="bulkAction('delete')">
                                                <i class="fas fa-trash me-2"></i>Xóa
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        @if($solutions->count() > 0)
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th width="50">
                                                <input type="checkbox" id="selectAllCheckbox" onchange="toggleSelectAll()">
                                            </th>
                                            <th>Solution</th>
                                            <th>Chuyên mục</th>
                                            <th>Tags</th>
                                            <th>Tác giả</th>
                                            <th>Trạng thái</th>
                                            <th>Stats</th>
                                            <th>Ngày</th>
                                            <th width="120">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($solutions as $solution)
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="solution-checkbox" value="{{ $solution->id }}">
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-start gap-3">
                                                        @if($solution->featured_image)
                                                            <div class="flex-shrink-0">
                                                                <img src="{{ Storage::url($solution->featured_image) }}" 
                                                                     alt="{{ $solution->title }}" 
                                                                     class="rounded" style="width: 60px; height: 60px; object-fit: cover;">
                                                            </div>
                                                        @else
                                                            <div class="flex-shrink-0">
                                                                <div class="rounded bg-light d-flex align-items-center justify-content-center" 
                                                                     style="width: 60px; height: 60px;">
                                                                    <i class="fas fa-file-alt text-muted"></i>
                                                                </div>
                                                            </div>
                                                        @endif
                                                        <div class="flex-grow-1">
                                                            <h6 class="mb-1">
                                                                <a href="{{ route('solution_detail', $solution->id) }}" 
                                                                   class="text-dark text-decoration-none">
                                                                    {{ Str::limit($solution->title, 50) }}
                                                                </a>
                                                                @if($solution->is_featured)
                                                                    <i class="fas fa-star text-warning ms-1" title="Nổi bật"></i>
                                                                @endif
                                                            </h6>
                                                            @if($solution->excerpt)
                                                                <p class="text-muted small mb-1">
                                                                    {{ Str::limit($solution->excerpt, 80) }}
                                                                </p>
                                                            @endif
                                                            <small class="text-muted">
                                                                <i class="fas fa-link me-1"></i>
                                                                <code>/solution/{{ $solution->slug }}</code>
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    @if($solution->categorySolution)
                                                        <span class="badge bg-info">
                                                            {{ $solution->categorySolution->name }}
                                                        </span>
                                                    @else
                                                        <span class="text-muted">Chưa phân loại</span>
                                                    @endif
                                                </td>
                                                <td>
                                                    @if($solution->tagSolutions->count() > 0)
                                                        <div class="d-flex flex-wrap gap-1">
                                                            @foreach($solution->tagSolutions->take(3) as $tag)
                                                                <span class="badge bg-primary">#{{ $tag->name }}</span>
                                                            @endforeach
                                                            @if($solution->tagSolutions->count() > 3)
                                                                <span class="badge bg-secondary">+{{ $solution->tagSolutions->count() - 3 }}</span>
                                                            @endif
                                                        </div>
                                                    @else
                                                        <span class="text-muted">Chưa có tag</span>
                                                    @endif
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center gap-2">
                                                        <div class="avatar-sm">
                                                            <div class="avatar-title rounded-circle bg-light text-primary">
                                                                {{ strtoupper(substr($solution->user->name, 0, 1)) }}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div class="fw-medium">{{ $solution->user->name }}</div>
                                                            <small class="text-muted">{{ $solution->user->email }}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class="badge {{ $solution->getStatusBadgeClass() }}">
                                                        {{ $solution->getStatusLabel() }}
                                                    </span>
                                                    @if($solution->status === 'scheduled')
                                                        <br><small class="text-muted">
                                                            {{ $solution->published_at->format('d/m/Y H:i') }}
                                                        </small>
                                                    @endif
                                                </td>
                                                <td>
                                                    <div class="d-flex flex-column gap-1">
                                                        <div class="d-flex align-items-center gap-1">
                                                            <i class="fas fa-eye text-info"></i>
                                                            <small>{{ number_format($solution->view_count) }}</small>
                                                        </div>
                                                        <div class="d-flex align-items-center gap-1">
                                                            <i class="fas fa-heart text-danger"></i>
                                                            <small>{{ number_format($solution->like_count) }}</small>
                                                        </div>
                                                        <div class="d-flex align-items-center gap-1">
                                                            <i class="fas fa-comments text-primary"></i>
                                                            <small>{{ number_format($solution->comment_count) }}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="d-flex flex-column gap-1">
                                                        <small class="text-muted">
                                                            <i class="fas fa-plus me-1"></i>
                                                            {{ $solution->created_at->format('d/m/Y') }}
                                                        </small>
                                                        @if($solution->published_at)
                                                            <small class="text-muted">
                                                                <i class="fas fa-globe me-1"></i>
                                                                {{ $solution->published_at->format('d/m/Y') }}
                                                            </small>
                                                        @endif
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button class="btn btn-light btn-sm dropdown-toggle" type="button" 
                                                                data-bs-toggle="dropdown">
                                                            <i class="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li>
                                                                <a class="dropdown-item" href="{{ route('solution_detail', $solution->id) }}">
                                                                    <i class="fas fa-eye me-2"></i>Xem chi tiết
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a class="dropdown-item" href="{{ route('solution_edit', $solution->id) }}">
                                                                    <i class="fas fa-edit me-2"></i>Sửa
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
                                                                            <i class="fas fa-eye-slash me-2"></i>Ẩn
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
                                                                        <i class="fas fa-trash me-2"></i>Xóa
                                                                    </button>
                                                                </form>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                            <!-- Pagination -->
                            <div class="card-footer">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <p class="text-muted mb-0">
                                            Hiển thị {{ $solutions->firstItem() }} - {{ $solutions->lastItem() }} 
                                            trong tổng số {{ $solutions->total() }} solutions
                                        </p>
                                    </div>
                                    <div class="col-auto">
                                        {{ $solutions->links() }}
                                    </div>
                                </div>
                            </div>
                        @else
                            <div class="text-center py-5">
                                <div class="mb-3">
                                    <i class="fas fa-file-alt fa-3x text-muted"></i>
                                </div>
                                <h5 class="text-muted">
                                    @if(request()->hasAny(['search', 'status', 'category', 'tag', 'author', 'featured']))
                                        Không tìm thấy solution nào phù hợp với bộ lọc.
                                    @else
                                        Chưa có solution nào được tạo.
                                    @endif
                                </h5>
                                @if(!request()->hasAny(['search', 'status', 'category', 'tag', 'author', 'featured']))
                                    <a href="{{ route('solution-create') }}" class="btn btn-primary mt-3">
                                        <i class="fas fa-plus me-2"></i>Tạo Solution đầu tiên
                                    </a>
                                @endif
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bulk Action Form -->
    <form id="bulkActionForm" action="{{ route('solution_bulk_action') }}" method="POST" style="display: none;">
        @csrf
        <input type="hidden" name="action" id="bulkActionType">
        <input type="hidden" name="solution_ids" id="bulkSolutionIds">
    </form>

    <!-- Scripts -->
    <script>
        // Checkbox handling
        function toggleSelectAll() {
            const selectAllCheckbox = document.getElementById('selectAllCheckbox');
            const checkboxes = document.querySelectorAll('.solution-checkbox');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
            
            updateBulkActionButton();
        }

        function selectAll() {
            const selectAllCheckbox = document.getElementById('selectAllCheckbox');
            selectAllCheckbox.checked = true;
            toggleSelectAll();
        }

        function updateBulkActionButton() {
            const checkedBoxes = document.querySelectorAll('.solution-checkbox:checked');
            const bulkActionButton = document.getElementById('bulkActionDropdown');
            
            if (checkedBoxes.length > 0) {
                bulkActionButton.disabled = false;
                bulkActionButton.textContent = `Bulk Actions (${checkedBoxes.length})`;
            } else {
                bulkActionButton.disabled = true;
                bulkActionButton.textContent = 'Bulk Actions';
            }
        }

        // Bulk actions
        function bulkAction(action) {
            const checkedBoxes = document.querySelectorAll('.solution-checkbox:checked');
            
            if (checkedBoxes.length === 0) {
                alert('Vui lòng chọn ít nhất một solution.');
                return;
            }

            const solutionIds = Array.from(checkedBoxes).map(cb => cb.value);
            
            let confirmMessage = '';
            switch(action) {
                case 'publish':
                    confirmMessage = `Bạn có chắc chắn muốn xuất bản ${solutionIds.length} solution(s)?`;
                    break;
                case 'draft':
                    confirmMessage = `Bạn có chắc chắn muốn chuyển ${solutionIds.length} solution(s) thành bản nháp?`;
                    break;
                case 'feature':
                    confirmMessage = `Bạn có chắc chắn muốn đánh dấu nổi bật ${solutionIds.length} solution(s)?`;
                    break;
                case 'unfeature':
                    confirmMessage = `Bạn có chắc chắn muốn bỏ đánh dấu nổi bật ${solutionIds.length} solution(s)?`;
                    break;
                case 'delete':
                    confirmMessage = `Bạn có chắc chắn muốn XÓA ${solutionIds.length} solution(s)? Hành động này không thể hoàn tác!`;
                    break;
                default:
                    return;
            }

            if (confirm(confirmMessage)) {
                document.getElementById('bulkActionType').value = action;
                document.getElementById('bulkSolutionIds').value = JSON.stringify(solutionIds);
                document.getElementById('bulkActionForm').submit();
            }
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const checkboxes = document.querySelectorAll('.solution-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateBulkActionButton);
            });
        });
    </script>
@endsection
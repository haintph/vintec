@extends('admin.layouts.masters')
@section('content')
    <!-- Start Container Fluid -->
    <div class="container-xxl">

        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">All Tag Solutions List</h4>

                        <a href="{{ route('tag-solution-create') }}" class="btn btn-sm btn-primary">
                            <iconify-icon icon="solar:add-circle-broken" class="me-1"></iconify-icon>
                            Add Tag Solution
                        </a>

                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle btn btn-sm btn-outline-light" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Actions
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a href="{{ route('tag_solution_update_post_counts') }}" class="dropdown-item">
                                    <iconify-icon icon="solar:refresh-broken" class="me-1"></iconify-icon>
                                    Update Post Counts
                                </a>
                                <a href="#!" class="dropdown-item">
                                    <iconify-icon icon="solar:download-broken" class="me-1"></iconify-icon>
                                    Export
                                </a>
                                <a href="#!" class="dropdown-item">
                                    <iconify-icon icon="solar:upload-broken" class="me-1"></iconify-icon>
                                    Import
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

                    <!-- Search and Filter Section -->
                    <div class="card-body border-bottom">
                        <form method="GET" action="{{ route('tag-solution-list') }}" class="row g-3">
                            <div class="col-md-3">
                                <label for="search" class="form-label">Tìm kiếm</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <iconify-icon icon="solar:magnifer-broken"></iconify-icon>
                                    </span>
                                    <input type="text" class="form-control" id="search" name="search" 
                                           value="{{ request('search') }}" placeholder="Nhập tên tag...">
                                </div>
                            </div>
                            
                            <div class="col-md-2">
                                <label for="status" class="form-label">Trạng thái</label>
                                <select class="form-select" id="status" name="status">
                                    <option value="">Tất cả</option>
                                    <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>Hoạt động</option>
                                    <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>Không hoạt động</option>
                                </select>
                            </div>

                            <div class="col-md-2">
                                <label for="sort_by" class="form-label">Sắp xếp theo</label>
                                <select class="form-select" id="sort_by" name="sort_by">
                                    <option value="created_at" {{ request('sort_by') == 'created_at' ? 'selected' : '' }}>Ngày tạo</option>
                                    <option value="name" {{ request('sort_by') == 'name' ? 'selected' : '' }}>Tên A-Z</option>
                                    <option value="post_count" {{ request('sort_by') == 'post_count' ? 'selected' : '' }}>Số bài viết</option>
                                    <option value="sort_order" {{ request('sort_by') == 'sort_order' ? 'selected' : '' }}>Thứ tự</option>
                                    <option value="updated_at" {{ request('sort_by') == 'updated_at' ? 'selected' : '' }}>Cập nhật</option>
                                </select>
                            </div>

                            <div class="col-md-1">
                                <label for="sort_direction" class="form-label">Thứ tự</label>
                                <select class="form-select" id="sort_direction" name="sort_direction">
                                    <option value="desc" {{ request('sort_direction') == 'desc' ? 'selected' : '' }}>↓</option>
                                    <option value="asc" {{ request('sort_direction') == 'asc' ? 'selected' : '' }}>↑</option>
                                </select>
                            </div>

                            <div class="col-md-2 d-flex align-items-end">
                                <div class="btn-group w-100" role="group">
                                    <button type="submit" class="btn btn-primary">
                                        <iconify-icon icon="solar:magnifer-broken" class="me-1"></iconify-icon>
                                        Tìm kiếm
                                    </button>
                                    <a href="{{ route('tag-solution-list') }}" class="btn btn-outline-secondary">
                                        <iconify-icon icon="solar:refresh-broken"></iconify-icon>
                                    </a>
                                </div>
                            </div>
                        </form>

                        <!-- Search Results Info -->
                        @if(request()->hasAny(['search', 'status', 'sort_by']))
                            <div class="mt-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span class="text-muted">
                                            Tìm thấy <strong>{{ $tags->total() }}</strong> kết quả
                                            @if(request('search'))
                                                cho "<strong>{{ request('search') }}</strong>"
                                            @endif
                                            @if(request('status') !== null)
                                                - Trạng thái: <strong>{{ request('status') == '1' ? 'Hoạt động' : 'Không hoạt động' }}</strong>
                                            @endif
                                        </span>
                                    </div>
                                    <a href="{{ route('tag-solution-list') }}" class="btn btn-link btn-sm text-decoration-none">
                                        <iconify-icon icon="solar:close-circle-broken" class="me-1"></iconify-icon>
                                        Xóa bộ lọc
                                    </a>
                                </div>
                            </div>
                        @endif
                    </div>

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
                                        <th>Tag Name</th>
                                        <th>Slug</th>
                                        <th>Posts</th>
                                        <th>Sort Order</th>
                                        <th>Updated</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($tags as $tag)
                                        <tr data-id="{{ $tag->id }}">
                                            <td>
                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input" id="customCheck{{ $tag->id }}">
                                                    <label class="form-check-label" for="customCheck{{ $tag->id }}"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center gap-2">
                                                    <div class="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                        <iconify-icon icon="solar:hashtag-broken" class="fs-24 text-primary"></iconify-icon>
                                                    </div>
                                                    <div>
                                                        <p class="text-dark fw-medium fs-15 mb-0">{{ $tag->name }}</p>
                                                        @if($tag->meta_title)
                                                            <small class="text-muted">{{ Str::limit($tag->meta_title, 40) }}</small>
                                                        @endif
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <code class="text-primary">{{ $tag->slug }}</code>
                                            </td>
                                            <td>
                                                <span class="badge bg-info-subtle text-info">{{ $tag->post_count }}</span>
                                            </td>
                                            <td>
                                                <span class="badge bg-secondary">{{ $tag->sort_order }}</span>
                                            </td>
                                            <td>
                                                <small class="text-muted">{{ $tag->updated_at->format('d/m/Y H:i') }}</small>
                                            </td>
                                            <td>
                                                <span class="badge bg-{{ $tag->is_active ? 'success' : 'secondary' }}">
                                                    {{ $tag->is_active ? 'Hoạt động' : 'Không hoạt động' }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <a href="{{ route('tag_solution_detail', $tag->id) }}"
                                                        class="btn btn-light btn-sm" title="Xem chi tiết">
                                                        <iconify-icon icon="solar:eye-broken" class="align-middle fs-18"></iconify-icon>
                                                    </a>

                                                    <a href="{{ route('tag_solution_edit', $tag->id) }}"
                                                        class="btn btn-soft-primary btn-sm" title="Chỉnh sửa">
                                                        <iconify-icon icon="solar:pen-2-broken" class="align-middle fs-18"></iconify-icon>
                                                    </a>

                                                    <form action="{{ route('tag_solution_destroy', $tag->id) }}" method="POST"
                                                        style="display: inline;">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button onclick="return confirm('Bạn có chắc chắn muốn xóa tag này không?')"
                                                            type="submit" class="btn btn-soft-danger btn-sm" title="Xóa"
                                                            {{ $tag->post_count > 0 ? 'disabled' : '' }}>
                                                            <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="align-middle fs-18"></iconify-icon>
                                                        </button>
                                                    </form>

                                                    <form action="{{ route('tag_solution_toggle_status', $tag->id) }}" method="POST"
                                                        style="display: inline;">
                                                        @csrf
                                                        @method('PATCH')
                                                        <button type="submit" class="btn btn-soft-{{ $tag->is_active ? 'warning' : 'success' }} btn-sm"
                                                            title="{{ $tag->is_active ? 'Vô hiệu hóa' : 'Kích hoạt' }}">
                                                            <iconify-icon icon="solar:{{ $tag->is_active ? 'pause' : 'play' }}-broken" class="align-middle fs-18"></iconify-icon>
                                                        </button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="8" class="text-center py-4">
                                                <div class="d-flex flex-column align-items-center">
                                                    <iconify-icon icon="solar:hashtag-broken" class="fs-48 text-muted mb-2"></iconify-icon>
                                                    <p class="text-muted mb-0">
                                                        @if(request()->hasAny(['search', 'status']))
                                                            Không tìm thấy tag nào phù hợp với bộ lọc.
                                                        @else
                                                            Chưa có tag nào được tạo.
                                                        @endif
                                                    </p>
                                                    @if(!request()->hasAny(['search', 'status']))
                                                        <a href="{{ route('tag-solution-create') }}" class="btn btn-primary btn-sm mt-2">
                                                            <iconify-icon icon="solar:add-circle-broken" class="me-1"></iconify-icon>
                                                            Tạo tag đầu tiên
                                                        </a>
                                                    @endif
                                                </div>
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    @if($tags->hasPages())
                        <div class="card-footer border-top">
                            {{ $tags->links() }}
                        </div>
                    @endif
                </div>
            </div>
        </div>

    </div>
    <!-- End Container Fluid -->

    <!-- JavaScript for enhanced functionality -->
    <script>
        // Enhanced search functionality
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            const searchInput = document.getElementById('search');
            const selectInputs = form.querySelectorAll('select');
            
            // Auto submit when select changes
            selectInputs.forEach(select => {
                select.addEventListener('change', function() {
                    form.submit();
                });
            });

            // Search on Enter key
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    form.submit();
                }
            });

            // Highlight search term in results
            const searchTerm = '{{ request("search") }}';
            if (searchTerm && searchTerm.length > 0) {
                highlightSearchTerm(searchTerm);
            }
        });

        function highlightSearchTerm(term) {
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedTerm})`, 'gi');
            
            // Highlight in tag names
            const tagNames = document.querySelectorAll('td .text-dark.fw-medium');
            tagNames.forEach(element => {
                const originalText = element.textContent;
                if (originalText.toLowerCase().includes(term.toLowerCase())) {
                    element.innerHTML = originalText.replace(regex, '<mark class="bg-warning text-dark">$1</mark>');
                }
            });
            
            // Highlight in meta titles
            const metaTitles = document.querySelectorAll('td small.text-muted');
            metaTitles.forEach(element => {
                const originalText = element.textContent;
                if (originalText.toLowerCase().includes(term.toLowerCase())) {
                    element.innerHTML = originalText.replace(regex, '<mark class="bg-warning text-dark">$1</mark>');
                }
            });
        }

        // Bulk actions functionality (similar to CategorySolution)
        function toggleAllCheckboxes() {
            const mainCheckbox = document.getElementById('customCheck1');
            const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = mainCheckbox.checked;
            });
            
            updateBulkActions();
        }

        function updateBulkActions() {
            const checkedBoxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
            const bulkActions = document.getElementById('bulkActions');
            
            if (checkedBoxes.length > 0) {
                if (!bulkActions) {
                    showBulkActions(checkedBoxes.length);
                } else {
                    updateBulkCount(checkedBoxes.length);
                }
            } else {
                hideBulkActions();
            }
        }

        function showBulkActions(count) {
            const container = document.querySelector('.card-header');
            const bulkDiv = document.createElement('div');
            bulkDiv.id = 'bulkActions';
            bulkDiv.className = 'alert alert-info d-flex justify-content-between align-items-center mt-2 mb-0';
            bulkDiv.innerHTML = `
                <span>Đã chọn <strong>${count}</strong> tag</span>
                <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-success" onclick="bulkActivate()">
                        <iconify-icon icon="solar:play-broken"></iconify-icon> Kích hoạt
                    </button>
                    <button type="button" class="btn btn-warning" onclick="bulkDeactivate()">
                        <iconify-icon icon="solar:pause-broken"></iconify-icon> Vô hiệu hóa
                    </button>
                    <button type="button" class="btn btn-danger" onclick="bulkDelete()">
                        <iconify-icon icon="solar:trash-bin-minimalistic-2-broken"></iconify-icon> Xóa
                    </button>
                </div>
            `;
            container.appendChild(bulkDiv);
        }

        function updateBulkCount(count) {
            const bulkActions = document.getElementById('bulkActions');
            if (bulkActions) {
                bulkActions.querySelector('span').innerHTML = `Đã chọn <strong>${count}</strong> tag`;
            }
        }

        function hideBulkActions() {
            const bulkActions = document.getElementById('bulkActions');
            if (bulkActions) {
                bulkActions.remove();
            }
        }

        function bulkActivate() {
            const selected = getSelectedIds();
            if (selected.length > 0 && confirm(`Kích hoạt ${selected.length} tag đã chọn?`)) {
                submitBulkAction('activate', selected);
            }
        }

        function bulkDeactivate() {
            const selected = getSelectedIds();
            if (selected.length > 0 && confirm(`Vô hiệu hóa ${selected.length} tag đã chọn?`)) {
                submitBulkAction('deactivate', selected);
            }
        }

        function bulkDelete() {
            const selected = getSelectedIds();
            if (selected.length > 0 && confirm(`Xóa ${selected.length} tag đã chọn? Hành động này không thể hoàn tác!`)) {
                submitBulkAction('delete', selected);
            }
        }

        function getSelectedIds() {
            const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
            return Array.from(checkboxes).map(cb => cb.closest('tr').dataset.id).filter(id => id);
        }

        function submitBulkAction(action, ids) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '{{ route("tag_solution_bulk_action") }}';
            
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = '{{ csrf_token() }}';
            form.appendChild(csrfInput);
            
            const actionInput = document.createElement('input');
            actionInput.type = 'hidden';
            actionInput.name = 'action';
            actionInput.value = action;
            form.appendChild(actionInput);
            
            ids.forEach(id => {
                const idInput = document.createElement('input');
                idInput.type = 'hidden';
                idInput.name = 'ids[]';
                idInput.value = id;
                form.appendChild(idInput);
            });
            
            document.body.appendChild(form);
            form.submit();
        }

        // Add event listeners to checkboxes
        document.addEventListener('DOMContentLoaded', function() {
            const mainCheckbox = document.getElementById('customCheck1');
            if (mainCheckbox) {
                mainCheckbox.addEventListener('change', toggleAllCheckboxes);
            }

            const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
            rowCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateBulkActions);
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
@extends('admin.layouts.masters')
@section('content')
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">Chi tiết User</h4>
                        <div class="d-flex gap-2">
                            @if(auth()->user()->isAdmin() || auth()->id() === $user->id)
                                <a href="{{ route('user_edit', $user->id) }}" class="btn btn-sm btn-primary">
                                    <iconify-icon icon="solar:pen-2-broken" class="fs-16 me-1"></iconify-icon>
                                    Chỉnh sửa
                                </a>
                            @endif
                            <a href="{{ route('user-list') }}" class="btn btn-sm btn-secondary">
                                <iconify-icon icon="solar:arrow-left-broken" class="fs-16 me-1"></iconify-icon>
                                Quay lại
                            </a>
                        </div>
                    </div>
                    
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <!-- Avatar và thông tin cơ bản -->
                                <div class="text-center mb-4">
                                    <div class="avatar-xxl bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center overflow-hidden position-relative">
                                        @if($user->image && file_exists(public_path('storage/' . $user->image)))
                                            <img src="{{ asset('storage/' . $user->image) }}" class="avatar-xxl rounded-circle" 
                                                 style="object-fit: cover; width: 120px; height: 120px;" alt="{{ $user->name }}">
                                        @else
                                            <span class="fw-bold text-primary fs-24">
                                                {{ strtoupper(substr($user->name, 0, 2)) }}
                                            </span>
                                        @endif
                                        
                                        <!-- Online status indicator (optional) -->
                                        <span class="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle" 
                                              style="width: 20px; height: 20px;" title="Online"></span>
                                    </div>
                                    <h4 class="mb-1">{{ $user->name }}</h4>
                                    <p class="text-muted mb-2">{{ $user->email }}</p>
                                    <span class="badge bg-{{ $user->isAdmin() ? 'danger' : 'info' }} fs-6">
                                        {{ $user->getRoleName() }}
                                    </span>
                                    
                                    @if($user->id === auth()->id())
                                        <div class="mt-2">
                                            <span class="badge bg-warning-subtle text-warning">
                                                <iconify-icon icon="solar:user-check-broken" class="fs-12 me-1"></iconify-icon>
                                                Đây là tài khoản của bạn
                                            </span>
                                        </div>
                                    @endif
                                </div>

                                <!-- Thông tin tài khoản -->
                                <div class="card bg-light-subtle border-0">
                                    <div class="card-header bg-transparent border-bottom">
                                        <h6 class="card-title mb-0">
                                            <iconify-icon icon="solar:shield-user-broken" class="fs-18 me-1"></iconify-icon>
                                            Thông tin tài khoản
                                        </h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <label class="form-label fw-medium">ID User:</label>
                                            <p class="mb-0">#{{ $user->id }}</p>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label fw-medium">Trạng thái:</label>
                                            <p class="mb-0">
                                                <span class="badge bg-success">Hoạt động</span>
                                            </p>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label fw-medium">Ngày tạo:</label>
                                            <p class="mb-0">{{ $user->created_at->format('d/m/Y H:i:s') }}</p>
                                            <small class="text-muted">{{ $user->created_at->diffForHumans() }}</small>
                                        </div>

                                        <div class="mb-0">
                                            <label class="form-label fw-medium">Cập nhật lần cuối:</label>
                                            <p class="mb-0">{{ $user->updated_at->format('d/m/Y H:i:s') }}</p>
                                            <small class="text-muted">{{ $user->updated_at->diffForHumans() }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-8">
                                <!-- Thông tin chi tiết -->
                                <div class="card">
                                    <div class="card-header">
                                        <h6 class="card-title mb-0">
                                            <iconify-icon icon="solar:user-broken" class="fs-18 me-1"></iconify-icon>
                                            Thông tin chi tiết
                                        </h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label fw-medium">Họ và tên:</label>
                                                    <p class="mb-0">{{ $user->name }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label fw-medium">Email:</label>
                                                    <p class="mb-0">
                                                        <a href="mailto:{{ $user->email }}" class="text-decoration-none">
                                                            {{ $user->email }}
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label fw-medium">Vai trò:</label>
                                                    <p class="mb-0">
                                                        <span class="badge bg-{{ $user->isAdmin() ? 'danger' : 'info' }}">
                                                            {{ $user->getRoleName() }}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label fw-medium">Quyền hạn:</label>
                                                    <p class="mb-0">
                                                        @if($user->isAdmin())
                                                            <span class="text-danger">Toàn quyền hệ thống</span>
                                                        @else
                                                            <span class="text-info">Quản lý giới hạn</span>
                                                        @endif
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quyền và Permissions -->
                                <div class="card">
                                    <div class="card-header">
                                        <h6 class="card-title mb-0">
                                            <iconify-icon icon="solar:shield-check-broken" class="fs-18 me-1"></iconify-icon>
                                            Quyền hạn chi tiết
                                        </h6>
                                    </div>
                                    <div class="card-body">
                                        @if($user->isAdmin())
                                            <div class="alert alert-danger">
                                                <h6 class="alert-heading d-flex align-items-center">
                                                    <iconify-icon icon="solar:crown-broken" class="fs-18 me-2"></iconify-icon>
                                                    Quyền Admin
                                                </h6>
                                                <p class="mb-0">User này có toàn quyền quản trị hệ thống, bao gồm:</p>
                                                <ul class="mb-0 mt-2">
                                                    <li>Tạo, chỉnh sửa, xóa user</li>
                                                    <li>Quản lý toàn bộ nội dung</li>
                                                    <li>Truy cập tất cả các chức năng</li>
                                                    <li>Quản lý cấu hình hệ thống</li>
                                                </ul>
                                            </div>
                                        @else
                                            <div class="alert alert-info">
                                                <h6 class="alert-heading d-flex align-items-center">
                                                    <iconify-icon icon="solar:user-id-broken" class="fs-18 me-2"></iconify-icon>
                                                    Quyền Manager
                                                </h6>
                                                <p class="mb-0">User này có quyền quản lý giới hạn, bao gồm:</p>
                                                <ul class="mb-0 mt-2">
                                                    <li>Xem danh sách manager khác</li>
                                                    <li>Chỉnh sửa thông tin cá nhân</li>
                                                    <li>Quản lý nội dung được phân quyền</li>
                                                </ul>
                                            </div>
                                        @endif
                                    </div>
                                </div>

                                <!-- Các hành động -->
                                @if(auth()->user()->isAdmin() && auth()->id() !== $user->id)
                                    <div class="card border-danger">
                                        <div class="card-header bg-danger-subtle">
                                            <h6 class="card-title mb-0 text-danger">
                                                <iconify-icon icon="solar:danger-broken" class="fs-18 me-1"></iconify-icon>
                                                Khu vực nguy hiểm
                                            </h6>
                                        </div>
                                        <div class="card-body">
                                            <p class="text-muted mb-3">Các hành động sau đây không thể hoàn tác:</p>
                                            <form action="{{ route('user_destroy', $user->id) }}" method="POST" 
                                                  onsubmit="return confirm('Bạn có chắc chắn muốn xóa user này? Hành động này không thể hoàn tác!')">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger">
                                                    <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="fs-16 me-1"></iconify-icon>
                                                    Xóa User
                                                </button>
                                            </form>
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
@endsection
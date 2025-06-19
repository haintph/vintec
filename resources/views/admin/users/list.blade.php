@extends('admin.layouts.masters')
@section('content')
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">Quản lý User</h4>
                        @if(auth()->user()->isAdmin())
                            <a href="{{ route('user-create') }}" class="btn btn-sm btn-primary">
                                Thêm User
                            </a>
                        @endif
                    </div>
                    
                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if (session('error'))
                        <div class="alert alert-danger">
                            {{ session('error') }}
                        </div>
                    @endif

                    <div class="table-responsive">
                        <table class="table align-middle mb-0 table-hover table-centered">
                            <thead class="bg-light-subtle">
                                <tr>
                                    <th>Avatar</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Vai trò</th>
                                    <th>Ngày tạo</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($users as $user)
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="rounded avatar-md overflow-hidden">
                                                    @if($user->image && file_exists(public_path('storage/' . $user->image)))
                                                        <img src="{{ asset('storage/' . $user->image) }}" alt="{{ $user->name }}" 
                                                             class="avatar-md rounded" style="object-fit: cover; width: 40px; height: 40px;">
                                                    @else
                                                        <div class="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                            <span class="fw-bold text-primary fs-16">
                                                                {{ strtoupper(substr($user->name, 0, 2)) }}
                                                            </span>
                                                        </div>
                                                    @endif
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <h6 class="mb-0">{{ $user->name }}</h6>
                                                @if($user->id === auth()->id())
                                                    <small class="text-muted">(Bạn)</small>
                                                @endif
                                            </div>
                                        </td>
                                        <td>{{ $user->email }}</td>
                                        <td>
                                            <span class="badge bg-{{ $user->isAdmin() ? 'danger' : 'info' }}">
                                                {{ $user->getRoleName() }}
                                            </span>
                                        </td>
                                        <td>{{ $user->created_at->format('d/m/Y H:i') }}</td>
                                        <td>
                                            <div class="d-flex gap-1">
                                                <a href="{{ route('user_detail', $user->id) }}" class="btn btn-light btn-sm">
                                                    <iconify-icon icon="solar:eye-broken" class="fs-16"></iconify-icon>
                                                </a>
                                                
                                                @if(auth()->user()->isAdmin() || auth()->id() === $user->id)
                                                    <a href="{{ route('user_edit', $user->id) }}" class="btn btn-soft-primary btn-sm">
                                                        <iconify-icon icon="solar:pen-2-broken" class="fs-16"></iconify-icon>
                                                    </a>
                                                @endif

                                                @if(auth()->user()->isAdmin() && auth()->id() !== $user->id)
                                                    <form action="{{ route('user_destroy', $user->id) }}" method="POST" 
                                                          style="display: inline;" 
                                                          onsubmit="return confirm('Bạn có chắc chắn muốn xóa user này?')">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-soft-danger btn-sm">
                                                            <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="fs-16"></iconify-icon>
                                                        </button>
                                                    </form>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="6" class="text-center py-4">
                                            <div class="text-muted">
                                                <iconify-icon icon="solar:users-group-rounded-broken" class="fs-48 mb-2"></iconify-icon>
                                                <p>Chưa có user nào</p>
                                                @if(auth()->user()->isAdmin())
                                                    <a href="{{ route('user-create') }}" class="btn btn-primary">
                                                        Thêm user đầu tiên
                                                    </a>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                    
                    @if($users->hasPages())
                        <div class="card-footer border-top">
                            {{ $users->links() }}
                        </div>
                    @endif
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
@extends('admin.layouts.masters')
@section('content')
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">Quản lý Banner</h4>
                        <a href="{{ route('banner-create') }}" class="btn btn-sm btn-primary">
                            Thêm Banner
                        </a>
                    </div>
                    
                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    <div class="table-responsive">
                        <table class="table align-middle mb-0 table-hover table-centered">
                            <thead class="bg-light-subtle">
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tiêu đề</th>
                                    <th>Mô tả</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày tạo</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($banners as $banner)
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                    <img src="{{ $banner->image_url }}" alt="{{ $banner->title }}" class="avatar-md" style="object-fit: cover;">
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{ $banner->title }}</td>
                                        <td>{{ Str::limit($banner->description, 50) ?: 'Không có mô tả' }}</td>
                                        <td>
                                            <span class="badge bg-{{ $banner->status ? 'success' : 'secondary' }}">
                                                {{ $banner->status ? 'Hoạt động' : 'Không hoạt động' }}
                                            </span>
                                        </td>
                                        <td>{{ $banner->created_at->format('d/m/Y H:i') }}</td>
                                        <td>
                                            <div class="d-flex gap-1">
                                                <a href="{{ route('banner_detail', $banner->id) }}" class="btn btn-light btn-sm">
                                                    <iconify-icon icon="solar:eye-broken" class="fs-16"></iconify-icon>
                                                </a>
                                                
                                                <a href="{{ route('banner_edit', $banner->id) }}" class="btn btn-soft-primary btn-sm">
                                                    <iconify-icon icon="solar:pen-2-broken" class="fs-16"></iconify-icon>
                                                </a>

                                                <form action="{{ route('banner_destroy', $banner->id) }}" method="POST" 
                                                      style="display: inline;" 
                                                      onsubmit="return confirm('Bạn có chắc chắn muốn xóa banner này?')">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-soft-danger btn-sm">
                                                        <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="fs-16"></iconify-icon>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="6" class="text-center py-4">
                                            <div class="text-muted">
                                                <iconify-icon icon="solar:box-broken" class="fs-48 mb-2"></iconify-icon>
                                                <p>Chưa có banner nào</p>
                                                <a href="{{ route('banner-create') }}" class="btn btn-primary">
                                                    Thêm banner đầu tiên
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                    
                    @if($banners->hasPages())
                        <div class="card-footer border-top">
                            {{ $banners->links() }}
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
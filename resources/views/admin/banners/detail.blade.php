@extends('admin.layouts.masters')
@section('content')
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Chi tiết Banner: {{ $banner->title }}</h4>
                    </div>
                    
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th width="30%">ID:</th>
                                            <td><span class="badge bg-primary">#{{ $banner->id }}</span></td>
                                        </tr>
                                        <tr>
                                            <th>Tiêu đề:</th>
                                            <td>{{ $banner->title }}</td>
                                        </tr>
                                        <tr>
                                            <th>Mô tả:</th>
                                            <td>{{ $banner->description ?: 'Không có mô tả' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Trạng thái:</th>
                                            <td>
                                                <span class="badge bg-{{ $banner->status ? 'success' : 'secondary' }}">
                                                    {{ $banner->status ? 'Hoạt động' : 'Không hoạt động' }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>File:</th>
                                            <td>
                                                @if($banner->image)
                                                    <code>{{ basename($banner->image) }}</code>
                                                @else
                                                    <span class="text-muted">Sử dụng ảnh mặc định</span>
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Ngày tạo:</th>
                                            <td>{{ $banner->created_at->format('d/m/Y H:i:s') }}</td>
                                        </tr>
                                        <tr>
                                            <th>Cập nhật:</th>
                                            <td>{{ $banner->updated_at->format('d/m/Y H:i:s') }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <div class="text-center">
                                    <div class="border rounded p-4" style="background-color: #f8f9fa;">
                                        <img src="{{ $banner->image_url }}" alt="{{ $banner->title }}" 
                                             class="img-fluid rounded shadow" 
                                             style="max-width: 100%; max-height: 300px; object-fit: contain;">
                                    </div>
                                    <p class="text-muted mt-2 mb-0">Banner hiển thị</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <div class="d-flex gap-2">
                            <a href="{{ route('banner_edit', $banner->id) }}" class="btn btn-primary">
                                <iconify-icon icon="solar:pen-2-broken" class="me-1"></iconify-icon> Chỉnh sửa
                            </a>
                            <a href="{{ route('banner-list') }}" class="btn btn-light">
                                <iconify-icon icon="solar:arrow-left-broken" class="me-1"></iconify-icon> Quay lại
                            </a>
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

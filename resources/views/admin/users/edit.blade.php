@extends('admin.layouts.masters')
@section('content')
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 class="card-title flex-grow-1">Chỉnh sửa User</h4>
                        <a href="{{ route('user-list') }}" class="btn btn-sm btn-secondary">
                            <iconify-icon icon="solar:arrow-left-broken" class="fs-16 me-1"></iconify-icon>
                            Quay lại
                        </a>
                    </div>
                    
                    <div class="card-body">
                        <form action="{{ route('user_update', $user->id) }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            @method('PUT')
                            
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Tên <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control @error('name') is-invalid @enderror" 
                                               id="name" name="name" value="{{ old('name', $user->name) }}" 
                                               placeholder="Nhập tên đầy đủ">
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                        <input type="email" class="form-control @error('email') is-invalid @enderror" 
                                               id="email" name="email" value="{{ old('email', $user->email) }}" 
                                               placeholder="Nhập địa chỉ email">
                                        @error('email')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    @if(auth()->user()->isAdmin())
                                        <div class="mb-3">
                                            <label for="role" class="form-label">Vai trò <span class="text-danger">*</span></label>
                                            <select class="form-select @error('role') is-invalid @enderror" id="role" name="role">
                                                <option value="">Chọn vai trò</option>
                                                @foreach($roles as $value => $label)
                                                    <option value="{{ $value }}" 
                                                            {{ (old('role', $user->role) == $value) ? 'selected' : '' }}>
                                                        {{ $label }}
                                                    </option>
                                                @endforeach
                                            </select>
                                            @error('role')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    @else
                                        <div class="mb-3">
                                            <label class="form-label">Vai trò</label>
                                            <div class="form-control-plaintext">
                                                <span class="badge bg-{{ $user->isAdmin() ? 'danger' : 'info' }}">
                                                    {{ $user->getRoleName() }}
                                                </span>
                                            </div>
                                        </div>
                                    @endif

                                    <div class="mb-3">
                                        <label class="form-label">Thông tin tài khoản</label>
                                        <div class="bg-light p-3 rounded">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <small class="text-muted">Ngày tạo:</small><br>
                                                    <span class="fw-medium">{{ $user->created_at->format('d/m/Y H:i') }}</span>
                                                </div>
                                                <div class="col-md-6">
                                                    <small class="text-muted">Cập nhật gần nhất:</small><br>
                                                    <span class="fw-medium">{{ $user->updated_at->format('d/m/Y H:i') }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <!-- Avatar Upload -->
                                    <div class="mb-3">
                                        <label class="form-label">Avatar</label>
                                        <div class="text-center">
                                            <div class="avatar-xl bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center overflow-hidden" id="avatar-preview">
                                                @if($user->image && file_exists(public_path('storage/' . $user->image)))
                                                    <img src="{{ asset('storage/' . $user->image) }}" class="avatar-xl rounded-circle" 
                                                         style="object-fit: cover; width: 80px; height: 80px;" alt="{{ $user->name }}">
                                                @else
                                                    <span class="fw-bold text-primary fs-24">{{ strtoupper(substr($user->name, 0, 2)) }}</span>
                                                @endif
                                            </div>
                                            
                                            <input type="file" class="form-control @error('image') is-invalid @enderror mb-2" 
                                                   id="image" name="image" accept="image/*" onchange="previewAvatar(this)">
                                            @error('image')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                            
                                            @if($user->image && file_exists(public_path('storage/' . $user->image)))
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="remove_image" name="remove_image" value="1">
                                                    <label class="form-check-label text-danger" for="remove_image">
                                                        Xóa avatar hiện tại
                                                    </label>
                                                </div>
                                            @endif
                                            
                                            <small class="text-muted">JPG, PNG, GIF. Tối đa 2MB</small>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Đổi mật khẩu (Tùy chọn)</label>
                                        <small class="text-muted d-block mb-2">Để trống nếu không muốn thay đổi</small>
                                    </div>

                                    <div class="mb-3">
                                        <label for="password" class="form-label">Mật khẩu mới</label>
                                        <div class="input-group">
                                            <input type="password" class="form-control @error('password') is-invalid @enderror" 
                                                   id="password" name="password" placeholder="Nhập mật khẩu mới">
                                            <button class="btn btn-outline-secondary" type="button" onclick="togglePassword('password')">
                                                <iconify-icon icon="solar:eye-broken" id="password-icon"></iconify-icon>
                                            </button>
                                        </div>
                                        @error('password')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        <small class="text-muted">Tối thiểu 6 ký tự</small>
                                    </div>

                                    <div class="mb-3">
                                        <label for="password_confirmation" class="form-label">Xác nhận mật khẩu</label>
                                        <div class="input-group">
                                            <input type="password" class="form-control @error('password_confirmation') is-invalid @enderror" 
                                                   id="password_confirmation" name="password_confirmation" 
                                                   placeholder="Nhập lại mật khẩu mới">
                                            <button class="btn btn-outline-secondary" type="button" onclick="togglePassword('password_confirmation')">
                                                <iconify-icon icon="solar:eye-broken" id="password_confirmation-icon"></iconify-icon>
                                            </button>
                                        </div>
                                        @error('password_confirmation')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    @if($user->id === auth()->id())
                                        <div class="alert alert-info">
                                            <iconify-icon icon="solar:info-circle-broken" class="fs-16 me-1"></iconify-icon>
                                            Bạn đang chỉnh sửa thông tin của chính mình
                                        </div>
                                    @endif
                                </div>
                            </div>

                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('user-list') }}" class="btn btn-secondary">
                                    <iconify-icon icon="solar:close-circle-broken" class="fs-16 me-1"></iconify-icon>
                                    Hủy
                                </a>
                                <button type="submit" class="btn btn-primary">
                                    <iconify-icon icon="solar:check-circle-broken" class="fs-16 me-1"></iconify-icon>
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function togglePassword(fieldId) {
            const field = document.getElementById(fieldId);
            const icon = document.getElementById(fieldId + '-icon');
            
            if (field.type === 'password') {
                field.type = 'text';
                icon.setAttribute('icon', 'solar:eye-closed-broken');
            } else {
                field.type = 'password';
                icon.setAttribute('icon', 'solar:eye-broken');
            }
        }

        function previewAvatar(input) {
            const preview = document.getElementById('avatar-preview');
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    preview.innerHTML = `<img src="${e.target.result}" class="avatar-xl rounded-circle" style="object-fit: cover; width: 80px; height: 80px;">`;
                    
                    // Uncheck remove image checkbox if user selects new image
                    const removeCheckbox = document.getElementById('remove_image');
                    if (removeCheckbox) {
                        removeCheckbox.checked = false;
                    }
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }

        // Handle remove image checkbox
        document.addEventListener('DOMContentLoaded', function() {
            const removeCheckbox = document.getElementById('remove_image');
            const imageInput = document.getElementById('image');
            const preview = document.getElementById('avatar-preview');
            
            if (removeCheckbox) {
                removeCheckbox.addEventListener('change', function() {
                    if (this.checked) {
                        // Clear file input
                        imageInput.value = '';
                        // Show placeholder
                        preview.innerHTML = '<span class="fw-bold text-primary fs-24">{{ strtoupper(substr($user->name, 0, 2)) }}</span>';
                    } else {
                        // Restore original avatar
                        @if($user->image && file_exists(public_path('storage/' . $user->image)))
                            preview.innerHTML = `<img src="{{ asset('storage/' . $user->image) }}" class="avatar-xl rounded-circle" style="object-fit: cover; width: 80px; height: 80px;" alt="{{ $user->name }}">`;
                        @else
                            preview.innerHTML = '<span class="fw-bold text-primary fs-24">{{ strtoupper(substr($user->name, 0, 2)) }}</span>';
                        @endif
                    }
                });
            }
        });
    </script>

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
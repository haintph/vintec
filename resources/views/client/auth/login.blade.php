@extends('client.layouts.master')
@section('content')
    <div class="login-container">
        <div class="login-main-content">
            <div class="login-card">
                <div class="login-card-body">
                    <!-- Header -->
                    <div class="login-header">
                        <h4 class="login-title">Đăng nhập</h4>
                    </div>

                    <!-- Login Form -->
                    {{-- resources/views/auth/login.blade.php --}}

                    {{-- Hiển thị thông báo thành công --}}
                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    {{-- Hiển thị thông báo lỗi --}}
                    @if (session('error'))
                        <div class="alert alert-error">
                            {{ session('error') }}
                        </div>
                    @endif

                    <form id="loginForm" action="{{ route('login') }}" method="POST">
                        @csrf

                        <div class="login-form-group">
                            <label for="email" class="login-form-label">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                Email
                            </label>
                            <input type="email" name="email"
                                class="login-form-control @error('email') is-invalid @enderror" id="email"
                                placeholder="Nhập email của bạn" value="{{ old('email') }}" required>
                            @error('email')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="login-form-group">
                            <label for="password" class="login-form-label">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10 C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1 s3.1,1.39,3.1,3.1V8z" />
                                </svg>
                                Mật khẩu
                            </label>
                            <div class="login-password-field">
                                <input type="password" name="password"
                                    class="login-form-control @error('password') is-invalid @enderror" id="password"
                                    placeholder="Nhập mật khẩu" required>
                                <button type="button" class="login-password-toggle" onclick="togglePassword()">
                                    <svg id="passwordIcon" viewBox="0 0 24 24">
                                        <path
                                            d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                    </svg>
                                </button>
                            </div>
                            @error('password')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        {{-- Checkbox Remember Me --}}
                        <div class="login-form-group">
                            <label class="login-form-label">
                                <input type="checkbox" name="remember" value="1"
                                    {{ old('remember') ? 'checked' : '' }}>
                                Ghi nhớ đăng nhập
                            </label>
                        </div>

                        <div class="login-form-group">
                            <button type="submit" class="login-btn login-btn-primary" id="loginBtn">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                                </svg>
                                Đăng nhập
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </div>
@endsection

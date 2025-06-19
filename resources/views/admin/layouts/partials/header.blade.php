<div class="container-fluid">
    <div class="navbar-header">
        <div class="d-flex align-items-center">
            <!-- Menu Toggle Button -->
            <div class="topbar-item">
                <button type="button" class="button-toggle-menu me-2">
                    <iconify-icon icon="solar:hamburger-menu-broken" class="fs-24 align-middle"></iconify-icon>
                </button>
            </div>

            <!-- Menu Toggle Button -->
            <div class="topbar-item">
                <h4 class="fw-bold topbar-button pe-none text-uppercase mb-0">Welcome!</h4>
            </div>
        </div>

        <div class="d-flex align-items-center gap-1">

            <!-- Theme Color (Light/Dark) -->
            <div class="topbar-item">
                <button type="button" class="topbar-button" id="light-dark-mode">
                    <iconify-icon icon="solar:moon-bold-duotone" class="fs-24 align-middle"></iconify-icon>
                </button>
            </div>

            <!-- Notification -->
            <div class="dropdown topbar-item">
                <button type="button" class="topbar-button position-relative" id="page-header-notifications-dropdown"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <iconify-icon icon="solar:bell-bing-bold-duotone" class="fs-24 align-middle"></iconify-icon>
                    <span
                        class="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">3<span
                            class="visually-hidden">unread messages</span></span>
                </button>
                <div class="dropdown-menu py-0 dropdown-lg dropdown-menu-end"
                    aria-labelledby="page-header-notifications-dropdown">
                    <div class="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="m-0 fs-16 fw-semibold"> Notifications</h6>
                            </div>
                            <div class="col-auto">
                                <a href="javascript: void(0);" class="text-dark text-decoration-underline">
                                    <small>Clear All</small>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div data-simplebar style="max-height: 280px;">
                        <!-- Item -->
                        <a href="javascript:void(0);" class="dropdown-item py-3 border-bottom text-wrap">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <img src="assets/images/users/avatar-1.jpg"
                                        class="img-fluid me-2 avatar-sm rounded-circle" alt="avatar-1" />
                                </div>
                                <div class="flex-grow-1">
                                    <p class="mb-0"><span class="fw-medium">Josephine Thompson
                                        </span>commented on admin panel <span>" Wow 😍! this
                                            admin looks good and awesome design"</span></p>
                                </div>
                            </div>
                        </a>
                        <!-- Item -->
                        <a href="javascript:void(0);" class="dropdown-item py-3 border-bottom">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <div class="avatar-sm me-2">
                                        <span class="avatar-title bg-soft-info text-info fs-20 rounded-circle">
                                            D
                                        </span>
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <p class="mb-0 fw-semibold">Donoghue Susan</p>
                                    <p class="mb-0 text-wrap">
                                        Hi, How are you? What about our next meeting
                                    </p>
                                </div>
                            </div>
                        </a>
                        <!-- Item -->
                        <a href="javascript:void(0);" class="dropdown-item py-3 border-bottom">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <img src="assets/images/users/avatar-3.jpg"
                                        class="img-fluid me-2 avatar-sm rounded-circle" alt="avatar-3" />
                                </div>
                                <div class="flex-grow-1">
                                    <p class="mb-0 fw-semibold">Jacob Gines</p>
                                    <p class="mb-0 text-wrap">Answered to your comment on the
                                        cash flow forecast's graph 🔔.</p>
                                </div>
                            </div>
                        </a>
                        <!-- Item -->
                        <a href="javascript:void(0);" class="dropdown-item py-3 border-bottom">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <div class="avatar-sm me-2">
                                        <span class="avatar-title bg-soft-warning text-warning fs-20 rounded-circle">
                                            <iconify-icon icon="iconamoon:comment-dots-duotone"></iconify-icon>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <p class="mb-0 fw-semibold text-wrap">You have received
                                        <b>20</b> new messages in the
                                        conversation
                                    </p>
                                </div>
                            </div>
                        </a>
                        <!-- Item -->
                        <a href="javascript:void(0);" class="dropdown-item py-3 border-bottom">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <img src="assets/images/users/avatar-5.jpg"
                                        class="img-fluid me-2 avatar-sm rounded-circle" alt="avatar-5" />
                                </div>
                                <div class="flex-grow-1">
                                    <p class="mb-0 fw-semibold">Shawn Bunch</p>
                                    <p class="mb-0 text-wrap">
                                        Commented on Admin
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="text-center py-3">
                        <a href="javascript:void(0);" class="btn btn-primary btn-sm">View All
                            Notification <i class="bx bx-right-arrow-alt ms-1"></i></a>
                    </div>
                </div>
            </div>

            <!-- Theme Setting -->
            <div class="topbar-item d-none d-md-flex">
                <button type="button" class="topbar-button" id="theme-settings-btn" data-bs-toggle="offcanvas"
                    data-bs-target="#theme-settings-offcanvas" aria-controls="theme-settings-offcanvas">
                    <iconify-icon icon="solar:settings-bold-duotone" class="fs-24 align-middle"></iconify-icon>
                </button>
            </div>

            <!-- Activity -->
            <div class="topbar-item d-none d-md-flex">
                <button type="button" class="topbar-button" id="theme-settings-btn" data-bs-toggle="offcanvas"
                    data-bs-target="#theme-activity-offcanvas" aria-controls="theme-settings-offcanvas">
                    <iconify-icon icon="solar:clock-circle-bold-duotone" class="fs-24 align-middle"></iconify-icon>
                </button>
            </div>

            <!-- User -->
            <div class="dropdown topbar-item">
                <a type="button" class="topbar-button" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="d-flex align-items-center">
                        @if (auth()->user()->image && file_exists(public_path('storage/' . auth()->user()->image)))
                            <img class="rounded-circle" width="32" height="32"
                                src="{{ asset('storage/' . auth()->user()->image) }}" alt="{{ auth()->user()->name }}"
                                style="object-fit: cover;">
                        @else
                            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                                style="width: 32px; height: 32px;">
                                <span class="text-white fw-bold fs-14">
                                    {{ strtoupper(substr(auth()->user()->name, 0, 2)) }}
                                </span>
                            </div>
                        @endif
                    </span>
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                    <!-- User Info Header -->
                    <div class="dropdown-header py-3">
                        <div class="d-flex align-items-center">
                            @if (auth()->user()->image && file_exists(public_path('storage/' . auth()->user()->image)))
                                <img class="rounded-circle me-2" width="40" height="40"
                                    src="{{ asset('storage/' . auth()->user()->image) }}"
                                    alt="{{ auth()->user()->name }}" style="object-fit: cover;">
                            @else
                                <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                                    style="width: 40px; height: 40px;">
                                    <span class="text-white fw-bold">
                                        {{ strtoupper(substr(auth()->user()->name, 0, 2)) }}
                                    </span>
                                </div>
                            @endif
                            <div>
                                <h6 class="mb-0">{{ auth()->user()->name }}</h6>
                                <small class="text-muted">{{ auth()->user()->email }}</small>
                                <br>
                                <span class="badge bg-{{ auth()->user()->isAdmin() ? 'danger' : 'info' }} badge-sm">
                                    {{ auth()->user()->getRoleName() }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="dropdown-divider"></div>

                    <!-- Profile Menu -->
                    <a class="dropdown-item" href="{{ route('user_detail', auth()->id()) }}">
                        <iconify-icon icon="solar:user-circle-broken"
                            class="text-muted fs-18 align-middle me-2"></iconify-icon>
                        <span class="align-middle">Thông tin cá nhân</span>
                    </a>

                    <a class="dropdown-item" href="{{ route('user_edit', auth()->id()) }}">
                        <iconify-icon icon="solar:settings-broken"
                            class="text-muted fs-18 align-middle me-2"></iconify-icon>
                        <span class="align-middle">Chỉnh sửa tài khoản</span>
                    </a>

                    @if (auth()->user()->isAdmin())
                        <div class="dropdown-divider"></div>
                        <h6 class="dropdown-header">Quản trị</h6>

                        <a class="dropdown-item" href="{{ route('user-list') }}">
                            <iconify-icon icon="solar:users-group-rounded-broken"
                                class="text-muted fs-18 align-middle me-2"></iconify-icon>
                            <span class="align-middle">Quản lý Users</span>
                        </a>

                        <a class="dropdown-item" href="{{ route('dashboard') }}">
                            <iconify-icon icon="solar:chart-2-broken"
                                class="text-muted fs-18 align-middle me-2"></iconify-icon>
                            <span class="align-middle">Dashboard</span>
                        </a>
                    @endif

                    <div class="dropdown-divider"></div>

                    <!-- Security Menu -->
                    <a class="dropdown-item" href="#" onclick="changePassword()">
                        <iconify-icon icon="solar:lock-keyhole-broken"
                            class="text-muted fs-18 align-middle me-2"></iconify-icon>
                        <span class="align-middle">Đổi mật khẩu</span>
                    </a>

                    <div class="dropdown-divider"></div>

                    <!-- Logout -->
                    <a class="dropdown-item text-danger" href="#"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <iconify-icon icon="solar:logout-2-broken" class="fs-18 align-middle me-2"></iconify-icon>
                        <span class="align-middle">Đăng xuất</span>
                    </a>

                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>
            </div>

            <!-- App Search-->
            <form class="app-search d-none d-md-block ms-2">
                <div class="position-relative">
                    <input type="search" class="form-control" placeholder="Search..." autocomplete="off"
                        value="">
                    <iconify-icon icon="solar:magnifer-linear" class="search-widget-icon"></iconify-icon>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
function changePassword() {
    // Redirect to edit page với focus vào password field
    window.location.href = '{{ route("user_edit", auth()->id()) }}?tab=password';
}
</script>

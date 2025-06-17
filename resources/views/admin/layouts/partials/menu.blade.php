 <!-- Sidebar Logo -->
 <div class="logo-box">
     <a href="{{ route('home') }}" class="logo-dark">
         <img src="{{ \App\Models\Logo::getByType('small') }}" class="logo-sm" alt="logo sm">
         <img src="{{ \App\Models\Logo::getByType('dark') }}" class="logo-lg" alt="logo dark">
     </a>
     <a href="{{ route('home') }}" class="logo-light">
         <img src="{{ \App\Models\Logo::getByType('small') }}" class="logo-sm" alt="logo sm">
         <img src="{{ \App\Models\Logo::getByType('light') }}" class="logo-lg" alt="logo light">
     </a>
 </div>

 <!-- Menu Toggle Button (sm-hover) -->
 <button type="button" class="button-sm-hover" aria-label="Show Full Sidebar">
     <iconify-icon icon="solar:double-alt-arrow-right-bold-duotone" class="button-sm-hover-icon"></iconify-icon>
 </button>

 <div class="scrollbar" data-simplebar>
     <ul class="navbar-nav" id="navbar-nav">

         <li class="menu-title">Tổng quan</li>

         <li class="nav-item">
             <a class="nav-link" href="{{ route('dashboard') }}">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Dashboard </span>
             </a>
         </li>
         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarCategory" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarCategory">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:clipboard-list-bold-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Danh mục </span>
             </a>
             <div class="collapse" id="sidebarCategory">
                 <ul class="nav sub-navbar-nav">
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('category-list') }}">Danh sách</a>
                     </li>
                     {{-- <li class="sub-nav-item">
                                    <a class="sub-nav-link" href="category-edit.html">Edit</a>
                                </li> --}}
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('category-create') }}">Thêm danh mục</a>
                     </li>
                 </ul>
             </div>
         </li>
         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarInventory" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarInventory">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:box-bold-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Logo </span>
             </a>
             <div class="collapse" id="sidebarInventory">
                 <ul class="nav sub-navbar-nav">

                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('logo-list') }}">Danh sách</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('logo-create') }}">Thêm danh sách</a>
                     </li>
                 </ul>
             </div>
         </li>
         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarOrders" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarOrders">
                 <span class="nav-icon">
                     <iconify-icon icon="fluent:flag-20-filled"></iconify-icon>
                 </span>
                 <span class="nav-text"> Banner </span>
             </a>
             <div class="collapse" id="sidebarOrders">
                 <ul class="nav sub-navbar-nav">

                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('banner-list') }}">Danh sách</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('banner-create') }}">Thêm banner</a>
                     </li>
                     {{-- <li class="sub-nav-item">
                         <a class="sub-nav-link" href="order-detail.html">Details</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="order-cart.html">Cart</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="order-checkout.html">Check Out</a>
                     </li> --}}
                 </ul>
             </div>
         </li>

         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarProducts" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarProducts">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:t-shirt-bold-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Sản phẩm </span>
             </a>
             <div class="collapse" id="sidebarProducts">
                 <ul class="nav sub-navbar-nav">
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="product-list.html">List</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="product-grid.html">Grid</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="product-details.html">Details</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="product-edit.html">Edit</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="product-add.html">Create</a>
                     </li>
                 </ul>
             </div>
         </li>

         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarBrands" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarBrands">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:crown-line-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Thương hiệu hợp tác </span>
             </a>
             <div class="collapse" id="sidebarBrands">
                 <ul class="nav sub-navbar-nav">
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('brand-list') }}">Danh sách</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('brand-create') }}">Thêm</a>
                     </li>
                 </ul>
             </div>
         </li>
         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarBanners" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarBanners">
                 <span class="nav-icon">
                     <iconify-icon icon="material-symbols:slideshow-outline"></iconify-icon>

                 </span>
                 <span class="nav-text"> Banner footer </span>
             </a>
             <div class="collapse" id="sidebarBanners">
                 <ul class="nav sub-navbar-nav">
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('bannerfooters.index') }}">Danh sách</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('bannerfooters.create') }}">Thêm mới</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('banners.api') }}">API Banners</a>
                     </li>
                 </ul>
             </div>
         </li>

         <!-- Menu Blog -->
         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarBlog" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarBlog">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:document-bold-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Tin tức </span>
             </a>
             <div class="collapse" id="sidebarBlog">
                 <ul class="nav sub-navbar-nav">
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('cate_blog.index') }}">Danh mục tin tức</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('admin.tags.index') }}">Tags</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('admin.posts.index') }}">Bài viết</a>
                     </li>
                 </ul>
             </div>
         </li>

         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarCategorySolution" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarCategorySolution">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:lightbulb-bolt-bold-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Giải pháp </span>
             </a>
             <div class="collapse" id="sidebarCategorySolution">
                 <ul class="nav sub-navbar-nav">
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('category-solution-list') }}">Danh sách</a>
                     </li>
                     <li class="sub-nav-item">
                         <a class="sub-nav-link" href="{{ route('category-solution-create') }}">Thêm</a>
                     </li>
                 </ul>
             </div>
         </li>

         <li class="menu-title mt-2">Users</li>

         <li class="nav-item">
             <a class="nav-link" href="pages-profile.html">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:chat-square-like-bold-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Profile </span>
             </a>
         </li>

         <li class="nav-item">
             <a class="nav-link menu-arrow" href="#sidebarRoles" data-bs-toggle="collapse" role="button"
                 aria-expanded="false" aria-controls="sidebarRoles">
                 <span class="nav-icon">
                     <iconify-icon icon="solar:user-speak-rounded-bold-duotone"></iconify-icon>
                 </span>
                 <span class="nav-text"> Roles </span>
             </a>
             <div class="collapse" id="sidebarRoles">
                 <ul class="nav sub-navbar-nav">
                     <ul class="nav sub-navbar-nav">
                         <li class="sub-nav-item">
                             <a class="sub-nav-link" href="role-list.html">List</a>
                         </li>
                         <li class="sub-nav-item">
                             <a class="sub-nav-link" href="role-edit.html">Edit</a>
                         </li>
                         <li class="sub-nav-item">
                             <a class="sub-nav-link" href="role-add.html">Create</a>
                         </li>
                     </ul>
                 </ul>
             </div>
         </li>
     </ul>
 </div>

@extends('client.layouts.master')
@section('content')

    <head>
        <link rel="stylesheet" href="/vintec/product.css" type="text/css">
        <script src="/vintec/product.js" defer></script>
        <!-- Font Awesome CDN v5 -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    </head>

    <script>
        $(function() {
            // move request quote button to the end of nav menu
            $('.navi>li>a[href*="support/request_quote"]').parent('li.panel').insertAfter(
                "#navigation-sub li.panel:last")
        });
    </script>

    <!-- Wrapper with namespace class -->
    <div class="product-catalog">
        <div class="product-catalog-wrapper">
            <div class="pc-container-fluid">
                <!-- Breadcrumb -->
                <div class="pc-breadcrumb-section">
                    <nav aria-label="breadcrumbs" class="pc-breadcrumb-nav">
                        <ul class="pc-breadcrumb-list">
                            <li class="pc-breadcrumb-item">
                                <a href="/" title="Homepage">
                                    <i class="fas fa-home"></i>
                                </a>
                            </li>
                            <li class="pc-breadcrumb-item">
                                <i class="fas fa-chevron-right"></i>
                            </li>
                            <li class="pc-breadcrumb-item active">
                                <span>Product Catalog</span>
                            </li>
                        </ul>
                    </nav>
                </div>

                <!-- Main Content -->

                <div class="row">
                    <!-- Product Grid -->
                    <div class="col-lg-9 col-md-8 col-sm-12">
                        <div class="pc-products-section">
                            <!-- Header Controls -->
                            <div class="pc-products-header">
                                <div class="pc-products-header-left">
                                    <h1 class="pc-page-title">Product Catalog</h1>
                                    <p class="pc-products-count">Showing {{ $products->count() }} of
                                        {{ $products->total() }} products</p>
                                </div>
                                <div class="pc-products-header-right">
                                    <div class="pc-view-toggle">
                                        <button class="pc-view-btn active" data-view="grid">
                                            <i class="fas fa-th"></i>
                                        </button>
                                        <button class="pc-view-btn" data-view="list">
                                            <i class="fas fa-list"></i>
                                        </button>
                                    </div>
                                    <div class="pc-sort-section">
                                        <select class="pc-sort-select" id="sortSelect">
                                            <option value="name_asc">Name A-Z</option>
                                            <option value="name_desc">Name Z-A</option>
                                            <option value="price_asc">Price: Low to High</option>
                                            <option value="price_desc">Price: High to Low</option>
                                            <option value="newest">Newest First</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Mobile Filter Button -->
                            <div class="pc-mobile-filter-btn d-lg-none">
                                <button class="pc-btn-filter" onclick="toggleMobileFilter()">
                                    <i class="fas fa-filter"></i>
                                    <span>Filters</span>
                                </button>
                            </div>

                            <!-- Products Grid -->
                            <div class="pc-products-grid" id="productsGrid">
                                @forelse($products as $product)
                                    <div class="pc-product-card" data-category="{{ $product->category->slug ?? '' }}"
                                        data-price="{{ $product->price }}"
                                        data-colors="{{ $product->variants->pluck('color')->implode(',') }}">
                                        <div class="pc-product-image">
                                            @if ($product->image)
                                                <img src="{{ asset('storage/products/' . $product->image) }}"
                                                    alt="{{ $product->name }}" />
                                            @else
                                                <img src="/images/default-product.jpg" alt="{{ $product->name }}" />
                                            @endif
                                            <div class="pc-product-overlay">
                                                <button class="pc-btn-quick-view"
                                                    onclick="quickView('{{ $product->id }}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="pc-btn-wishlist"
                                                    onclick="addToWishlist('{{ $product->id }}')">
                                                    <i class="far fa-heart"></i>
                                                </button>
                                            </div>
                                            @if ($product->is_new)
                                                <span class="pc-product-badge new">New</span>
                                            @elseif($product->discount > 0)
                                                <span class="pc-product-badge sale">Sale</span>
                                            @endif
                                        </div>

                                        <div class="pc-product-info">
                                            @if ($product->category)
                                                <div class="pc-product-category">{{ $product->category->name }}</div>
                                            @endif

                                            <h3 class="pc-product-title">
                                                <a
                                                    href="{{ route('products.show', $product->slug) }}">{{ $product->name }}</a>
                                            </h3>

                                            <div class="pc-product-code">SKU: {{ $product->product_code }}</div>

                                            @if ($product->price > 0)
                                                <div class="pc-product-price">
                                                    @if ($product->discount > 0)
                                                        <span
                                                            class="pc-price-original">{{ number_format($product->price, 0, ',', '.') }}₫</span>
                                                        <span
                                                            class="pc-price-sale">{{ number_format($product->price - ($product->price * $product->discount) / 100, 0, ',', '.') }}₫</span>
                                                    @else
                                                        <span
                                                            class="pc-price-current">{{ number_format($product->price, 0, ',', '.') }}₫</span>
                                                    @endif
                                                </div>
                                            @endif

                                            @if ($product->description)
                                                <p class="pc-product-description">
                                                    {{ Str::limit($product->description, 75) }}
                                                </p>
                                            @endif

                                            @if ($product->variants && $product->variants->count() > 0)
                                                <div class="pc-product-colors">
                                                    <span class="pc-colors-label">Màu sắc:</span>
                                                    <div class="pc-color-swatches">
                                                        @foreach ($product->variants->take(5) as $variant)
                                                            <span class="pc-color-swatch"
                                                                style="background-color: {{ $variant->color_code ?? '#ccc' }}"
                                                                title="{{ $variant->name }} - {{ number_format($variant->price, 0, ',', '.') }}₫">
                                                            </span>
                                                        @endforeach
                                                        @if ($product->variants->count() > 5)
                                                            <span
                                                                class="pc-color-more">+{{ $product->variants->count() - 5 }}</span>
                                                        @endif
                                                    </div>
                                                </div>
                                            @endif



                                            <div class="pc-product-actions">
                                                <a href="{{ route('products.show', $product->slug) }}"
                                                    class="pc-btn-cart">Chi tiết</a>
                                            </div>
                                        </div>
                                    </div>
                                @empty
                                    <div class="pc-no-products">
                                        <div class="pc-no-products-icon">
                                            <i class="fas fa-search"></i>
                                        </div>
                                        <h3>No products found</h3>
                                        <p>Try adjusting your filters or search terms</p>
                                        <button class="pc-btn-clear-filters" onclick="clearAllFilters()">Clear All
                                            Filters</button>
                                    </div>
                                @endforelse
                            </div>

                            <!-- Pagination -->
                            @if ($products->hasPages())
                                <div class="pc-pagination-wrapper">
                                    {{ $products->links() }}
                                </div>
                            @endif
                        </div>
                    </div>

                    <!-- Right Sidebar -->
                    <div class="col-lg-3 col-md-4 col-sm-12">
                        <div class="pc-sidebar" id="productSidebar">
                            <div class="pc-sidebar-header">
                                <h3>Filters</h3>
                                <button class="pc-btn-clear-all" onclick="clearAllFilters()">Clear All</button>
                            </div>

                            <!-- Category Filter -->
                            <div class="pc-filter-section">
                                <h4 class="pc-filter-title">
                                    <i class="fas fa-tags"></i>
                                    Categories
                                </h4>
                                <div class="pc-filter-content">
                                    @foreach ($categories as $category)
                                        <div class="pc-filter-item">
                                            <input type="checkbox" id="category_{{ $category->slug }}"
                                                class="pc-filter-checkbox" data-filter="category"
                                                data-value="{{ $category->slug }}">
                                            <label for="category_{{ $category->slug }}">
                                                {{ $category->name }}
                                                <span class="pc-item-count">({{ $category->products_count ?? 0 }})</span>
                                            </label>
                                        </div>
                                    @endforeach
                                </div>
                            </div>

                            <!-- Price Range Filter -->
                            <div class="pc-filter-section">
                                <h4 class="pc-filter-title">
                                    <i class="fas fa-coins"></i>
                                    Khoảng giá
                                </h4>
                                <div class="pc-filter-content">
                                    <style>
                                        .pc-price-slider {
                                            position: relative;
                                            width: 100%;
                                            padding: 20px 10px;
                                            background: #f9f9f9;
                                            border-radius: 10px;
                                        }

                                        .pc-slider {
                                            -webkit-appearance: none;
                                            width: 100%;
                                            height: 6px;
                                            background: #ddd;
                                            border-radius: 5px;
                                            outline: none;
                                            margin: 10px 0;
                                            position: relative;
                                            z-index: 2;
                                        }

                                        .pc-slider::-webkit-slider-thumb {
                                            -webkit-appearance: none;
                                            appearance: none;
                                            width: 16px;
                                            height: 16px;
                                            background: var(--primary-color, #007bff);
                                            border-radius: 50%;
                                            cursor: pointer;
                                            border: 2px solid #fff;
                                            box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
                                            transition: background 0.3s ease;
                                        }

                                        .pc-slider::-moz-range-thumb {
                                            width: 16px;
                                            height: 16px;
                                            background: var(--primary-color, #007bff);
                                            border: none;
                                            border-radius: 50%;
                                            cursor: pointer;
                                        }

                                        .pc-price-values {
                                            display: flex;
                                            justify-content: space-between;
                                            font-size: 14px;
                                            font-weight: 600;
                                            color: #333;
                                            margin-top: 5px;
                                        }
                                    </style>
                                    <div class="pc-price-slider">
                                        <input type="range" id="priceMin" min="0" max="20000000"
                                            step="100000" value="0" class="pc-slider">
                                        <input type="range" id="priceMax" min="0" max="20000000"
                                            step="100000" value="20000000" class="pc-slider">
                                        <div class="pc-price-values">
                                            <span><span id="minPrice">0₫</span></span>
                                            <span><span id="maxPrice">20tr₫</span></span>
                                        </div>
                                    </div>
                                    <div class="pc-price-presets">
                                        <div class="pc-filter-item">
                                            <input type="checkbox" id="price_under_1m" class="pc-filter-checkbox"
                                                data-filter="price" data-value="0-1000000">
                                            <label for="price_under_1m">Dưới 1 triệu₫</label>
                                        </div>
                                        <div class="pc-filter-item">
                                            <input type="checkbox" id="price_1m_5m" class="pc-filter-checkbox"
                                                data-filter="price" data-value="1000000-5000000">
                                            <label for="price_1m_5m">1 - 5 triệu₫</label>
                                        </div>
                                        <div class="pc-filter-item">
                                            <input type="checkbox" id="price_5m_10m" class="pc-filter-checkbox"
                                                data-filter="price" data-value="5000000-10000000">
                                            <label for="price_5m_10m">5 - 10 triệu₫</label>
                                        </div>
                                        <div class="pc-filter-item">
                                            <input type="checkbox" id="price_10m_20m" class="pc-filter-checkbox"
                                                data-filter="price" data-value="10000000-20000000">
                                            <label for="price_10m_20m">10 - 20 triệu₫</label>
                                        </div>
                                        <div class="pc-filter-item">
                                            <input type="checkbox" id="price_over_20m" class="pc-filter-checkbox"
                                                data-filter="price" data-value="20000000-999999999">
                                            <label for="price_over_20m">Trên 20 triệu₫</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <style>
                                .pc-search-input {
                                    width: 100%;
                                    padding: 10px 14px;
                                    border: 1px solid #ccc;
                                    border-radius: 8px;
                                    font-size: 14px;
                                    outline: none;
                                    transition: border-color 0.3s ease
                                }
                            </style>
                            <!-- Search Section (Optional) -->
                            <div class="pc-filter-section">
                                <h4 class="pc-filter-title">
                                    <i class="fas fa-search"></i>
                                    Tìm kiếm
                                </h4>
                                <div class="pc-filter-content">
                                    <input type="text" placeholder="Tìm kiếm sản phẩm..." class="pc-search-input"
                                        value="{{ request('search') }}">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection

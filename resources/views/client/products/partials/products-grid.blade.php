{{-- resources/views/client/products/partials/products-grid.blade.php --}}

@forelse($products as $product)
    <div class="pc-product-card" data-category="{{ $product->category->slug ?? '' }}" data-price="{{ $product->price }}"
        data-colors="{{ $product->variants->pluck('name')->implode(',') }}" data-product-id="{{ $product->id }}">
        <div class="pc-product-image">
            @if ($product->image)
                <img src="{{ asset('storage/products/' . $product->image) }}" alt="{{ $product->name }}" />
            @else
                <img src="/images/default-product.jpg" alt="{{ $product->name }}" />
            @endif
            <div class="pc-product-overlay">
                <button class="pc-btn-quick-view" title="Xem nhanh">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="pc-btn-wishlist" title="Thêm vào yêu thích">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            @if ($product->created_at >= now()->subDays(30))
                <span class="pc-product-badge new">Mới</span>
            @endif
        </div>

        <div class="pc-product-info">
            @if ($product->category)
                <div class="pc-product-category">{{ $product->category->name }}</div>
            @endif

            <h3 class="pc-product-title">
                <a href="{{ route('products.show', $product->slug) }}">{{ $product->name }}</a>
            </h3>

            <div class="pc-product-code">SKU: {{ $product->product_code }}</div>

            @if ($product->price > 0)
                <div class="pc-product-price">
                    @if (isset($product->discount) && $product->discount > 0)
                        <span class="pc-price-original">{{ number_format($product->price, 0, ',', '.') }}₫</span>
                        <span
                            class="pc-price-sale">{{ number_format($product->price - ($product->price * $product->discount) / 100, 0, ',', '.') }}₫</span>
                    @else
                        <span class="pc-price-current">{{ number_format($product->price, 0, ',', '.') }}₫</span>
                    @endif
                </div>
            @endif

            @if ($product->description)
                <p class="pc-product-description">{{ Str::limit($product->description, 75) }}</p>
            @endif

            @if ($product->variants && $product->variants->count() > 0)
                <div class="pc-product-colors">
                    <span class="pc-colors-label">Biến thể:</span>
                    <div class="pc-color-swatches">
                        @foreach ($product->variants->take(5) as $variant)
                            <span class="pc-color-swatch"
                                style="background-color: {{ $variant->color_code ?? '#ccc' }}"
                                title="{{ $variant->name }} - {{ number_format($variant->price, 0, ',', '.') }}₫">
                            </span>
                        @endforeach
                        @if ($product->variants->count() > 5)
                            <span class="pc-color-more">+{{ $product->variants->count() - 5 }}</span>
                        @endif
                    </div>
                </div>
            @endif

            <div class="pc-product-actions">
                <a href="{{ route('products.show', $product->slug) }}" class="pc-btn-cart">Chi tiết</a>
            </div>
        </div>
    </div>
@empty
    <div class="pc-no-products">
        <div class="pc-no-products-icon">
            <i class="fas fa-search"></i>
        </div>
        <h3>Không tìm thấy sản phẩm</h3>
        <p>Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
        <style>
            .pc-btn-clear-filters {
                background-color: transparent;
                border: 1px solid #ccc;
                color: #333;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pc-btn-clear-filters:hover {
                background-color: #f5f5f5;
                border-color: #999;
                color: #000;
            }
        </style>
        <button class="pc-btn-clear-filters" onclick="ProductCatalog.clearAllFilters()">Xóa tất cả bộ lọc</button>
    </div>
@endforelse

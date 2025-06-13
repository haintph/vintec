@extends('client.products.layouts.app')
@section('content')
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
        <span class="breadcrumb-item">Trang chủ</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item">Mac</span>
    </nav>

    <!-- Product Container -->
    <div class="product-container">
        <!-- Product Images -->
        <div class="product-images">
            <img src="https://placehold.co/570x570/333/FFF?text=MacBook+Air" alt="MacBook Air 15 inch" class="main-image">

            <div class="image-thumbnails">
                <div class="thumbnail active">
                    <img src="https://placehold.co/97x97/333/FFF?text=1" alt="Thumbnail 1">
                </div>
                <div class="thumbnail">
                    <img src="https://placehold.co/97x97/666/FFF?text=2" alt="Thumbnail 2">
                </div>
                <div class="thumbnail">
                    <img src="https://placehold.co/97x97/999/FFF?text=3" alt="Thumbnail 3">
                </div>
                <div class="thumbnail">
                    <img src="https://placehold.co/97x97/AAA/000?text=4" alt="Thumbnail 4">
                </div>
                <div class="thumbnail">
                    <img src="https://placehold.co/97x97/CCC/000?text=5" alt="Thumbnail 5">
                </div>
            </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
            <h1 class="product-title">MacBook Air 15 inch</h1>

            <div class="product-price">
                <span class="price-amount">22.000.000</span>
                <span class="currency">₫</span>
            </div>

            <div class="product-options">
                <!-- Storage Options
                        <div class="option-group">
                            <div class="option-label">Dung lượng</div>
                            <div class="storage-options">
                                <button class="storage-btn active">512GB</button>
                                <button class="storage-btn">1TB</button>
                            </div>
                        </div> -->

                <!-- Color Options  -->
                <div class="option-group">
                    <div class="option-label">Màu sắc</div>
                    <div class="color-options">
                        <div class="color-option color-black active">
                            <div class="color-circle"></div>
                        </div>
                        <div class="color-option color-white">
                            <div class="color-circle"></div>
                        </div>
                        <div class="color-option color-blue">
                            <div class="color-circle"></div>
                        </div>
                        <div class="color-option color-purple">
                            <div class="color-circle"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <!-- <div class="action-buttons">
                        <button class="btn btn-add-cart">
                            Thêm vào giỏ
                            <div class="btn-subtitle">Giao tận nơi, lắp đặt miễn phí</div>
                        </button>
                        <button class="btn btn-buy-now">
                            Thanh toán ngay
                            <div class="btn-subtitle">Giao tận nơi, lắp đặt miễn phí</div>
                        </button>
                    </div> -->

            <!-- Promotions -->
            <div class="promotions">
                <div class="promotions-header">
                    <h3 class="promotions-title">Khuyến Mại</h3>
                </div>
                <ul class="promotion-list">
                    <li class="promotion-item">Tặng Phiếu mua hàng giảm 10% khi mua Apple Watch SE và Series 7 tại
                        Topzone. (Thời hạn sử dụng 7 ngày – Không áp dụng mua Trả góp) Xem chi tiết</li>
                    <li class="promotion-item">Phụ kiện chính hãng Apple, iPad, MacBook, Apple Watch giảm 8 – 30%
                        khi mua kèm iPhone Xem chi tiết</li>
                    <li class="promotion-item">Giảm giá 50% gói bảo hành mở rộng thêm 1 năm (chính hãng) Xem chi
                        tiết</li>
                    <li class="promotion-item">Giảm đến 1,500,000đ khi tham gia thu cũ đổi mới Xem chi tiết</li>
                    <li class="promotion-item">Giảm 50% giá gói cước 1 năm (Vina350/Vina500) cho Sim VinaPhone trả
                        sau (Trị giá đến 3 triệu) Xem chi tiết</li>
                    <li class="promotion-item">Nhập mã WOMANDAY giảm 5% tối đa 500.000đ cho đơn hàng từ 500.000đ trở
                        lên khi thanh toán qua Ví Moca trên ứng dụng Grab Xem chi tiết</li>
                    <li class="promotion-item">Nhập mã TAOTOPZONE giảm 3% tối đa 500.000đ khi thanh toán quét QRcode
                        qua App của ngân hàng Xem chi tiết</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Description Section -->
    <section class="description-section">
        <div class="description-tab">
            <h2>Mô tả</h2>
        </div>

        <div class="description-content">
            <div class="description-images">
                <img src="https://placehold.co/1170x760/444/FFF?text=MacBook+Air+Features" alt="MacBook Air Features"
                    class="description-image">
                <img src="https://placehold.co/1170x772/555/FFF?text=Performance" alt="Performance"
                    class="description-image">
                <img src="https://placehold.co/1170x497/666/FFF?text=Design" alt="Design" class="description-image">
                <img src="https://placehold.co/1170x842/777/FFF?text=Display" alt="Display" class="description-image">
            </div>

            <div class="description-text">
                <h3>Nội dung tính năng</h3>
                <p>iPhone 13. Hệ thống camera kép tiên tiến nhất từng có trên iPhone. Chip A15 Bionic thần tốc. Bước
                    nhảy vọt về thời lượng pin. Thiết kế bền bỉ. Mạng 5G siêu nhanh. Cùng với màn hình Super Retina
                    XDR sáng hơn.</p>

                <h3>Pháp lý</h3>
                <p>Cần có gói cước dữ liệu. Mạng 5G chỉ khả dụng ở một số thị trường và được cung cấp qua một số nhà
                    mạng. Tốc độ có thể thay đổi tùy địa điểm và nhà mạng. Để biết thông tin về hỗ trợ mạng 5G, vui
                    lòng liên hệ nhà mạng và truy cập apple.com/iphone/cellular.</p>
            </div>
        </div>
    </section>

    <!-- Similar Products -->
    <section class="similar-products">
        <div class="similar-products-header">
            <h2>Sản phẩm tương tự</h2>
        </div>

        <div class="products-grid">
            <div class="product-card">
                <div class="product-card-image">
                    <img src="https://placehold.co/218x218/333/FFF?text=MacBook+Air+15+M3" alt="MacBook Air 15 inch M3">
                </div>
                <div class="product-card-info">
                    <h3 class="product-card-title">MacBook Air 15 inch M3</h3>
                    <p class="product-card-price">22.000.000₫</p>
                </div>
            </div>

            <div class="product-card">
                <div class="product-card-image">
                    <img src="https://placehold.co/218x218/444/FFF?text=MacBook+Air+13" alt="MacBook Air 13 inch">
                </div>
                <div class="product-card-info">
                    <h3 class="product-card-title">MacBook Air 13 inch</h3>
                    <p class="product-card-price">22.000.000₫</p>
                </div>
            </div>

            <div class="product-card">
                <div class="product-card-image">
                    <img src="https://placehold.co/218x218/555/FFF?text=MacBook+Pro+13" alt="MacBook Pro 13 inch">
                </div>
                <div class="product-card-info">
                    <h3 class="product-card-title">MacBook Pro 13 inch</h3>
                    <p class="product-card-price">22.000.000₫</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section">
        <h2 class="reviews-title">Đánh giá MacBook Air 15 inch</h2>

        <div class="reviews-summary">
            <div class="rating-row">
                <span class="rating-number">5</span>
                <span class="rating-star">⭐</span>
                <div class="rating-bar"></div>
                <span class="rating-percentage">0% | 0 đánh giá</span>
            </div>
            <div class="rating-row">
                <span class="rating-number">4</span>
                <span class="rating-star">⭐</span>
                <div class="rating-bar"></div>
                <span class="rating-percentage">0% | 0 đánh giá</span>
            </div>
            <div class="rating-row">
                <span class="rating-number">3</span>
                <span class="rating-star">⭐</span>
                <div class="rating-bar"></div>
                <span class="rating-percentage">0% | 0 đánh giá</span>
            </div>
            <div class="rating-row">
                <span class="rating-number">2</span>
                <span class="rating-star">⭐</span>
                <div class="rating-bar"></div>
                <span class="rating-percentage">0% | 0 đánh giá</span>
            </div>
            <div class="rating-row">
                <span class="rating-number">1</span>
                <span class="rating-star">⭐</span>
                <div class="rating-bar"></div>
                <span class="rating-percentage">0% | 0 đánh giá</span>
            </div>

            <button class="review-btn">Đánh giá ngay</button>
        </div>

        <p class="no-reviews">Chưa có đánh giá nào.</p>
    </section>

    <!-- Comments Section -->
    <section class="comments-section">
        <div class="comment-form">
            <textarea class="comment-textarea" placeholder="Mời bạn tham gia thảo luận, vui lòng nhập tiếng Việt có dấu"></textarea>
            <div class="comment-form-footer">
                <div class="gender-options">
                    <label class="gender-option">
                        <div class="gender-radio active"></div>
                        <span class="gender-label">Anh</span>
                    </label>
                    <label class="gender-option">
                        <div class="gender-radio"></div>
                        <span class="gender-label">Chị</span>
                    </label>
                </div>
                <input type="text" class="form-input" placeholder="Họ tên (bắt buộc)">
                <input type="email" class="form-input" placeholder="Email">
                <button class="submit-btn">Gửi</button>
            </div>
        </div>
        <p class="no-comments">Chưa có bình luận nào</p>
    </section>
@endsection

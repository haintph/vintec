@extends('client.layouts.master')
@section('content')
    <main class="custom-main-content">
      <!-- Hero Banner -->
      <section class="custom-hero-banner">
        <img
          src="https://images.unsplash.com/photo-1551677725-c4b93b06e542?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Giải pháp công nghệ"
        />
        <h1 class="custom-hero-title">GIẢI PHÁP</h1>
      </section>

      <!-- Demo Section -->
      <!-- <section class="custom-demo-section">
        <h2 class="custom-demo-title">Demo Nút Hover Effect</h2>
        <div class="custom-demo-buttons">
          <a href="#" class="custom-btn-more">Xem thêm (Nhỏ)</a>
          <a href="#" class="custom-btn-load-more">Load more (Lớn)</a>
        </div>
      </section> -->

      <!-- Solutions Section -->
      <section class="custom-solutions-container">
        <!-- Solution 1: IP Phone System -->
        <div class="custom-solution-item">
          <div class="custom-solution-image">
            <img
              src="https://placehold.co/540x332"
              alt="Hệ thống tổng đài điện thoại IP"
            />
          </div>
          <div class="custom-solution-content">
            <div class="custom-solution-category">Giải pháp</div>
            <h2 class="custom-solution-title">
              Hệ Thống Tổng Đài Điện Thoại IP
            </h2>
            <p class="custom-solution-description">
              Trong thời đại số hóa, việc lựa chọn một hệ thống giao tiếp hiệu
              quả là yếu tố then chốt quyết định sự thành công của doanh nghiệp.
              Chúng tôi giới thiệu giải pháp tổng thể kết hợp sức mạnh của Tổng
              đài Yeastar và điện thoại IP Fanvil – một bộ đôi hoàn hảo cho môi
              trường làm việc hiện đại.
            </p>
            <a href="#" class="custom-btn-more">Xem thêm</a>
          </div>
        </div>

        <!-- Solution 2: Online Meeting -->
        <div class="custom-solution-item">
          <div class="custom-solution-image">
            <img src="https://placehold.co/540x332" alt="Hội họp trực tuyến" />
          </div>
          <div class="custom-solution-content">
            <div class="custom-solution-category">Giải pháp</div>
            <h2 class="custom-solution-title">Hội Họp Trực Tuyến</h2>
            <p class="custom-solution-description">
              Giải pháp hội họp trực tuyến không chỉ là một công cụ giao tiếp mà
              còn là động lực thúc đẩy sự chuyển đổi số của doanh nghiệp. Bằng
              cách áp dụng giải pháp này, doanh nghiệp của bạn sẽ nâng cao hiệu
              quả làm việc, tối ưu hóa chi phí và tạo ra môi trường làm việc
              linh hoạt, sáng tạo hơn.
            </p>
            <a href="#" class="custom-btn-more">Xem thêm</a>
          </div>
        </div>

        <!-- Solution 3: Public Audio System -->
        <div class="custom-solution-item">
          <div class="custom-solution-image">
            <img
              src="https://placehold.co/540x332"
              alt="Hệ thống âm thanh công cộng"
            />
          </div>
          <div class="custom-solution-content">
            <div class="custom-solution-category">Giải pháp</div>
            <h2 class="custom-solution-title">Hệ Thống Âm Thanh Công Cộng</h2>
            <p class="custom-solution-description">
              Trong thế giới hiện đại, âm thanh chất lượng cao không chỉ là một
              yếu tố làm tăng trải nghiệm mà còn là một công cụ thiết yếu trong
              việc truyền tải thông tin và tạo không khí cho không gian công
              cộng. Fonestar, với bề dày kinh nghiệm và công nghệ tiên tiến,
              mang đến giải pháp hệ thống âm thanh công cộng toàn diện.
            </p>
            <a href="#" class="custom-btn-more">Xem thêm</a>
          </div>
        </div>

        <!-- Solution 4: Nurse Call System -->
        <div class="custom-solution-item">
          <div class="custom-solution-image">
            <img src="https://placehold.co/540x332" alt="Chuông báo gọi y tá" />
          </div>
          <div class="custom-solution-content">
            <div class="custom-solution-category">Giải pháp</div>
            <h2 class="custom-solution-title">Chuông Báo Gọi Y Tá</h2>
            <p class="custom-solution-description">
              Trong môi trường y tế hiện đại, việc đảm bảo phản ứng nhanh chóng
              và hiệu quả đối với nhu cầu của bệnh nhân là yếu tố then chốt
              quyết định chất lượng chăm sóc. Giải pháp Chuông Báo Gọi Y Tá của
              Fanvil đã được thiết kế đặc biệt để đáp ứng nhu cầu này.
            </p>
            <a href="#" class="custom-btn-more">Xem thêm</a>
          </div>
        </div>
      </section>

      <!-- Advantages Section -->
      <section class="custom-advantages-section">
        <div class="custom-advantages-container">
          <div class="custom-advantages-grid">
            <div class="custom-advantage-item">
              <div class="custom-advantage-icon">
                <img
                  src="vintec\themes\site\image\icon-giai-phap-1.png"
                  alt="Giải pháp toàn diện"
                />
              </div>
              <div class="custom-advantage-number">Ưu điểm 1</div>
              <div class="custom-advantage-title">
                Giải pháp toàn diện và hiện đại
              </div>
            </div>
            <div class="custom-advantage-item">
              <div class="custom-advantage-icon">
                <img src="vintec\themes\site\image\icon-giai-phap-2.png" alt="Linh hoạt phù hợp" />
              </div>
              <div class="custom-advantage-number">Ưu điểm 2</div>
              <div class="custom-advantage-title">
                Linh hoạt, phù hợp với mọi nhu cầu
              </div>
            </div>
            <div class="custom-advantage-item">
              <div class="custom-advantage-icon">
                <img
                  src="vintec\themes\site\image\icon-giai-phap-3.png"
                  alt="Hiệu quả tiết kiệm"
                />
              </div>
              <div class="custom-advantage-number">Ưu điểm 3</div>
              <div class="custom-advantage-title">
                Hiệu quả với chi phí tiết kiệm
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Products Section -->
      <section class="custom-products-section">
        <div class="custom-products-grid">
          <div class="custom-product-card">
            <div class="custom-product-image">
              <img src="https://placehold.co/350x197" alt="Alta Labs" />
            </div>
            <div class="custom-product-info">
              <h3 class="custom-product-title">
                ALTA LABS – GIẢI PHÁP MẠNG LÝ TƯỞNG CHO DOANH NGHIỆP HIỆN ĐẠI
              </h3>
            </div>
          </div>

          <div class="custom-product-card">
            <div class="custom-product-image">
              <img src="https://placehold.co/350x197" alt="Loa âm trần" />
            </div>
            <div class="custom-product-info">
              <h3 class="custom-product-title">
                GIẢI PHÁP LOA ÂM TRẦN CHO TRƯỜNG HỌC, PHÒNG HỌC, CHẤT LƯỢNG
              </h3>
            </div>
          </div>

          <div class="custom-product-card">
            <div class="custom-product-image">
              <img
                src="https://placehold.co/350x197"
                alt="Điện thoại IP Fanvil"
              />
            </div>
            <div class="custom-product-info">
              <h3 class="custom-product-title">
                ĐIỆN THOẠI IP FANVIL – GIẢI PHÁP ĐIỆN THOẠI DOANH NGHIỆP TỐT
                NHẤT
              </h3>
            </div>
          </div>

          <div class="custom-product-card">
            <div class="custom-product-image">
              <img
                src="https://placehold.co/350x197"
                alt="Điện thoại khách sạn"
              />
            </div>
            <div class="custom-product-info">
              <h3 class="custom-product-title">
                GIẢI PHÁP ĐIỆN THOẠI KHÁCH SẠN : IP FANVIL DÒNG H
              </h3>
            </div>
          </div>

          <div class="custom-product-card">
            <div class="custom-product-image">
              <img
                src="https://placehold.co/350x197"
                alt="Điện thoại doanh nghiệp nhỏ"
              />
            </div>
            <div class="custom-product-info">
              <h3 class="custom-product-title">
                GIẢI PHÁP ĐIỆN THOẠI CHO DOANH NGHIỆP NHỎ
              </h3>
            </div>
          </div>

          <div class="custom-product-card">
            <div class="custom-product-image">
              <img
                src="https://placehold.co/350x197"
                alt="Tổng đài bệnh viện"
              />
            </div>
            <div class="custom-product-info">
              <h3 class="custom-product-title">
                GIẢI PHÁP TỔNG ĐÀI IP DÀNH CHO BỆNH VIỆN, PHÒNG KHÁM
              </h3>
            </div>
          </div>
        </div>

        <div class="custom-load-more-container">
          <a href="#" class="custom-btn-load-more">Load more</a>
        </div>
      </section>
    </main>
@endsection

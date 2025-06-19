@extends('client.layouts.master')
@section('content')
<head>
    <link  rel="stylesheet" href="/vintec/style10.css" type="text/css">
</head>
    <main class="custom-main-content">
        <!-- Hero Banner -->
        <section class="custom-hero-banner">
            <img src="https://images.unsplash.com/photo-1551677725-c4b93b06e542?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                alt="" />
            <h1 class="custom-hero-title">GIẢI PHÁP</h1>
        </section>
        @if ($featuredSolutions->count() > 0)
            <section class="custom-solutions-container">
                @foreach ($featuredSolutions as $solution)
                    <div class="custom-solution-item">
                        <div class="custom-solution-image">
                            @if ($solution->featured_image)
                                <img src="{{ Storage::url($solution->featured_image) }}" alt="{{ $solution->title }}" />
                            @else
                                <img src="https://placehold.co/540x332" alt="{{ $solution->title }}" />
                            @endif
                        </div>
                        <div class="custom-solution-content">
                            <div class="custom-solution-category">
                                {{ $solution->categorySolution->name ?? 'Giải pháp' }}
                            </div>
                            <h2 class="custom-solution-title" title="{{ $solution->title }}">
                                {{ Str::limit($solution->title, 60, '...') }}
                            </h2>
                            <p class="custom-solution-description" title="{{ $solution->excerpt }}">
                                {{ Str::limit($solution->excerpt, 200, '...') }}
                            </p>
                            <a href="{{ route('solutions.show', $solution->slug) }}" class="custom-btn-more">
                                Xem thêm
                            </a>
                        </div>
                    </div>
                @endforeach
            </section>
        @endif

        <!-- Advantages Section -->
        <section class="custom-advantages-section">
            <div class="custom-advantages-container">
                <div class="custom-advantages-grid">
                    <div class="custom-advantage-item">
                        <div class="custom-advantage-icon">
                            <img src="vintec\themes\site\image\icon-giai-phap-1.png" alt="Giải pháp toàn diện" />
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
                            <img src="vintec\themes\site\image\icon-giai-phap-3.png" alt="Hiệu quả tiết kiệm" />
                        </div>
                        <div class="custom-advantage-number">Ưu điểm 3</div>
                        <div class="custom-advantage-title">
                            Hiệu quả với chi phí tiết kiệm
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="custom-products-section">
            <div class="custom-products-grid" id="solutions-grid">
                @foreach ($publishedSolutions as $index => $solution)
                    <div class="custom-product-card" data-index="{{ $index }}">
                        <a href="{{ route('solutions.show', $solution->slug) }}" class="custom-product-link">
                            <div class="custom-product-image">
                                @if ($solution->featured_image)
                                    <img src="{{ Storage::url($solution->featured_image) }}"
                                        alt="{{ $solution->title }}" />
                                @else
                                    <img src="https://placehold.co/350x197" alt="{{ $solution->title }}" />
                                @endif
                            </div>
                            <div class="custom-product-info">
                                <h3 class="custom-product-title">
                                    {{ $solution->title }}
                                </h3>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>

            <div class="custom-load-more-container">
                <a href="#" class="custom-btn-load-more" id="load-more-btn" data-page="1">Load more</a>
            </div>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const loadMoreBtn = document.getElementById('load-more-btn');
                    const solutionsGrid = document.getElementById('solutions-grid');

                    if (loadMoreBtn) {
                        loadMoreBtn.addEventListener('click', function(e) {
                            e.preventDefault();

                            const page = this.getAttribute('data-page');
                            const btn = this;

                            // Hiển thị loading
                            btn.textContent = 'Đang tải...';
                            btn.style.pointerEvents = 'none';

                            // SỬA URL TẠI ĐÂY
                            fetch(`{{ url('/api/solutions/load-more') }}?page=${page}`)
                                .then(response => {
                                    console.log('Response status:', response.status);
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok');
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    console.log('Data received:', data);

                                    // Thêm HTML mới vào grid
                                    solutionsGrid.insertAdjacentHTML('beforeend', data.html);

                                    if (data.hasMore) {
                                        btn.setAttribute('data-page', data.nextPage);
                                        btn.textContent = 'Load more';
                                        btn.style.pointerEvents = 'auto';
                                    } else {
                                        btn.style.display = 'none';
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    btn.textContent = 'Load more';
                                    btn.style.pointerEvents = 'auto';
                                });
                        });
                    }
                });
            </script>
        </section>
    </main>
@endsection

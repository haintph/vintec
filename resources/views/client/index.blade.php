@extends('client.layouts.master')
@section('content')
    <script>
        $(function() {
            // move request quote button to the end of nav menu
            $('.navi>li>a[href*="support/request_quote"]').parent('li.panel').insertAfter(
                "#navigation-sub li.panel:last")
        });
    </script>

    <h1 class="sr-only">Official VTech Hotel Phones</h1>

    <div class="top-hero-slider">
        <!-- slider -->
        <div class="slider index">
            <div class="regular-slick">
                @forelse($banners as $banner)
                    <div class="item-photo">
                        <a href="#">
                            <img class="img-desktop" src="{{ $banner->image_url }}" alt="{{ $banner->title }}" />
                            <img class="img-mobile" src="{{ $banner->image_url }}" alt="{{ $banner->title }}" />
                        </a>
                        <div class="banner-text hidden-xs">
                            <h2>{{ $banner->title }}</h2>
                            <p>{{ $banner->description }}</p>
                        </div>
                    </div>
                @empty
                    {{-- Fallback: Banner mặc định nếu không có banner nào --}}
                    <div class="item-photo">
                        <a href="/products/search">
                            <img class="img-desktop"
                                src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-hero-banners-v2.png"
                                alt="Search Product" />
                            <img class="img-mobile"
                                src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-hero-banners-v2.png"
                                alt="Search Product" />
                        </a>
                        <div class="banner-text hidden-xs">
                            <h2>OUTFITTING YOUR PROPERTY</h2>
                            <p>From guest room phones to thermostats, administrative solutions for the front desk to
                                mobile employees, we have the solutions you need</p>
                        </div>
                    </div>
                @endforelse
            </div>

            {{-- MOBILE VERSION - Match đúng cấu trúc HTML --}}
            <div class="page_content home-banner visible-xs">
                @if ($banners && $banners->count() > 0)
                    {{-- Banner đầu tiên - active --}}
                    <div class="row banner-item item-0 active">
                        <div class="col-xs-12">
                            <h2>{{ $banners->first()->title }}</h2>
                            <p>{{ $banners->first()->description }}</p>
                        </div>
                    </div>

                    {{-- Banner thứ 2 (nếu có) --}}
                    @if ($banners->count() > 1)
                        <div class="row banner-item item-1">
                            <div class="col-xs-12">
                                <h2>{{ $banners->get(1)->title }}</h2>
                                <p>{{ $banners->get(1)->description }}</p>
                            </div>
                        </div>
                    @else
                        <div class="row banner-item item-1">
                            <div class="col-xs-12">
                                <h2></h2>
                                <p></p>
                            </div>
                        </div>
                    @endif

                    {{-- Banner thứ 3 (nếu có) --}}
                    @if ($banners->count() > 2)
                        <div class="row banner-item item-2">
                            <div class="col-xs-12">
                                <h2>{{ $banners->get(2)->title }}</h2>
                                <p>{{ $banners->get(2)->description }}</p>
                            </div>
                        </div>
                    @else
                        <div class="row banner-item item-2">
                            <div class="col-xs-12">
                                <h2></h2>
                                <p></p>
                            </div>
                        </div>
                    @endif
                @else
                    {{-- Fallback mobile - giống HTML gốc --}}
                    <div class="row banner-item item-0 active">
                        <div class="col-xs-12">
                            <h2>OUTFITTING YOUR PROPERTY</h2>
                            <p>From guest room phones to thermostats, administrative solutions for the front desk to
                                mobile employees, we have the solutions you need</p>
                        </div>
                    </div>
                    <div class="row banner-item item-1">
                        <div class="col-xs-12">
                            <h2></h2>
                            <p></p>
                        </div>
                    </div>
                    <div class="row banner-item item-2">
                        <div class="col-xs-12">
                            <h2></h2>
                            <p></p>
                        </div>
                    </div>
                @endif
            </div>

            <script type="text/javascript">
                $(document).ready(function() {
                    $(".regular-slick").slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        autoplaySpeed: 7000,
                        dots: false,
                        adaptiveHeight: true,
                        instructionsText: 'You can use the previous and next buttons to navigate this carousel.'
                    });

                    $(".regular-slick").on('afterChange', function(event, slick, currentSlide) {
                        $(".home-banner .banner-item").removeClass('active');
                        if ($(".home-banner").find(".item-" + currentSlide)) {
                            $(".home-banner .item-" + currentSlide).first().addClass('active');
                        }
                    });
                });
            </script>
        </div>
        <!-- /.slider -->

        <div class="clear"></div>
    </div>

    <div class="clear"></div>
    <!-- Main Content -->
    <div class="page_content home-box featured-products">
        <div class="row">
            <div class="col-xs-12">
                <div class="section-header">
                    <h2>Products & Sản phẩm</h2>
                </div>
            </div>
            <div class="col-xs-12">
                <ul class="list-post">
                    @foreach ($featuredProducts as $product)
                        <li class="item col-md-3 col-sm-6 col-xs-12">
                            <div class="item-card" role="group" aria-label="product">
                                <div>
                                    <figure class="image">
                                        <img src="{{ $product->image_url }}" alt="{{ $product->name }}" />
                                    </figure>
                                </div>
                                <div class="content col-xs-12">
                                    <h2 class="title">{{ $product->product_code }}</h2>
                                    <p class="desc">{{ $product->name }}</p>
                                    <div class="learn_more_btn_large">
                                        <a href="{{ route('products.show', $product->slug) }}" tabindex="0">
                                            CHI TIẾT<span class="arrow-right-large"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    @endforeach

                    @if ($featuredProducts->isEmpty())
                        <li class="item col-xs-12">
                            <div class="text-center">
                                <p>Không có sản phẩm nào để hiển thị.</p>
                            </div>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="page_content home-box visible-xs">
        <div class="row">
            <div class="col-xs-12">
                <div class="social-chanel">
                    <div class="social-item">
                        <a href="https://www.linkedin.com/showcase/vtech-hospitality" target="_blank" aria-label="Linkedin">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/LI-In-Bug.png"
                                alt="Linkedin" />
                        </a>
                        <span>Follow us on LinkedIn</span>
                    </div>
                    <div class="social-item">
                        <a href="https://www.youtube.com/channel/UC6Dn1i95cvdfUYMikBMq20w?view_as=subscriber"
                            target="_blank" aria-label="YouTube">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/yt_icon_rgb.png"
                                alt="YouTube" />
                        </a>
                        <span>Visit our YouTube channel</span>
                    </div>
                    <div class="social-item">
                        <a href="https://blog.vtechhotelphones.com" target="_blank" aria-label="Blog">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/icon-blog.png"
                                alt="Blog" />
                        </a>
                        <span>Visit Our Blog</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="page_content home-box">
        <div class="row seamless-connectivity-content">
            <div class="content text-left col-xs-12">
                <h2>SEAMLESS CONNECTIVITY</h2>
            </div>
            <div class="content description col-xs-12">
                <span>
                    VTech is at the forefront of a technological revolution, redefining industry norms of the past.
                    From smart-room technology to connectivity that allows clear, crisp communication between staff,
                    administration and within guestrooms, VTech products help streamline service and efficiency.
                </span>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    @if ($featuredSolutions->count() > 0)
        <div class="page_content home-box">
            <ul class="row home-product-banners">
                @foreach ($featuredSolutions as $solution)
                    <li class="col-md-6 col-sm-6">
                        <div class="product-banner" role="group" aria-label="item">
                            <div>
                                <figure class="image">
                                    @if ($solution->featured_image)
                                        <img src="{{ Storage::url($solution->featured_image) }}"
                                            alt="{{ $solution->title }}" />
                                    @else
                                        <img src="//via.placeholder.com/400x300?text=Solution+Image"
                                            alt="{{ $solution->title }}" />
                                    @endif
                                </figure>
                            </div>
                            <div class="content col-xs-12">
                                <h2 class="title" title="{{ $solution->title }}">
                                    {{ strtoupper(Str::limit($solution->title, 45, '...')) }}
                                </h2>
                                <p class="desc" title="{{ $solution->excerpt }}">
                                    {{ Str::limit($solution->excerpt, 120, '...') }}
                                </p>
                                <div class="learn_more_btn_large">
                                    <a href="{{ route('solutions.show', $solution->slug) }}" tabindex="0">
                                        XEM GIẢI PHÁP
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="clearfix"></div>
    <div class="page_content hidden-xs">
        <div class="row keeping-safe">
            <div class="keeping-safe-content">
                <h2>KEEPING EVERYONE SAFE</h2>
                <p class="desc">Cleaning and disinfecting recommendations for VTech Guest Phones</p>
                <div class="learn_more_btn_large">
                    <a href="/cleanhotelphone" tabindex="0">
                        LEARN MORE
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <div class="page_content hidden-xs">
        <div class="row lastest-blog-section">
            <div class="col-xs-12">
                <div class="section-header">
                    <h2>Blog & Tin tức</h2>
                </div>
            </div>
            <div class="col-xs-12 lastest-blog-posts">
                <!-- Blog Section for Index Page - Giữ nguyên structure HTML -->
                <!-- Blog Section for Index Page - Giữ nguyên structure HTML -->
                @if ($latestPosts && $latestPosts->count() > 0)
                    <div class="list-blog-posts">
                        @foreach ($latestPosts as $post)
                            <div class="col-md-4 col-sm-6">
                                <div class="blog-post">
                                    <div>
                                        <figure class="image">
                                            <img src="{{ $post->thumbnail ? asset('storage/' . $post->thumbnail) : asset('images/blog-placeholder.jpg') }}"
                                                alt="{{ $post->title }}" />
                                        </figure>
                                    </div>
                                    <div class="content">
                                        <h2 class="title">{{ $post->title }}</h2>
                                        <p class="time">
                                            {{ $post->published_at ? $post->published_at->format('M d, Y g:i:s A') : $post->created_at->format('M d, Y g:i:s A') }}
                                        </p>
                                        <p class="desc">
                                            {{ $post->excerpt ?? Str::limit(strip_tags($post->content), 200) }}
                                        </p>
                                        <div class="learn_more_btn_large">
                                            <a href="{{ route('blog.show', $post->slug) }}">
                                                LEARN MORE
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif
                <div class="social-chanel">
                    <div class="social-item">
                        <a href="https://www.linkedin.com/showcase/vtech-hospitality" target="_blank" title="Linkedin">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/LI-In-Bug.png"
                                alt="Linkedin" />
                        </a>
                        <span>Follow us on LinkedIn</span>
                    </div>
                    <div class="social-item">
                        <a href="https://www.youtube.com/channel/UC6Dn1i95cvdfUYMikBMq20w?view_as=subscriber"
                            target="_blank" title="YouTube">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/yt_icon_rgb.png"
                                alt="YouTube" />
                        </a>
                        <span>Visit our YouTube channel</span>
                    </div>
                    <div class="social-item">
                        <a href="https://blog.vtechhotelphones.com" target="_blank" title="Blog">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/icon-blog.png"
                                alt="Blog" />
                        </a>
                        <span>Visit Our Blog</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <div class="page_content home-box">
        <div class="row">
            <div class="content col-xs-12 text-left brand-approved">
                <div class="section-header">
                    <h2>Đối tác</h2>
                </div>
            </div>
        </div>
        <div class="row brand-approved-content">
            <div class="col-xs-12 brand-images">
                <ul>
                    @forelse($brands as $brand)
                        <li>
                            @if ($brand->image)
                                <img src="{{ asset('storage/' . $brand->image) }}" alt="{{ $brand->name }}" />
                            @else
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80'%3E%3Crect width='150' height='80' fill='%23f8f9fa'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666'%3E{{ $brand->name }}%3C/text%3E%3C/svg%3E"
                                    alt="{{ $brand->name }}" />
                            @endif
                        </li>
                    @empty
                        <li>
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80'%3E%3Crect width='150' height='80' fill='%23f8f9fa'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666'%3ENo Brands%3C/text%3E%3C/svg%3E"
                                alt="No brands available" />
                        </li>
                    @endforelse
                </ul>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    {{-- Desktop Version --}}
    <div class="regular-slick-2 hidden-xs footer-hotel-photo-slider">
        @foreach ($bannerFooter as $banner)
            <div class="item-photo">
                <img height="300px" class="img-desktop" src="{{ $banner->image_url }}"
                    alt="Banner Footer {{ $loop->iteration }}" />
            </div>
        @endforeach
    </div>

    {{-- Mobile Version --}}
    <div class="page_content regular-slick-4 box-8 visible-xs footer-hotel-photo-slider">
        @foreach ($bannerFooter as $banner)
            <div class="item-photo">
                <img height="300px" class="img-mobile" src="{{ $banner->image_url }}"
                    alt="Banner Footer {{ $loop->iteration }}" />
            </div>
        @endforeach
    </div>
    <div class="clear"></div>
    <!-- /.Main -->
    <style type="text/css">
        @media screen and (max-width: 767px) {
            .page_content.box-search.visible-xs {
                border-bottom: 0;
                margin-bottom: 3px;
            }
        }
    </style>

    <script type="text/javascript">
        $(document).ready(function() {
            $('.mini-banner-1').click(function() {
                window.location = $(this).find("a").attr('href');
            });
            $('.mini-banner-2').click(function() {
                window.location = $(this).find("a").attr('href');
            });
            $('.mini-banner-3').click(function() {
                window.location = $(this).find("a").attr('href');
            });

            $(".post_wrapper .post-item").each(function() {
                var link = $(this).find("a").attr('href');
                $(this).find("img").on("click", function() {
                    window.open(link, "_blank");
                })
            });

            $(".list-post .item .item-card").each(function() {
                var link = $(this).find("a").attr('href');
                $(this).find("img, .title").on("click", function() {
                    window.open(link, "_self");
                })
            });

            $(".top-hero-slider .item-photo").each(function() {
                var link = $(this).find("a").attr('href');
                $(this).find(".banner-text").on("click", function() {
                    window.open(link, "_self");
                })
            })

        });
    </script>
@endsection

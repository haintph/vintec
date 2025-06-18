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
                    <h2>Featured Products</h2>
                </div>
            </div>
            <div class="col-xs-12">
                <ul class="list-post">
                    <li class="item col-md-3 col-sm-6 col-xs-12">
                        <div class="item-card" role="group" aria-label="product">
                            <div>
                                <figure class="image">
                                    <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-featured-3211.jpg"
                                        alt="" />
                                </figure>
                            </div>
                            <div class="content col-xs-12">
                                <h2 class="title">NG-A3211</h2>
                                <p class="desc">Gen 1-Line Analog Corded Phone</p>
                                <div class="learn_more_btn_large">
                                    <a href="https://www.vtechhotelphones.com/pd/4815/NG-A3211-Next-Gen-1-Line-Analog-Corded-Phone"
                                        tabindex="0">
                                        LEARN MORE<span class="arrow-right-large"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="item col-md-3 col-sm-6 col-xs-12">
                        <div class="item-card" role="group" aria-label="product">
                            <div>
                                <figure class="image">
                                    <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-featured-s2116.jpg"
                                        alt="" />
                                </figure>
                            </div>
                            <div class="content col-xs-12">
                                <h3 class="title">CTM-S2116</h3>
                                <p class="desc">Next Gen 1-Line SIP Cordless Phone</p>
                                <div class="learn_more_btn_large">
                                    <a href="https://www.vtechhotelphones.com/pd/4841/CTM-S2116-Next-Gen-1-Line-SIP-Cordless-Phone"
                                        tabindex="0">
                                        LEARN MORE<span class="arrow-right-large"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="item col-md-3 col-sm-6 col-xs-12">
                        <div class="item-card" role="group" aria-label="product">
                            <div>
                                <figure class="image">
                                    <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-featured-thermostat.jpg"
                                        alt="" />
                                </figure>
                            </div>
                            <div class="content col-xs-12">
                                <div class="box-relative">
                                    <h3 class="title">E-SMART W960</h3>
                                    <p class="desc">Wireless Thermostat</p>
                                    <div class="learn_more_btn_large">
                                        <a href="https://www.vtechhotelphones.com/pd/4677/E-SMART-W960-Wireless-Thermostat"
                                            tabindex="0">
                                            LEARN MORE<span class="arrow-right-large"></span>
                                        </a>
                                    </div>
                                    <img class="green-sustainability-icon"
                                        src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/green-sustainability-icon.png"
                                        alt="" />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="item col-md-3 col-sm-6 col-xs-12">
                        <div class="item-card" role="group" aria-label="product">
                            <div>
                                <figure class="image">
                                    <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-featured-d785.jpg"
                                        alt="" />
                                </figure>
                            </div>
                            <div class="content col-xs-12">
                                <h3 class="title">D785 Desk Phone</h3>
                                <p class="desc">Administrative Solution</p>
                                <div class="learn_more_btn_large">
                                    <a href="https://www.snomamericas.com/en/pd/ip-phones/desk-phones/d7xx-series-next-gen/d785"
                                        tabindex="0">
                                        LEARN MORE<span class="arrow-right-large"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
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
                        <a href="https://www.linkedin.com/showcase/vtech-hospitality" target="_blank"
                            aria-label="Linkedin">
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
    <div class="page_content home-box">
        <ul class="row home-product-banners">
            <li class="col-md-6 col-sm-6">
                <div class="product-banner" role="group" aria-label="item">
                    <div>
                        <figure class="image">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-product-banners-vertical-analog.jpg"
                                alt="" />
                        </figure>
                    </div>
                    <div class="content col-xs-12">
                        <h2 class="title">ANALOG GUEST ROOM PHONES</h2>
                        <p class="desc">VTech Analog phones are Energy Star® certified, leading to direct energy
                            and
                            cost savings</p>
                        <div class="learn_more_btn_large">
                            <a href="/products/search/category/hospitality-analog" tabindex="0">
                                SEE ANALOG PHONES
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            <li class="col-md-6 col-sm-6">
                <div class="product-banner" role="group" aria-label="item">
                    <div>
                        <figure class="image">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-product-banners-vertical.jpg"
                                alt="" />
                        </figure>
                    </div>
                    <div class="content col-xs-12">
                        <h2 class="title">SIP GUEST ROOM PHONES</h2>
                        <p class="desc">VTech Hospitality has the most secure and easy to manage SIP stack in the
                            industry</p>
                        <div class="learn_more_btn_large">
                            <a href="/products/search/category/hospitality-contemporary-sip" tabindex="0">
                                SEE SIP PHONES
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            <li class="col-md-6 col-sm-6">
                <div class="product-banner" role="group" aria-label="item">
                    <div>
                        <figure class="image">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-product-banners-vertical2-v2.jpg"
                                alt="" />
                        </figure>
                    </div>
                    <div class="content col-xs-12 box-relative w-full">
                        <img class="white-sustainability-icon"
                            src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/white-sustainability-icon.png"
                            alt="" />
                        <h2 class="title">E-SMART THERMOSTAT</h2>
                        <p class="desc">The E-Smart W960 is an advanced thermostat that provides guest room
                            comfort
                            while reducing HVAC energy costs</p>
                        <div class="learn_more_btn_large">
                            <a href="/thermostat" tabindex="0">
                                SEE THERMOSTAT
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            <li class="col-md-6 col-sm-6">
                <div class="product-banner" role="group" aria-label="item">
                    <div>
                        <figure class="image">
                            <img src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/homePage/hsp-product-banners-vertical3.jpg"
                                alt="" />
                        </figure>
                    </div>
                    <div class="content col-xs-12">
                        <h2 class="title">ADMINISTRATIVE SOLUTIONS</h2>
                        <p class="desc">Only VTech and Snom can outfit your entire property's communication needs
                        </p>
                        <div class="learn_more_btn_large">
                            <a href="/administrative-solutions" tabindex="0">
                                SEE SOLUTIONS
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
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

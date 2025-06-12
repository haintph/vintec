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
                </div>

                <div class="page_content home-banner visible-xs">
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
                        <h2>LASTEST BLOG POSTS</h2>
                    </div>
                </div>
                <div class="col-xs-12 lastest-blog-posts">
                    <div class="list-blog-posts">
                        <div class="col-md-4 col-sm-6">
                            <div class="blog-post">
                                <div>
                                    <figure class="image">
                                        <img src="https://blog.vtechhotelphones.com/hubfs/switching-thermostats-featured-v2.jpg"
                                            alt="" />
                                    </figure>
                                </div>
                                <div class="content">
                                    <h2 class="title">3 Reasons Hotels Are Switching to VTech Thermostats</h2>
                                    <p class="time">Mar 27, 2025 3:23:34 PM</p>
                                    <p class="desc">


                                        In the hospitality industry, creating a comfortable guest experience is
                                        paramount. One area that’s often overlooked, but has a significant impact, is
                                        the thermostat. Hotels are increasingly switching to VTech thermostats, and it's
                                        easy to see why. Here are three key reasons why hotels are making the switch to
                                        VTech thermostats and reaping the benefits.</p>
                                    <div class="learn_more_btn_large">
                                        <a href="https://blog.vtechhotelphones.com/3-reasons-hotels-are-switching-to-vtech-thermostats"
                                            target="_blank">
                                            LEARN MORE
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="blog-post">
                                <div>
                                    <figure class="image">
                                        <img src="https://blog.vtechhotelphones.com/hubfs/upgrading-phones-featured-3.jpg"
                                            alt="" />
                                    </figure>
                                </div>
                                <div class="content">
                                    <h2 class="title">Why Upgrading Old Hotel Phones is a Smart Move for Your Business
                                    </h2>
                                    <p class="time">Jan 27, 2025 12:26:37 PM</p>
                                    <p class="desc">


                                        As a hotel manager, you know that providing an exceptional guest experience is
                                        key to your success. While much of the focus may be on room design, amenities,
                                        and customer service, one often-overlooked element can make or break a guest's
                                        stay: the in-room phone system. If your hotel is still using outdated phones, it
                                        might be time for an upgrade. Here’s why investing in modern hotel phones is a
                                        decision you won’t regret.</p>
                                    <div class="learn_more_btn_large">
                                        <a href="https://blog.vtechhotelphones.com/why-upgrading-old-hotel-phones-is-a-smart-move-for-your-business"
                                            target="_blank">
                                            LEARN MORE
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="blog-post">
                                <div>
                                    <figure class="image">
                                        <img src="https://blog.vtechhotelphones.com/hubfs/Blogs/Reshaping%20Hospitality%20Industry/hsp-blog-reshaping-hospitality-industry-featured.jpg"
                                            alt="" />
                                    </figure>
                                </div>
                                <div class="content">
                                    <h2 class="title">Using Hotel Room Phones for Upselling Services - Techniques to
                                        Increase Revenue</h2>
                                    <p class="time">Nov 5, 2024 3:51:21 PM</p>
                                    <p class="desc">


                                        In the competitive hospitality industry, maximizing revenue per guest is crucial
                                        for sustainable growth. One effective strategy that hotels can leverage is using
                                        room phones as a tool for upselling services. Beyond their traditional
                                        communication role, hotel room phones can become valuable assets in promoting
                                        additional services and enhancing guest experience.</p>
                                    <div class="learn_more_btn_large">
                                        <a href="https://blog.vtechhotelphones.com/using-hotel-room-phones-for-upselling-services-techniques-to-increase-revenue"
                                            target="_blank">
                                            LEARN MORE
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="social-chanel">
                        <div class="social-item">
                            <a href="https://www.linkedin.com/showcase/vtech-hospitality" target="_blank"
                                title="Linkedin">
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
                        <h2>Brand Approved</h2>
                    </div>
                </div>
            </div>
            <div class="row brand-approved-content">
                <div class="col-xs-12 brand-images">
                    <ul>
                        <li>
                            <img src="https://www.vtechhotelphones.com/themes/site/image/home/brand/brand-approved-ihg.jpg"
                                alt="IHG" />
                        </li>
                        <li>
                            <img src="https://www.vtechhotelphones.com/themes/site/image/home/brand/brand-approved-fairmont.jpg"
                                alt="Fairmont" />
                        </li>
                        <li>
                            <img src="https://www.vtechhotelphones.com/themes/site/image/home/brand/brand-approved-wyndham.jpg"
                                alt="Wyndham" />
                        </li>
                        <li>
                            <img src="https://www.vtechhotelphones.com/themes/site/image/home/brand/brand-approved-marriott.jpg"
                                alt="Marriott" />
                        </li>
                        <li>
                            <img src="https://www.vtechhotelphones.com/themes/site/image/home/brand/brand-approved-hilton.jpg"
                                alt="Hilton" />
                        </li>
                        <li>
                            <img src="https://www.vtechhotelphones.com/themes/site/image/home/brand/brand-approved-hyatt.jpg"
                                alt="Hyatt" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clear"></div>
        <div class="regular-slick-2 hidden-xs footer-hotel-photo-slider ">
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_1.jpg"
                    alt="Seating area with a brick wall painted gray with abstract painting with a gray couch and chair with two smaller tables" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_2.jpg"
                    alt="Interior of an empty restaurant with a lot of natural light, hardwood floors and lightly colored seating" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_3.jpg"
                    alt="Seating area with an oval wooden table and dark brown and tan leather chairs by a large window" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_4.jpg"
                    alt="Bar setting in a high-end hotel with rows of white couches next to floor-to-ceiling windows" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_5.jpg"
                    alt="Close-up of a hotel room bed with light-colored sheets and blankets and nightstand with the light on" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_6.png.jpg"
                    alt="Dark hotel room with a TV on showing a motivational picture" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_7.jpg"
                    alt="Overhead view of a brightly lit coffee shop counter and work areas" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_8.jpg"
                    alt="Hotel room with a view of a city, river, and mountains and laptop on the window ledge" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_9.jpg"
                    alt="Tan façade of a old building with a big metal fork sign and hanging strings of lights" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_10.jpg"
                    alt="Cityscape with a river running down the middle with buildings on both sides and multiple bridges connecting each side of the city" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_11.jpg"
                    alt="View looking out of a room that is on the water with floor to ceiling glass and wooden doors that has mountains and a city in the background" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_12.jpg"
                    alt="Grey and tan chairs and tables in restaurant setting with a brick wall painted white that has hanging plants and light grey flooring" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_13.jpg"
                    alt="Hotel entrance and city street at night" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_14.jpg"
                    alt="Outdoor restaurant seating lined with trees and plants" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_15.jpg"
                    alt="Looking up at a bright neon hotel sign" />
                </a>
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_16.jpg"
                    alt="Two women sitting at a table on their laptops in a lobby, overlooking a city street" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_17.jpg"
                    alt="Well-lit lobby with bookshelves, artwork hanging from the ceiling with rows of stadium style seating" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_18.jpg"
                    alt="Busy palm tree lined city street with high-rise buildings in the background" />
            </div>
            <div class="item-photo">
                <img class="img-desktop"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_19.jpg"
                    alt="Outdoor couch, wooden tables with cups of coffee on them, and a gray hippopotamus chair" />
            </div>
        </div>
        <div class="page_content regular-slick-4 box-8 visible-xs footer-hotel-photo-slider ">
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_1.jpg"
                    alt="Seating area with a brick wall painted gray with abstract painting with a gray couch and chair with two smaller tables" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_2.jpg"
                    alt="Interior of an empty restaurant with a lot of natural light, hardwood floors and lightly colored seating" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_3.jpg"
                    alt="Seating area with an oval wooden table and dark brown and tan leather chairs by a large window" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_4.jpg"
                    alt="Bar setting in a high-end hotel with rows of white couches next to floor-to-ceiling windows" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_5.jpg"
                    alt="Close-up of a hotel room bed with light-colored sheets and blankets and nightstand with the light on" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_6.png.jpg"
                    alt="Dark hotel room with a TV on showing a motivational picture" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_7.jpg"
                    alt="Overhead view of a brightly lit coffee shop counter and work areas" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_8.jpg"
                    alt="Hotel room with a view of a city, river, and mountains and laptop on the window ledge" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_9.jpg"
                    alt="Tan façade of a old building with a big metal fork sign and hanging strings of lights" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_10.jpg"
                    alt="Cityscape with a river running down the middle with buildings on both sides and multiple bridges connecting each side of the city" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_11.jpg"
                    alt="View looking out of a room that is on the water with floor to ceiling glass and wooden doors that has mountains and a city in the background" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_12.jpg"
                    alt="Grey and tan chairs and tables in restaurant setting with a brick wall painted white that has hanging plants and light grey flooring" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_13.jpg"
                    alt="Hotel entrance and city street at night" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_14.jpg"
                    alt="Outdoor restaurant seating lined with trees and plants" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_15.jpg"
                    alt="Looking up at a bright neon hotel sign" />
                </a>
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_16.jpg"
                    alt="Two women sitting at a table on their laptops in a lobby, overlooking a city street" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_17.jpg"
                    alt="Well-lit lobby with bookshelves, artwork hanging from the ceiling with rows of stadium style seating" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_18.jpg"
                    alt="Busy palm tree lined city street with high-rise buildings in the background" />
            </div>
            <div class="item-photo">
                <img class="img-mobile"
                    src="https://www.vtechhotelphones.com/themes/site/image/home/slideshow/slideshow-images_19.jpg"
                    alt="Outdoor couch, wooden tables with cups of coffee on them, and a gray hippopotamus chair" />
            </div>
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
@extends('client.products.layouts.master')
@section('content')
    <script>
        $(function() {
            // move request quote button to the end of nav menu
            $('.navi>li>a[href*="support/request_quote"]').parent('li.panel').insertAfter(
                "#navigation-sub li.panel:last")
        });
    </script>
    <div class="clear"></div>
    <h1 class="sr-only">Analog guest room phones</h1>
    <div class="clear"></div>
    <div class="page_content breadcrumb administrative-solutions visible-xs">
        <nav aria-label="breadcrumbs">
            <ul>
                <li>
                    <a href="/" title="Homepage">
                        <img src="/vintec/themes/site/image/icons_home.png" class="img-home" alt="Homepage" style="width: 20px;" />
                    </a>
                </li>
                <li class="title">
                    <span>Analog guest room phones</span>
                </li>
            </ul>
        </nav>
    </div>


    <div class="container bg-filter visible-xs">
        <div class="navbar-toggle-filter" data-toggle="collapse" data-target="#show-filter">
            <div class="icons-filter">
                <img src="/themes/site/image/icons_filter.png" alt="" style="width: 36px;" />
                <div class="text-filter"> Filter</div>
            </div>
            <span class="icon-bar display-none"></span>
            <span class="icon-bar display-none"></span>
            <span class="icon-bar display-none"></span>
        </div>
    </div>
    <div id="show-filter" class="box-filter visible-xs collapse" aria-expanded="true" style="height: 0px;">
        <div class="row">
            <div class="col-sm-12">
                <div class="product_container">
                    <div id="product_filter-mobile">
                        <div class="product_filter product-filter-mobile">
                            <div class="panel-group" id="accordion-mobile" aria-multiselectable="true">
                                <div role="group" aria-label="Region" class="panel panel-region-mobile">
                                    <fieldset>
                                        <legend class="uppercase">Region</legend>
                                        <div id="pan-region-mobile" data-attribute_code="region" class="checkbox-group">
                                            <div class="checkbox_wrapper">
                                                <input id="filter_region_americas-mobile" class="americas" type="checkbox"
                                                    data-attribute="hospitality-region-americas">
                                                <label for="filter_region_americas-mobile"> Americas</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input id="filter_region_emea-mobile" class="emea" type="checkbox"
                                                    data-attribute="hospitality-region-emea">
                                                <label for="filter_region_emea-mobile"> Emea</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input id="filter_region_abac-mobile" class="abac" type="checkbox"
                                                    data-attribute="hospitality-region-abac">
                                                <label for="filter_region_abac-mobile"> Apac</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div role="group" aria-label="Category" class="panel panel-category-mobile"
                                    style="display:none">
                                    <fieldset>
                                        <legend class="uppercase">Category</legend>
                                        <div id="pan-category-mobile" data-attribute_code="category" class="checkbox-group">
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_category_analog-mobile"
                                                    class="classic-analog" checked data-attribute="hospitality-analog">
                                                <label for="filter_category_analog-mobile">Analog</label>
                                                <div class="clear"></div>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_category_sip-mobile"
                                                    class="contemporary-sip" id="contemporary-sip"
                                                    data-attribute="hospitality-contemporary-sip">
                                                <label for="filter_category_sip-mobile">SIP</label>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div role="group" aria-label="Cord" class="panel panel-cord-mobile">
                                    <fieldset>
                                        <legend class="uppercase">Cord</legend>
                                        <div id="pan-cord-mobile" data-attribute_code="subcategory" class="checkbox-group">
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_cord_corded-mobile" class="corded"
                                                    data-attribute="corded-phones">
                                                <label for="filter_cord_corded-mobile"> Corded</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_cord_cordless-mobile" class="cordless"
                                                    data-attribute="cordless-phones-and-accessories">
                                                <label for="filter_cord_cordless-mobile"> Cordless</label>
                                                <div class="clear"></div>
                                                <div class="sub_category" data-attribute_code="cordless-tech"
                                                    style="display: none">
                                                    <div class="checkbox_wrapper">
                                                        <input type="checkbox" id="filter_cordless_dect-mobile"
                                                            class="dect" data-attribute="hospitality-dect">
                                                        <label for="filter_cordless_dect-mobile"> Dect</label>
                                                    </div>
                                                    <div class="checkbox_wrapper">
                                                        <input type="checkbox" id="filter_cordless_wdct-mobile"
                                                            class="2.4g-wdct" data-attribute="hospitality-2.4g_wdct">
                                                        <label for="filter_cordless_wdct-mobile"> 2.4 wdct</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div role="group" aria-label="Number of lines"
                                    class="panel panel-numberoflines-mobile">
                                    <fieldset>
                                        <legend class="uppercase">Number of lines</legend>
                                        <div id="pan-number_of_lines-mobile" data-attribute_code="number-of-lines"
                                            class="checkbox-group">
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_number_1_line-mobile" class="1-line"
                                                    data-attribute="hospitality-1-line">
                                                <label for="filter_number_1_line-mobile"> 1-Line</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_number_2_line-mobile" class="2-line"
                                                    data-attribute="hospitality-2-line">
                                                <label for="filter_number_2_line-mobile"> 2-Line</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div role="group" aria-label="Color" class="panel panel-color-mobile">
                                    <fieldset>
                                        <legend class="uppercase">Color</legend>
                                        <div id="pan-color-mobile" data-attribute_code="color" class="checkbox-group">
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_colour_ash-mobile" class="ash"
                                                    data-attribute="hospitality-colour-ash">
                                                <label for="filter_colour_ash-mobile"> Ash</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_colour_matte_black-mobile"
                                                    class="matte-black" data-attribute="hospitality-colour-matte-black">
                                                <label for="filter_colour_matte_black-mobile"> Matte Black</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_colour_silver_pearl-mobile"
                                                    class="silver-pearl" data-attribute="hospitality-colour-silver-pearl">
                                                <label for="filter_colour_silver_pearl-mobile"> Silver &
                                                    Pearl</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_colour_silver_black-mobile"
                                                    class="silver-black" data-attribute="hospitality-colour-silver-black">
                                                <label for="filter_colour_silver_black-mobile"> Silver &
                                                    Black</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_colour_gunmetal_black-mobile"
                                                    class="gunmetal-black"
                                                    data-attribute="hospitality-colour-gunmetal-Black">
                                                <label for="filter_colour_gunmetal_black-mobile"> Gunmetal &
                                                    Black</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_colour_pearl_black-mobile"
                                                    class="pearl-black" data-attribute="hospitality-colour-pearl-black">
                                                <label for="filter_colour_pearl_black-mobile"> Pearl & Black</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_colour_champagne_gold_black-mobile"
                                                    class="pearl-black"
                                                    data-attribute="hospitality-colour-champagne-gold-black">
                                                <label for="filter_colour_champagne_gold_black-mobile"> Champagne
                                                    Gold & Black</label>
                                            </div>
                                            <div class="checkbox_wrapper">
                                                <input type="checkbox" id="filter_colour_red_black-mobile"
                                                    class="red-black" data-attribute="hospitality-colour-red-black">
                                                <label for="filter_colour_red_black-mobile"> Red & Black</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <!-- <section class="landingpage_product ">
                <div class="regular-slick">
                    <div class="item-photo">
                        <div class="banner-image">
                            <div class="sr-only" role="heading" aria-level="1">Analog guest room phones</div>
                            <img class="img-desktop"
                                src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/searchResultPage/hsp-lp-banners-analog-guest-room-phones.jpg"
                                alt="Analog guest room phones" />
                            <img class="img-mobile"
                                src="//cdn-web.vtp-media.com/hotelphones/images/theme2023/searchResultPage/hsp-lp-banners-analog-guest-room-phones.jpg"
                                alt="Analog guest room phones" />
                        </div>
                        <div class="banner-content col-xs-12">
                            <h2>
                                Analog guest room phones </h2>
                            <p>VTech Analog cordless phones are Energy Star® certified, leading to direct energy and cost
                                savings. From corded to cordless, classic to contemporary, VTech has a range of feature-rich
                                analog phones perfect for today's modern hotel rooms.<br /><br />VTech's phones are made
                                from antibacterial plastic, which protects both guests and housekeeping staff from germs.
                                We've added an inorganic antibacterial agent to the plastic that uses silver and other ions
                                to prevent the growth and migration of bacteria, mold and fungus.</p>
                        </div>
                    </div>
                </div>
            </section> -->
    <div class="clear"></div>
    <div class="page_content breadcrumb administrative-solutions hidden-xs">
        <nav aria-label="breadcrumbs">
            <ul>
                <li>
                    <a href="/" title="Homepage">
                        <img src="vintec/themes/site/image/icons_home.png" class="img-home" alt="Homepage"
                            style="width: 20px;" />
                    </a>
                </li>
                <li class="title">
                    <span>Analog guest room phones</span>
                </li>
            </ul>
        </nav>
    </div>
    <div class="clear"></div>
    <div class="page_content product_listing">
        <div class="row">
            <div class="col-sm-12">
                <div class="row product_container">
                    <!-- Products Filter -->
                    <div class="col-sm-3 col-xs-12 hidden-xs">
                        <div class="row" id="product_filter" role="region" aria-label="filters">
                            <div class="product_filter product-filter">
                                <div class="panel-group" id="accordion" aria-multiselectable="true">
                                    <div role="group" aria-label="Region" class="panel panel-region">
                                        <fieldset>
                                            <legend class="uppercase">Region</legend>
                                            <div id="pan-region" data-attribute_code="region" class="checkbox-group">
                                                <div class="checkbox_wrapper">
                                                    <input id="filter_region_americas" class="americas" type="checkbox"
                                                        data-attribute="hospitality-region-americas">
                                                    <label for="filter_region_americas"> Americas</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input id="filter_region_emea" class="emea" type="checkbox"
                                                        data-attribute="hospitality-region-emea">
                                                    <label for="filter_region_emea"> Emea</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input id="filter_region_abac" class="abac" type="checkbox"
                                                        data-attribute="hospitality-region-abac">
                                                    <label for="filter_region_abac"> Apac</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div role="group" aria-label="Category" class="panel panel-category"
                                        style="display:none">
                                        <fieldset>
                                            <legend class="uppercase">Category</legend>
                                            <div id="pan-category" data-attribute_code="category" class="checkbox-group">
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_category_analog"
                                                        class="classic-analog" checked
                                                        data-attribute="hospitality-analog">
                                                    <label for="filter_category_analog">Analog</label>
                                                    <div class="clear"></div>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_category_sip"
                                                        class="contemporary-sip" id="contemporary-sip"
                                                        data-attribute="hospitality-contemporary-sip">
                                                    <label for="filter_category_sip">SIP</label>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div role="group" aria-label="Cord" class="panel panel-cord">
                                        <fieldset>
                                            <legend class="uppercase">Cord</legend>
                                            <div id="pan-cord" data-attribute_code="subcategory" class="checkbox-group">
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_cord_corded" class="corded"
                                                        data-attribute="corded-phones">
                                                    <label for="filter_cord_corded"> Corded</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_cord_cordless" class="cordless"
                                                        data-attribute="cordless-phones-and-accessories">
                                                    <label for="filter_cord_cordless"> Cordless</label>
                                                    <div class="clear"></div>
                                                    <div class="sub_category" data-attribute_code="cordless-tech"
                                                        style="display: none">
                                                        <div class="checkbox_wrapper">
                                                            <input type="checkbox" id="filter_cordless_dect"
                                                                class="dect" data-attribute="hospitality-dect">
                                                            <label for="filter_cordless_dect"> Dect</label>
                                                        </div>
                                                        <div class="checkbox_wrapper">
                                                            <input type="checkbox" id="filter_cordless_wdct"
                                                                class="2.4g-wdct" data-attribute="hospitality-2.4g_wdct">
                                                            <label for="filter_cordless_wdct"> 2.4 wdct</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div role="group" aria-label="Number of lines" class="panel panel-numberoflines">
                                        <fieldset>
                                            <legend class="uppercase">Number of lines</legend>
                                            <div id="pan-number_of_lines" data-attribute_code="number-of-lines"
                                                class="checkbox-group">
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_number_1_line" class="1-line"
                                                        data-attribute="hospitality-1-line">
                                                    <label for="filter_number_1_line"> 1-Line</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_number_2_line" class="2-line"
                                                        data-attribute="hospitality-2-line">
                                                    <label for="filter_number_2_line"> 2-Line</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div role="group" aria-label="Color" class="panel panel-color">
                                        <fieldset>
                                            <legend class="uppercase">Color</legend>
                                            <div id="pan-color" data-attribute_code="color" class="checkbox-group">
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_colour_ash" class="ash"
                                                        data-attribute="hospitality-colour-ash">
                                                    <label for="filter_colour_ash"> Ash</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_colour_matte_black"
                                                        class="matte-black"
                                                        data-attribute="hospitality-colour-matte-black">
                                                    <label for="filter_colour_matte_black"> Matte Black</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_colour_silver_pearl"
                                                        class="silver-pearl"
                                                        data-attribute="hospitality-colour-silver-pearl">
                                                    <label for="filter_colour_silver_pearl"> Silver & Pearl</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_colour_silver_black"
                                                        class="silver-black"
                                                        data-attribute="hospitality-colour-silver-black">
                                                    <label for="filter_colour_silver_black"> Silver & Black</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_colour_gunmetal_black"
                                                        class="gunmetal-black"
                                                        data-attribute="hospitality-colour-gunmetal-Black">
                                                    <label for="filter_colour_gunmetal_black"> Gunmetal &
                                                        Black</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_colour_pearl_black"
                                                        class="pearl-black"
                                                        data-attribute="hospitality-colour-pearl-black">
                                                    <label for="filter_colour_pearl_black"> Pearl & Black</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_colour_champagne_gold_black"
                                                        class="pearl-black"
                                                        data-attribute="hospitality-colour-champagne-gold-black">
                                                    <label for="filter_colour_champagne_gold_black"> Champagne Gold
                                                        & Black</label>
                                                </div>
                                                <div class="checkbox_wrapper">
                                                    <input type="checkbox" id="filter_colour_red_black" class="red-black"
                                                        data-attribute="hospitality-colour-red-black">
                                                    <label for="filter_colour_red_black"> Red & Black</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-9 col-xs-12">
                        <div class="row">
                            <div class="col-md-12 product_list_container">
                                <ul class="product_list_inner">
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3100/NG-A3100_NG-S3100_Gunmetal&Black_L3Q.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5153/NG-A3100-Gunmetal-Black-1-Line-Analog-Corded-Lobby-Phone">1-Line
                                                            Analog Corded Lobby Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3100 Gunmetal & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3212/NG-A3212_Gunmetal&Black_L3Q-5button.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5152/NG-A3212-Gunmetal-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3212 Gunmetal & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3112/NG-A3112_NG-S3112_NG-S3112W_FRONT.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5149/NG-A3112-Silver-Black-1-Line-Analog-Cordless-Phone">1-Line
                                                            Analog Cordless Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3112 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3100/NG-A3100_NG-S3100_Silver&Black_L3Q.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5144/NG-A3100-Silver-Black-1-Line-Analog-Corded-Lobby-Phone">1-Line
                                                            Analog Corded Lobby Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3100 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3100/NG-A3100_NG-S3100_Pearl&Black_L3Q.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5143/NG-A3100-Pearl-Black-1-Line-Analog-Corded-Lobby-Phone">1-Line
                                                            Analog Corded Lobby Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3100 Pearl & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3212/NG-A3212_NG-S3212_Pearl&Black_L3Q.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5138/NG-A3212-Pearl-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3212 Pearl & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3212/NG-A3212SilverBlack_L3Q-10button.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5137/NG-A3212-Silver-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3212 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3212/NG-A3212_MatteBlack_L3Q-3button.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5136/NG-A3212-Matte-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3212 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3100/NG-A3100_NG-S3100_MatteBlack_L3Q.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5135/NG-A3100-Matte-Black-1-Line-Analog-Corded-Lobby-Phone">1-Line
                                                            Analog Corded Lobby Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3100 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3412/NG-A3412_SilverBlack_FRONT.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5128/NG-A3412-Silver-Black-1-Line-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Analog Cordless Phone with Battery Backup</a></h3>
                                                    <div class="product_modelnumber">NG-A3412 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3412/NG-A3412_Pearl_FRONT.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5127/NG-A3412-Pearl-Black-1-Line-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Analog Cordless Phone with Battery Backup</a></h3>
                                                    <div class="product_modelnumber">NG-A3412 Pearl & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3412/NG-A3412_MatteBlack_FRONT.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5126/NG-A3412-Matte-Black-1-Line-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Analog Cordless Phone with Battery Backup</a></h3>
                                                    <div class="product_modelnumber">NG-A3412 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3412/NG-A3412_GunMetal_L3Q_3-button.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/5125/NG-A3412-Gunmetal-Black-1-Line-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Analog Cordless Phone with Battery Backup</a></h3>
                                                    <div class="product_modelnumber">NG-A3412 Gunmetal & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3311/NG-A3311_SilverBlack_L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4965/NG-A3311-Silver-Black-1-Line-Analog-Corded-TrimStyle-Phone">1-Line
                                                            Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3311 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3311/NG-A3311_MatteBlack_L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4964/NG-A3311-Matte-Black-1-Line-Analog-Corded-TrimStyle-Phone">1-Line
                                                            Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3311 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3311/NG-A3311_GunMetal_L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4963/NG-A3311-Gunmetal-Black-1-Line-Analog-Corded-TrimStyle-Phone">1-Line
                                                            Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3311 Gunmetal & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3311/NG-A3311_Pearl_L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4962/NG-A3311-Pearl-Black-1-Line-Analog-Corded-TrimStyle-Phone">1-Line
                                                            Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3311 Pearl & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-C3411HC/NG-C3411HC_(NG-C5101&C5012)_GunMetal_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4843/NG-C3411HC-Gunmetal-Black-1-Line-Cordless-Accessory-Handset-and-Charger">1-Line
                                                            Cordless Accessory Handset and Charger</a></h3>
                                                    <div class="product_modelnumber">NG-C3411HC Gunmetal & Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-C3411HC/NG-C3411HC_(NG-C5101&C5012)_MatteBlack_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4842/NG-C3411HC-Matte-Black-1-Line-Cordless-Accessory-Handset-and-Charger">1-Line
                                                            Cordless Accessory Handset and Charger</a></h3>
                                                    <div class="product_modelnumber">NG-C3411HC Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NGC-C3416HC/NGC-C3416HC_L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4840/NGC-C3416HC-Silver-Black-1-Line-Analog-Cordless-Color-Accessory-Handset-with-Charger">1-Line
                                                            Analog Cordless Color Accessory Handset with Charger</a>
                                                    </h3>
                                                    <div class="product_modelnumber">NGC-C3416HC Silver & Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-C3411HC/NG-C3411HC_(NG-C5101&C5012)_Pearl_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4838/NG-C3411HC-Pearl-Black-1-Line-Cordless-Accessory-Handset-and-Charger">1-Line
                                                            Cordless Accessory Handset and Charger</a></h3>
                                                    <div class="product_modelnumber">NG-C3411HC Pearl & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-C3411HC/NG-C3411HC_(NG-C5101&C5012)_SilverBlack_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4836/NG-C3411HC-Silver-Black-1-Line-Cordless-Accessory-Handset-and-Charger">1-Line
                                                            Cordless Accessory Handset and Charger</a></h3>
                                                    <div class="product_modelnumber">NG-C3411HC Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3411/NG_A3411_Pearl-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4833/NG-A3411-Pearl-Black-1-Line-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Analog Cordless Phone with Battery Backup</a></h3>
                                                    <div class="product_modelnumber">NG-A3411 Pearl & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3211/NG-A3211_NG-S3211_NG-S3211W_MatteBlack_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4831/NG-A3211-Matte-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3211 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3411/NG-A3411_NG-S3411_MatteBlack_L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4829/NG-A3411-Matte-Black-1-Line-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Analog Cordless Phone with Battery Backup</a></h3>
                                                    <div class="product_modelnumber">NG-A3411 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3211/NG-A3211_NG-S3211_NG-S3211W_Pearl_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4827/NG-A3211-Pearl-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3211 Pearl & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3411/NG-A3411 NG-S3411 GunMetal L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4819/NG-A3411-Gunmetal-Black-1-Line-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Analog Cordless Phone with Battery Backup</a></h3>
                                                    <div class="product_modelnumber">NG-A3411 Gunmetal & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3411/NG-A3411 NG-S3411 SilverBlack L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4816/NG-A3411-Silver-Black-1-Line-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Analog Cordless Phone with Battery Backup</a></h3>
                                                    <div class="product_modelnumber">NG-A3411 Silver Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3211/NG-A3211_NG-S3211_NG-S3211W_SB_W02_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4815/NG-A3211-Silver-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3211 Silver Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/NG/NG-A3211/NG-A3211_NG-S3211_NG-S3211W_GM_W02_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4814/NG-A3211-Gunmetal-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">NG-A3211 Gunmetal & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-C4XX2/C4011_C4012_SB_L3Q-4470.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4470/C4012-Silver-Black-Contemporary-6VDC-Upright-Charger">Contemporary
                                                            6VDC Upright Charger </a></h3>
                                                    <div class="product_modelnumber">C4012 Silver Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-S21XX/C4011_C4012_Front-4469.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4469/C4012-Matte-Black-Contemporary-6VDC-Upright-Charger">Contemporary
                                                            6VDC Upright Charger</a></h3>
                                                    <div class="product_modelnumber">C4012 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2315/CTM-A2315_SPK_SB_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4424/CTM-A2315-SPK-Silver-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A2315-SPK Silver Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2315/CTM-A2315_SB & CTM-A2315-WM_SB_Front-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4423/CTM-A2315-Silver-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A2315 Silver Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2315/CTM-A2315-WM_MB_L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4422/CTM-A2315-WM-Matte-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A2315-WM Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2315/CTM-A2315_SPK_MB_R3Q copy-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4421/CTM-A2315-SPK-Matte-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A2315-SPK Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2315/CTM-A2315_MB & CTM-A2315-WM_MB_HS_Front-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4420/CTM-A2315-Matte-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A2315 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2315/CTM-A2315-WM_SB_L3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4419/CTM-A2315-WM-Silver-Black-1-Line-Analog-Corded-Phone">1-Line
                                                            Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A2315-WM Silver Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2415/CTM-A241HS1 VB_BK_L3Q.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4418/CTM-A2415HC-Matte-Black-1-Line-Analog-Cordless-Accessory-Handset-with-Charger">1-Line
                                                            Analog Cordless Accessory Handset with Charger</a></h3>
                                                    <div class="product_modelnumber">CTM-A2415HC Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2415/CTM-S2115 CTM-S2125 CTM-A2415HC CTM-S2415HC CTM-S2425HC_Silver Black_L3.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4417/CTM-A2415HC-Silver-Black-1-Line-Analog-Cordless-Accessory-Handset-with-Charger">1-Line
                                                            Analog Cordless Accessory Handset with Charger</a></h3>
                                                    <div class="product_modelnumber">CTM-A2415HC Silver Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2415/CTM-A2415_SB_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4415/CTM-A2415-Silver-Black-1-Line-Analog-Cordless-Phone">1-Line
                                                            Analog Cordless Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A2415 Silver Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2415/CTM-A2415_MB_R3Q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4414/CTM-A2415-Matte-Black-1-Line-Analog-Cordless-Phone">1-Line
                                                            Analog Cordless Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A2415 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A22X1/A2211_SPK_MB_F-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4235/A2211-SPK-Matte-Black-1-Line-Contemporary-Analog-Corded-Petite-Phone-with-Speakerphone">1-Line
                                                            Contemporary Analog Corded Petite Phone with
                                                            Speakerphone</a></h3>
                                                    <div class="product_modelnumber">A2211-SPK Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A22X1/A2211_SPK_SB_straight-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4234/A2211-SPK-Silver-Black-1-Line-Contemporary-Analog-Corded-Petite-Phone-with-Speakerphone">1-Line
                                                            Contemporary Analog Corded Petite Phone with
                                                            Speakerphone</a></h3>
                                                    <div class="product_modelnumber">A2211-SPK Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A22X1/A2211_SPK_SP_Straight-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/4233/A2211-SPK-Silver-Pearl-1-Line-Contemporary-Analog-Corded-Petite-Phone-with-Speakerphone">1-Line
                                                            Contemporary Analog Corded Petite Phone with
                                                            Speakerphone</a></h3>
                                                    <div class="product_modelnumber">A2211-SPK Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2210/a2210-sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3903/A2210-Silver-Pearl-1-Line-Contemporary-Analog-Corded-Phone">1-Line
                                                            Contemporary Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">A2210 Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2210/a2210-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3902/A2210-Matte-Black-1-Line-Contemporary-Analog-Corded-Phone">1-Line
                                                            Contemporary Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">A2210 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2210/a2210-sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3901/A2210-Silver-Black-1-Line-Contemporary-Analog-Corded-Phone">1-Line
                                                            Contemporary Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">A2210 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x241P/ctm-a241p_bk_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3896/CTM-A241P-Matte-Black-1-Line-Contemporary-Analog-Accessory-Petite-Phone">1-Line
                                                            Contemporary Analog Accessory Petite Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A241P Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x2411/ctm-a2411_sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3888/CTM-A2411-BATT-Silver-Pearl-1-Line-Contemporary-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Contemporary Analog Cordless Phone with Battery
                                                            Backup</a></h3>
                                                    <div class="product_modelnumber">CTM-A2411-BATT Silver & Pearl
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x2411/ctm-a2411_bk_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3887/CTM-A2411-BATT-Matte-Black-1-Line-Contemporary-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Contemporary Analog Cordless Phone with Battery
                                                            Backup</a></h3>
                                                    <div class="product_modelnumber">CTM-A2411-BATT Matte Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x2411/ctm-a2411_sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3886/CTM-A2411-BATT-Silver-Black-1-Line-Contemporary-Analog-Cordless-Phone-with-Battery-Backup">1-Line
                                                            Contemporary Analog Cordless Phone with Battery
                                                            Backup</a></h3>
                                                    <div class="product_modelnumber">CTM-A2411-BATT Silver & Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2321/a2321-sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3885/A2321-Silver-Pearl-2-Line-Contemporary-Analog-Corded-TrimStyle-Phone">2-Line
                                                            Contemporary Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">A2321 Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2321/a2321-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3884/A2321-Matte-Black-2-Line-Contemporary-Analog-Corded-TrimStyle-Phone">2-Line
                                                            Contemporary Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">A2321 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2321/a2321-sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3883/A2321-Silver-Black-2-Line-Contemporary-Analog-Corded-TrimStyle-Phone">2-Line
                                                            Contemporary Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">A2321 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A1100/a1100-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3880/A1100-Matte-Black-1-Line-Classic-Analog-Corded-Lobby-Phone">1-Line
                                                            Classic Analog Corded Lobby Phone</a></h3>
                                                    <div class="product_modelnumber">A1100 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A1311/a1311-ah_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3879/A1311-Ash-1-Line-Classic-Analog-Corded-TrimStyle-Phone">1-Line
                                                            Classic Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">A1311 Ash</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A1311/a1311-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3878/A1311-Matte-Black-1-Line-Classic-Analog-Corded-TrimStyle-Phone">1-Line
                                                            Classic Analog Corded TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">A1311 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CL/CL-A1110/cl-a1110-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3877/CL-A1110-Matte-Black-1-Line-Classic-Analog-Corded-Lite-Phone">1-Line
                                                            Classic Analog Corded Lite Phone</a></h3>
                                                    <div class="product_modelnumber">CL-A1110 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A1210/a1210-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3874/A1210-A-Matte-Black-1-Line-Classic-Analog-Corded-Phone">1-Line
                                                            Classic Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">A1210-A Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A1410/a1410-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3871/A1410-Matte-Black-1-Line-Classic-Analog-Cordless-Phone">1-Line
                                                            Classic Analog Cordless Phone</a></h3>
                                                    <div class="product_modelnumber">A1410 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2510/ctm-a2510_sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3804/CTM-A2510-USB-Silver-Pearl-Contemporary-Analog-Master-Corded-Cordless-Phone-with-Accessory-Handset">Contemporary
                                                            Analog Master Corded-Cordless Phone with Accessory
                                                            Handset</a></h3>
                                                    <div class="product_modelnumber">CTM-A2510-USB Silver & Pearl
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2510/ctm-a2510_mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3803/CTM-A2510-USB-Matte-Black-Contemporary-Analog-Master-Corded-Cordless-Phone-with-Accessory-Handset">Contemporary
                                                            Analog Master Corded-Cordless Phone with Accessory
                                                            Handset</a></h3>
                                                    <div class="product_modelnumber">CTM-A2510-USB Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-A2510/ctm-a2510_sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3802/CTM-A2510-USB-Silver-Black-Contemporary-Analog-Master-Corded-Cordless-Phone-with-Accessory-Handset">Contemporary
                                                            Analog Master Corded-Cordless Phone with Accessory
                                                            Handset</a></h3>
                                                    <div class="product_modelnumber">CTM-A2510-USB Silver & Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2310/a2310-nm_sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3801/A2310-NM-Silver-Pearl-1-Line-Contemporary-Analog-TrimStyle-Phone-with-No-MWI">1-Line
                                                            Contemporary Analog TrimStyle Phone with No MWI</a></h3>
                                                    <div class="product_modelnumber">A2310-NM Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2310/a2310-nm_mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3800/A2310-NM-Matte-Black-1-Line-Contemporary-Analog-TrimStyle-Phone-with-No-MWI">1-Line
                                                            Contemporary Analog TrimStyle Phone with No MWI</a></h3>
                                                    <div class="product_modelnumber">A2310-NM Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2310/a2310-nm_sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3799/A2310-NM-Silver-Black-1-Line-Contemporary-Analog-TrimStyle-Phone-with-No-MWI">1-Line
                                                            Contemporary Analog TrimStyle Phone with No MWI</a></h3>
                                                    <div class="product_modelnumber">A2310-NM Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2310/a2310-sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3795/A2310-Silver-Pearl-1-Line-Contemporary-Analog-TrimStyle-Phone">1-Line
                                                            Contemporary Analog TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">A2310 Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2310/a2310-mb_nm_straight-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3794/A2310-Matte-Black-1-Line-Contemporary-Analog-TrimStyle-Phone">1-Line
                                                            Contemporary Analog TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">A2310 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2310/a2310-sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3793/A2310-Silver-Black-1-Line-Contemporary-Analog-TrimStyle-Phone">1-Line
                                                            Contemporary Analog TrimStyle Phone</a></h3>
                                                    <div class="product_modelnumber">A2310 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2211/a2211-sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3792/A2211-Silver-Pearl-1-Line-Contemporary-Analog-Petite-Phone">1-Line
                                                            Contemporary Analog Petite Phone</a></h3>
                                                    <div class="product_modelnumber">A2211 Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2211/a2211-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3791/A2211-Matte-Black-1-Line-Contemporary-Analog-Petite-Phone">1-Line
                                                            Contemporary Analog Petite Phone</a></h3>
                                                    <div class="product_modelnumber">A2211 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2211/a2211-sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3790/A2211-Silver-Black-1-Line-Contemporary-Analog-Petite-Phone">1-Line
                                                            Contemporary Analog Petite Phone</a></h3>
                                                    <div class="product_modelnumber">A2211 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2221/a2221-sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3786/A2221-L2-Silver-Pearl-2-Line-Contemporary-Analog-Petite-Phone">2-Line
                                                            Contemporary Analog Petite Phone</a></h3>
                                                    <div class="product_modelnumber">A2221-L2 Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2221/a2221-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3785/A2221-L2-Matte-Black-2-Line-Contemporary-Analog-Petite-Phone">2-Line
                                                            Contemporary Analog Petite Phone</a></h3>
                                                    <div class="product_modelnumber">A2221-L2 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2221/a2221-sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3784/A2221-L2-Silver-Black-2-Line-Contemporary-Analog-Petite-Phone">2-Line
                                                            Contemporary Analog Petite Phone</a></h3>
                                                    <div class="product_modelnumber">A2221-L2 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2220/a2220-sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3783/A2220-L2-Silver-Pearl-2-Line-Contemporary-Analog-Corded-Phone">2-Line
                                                            Contemporary Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">A2220 L2 Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2220/a2220-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3782/A2220-L2-Matte-Black-2-Line-Contemporary-Analog-Corded-Phone">2-Line
                                                            Contemporary Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">A2220 L2 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2220/a2220-sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3781/A2220-L2-Silver-Black-2-Line-Contemporary-Analog-Corded-Phone">2-Line
                                                            Contemporary Analog Corded Phone</a></h3>
                                                    <div class="product_modelnumber">A2220 L2 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x242P/ctm-a242p_bk_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3776/CTM-A242P-Matte-Black-2-Line-Contemporary-Analog-Accessory-Petite-Phone">2-Line
                                                            Contemporary Analog Accessory Petite Phone</a></h3>
                                                    <div class="product_modelnumber">CTM-A242P Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x2421/ctm-a2421_sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3768/CTM-A2421-BATT-Silver-Pearl-2-Line-Contemporary-Analog-Cordless-Phone-with-Battery-Backup">2-Line
                                                            Contemporary Analog Cordless Phone with Battery
                                                            Backup</a></h3>
                                                    <div class="product_modelnumber">CTM-A2421-BATT Silver & Pearl
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x2421/ctm-a2421_bk_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3767/CTM-A2421-BATT-Matte-Black-2-Line-Contemporary-Analog-Cordless-Phone-with-Battery-Backup">2-Line
                                                            Contemporary Analog Cordless Phone with Battery
                                                            Backup</a></h3>
                                                    <div class="product_modelnumber">CTM-A2421-BATT Matte Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x2421/ctm-a2421_sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3766/CTM-A2421-BATT-Silver-Black-2-Line-Contemporary-Analog-Cordless-Phone-with-Battery-Backup">2-Line
                                                            Contemporary Analog Cordless Phone with Battery
                                                            Backup</a></h3>
                                                    <div class="product_modelnumber">CTM-A2421-BATT Silver & Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2100/a2100-sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3798/A2100-Silver-Pearl-1-Line-Contemporary-Analog-Lobby-Phone">1-Line
                                                            Contemporary Analog Lobby Phone</a></h3>
                                                    <div class="product_modelnumber">A2100 Silver & Pearl</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2100/a2100-mb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3797/A2100-Matte-Black-1-Line-Contemporary-Analog-Lobby-Phone">1-Line
                                                            Contemporary Analog Lobby Phone</a></h3>
                                                    <div class="product_modelnumber">A2100 Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/A/A2100/a2100-sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3796/A2100-Silver-Black-1-Line-Contemporary-Analog-Lobby-Phone">1-Line
                                                            Contemporary Analog Lobby Phone</a></h3>
                                                    <div class="product_modelnumber">A2100 Silver & Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x241SD/ctm-a241hs1-vb_sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3891/CTM-A241SDU-Silver-Pearl-1-Line-Contemporary-Analog-Cordless-Accessory-Handset-with-Speed-Dials">1-Line
                                                            Contemporary Analog Cordless Accessory Handset with
                                                            Speed Dials</a></h3>
                                                    <div class="product_modelnumber">CTM-A241SDU Silver & Pearl
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x241SD/ctm-a241hs1-vb_bk_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3890/CTM-A241SDU-Matte-Black-1-Line-Contemporary-Analog-Cordless-Accessory-Handset-with-Speed-Dials">1-Line
                                                            Contemporary Analog Cordless Accessory Handset with
                                                            Speed Dials</a></h3>
                                                    <div class="product_modelnumber">CTM-A241SDU Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x241SD/ctm-a241hs1-vb_sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3889/CTM-A241SDU-Silver-Black-1-Line-Contemporary-Analog-Cordless-Accessory-Handset-with-Speed-Dials">1-Line
                                                            Contemporary Analog Cordless Accessory Handset with
                                                            Speed Dials</a></h3>
                                                    <div class="product_modelnumber">CTM-A241SDU Silver & Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x242SD/ctm-a241hs1-vb_sp_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3771/CTM-A242SDU-Silver-Pearl-2-Line-Contemporary-Analog-Cordless-Accessory-Handset-with-Speed-Dials">2-Line
                                                            Contemporary Analog Cordless Accessory Handset with
                                                            Speed Dials</a></h3>
                                                    <div class="product_modelnumber">CTM-A242SDU Silver & Pearl
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x242SD/ctm-a241hs1-vb_bk_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3770/CTM-A242SDU-Matte-Black-2-Line-Contemporary-Analog-Cordless-Accessory-Handset-with-Speed-Dials">2-Line
                                                            Contemporary Analog Cordless Accessory Handset with
                                                            Speed Dials</a></h3>
                                                    <div class="product_modelnumber">CTM-A242SDU Matte Black</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="product_wrapper analog  " role="group" aria-label="product">
                                            <div class="image">
                                                <img style="max-width:none;"
                                                    src="//cdn-web.vtp-media.com/products/CTM/CTM-x242SD/ctm-a241hs1-vb_sb_l3q-min.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="detail center_part">
                                                <div class="product_detail_container">
                                                    <h3 class="product_name"><a
                                                            href="https://www.vtechhotelphones.com/pd/3769/CTM-A242SDU-Silver-Black-2-Line-Contemporary-Analog-Cordless-Accessory-Handset-with-Speed-Dials">2-Line
                                                            Contemporary Analog Cordless Accessory Handset with
                                                            Speed Dials</a></h3>
                                                    <div class="product_modelnumber">CTM-A242SDU Silver & Black
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
    <div class="modal fade" id="dimmer" tabindex="-1" aria-labelledby="dimmer" role="dialog"
        aria-modal="true">
    </div>

    <script type="text/javascript">
        var attribute_filters = {};
        var search_keyword = "";
        // product ids returned from search engine
        var product_ids =
            "5153,5152,5149,5144,5143,5138,5137,5136,5135,5128,5127,5126,5125,4965,4964,4963,4962,4843,4842,4840,4838,4836,4833,4831,4829,4827,4819,4816,4815,4814,4470,4469,4424,4423,4422,4421,4420,4419,4418,4417,4415,4414,4235,4234,4233,3903,3902,3901,3896,3891,3890,3889,3888,3887,3886,3885,3884,3883,3880,3879,3878,3877,3874,3871,3804,3803,3802,3801,3800,3799,3798,3797,3796,3795,3794,3793,3792,3791,3790,3786,3785,3784,3783,3782,3781,3776,3771,3770,3769,3768,3767,3766";
        var category_url = subcategory_url = color_url = number_of_lines_url = '';
        var num_of_new_blocks_to_show = 9;
        var next_visible_prod_block_id = num_of_new_blocks_to_show;
        var isClick = false;
        $(document).ready(function() {

            // when any checkbox/label is clicked

            $('#product_filter-mobile .product_filter [data-attribute_code]').find('input').on('click', function(
                event) {
                setChecked(event, $(this));
                when_filters_change();
            });
            $('#product_filter .product_filter [data-attribute_code]').find('input').on('click', function(event) {
                setChecked(event, $(this));
                when_filters_change();
            });

            // Switch Grid/List view
            $(document).on('click', '.view-mode a', function() {
                // Grid viw
                if ($(this).attr('class') == 'icon_view') {
                    $(this).addClass('active');
                    $('.list_view').removeClass('active');
                    $('.product_wrapper').addClass('col-md-4 col-sm-6 col-xs-12');
                    $('.product_wrapper .image').removeClass('col-sm-3').addClass('col-sm-12');
                    $('.product_wrapper .detail').removeClass('col-sm-9').addClass('col-sm-12');
                }
                // List viw
                else {
                    $(this).addClass('active');
                    $('.icon_view').removeClass('active');
                    $('.product_wrapper').removeClass('col-md-4 col-sm-6 col-xs-12');
                    $('.product_wrapper .image').removeClass('col-sm-12').addClass('col-sm-3 col-xs-12');
                    $('.product_wrapper .detail').removeClass('col-sm-12').addClass('col-sm-9 col-xs-12');
                    $('.product_detail_container .learn_more_btn_large').css('width', '40%');
                }

                // make sure the images of all visible product grids are loaded
                $('.product_wrapper:visible').find('.image img').each(function() {
                    data_src = $(this).data('src');
                    $(this).attr('src', data_src)
                })
            });

            toggle_search_criteria_col();
            //new them
            $('.bg-filter').on("click", function() {
                var obj = $(this);
                setTimeout(function() {
                    if ('height: 0px;' != $('#show-filter').attr('style')) {
                        obj.css('background-color', '#fff');
                    } else {
                        obj.css('background-color', '#ececec');
                    }
                }, 200);

            });
        });

        // remove search keyword
        $(".search_keyword_wrapper .search_keyword").on('click', function() {
            search_keyword = "";
            $(".search_keyword_wrapper").hide();
            $('.sub-banner .content span').html('Products')
            when_filters_change();
        })

        $(window).resize(function() {
            toggle_search_criteria_col();
        });

        $(window).scroll(function() {
            // scroll to see more
            //tam return lai
            return false;
            if ($('.see_more_btn').css('display') != 'none') {
                if (isElementInViewport($('.see_more_btn'))) {
                    show_more_prod_block();
                }
            }
        });

        $(document).on('click', '.see_more_btn', function() {
            toggle_all_prod_block($(this));
        })

        function toggle_all_prod_block(obj) {
            var classChild = 'analog';
            if (!obj.hasClass('btn-analog')) {
                classChild = 'sip';
            }
            var targer_product_wrapper = $(".product_wrapper." + classChild);
            targer_product_wrapper.each(function(index, value) {
                if ($(this).hasClass('inactive')) {
                    var img_tag = $(this).find('.image img');
                    img_tag.attr('src', img_tag.data('src'));
                    $(this).removeClass('inactive').addClass('active more');
                } else if ($(this).hasClass('more')) {
                    $(this).removeClass('active more').addClass('inactive');
                }
            });
            var button = $('.see_more_btn.btn-' + classChild);
            if (button.hasClass('hide_btn')) {
                button.removeClass('hide_btn');
                button.html(button.data('text-show'));
            } else {
                button.addClass('hide_btn');
                button.html(button.data('text-hide'));
            }
        }

        function show_more_prod_block() {
            for (var i = 0; i < num_of_new_blocks_to_show; i++) {
                var targer_product_wrapper = $(".product_wrapper").eq(next_visible_prod_block_id + i)
                var img_tag = targer_product_wrapper.find('.image img')
                img_tag.attr('src', img_tag.data('src'))
                targer_product_wrapper.removeClass('inactive').addClass('active');
            }

            // if there is still more products hidden
            if ($(".product_wrapper").last().css('display') == 'none') {
                next_visible_prod_block_id += num_of_new_blocks_to_show;
            } else {
                $('.see_more_btn').hide();
            }
        }

        function isElementInViewport(el) {
            //comment return tam
            //return;
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }
            if (el != "undefined") {
                var rect = el.getBoundingClientRect();
                return (
                    rect.top <= window.innerHeight * 0.7 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    /*or $(window).height() */
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
                );
            }
        }

        function update_url(page, url) {
            if (typeof(history.pushState) != "undefined") {
                var obj = {
                    Page: page,
                    Url: url
                };
                history.pushState(obj, obj.Page, obj.Url);
            } else {
                window.location.href = url;
                // Reload if Browser does not support HTML5
            }
        }

        function when_filters_change() {

            // update the global variable "attribute_filters"
            update_attribute_filters();

            // reset the next visible block id
            next_visible_prod_block_id = num_of_new_blocks_to_show;

            var search_url = '/products/search';
            var search_url_params = '';
            $.each(attribute_filters, function(code, value) {
                if (attribute_filters[code].length) {
                    search_url_params += '/' + code + '/' + value.join(',');
                }
            });

            if (search_keyword.trim() != "") {
                search_url_params += '/keyword/' + search_keyword;
            }

            // update browser url
            update_url('products', search_url + search_url_params);

            // dim and make ajax call to update product list
            reload_product_list(search_url + search_url_params);

        }

        function update_attribute_filters() {
            let filter_selector
            // reset attribute
            attribute_filters = {};
            if ($('#product_filter-mobile:visible').length) {
                filter_selector = $("#product_filter-mobile")
            } else {
                filter_selector = $("#product_filter")
            }

            filter_selector.find('*[data-attribute_code] input[data-attribute]:checked').each(function() {
                attribute_code = $(this).parents('[data-attribute_code]').attr('data-attribute_code')
                attribute_value = $(this).attr('data-attribute')
                if (typeof attribute_filters[attribute_code] == 'undefined')
                    attribute_filters[attribute_code] = []
                // if not the checkbox "All" is checked

                // Update attribute_filters (add attribute value)
                attribute_filters[attribute_code].push(attribute_value);
            })
        }

        function reload_product_list(url) {
            $('#dimmer').modal();
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                success: function(data) {
                    $('.product_list_container').html(data.view_product_rows);
                    product_ids = data.product_ids
                    $('#dimmer').modal('hide');
                }
            });
        }

        function toggle_search_criteria_col() {
            var windowWidth = $(window).width();
            var modile_device_screen_width = 750;

            // enable accordion during mobile mode
            if (windowWidth <= modile_device_screen_width) {
                //            $('a[data-toggle="collapse"]').each(function(){
                //                if ($(this).data('href') != ''){
                //                    temp = $(this).data('href');
                //                    $(this).attr('href', temp);
                //                }
                //            })
            } else {
                // disable accordion during desktop mode
                $('a[data-toggle="collapse"]').each(function() {
                    if (typeof $(this).data('href') == 'undefined' || $(this).data('href') == '') {
                        temp = $(this).attr('href');
                        $(this).attr('data-href', temp);
                    }
                    $(this).attr('href', "");
                })
            }

            // control accordion expand/collapse behavior
            if (windowWidth <= modile_device_screen_width) { //for iPad & smaller devices
                //comment this the use filter on top bay Icon filter click
                ///$('.product_container .panel-collapse').removeClass('in')
            } else {
                $('.product_container .panel-collapse').addClass('in')
            }
        }

        var setChecked = function(event, obj) {
            event.stopPropagation();
            let sub_filter = obj.parent().find('.sub_category');
            // handling either label or checkbox is clicked
            var input;
            if ((event.target.nodeName).toLowerCase() == 'input') {
                input = obj;
            } else {
                input = (obj.siblings('input') ? obj.siblings('input') : obj.closest('input'));
            }
            if (typeof input != 'undefined') {
                if (input.prop('checked')) {
                    showHideSubFilter(sub_filter, true);
                } else {
                    showHideSubFilter(sub_filter, false);
                }
            }
        };

        function showHideSubFilter(el, show) {
            if (el.length > 0) {
                let status = 'none';
                if (show) {
                    status = 'block';
                } else {
                    el.find('input').prop('checked', false);
                }
                el.css('display', status);
            }
        }
    </script>
@endsection

<!DOCTYPE html>
<html lang="en">

<head>
    <script>
        /* in case there are some legacy GA script which use this variable */
        var dataLayer = window.dataLayer || [];
    </script>
    <script type="text/javascript">
        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({
            'mtm.startTime': (new Date().getTime()),
            'event': 'mtm.Start'
        });
        var d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.async = true;
        g.src = 'https://cdn.matomo.cloud/vtech.matomo.cloud/container_TB6Sfh67.js';
        s.parentNode.insertBefore(g, s);
    </script>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome.min.css">
    <title>@yield('title', 'Vintech')</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/themes/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/vintec/themes/icons/logo.ico" sizes="32x32">
    <link rel="icon" type="image/png" href="/themes/icons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/themes/icons/manifest.json">
    <link rel="mask-icon" href="/themes/icons/safari-pinned-tab.svg" color="#004784">
    <link rel="shortcut icon" href="/themes/icons/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="VTech Hotel Phones">
    <meta name="application-name" content="VTech Hotel Phones">
    <meta name="msapplication-config" content="/themes/icons/browserconfig.xml">
    <meta name="theme-color" content="#0979C6">
    
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="Hotel Phones with Elegant Designs &amp; Durability. Welcome to The Future of Hotel Phones by VTech. VTech Hotel Phones offer SIP and Analog solutions, featuring Contemporary &amp; Classic designs in multiple color combinations perfect for any hotel layout and design." />
    <meta name="keywords" content="VTech Hotel Phones, Hotelphones, Hotel Phones" />

    @include('client.layouts.partials.style')
       
    @include('client.layouts.partials.script')
    <meta name="csrf-name" content="li_token">
    <meta name="csrf-token" content="7e0cc7338e833c43c7abdfa43ed35c8842d1f38d6f53b1ac83ea861a463d4699">
</head>

<body class="affix_header">
    <!-- header -->
    <header class="header">
       @include('client.layouts.partials.header')
    </header>

    <div class="page_content box-search visible-xs">
        <div class="search" id="search_box_form">
            <input aria-label="Search Model or Keyword" class="search-input" type="text"
                id="search_keyword_mobile" name="search_keyword"
                onblur="if (this.value == '') this.value = 'Search';"
                onfocus="if (this.value == 'Search') this.value = '';" value="Search" />
            <button aria-label="Search" class="search-button" type="button" id="search_box_submit_btn_mobile"
                style="pointer-events:none !important;"><i class="icon-search"
                    id="search_box_submit_btn_mobile"></i></button>
            <div style="clear:both"></div>
            <script type="text/javascript">
                $(document).ready(function() {
                    $('#search_box_submit_btn_mobile, #search_keyword_mobile').on('click', function(evt) {
                        evt.stopPropagation();
                        go_to_search_link_mobile();
                        $('#search_box_submit_btn_mobile').addClass('btn-active');
                    });
                    $('#search_keyword_mobile').keypress(function(e) {
                        if (e.which === 13) {
                            go_to_search_link_mobile();
                        }
                    });
                    $('#search_keyword_mobile').focusout(function() {
                        $('#search_box_submit_btn_mobile').removeClass("btn-active");
                    })
                });

                function go_to_search_link_mobile() {
                    var searchString = encodeURIComponent(($('#search_box_form #search_keyword_mobile').val()).trim());
                    if (searchString != '' && searchString != 'Search') {
                        var search_link = '/products/search/keyword/' + searchString;
                        window.location.href = search_link;
                    }
                }
            </script>
        </div>
    </div>
    <div class="clear"></div>

    <!-- /.header -->
    <!-- Main -->
    <main role="main" id="main-content">
        @yield('content')
    </main>
    <!-- /.Main -->
    <!-- Footer -->
    <footer class="footer">
       @include('client.layouts.partials.footer')
    </footer>
    <style>

    </style>
    <script type="text/javascript">
        $(document).ready(function() {
            $.widget.bridge('uitooltip', $.ui.tooltip);
            $('[data-toggle="tooltip"]').tooltip({
                'container': 'body'
            })
            var scrollFunc = {
                init: function(settings) {
                    scrollFunc.config = {
                        buttonBackToTop: $('.back-to-top'),
                        page: $('body,html'),
                        offsetOpacity: 1200,
                        scrollTopDuration: 200
                    };
                    $.extend(scrollFunc.config, settings);
                    scrollFunc.setup();
                },
                setup: function() {
                    scrollFunc.pageToTop();
                    scrollFunc.toggleBackToTopButton();
                },
                pageToTop: function() {
                    scrollFunc.handleClick();
                },
                toggleBackToTopButton: function() {
                    $(window).scroll(function() {
                        ($(this).scrollTop() > 0) ? scrollFunc.config.buttonBackToTop.addClass(
                            'is-visible'): scrollFunc.config.buttonBackToTop.removeClass(
                            'is-visible fade-out');
                        if ($(this).scrollTop() > scrollFunc.config.offsetOpacity) {
                            scrollFunc.config.buttonBackToTop.addClass('fade-out');
                        }
                    });
                },
                handleClick: function() {
                    scrollFunc.config.buttonBackToTop.on('click', function() {
                        scrollFunc.config.page.animate({
                            scrollTop: 0,
                        }, scrollFunc.config.scrollTopDuration);
                    });
                }
            };
            scrollFunc.init();
        });
    </script>

    <script type="text/javascript">
        function show_require_cookie_message(target_elecment_selector, cookie_category) {
            var message_selector = target_elecment_selector.parents('div').eq(0).find(".require_cookie_message")
            if (message_selector.length == 0) {
                var cookie_name = "cookies";
                switch (cookie_category) {
                    case "social":
                        cookie_name = "Social Sharing Cookies";
                        break;
                    case "video":
                        cookie_name = "Video Cookies";
                        break;
                    case "functional":
                        cookie_name = "Functional Cookies";
                        break;
                    default:
                        cookie_name = "cookies";
                }
                target_elecment_selector.before(
                    "<div class='require_cookie_message'>This requires the usage of some additional cookies. <br/>Please allow " +
                    cookie_name + " using <button class='open_cookie_control'>Cookie Control</button>.</div>")
            } else {
                message_selector.show()
            }
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function createCookie(name, value, days) {
            if (typeof days != "undefined") {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";

            document.cookie = name + "=" + value + expires + "; path=/ ;secure";
        }

        function close_cookie_bottom_consent() {
            createCookie("displayed_btm_consent", true, 395)
            $("#vt-ccb-notify").fadeTo(900, 0, function() {
                $("#vt-ccb-notify").css('display', 'none');
            });
        }

        $(function() {
            var displayed_btm_consent = readCookie("displayed_btm_consent");
            if (displayed_btm_consent == undefined || displayed_btm_consent == null) {
                $("#vt-ccb-notify").fadeTo(900, 1);
            } else {
                close_cookie_bottom_consent();
            }
        });

        $("#vt-ccb-notify-accept").on('click', function() {
            CookieControl.acceptAll()
            close_cookie_bottom_consent();

        });

        $(document).on('click', "#vt-ccb-notify_setting, .open_cookie_control", function() {
            CookieControl.open();
            close_cookie_bottom_consent();
        });
    </script>

    <!-- begin civic code -->
    <style>
        #ccc-recommended-settings {
            color: #fff !important;
            border-color: #fff !important;
            background: transparent !important;
        }

        #ccc-recommended-settings span {
            color: #fff !important;
            background: transparent !important;
            font-weight: 400 !important;
        }

        /* begin tooltip in Cookie content */
        #ccc-content {
            overflow-x: hidden;
        }

        #ccc-button-holder {
            position: relative;
        }

        #ccc-button-holder .recommended-settings-overlay {
            width: 131px;
            height: 44px;
            position: absolute;
            left: 0px;
            top: 3px;
            z-index: 1;
        }

        .checkbox-toggle .checkbox-toggle-label-overlay {
            width: 88px;
            height: 30px;
            position: absolute;
            right: -4px;
            top: -5px;
            z-index: 1;
        }

        #ccc-content .cookie-tooltip span.tooltiptext {
            visibility: hidden;
            width: 270px;
            background-color: #000025 !important;
            color: #fff !important;
            font-size: 16px !important;
            font-weight: 400 !important;
            text-align: left;
            border-radius: 6px;
            padding: 15px;
            position: absolute;
            z-index: 1;
            bottom: 150%;
            left: 50%;
            margin-left: -70px;
            margin-bottom: -12px;
        }

        #ccc-content .cookie-tooltip span.tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 70px;
            margin-left: -5px;
            border-width: 8px;
            border-style: solid;
            border-color: #000025 transparent transparent transparent;
        }

        #ccc-content .cookie-tooltip:hover span.tooltiptext {
            visibility: visible;
        }

        #ccc-content .checkbox-toggle-label-overlay.cookie-tooltip span.tooltiptext {
            margin-left: 0;
            margin-right: -90px;
            margin-bottom: -5px;
            left: auto;
            right: 100%;
        }

        #ccc-content .checkbox-toggle-label-overlay.cookie-tooltip span.tooltiptext::after {
            top: 100%;
            left: auto;
            right: 40px;
        }

        /* end tooltip for Cookie content */

        /* Tooltip for #vt-ccb-notify-accept button */
        #vt-ccb-notify .vt-ccb-notify-buttons.ccb-buttons-gpc {
            position: relative;
        }

        #vt-ccb-notify .vt-ccb-notify-buttons .vt-ccb-notify-accept-overlay {
            width: 115px;
            height: 55px;
            position: absolute;
            left: 0px;
            top: 3px;
            z-index: 1;
        }

        #vt-ccb-notify .vt-ccb-notify-buttons .accept-button-tooltip span.tooltiptext {
            visibility: hidden;
            width: 270px;
            background-color: #000025 !important;
            color: #fff !important;
            font-size: 16px !important;
            font-weight: 400 !important;
            text-align: left;
            border-radius: 6px;
            padding: 15px;
            position: absolute;
            z-index: 1;
            bottom: 150%;
            left: 50%;
            margin-left: -60px;
            margin-bottom: -19px;
            white-space: normal;
        }

        #vt-ccb-notify .vt-ccb-notify-buttons .accept-button-tooltip span.tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 60px;
            margin-left: -5px;
            border-width: 8px;
            border-style: solid;
            border-color: #000025 transparent transparent transparent;
        }

        #vt-ccb-notify .vt-ccb-notify-buttons .accept-button-tooltip:hover span.tooltiptext {
            visibility: visible;
        }

        @media (min-width: 428px) and (max-width: 500px) {
            #vt-ccb-notify .vt-ccb-notify-buttons .vt-ccb-notify-accept-overlay {
                left: 20px;
            }
        }

        /* end tooltip for #vt-ccb-notify-accept button */
    </style>
    <script src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"></script>
    <script>
        var gpc = false;
        if (!gpc) {
            gpc = navigator.globalPrivacyControl;
            gpc = typeof gpc == "undefined" || !gpc ? false : true;
        }

        function on_accept_cookies(cookie_category) {
            if (gpc === false) {
                switch (cookie_category) {
                    case "analytic":
                        _mtm.push({
                            'event': 'custom_evt_analytics_accepted',
                            'custom_dl_analytics_pref': 1
                        });
                        $("body").trigger("custom_evt_analytics_accepted");
                        break;
                    case "functional":
                        _mtm.push({
                            'event': 'custom_evt_functional_accepted',
                            'custom_dl_funtional_pref': 1
                        });
                        $("body").trigger("custom_evt_functional_accepted");
                        break;
                    case "video":
                        _mtm.push({
                            'event': 'custom_evt_video_accepted',
                            'custom_dl_video_pref': 1
                        });
                        $("body").trigger("custom_evt_video_accepted");

                        show_video();
                        break;
                }
            }
        }

        function on_revoke_cookies(cookie_category) {
            switch (cookie_category) {
                case "analytic":
                    _mtm.push({
                        'event': 'custom_evt_analytics_revoked',
                        'custom_dl_analytics_pref': 0
                    });
                    $("body").trigger("custom_evt_analytics_revoked");
                    break;
                case "functional":
                    _mtm.push({
                        'event': 'custom_evt_functional_revoked',
                        'custom_dl_funtional_pref': 0
                    });
                    $("body").trigger("custom_evt_functional_revoked");

                    disable_recaptcha_from();
                    break;
                case "video":
                    _mtm.push({
                        'event': 'custom_evt_video_revoked',
                        'custom_dl_video_pref': 0
                    });
                    $("body").trigger("custom_evt_video_revoked");

                    hide_video()
                    break;
            }
        }

        //Google Tag Manager event trigger function
        function dataLayer_push_event(_name) {
            dataLayer.push({
                'event': _name
            });
        }

        function load_recaptcha() {
            if ($(".form_using_recaptcha").length || $("input[name='g-recaptcha-response']").length) {
                try {
                    var functional_preference = JSON.parse(CookieControl.getCookie('CookieControl')).optionalCookies
                        .functional;
                } catch (e) {}
                if (functional_preference != "accepted") {
                    CookieControl.hide();
                    setTimeout(function() {
                        location.reload();
                    }, 300);
                }
            }
        }

        function disable_recaptcha_from() {
            $(".form_using_recaptcha, input[name='g-recaptcha-response']").each(function() {
                var form = $(this).parents("form")
                if (!form.length) {
                    form = $(this).parents('div').eq(0).find("form")
                }
                if (form.length) {
                    form.find("input, textarea, button").attr("disabled", true)
                    if (form.is(".footer #frm-update-email")) {
                        // if it is subscription form in footer
                        show_require_cookie_message($(this), "functional")
                        form.find("input, textarea, button").css({
                            "opacity": "0.3"
                        })
                    } else {
                        form.css({
                            "opacity": "0.3"
                        })
                        show_require_cookie_message(form, "functional")
                    }
                }
            })
        }

        function hide_video() {
            var video_selectors = [$("[data-video-id]")];
            $.each(video_selectors, function(index, value) {
                show_require_cookie_message($(this), "video")
                $(this).hide()
            });
        }

        function show_video() {
            try {
                var video_preference = JSON.parse(CookieControl.getCookie('CookieControl')).optionalCookies.video;
            } catch (e) {}
            if (video_preference == "revoked") {
                setTimeout(function() {
                    location.reload();
                }, 300);
            }
        }

        var config = {
            apiKey: '40b18f74b809dfa1832e943a0359d7a4b6ad8d83',
            product: 'COMMUNITY',
            setInnerHTML: true,
            position: 'LEFT',
            theme: 'DARK',
            consentCookieExpiry: 395,
            initialState: 'closed',
            sameSiteCookie: true,
            notifyOnce: true,
            closeStyle: 'button',
            text: {
                intro: 'Some of these cookies are essential, while others are optional and allow you to activate features according to your choices (amongst others: social sharing buttons, widgets for contest, full list below). You may further personalize your choices using the below settings. <br/><br/> For more detailed information about the cookies we use, please see our <a style="text-decoration:underline" href="/cookie-policy" target="_blank">Cookie Policy</a>.<br/><br/>If you disable all, some features won\'t be available.',
                acceptSettings: 'ENABLE ALL',
                rejectSettings: 'DISABLE ALL',
                acceptRecommended: '',
                necessaryTitle: 'Cookies essential to the operation of the site',
                necessaryDescription: 'These mandatory cookies enable essential features. Without them, our site cannot function properly. These cookies can only be deactivated by changing your browser preferences.',
                closeLabel: 'SAVE SETTINGS AND CLOSE'
            },
            necessaryCookies: [
                "ci_session", "visid_incap_*", "incap_ses_*", "CookieControl", "displayed_btm_consent",
                "is_eu_country",
                "AWSALB*"
            ],
            optionalCookies: [{
                name: 'analytic',
                lawfulBasis: 'legitimate interest',
                label: 'Cookies for audience measurement',
                description: 'They help us to improve our website by gathering traffic statistics.',
                cookies: [
                    "piwik_ignore", "MATOMO_SESSID",
                    "__hs_opt_out", "__hs_do_not_track", "__hs_initial_opt_in", "__hs_cookie_cat_pref",
                    "__hs_gpc_banner_dismiss", "__hs_notify_banner_dismiss", "hs_ab_test", "*_key",
                    "hs-messages-is-open", "hs-messages-hide-welcome-message", "__hsmem",
                    "hs-membership-csrf", "hublytics_events_53", "hs.superstore.laboratory.*", "__cfruid",
                    "__cfuvid", "__cf_bm", "__hstc", "hubspotutk", "__hssc", "__hssrc"
                ],
                onAccept: function() {
                    on_accept_cookies("analytic")
                },
                onRevoke: function() {
                    on_revoke_cookies("analytic");
                },
                thirdPartyCookies: [{
                    "name": "HubSpot",
                    "optOutLink": "https://knowledge.hubspot.com/privacy-and-consent/what-cookies-does-hubspot-set-in-a-visitor-s-browser"
                }]
            }, {
                name: 'functional',
                label: 'Functional Cookies',
                description: 'Management of widgets for contests, newsletter subscriptions or other third party functions',
                cookies: ["test_cookie", "IDE", "NID", "ads/ga-audiences", "___utmvc", "rc::a", "rc::c",
                    "rc::b"],
                onAccept: function() {
                    on_accept_cookies("functional");
                    load_recaptcha();
                },
                onRevoke: function() {
                    on_revoke_cookies("functional");
                    disable_recaptcha_from();
                },
                thirdPartyCookies: [{
                        "name": "aboutcookies.org",
                        "optOutLink": "https://aboutcookies.org/"
                    },
                    {
                        "name": "LinkedIn",
                        "optOutLink": "https://www.linkedin.com/help/linkedin/answer/a427660"
                    }
                ]
            }, {
                name: 'video',
                label: 'Video Cookies',
                description: 'We use Youtube services to give you access to videos of our products. These services may deposit third party cookies. However, we use advanced privacy mode proposed by Google (owner of Youtube), which means that no activity is collected by Google to personalize the viewing experience, according to their terms. Setting this to off will disable videos completely.',
                lawfulBasis: 'legitimate interest',
                cookies: ["GPS", "VISITOR_INFO1_LIVE", "YSC", "yt-remote-device-id",
                    "yt-remote-connected-devices", "yt-remote-session-app", "yt-remote-cast-installed",
                    "yt-remote-session-name", "yt-remote-fast-check-period"
                ],
                onAccept: function() {
                    on_accept_cookies("video");
                },
                onRevoke: function() {
                    on_revoke_cookies("video");
                },
                thirdPartyCookies: [{
                        "name": "aboutcookies.org",
                        "optOutLink": "https://aboutcookies.org/"
                    },
                    {
                        "name": "Youtube",
                        "optOutLink": "https://support.google.com/youtube/answer/32050?co=GENIE.Platform%3DDesktop&hl=en"
                    }
                ]
            }],
            onLoad: function() {
                if (gpc) {
                    // disable all cookies
                    CookieControl.rejectAll();
                    // disable accept/on buttons
                    var not_changeable_button_selector_name =
                        "#ccc #cc-panel button:not(#ccc-reject-settings, #ccc-dismiss-button), #ccc #cc-panel input[type='checkbox'], #vt-ccb-notify-accept"
                    $(not_changeable_button_selector_name).attr('disabled', 'disabled');
                    $(document).on("click keypress", not_changeable_button_selector_name, function(e) {
                        e.preventDefault()
                        $(this).prop('disabled', true);
                    })
                    // fade out accept/on buttons
                    var button_fadeOut_selector_name =
                        "#ccc #cc-panel button:not(#ccc-reject-settings, #ccc-dismiss-button), #ccc #cc-panel .checkbox-toggle-label, #vt-ccb-notify-accept"
                    var sheet = document.createElement('style')
                    sheet.innerHTML = button_fadeOut_selector_name +
                        "{pointer-events:none; user-select:none; opacity:0.6;}";
                    document.body.appendChild(sheet);
                    // Add tooltip for "I Accept" button
                    $('#vt-ccb-notify-accept').parent().addClass('ccb-buttons-gpc');
                    var spanText =
                        '<span class="tooltiptext" role="tooltip">Please turn off the Global Privacy Control (GPC) signal.</span>';
                    var tooltipAcceptButton = document.createElement('div');
                    tooltipAcceptButton.classList.add('vt-ccb-notify-accept-overlay');
                    tooltipAcceptButton.classList.add('accept-button-tooltip');
                    tooltipAcceptButton.insertAdjacentHTML('beforeend', spanText);
                    $('#vt-ccb-notify-accept').parent().append(tooltipAcceptButton);

                    $('#ccc-icon').on('click', function() {
                        if ($(this).attr('aria-expanded') === 'true') {
                            var tooltipNotifyButton = document.createElement('div');
                            tooltipNotifyButton.classList.add('recommended-settings-overlay');
                            tooltipNotifyButton.classList.add('cookie-tooltip');
                            tooltipNotifyButton.insertAdjacentHTML('beforeend', spanText);
                            $('#ccc-button-holder').append(tooltipNotifyButton);
                            // show tooltip for toggle cookie button
                            $('.checkbox-toggle-label').each(function() {
                                var tooltipToggle = document.createElement('div');
                                tooltipToggle.classList.add('checkbox-toggle-label-overlay');
                                tooltipToggle.classList.add('cookie-tooltip');
                                tooltipToggle.insertAdjacentHTML('beforeend', spanText);
                                $(this).parent().append(tooltipToggle);
                            });
                        }
                    });
                }
            }
        };

        CookieControl.load(config);
    </script>
    <!-- end civic code -->

    <!-- End Footer -->
</body>

</html>

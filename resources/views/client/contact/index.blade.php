@extends('client.layouts.master')

@section('title', 'Liên hệ với chúng tôi')

@section('content')
    <style>
        .contact-page {
            background: #f8f9fa;
            min-height: 100vh;
            padding: 40px 0;
        }

        .contact-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .contact-header {
            text-align: center;
            margin-bottom: 50px;
        }

        .contact-title {
            font-size: 48px;
            font-weight: 700;
            color: #333;
            margin-bottom: 20px;
            position: relative;
        }

        .contact-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: #dc3545;
            border-radius: 2px;
        }

        .contact-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .contact-info {
            padding: 60px 40px;
            background: white;
        }

        .company-name {
            font-size: 32px;
            font-weight: 700;
            color: #333;
            margin-bottom: 40px;
            line-height: 1.2;
        }

        .contact-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 30px;
            position: relative;
        }

        .contact-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            margin-top: 2px;
            flex-shrink: 0;
        }

        .contact-icon.address {
            color: #dc3545;
        }

        .contact-icon.email {
            color: #dc3545;
        }

        .contact-icon.phone {
            color: #333;
        }

        .contact-icon.postcode {
            color: #333;
        }

        .contact-details {
            flex: 1;
        }

        .contact-label {
            font-weight: 600;
            color: #333;
            font-size: 16px;
            margin-bottom: 5px;
        }

        .contact-text {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
        }

        .contact-map {
            position: relative;
            background: #e9ecef;
        }

        .custom-marker {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            pointer-events: none;
        }

        .marker-pin {
            width: 30px;
            height: 30px;
            background: #dc3545;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
            position: relative;
            animation: markerBounce 2s infinite;
        }

        .marker-pin::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
        }

        .marker-pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: rgba(220, 53, 69, 0.3);
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes markerBounce {

            0%,
            20%,
            50%,
            80%,
            100% {
                transform: rotate(-45deg) translateY(0);
            }

            40% {
                transform: rotate(-45deg) translateY(-8px);
            }

            60% {
                transform: rotate(-45deg) translateY(-4px);
            }
        }

        @keyframes pulse {
            0% {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 1;
            }

            100% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0;
            }
        }

        .map-placeholder {
            width: 100%;
            height: 100%;
            min-height: 500px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6c757d;
            font-size: 18px;
            position: relative;
            overflow: hidden;
        }

        .map-placeholder::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="%23dee2e6" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23mapgrid)"/></svg>');
            opacity: 0.3;
        }

        .map-marker {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background: #dc3545;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg) translate(-50%, -50%);
            transform-origin: 0 0;
            animation: bounce 2s infinite;
        }

        .map-marker::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
        }

        @keyframes bounce {

            0%,
            20%,
            50%,
            80%,
            100% {
                transform: rotate(-45deg) translateY(0);
            }

            40% {
                transform: rotate(-45deg) translateY(-10px);
            }

            60% {
                transform: rotate(-45deg) translateY(-5px);
            }
        }

        .map-text {
            position: relative;
            z-index: 1;
            font-weight: 600;
            color: #495057;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .contact-content {
                grid-template-columns: 1fr;
            }

            .contact-info {
                padding: 40px 30px;
            }

            .contact-title {
                font-size: 36px;
            }

            .company-name {
                font-size: 24px;
            }

            .map-placeholder {
                min-height: 300px;
            }
        }

        @media (max-width: 480px) {
            .contact-container {
                padding: 0 15px;
            }

            .contact-info {
                padding: 30px 20px;
            }

            .contact-title {
                font-size: 28px;
            }

            .company-name {
                font-size: 20px;
            }
        }

        /* Animation */
        .fade-in {
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .slide-in-left {
            animation: slideInLeft 0.8s ease-out;
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .slide-in-right {
            animation: slideInRight 0.8s ease-out;
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    </style>

    <div class="contact-page">
        <div class="contact-container">
            <div class="contact-header fade-in">
                <h1 class="contact-title">Contact Us</h1>
            </div>

            <div class="contact-content">
                <div class="contact-info slide-in-left">
                    <h2 class="company-name">Fanvil Technology Co., Ltd.</h2>

                    <div class="contact-item">
                        <div class="contact-icon address">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <div class="contact-details">
                            <div class="contact-label">Add:</div>
                            <p class="contact-text">10/F Block A, Dualshine Global Science Innovation Center, Honglang North
                                2nd Road, Bao'an District, Shenzhen, China</p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon email">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                        </div>
                        <div class="contact-details">
                            <div class="contact-label">E-mail:</div>
                            <p class="contact-text">sales@fanvil.com<br>support@fanvil.com</p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon phone">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                        </div>
                        <div class="contact-details">
                            <div class="contact-label">Tel:</div>
                            <p class="contact-text">0755-26402199</p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon postcode">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                        </div>
                        <div class="contact-details">
                            <div class="contact-label">P.C.:</div>
                            <p class="contact-text">518100</p>
                        </div>
                    </div>
                </div>

                <div class="contact-map slide-in-right">
                    <!-- Google Maps Embed cho vị trí cụ thể -->
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14901.532474773718!2d105.8352773!3d20.9772743!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad7cbbd47163%3A0x51b052ec539fdb52!2sVintech%20Vi%E1%BB%87t%20Nam%20JSC!5e0!3m2!1svi!2s!4v1750324633195!5m2!1svi!2s"
                        width="100%" height="100%" style="border:0; min-height: 500px;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>

                    <!-- Fallback for map placeholder -->
                    <div class="map-placeholder" style="display: none;">
                        <div class="map-marker"></div>
                        <div class="map-text">Google Maps không thể tải</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Animation on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) translateX(0)';
                    }
                });
            }, observerOptions);

            // Observe animated elements
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                el.style.opacity = '0';
                if (el.classList.contains('slide-in-left')) {
                    el.style.transform = 'translateX(-30px)';
                } else if (el.classList.contains('slide-in-right')) {
                    el.style.transform = 'translateX(30px)';
                } else {
                    el.style.transform = 'translateY(20px)';
                }
                el.style.transition = 'all 0.8s ease-out';
                observer.observe(el);
            });

            // Check if Google Maps iframe loads successfully
            const iframe = document.querySelector('iframe');
            const fallback = document.querySelector('.map-placeholder');

            if (iframe) {
                iframe.addEventListener('error', function() {
                    iframe.style.display = 'none';
                    if (fallback) {
                        fallback.style.display = 'flex';
                    }
                });
            }

            // Hover effects for contact items
            const contactItems = document.querySelectorAll('.contact-item');
            contactItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(10px)';
                    this.style.transition = 'transform 0.3s ease';
                });

                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
        });
    </script>
@endsection

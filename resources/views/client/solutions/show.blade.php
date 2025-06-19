@extends('client.layouts.master')
@section('title', $solution->meta_title ?: $solution->title)
@section('meta_description', $solution->meta_description ?: Str::limit(strip_tags($solution->excerpt ?: $solution->content), 160))
@section('meta_keywords', $solution->meta_keywords ?: ($solution->tagSolutions->count() > 0 ? $solution->tagSolutions->pluck('name')->implode(', ') : ''))

@if ($solution->canonical_url)
    @section('canonical_url', $solution->canonical_url)
@endif

@section('content')
    <main id="main-content" class="body-container-wrapper">
        <style>
            /* Reset & Variables */
            :root {
                --primary-color: #1e9cdb;
                --primary-dark: #1876a3;
                --text-primary: #222222;
                --text-secondary: #555555;
                --text-light: #777777;
                --bg-white: #ffffff;
                --bg-light: #f8f9fa;
                --bg-sidebar: #f5f5f5;
                --border-color: #e5e5e5;
                --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
            }

            * {
                box-sizing: border-box;
            }

            body {
                background-color: var(--bg-light);
            }

            /* Breadcrumb */
            .breadcrumb-section {
                background: var(--bg-white);
                border-bottom: 1px solid var(--border-color);
                padding: 1rem 0;
                margin-bottom: 2rem;
            }

            .breadcrumb-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 1rem;
            }

            .breadcrumb {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: var(--text-light);
            }

            .breadcrumb a {
                color: var(--text-secondary);
                text-decoration: none;
                transition: color 0.3s;
            }

            .breadcrumb a:hover {
                color: var(--primary-color);
            }

            .breadcrumb-separator {
                margin: 0 0.5rem;
                color: var(--text-light);
            }

            /* Main Layout */
            .solution-detail-wrapper {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 1rem;
            }

            .solution-detail-layout {
                display: grid;
                grid-template-columns: 1fr 320px;
                gap: 2rem;
                align-items: start;
            }

            /* Main Content */
            .solution-main-content {
                background: var(--bg-white);
                border-radius: 8px;
                box-shadow: var(--shadow-sm);
                overflow: hidden;
            }

            /* Solution Header */
            .solution-header {
                padding: 2rem;
                border-bottom: 1px solid var(--border-color);
            }

            .solution-category {
                display: inline-block;
                background: var(--primary-color);
                color: white;
                padding: 0.4rem 1rem;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 1rem;
            }

            .solution-title {
                font-size: 32px;
                font-weight: 700;
                line-height: 1.3;
                color: var(--text-primary);
                margin-bottom: 1rem;
            }

            .solution-excerpt {
                font-size: 18px;
                line-height: 1.6;
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: var(--bg-light);
                border-left: 4px solid var(--primary-color);
                border-radius: 4px;
            }

            .solution-meta {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                font-size: 14px;
                color: var(--text-light);
            }

            .meta-item {
                display: flex;
                align-items: center;
                gap: 0.3rem;
            }

            .meta-item i {
                font-size: 16px;
            }

            .author-info {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .author-avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: var(--primary-color);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 12px;
            }

            /* Featured Image */
            .featured-image-container {
                position: relative;
                width: 100%;
                padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
                overflow: hidden;
                background: #f0f0f0;
            }

            .featured-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            /* Solution Content */
            .solution-body {
                padding: 2rem;
            }

            .solution-content {
                font-size: 16px;
                line-height: 1.8;
                color: var(--text-secondary);
            }

            .solution-content h2 {
                font-size: 24px;
                font-weight: 600;
                color: var(--text-primary);
                margin: 2rem 0 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid var(--primary-color);
            }

            .solution-content h3 {
                font-size: 20px;
                font-weight: 600;
                color: var(--text-primary);
                margin: 1.5rem 0 0.8rem;
            }

            .solution-content p {
                margin-bottom: 1.2rem;
                text-align: justify;
            }

            .solution-content ul,
            .solution-content ol {
                margin: 1.2rem 0;
                padding-left: 2rem;
            }

            .solution-content li {
                margin-bottom: 0.5rem;
            }

            .solution-content img {
                max-width: 100%;
                height: auto;
                margin: 1.5rem 0;
                border-radius: 4px;
                box-shadow: var(--shadow-sm);
            }

            .solution-content blockquote {
                background: var(--bg-light);
                border-left: 4px solid var(--primary-color);
                padding: 1rem 1.5rem;
                margin: 1.5rem 0;
                font-style: italic;
            }

            /* Tags */
            .solution-tags {
                padding: 1.5rem 2rem;
                border-top: 1px solid var(--border-color);
            }

            .tags-label {
                font-weight: 600;
                margin-right: 0.5rem;
                color: var(--text-primary);
            }

            .tag-item {
                display: inline-block;
                background: var(--bg-light);
                color: var(--text-secondary);
                padding: 0.3rem 1rem;
                margin: 0.25rem;
                border-radius: 20px;
                font-size: 14px;
                text-decoration: none;
                transition: all 0.3s;
            }

            .tag-item:hover {
                background: var(--primary-color);
                color: white;
            }

            /* Stats Section */
            .solution-stats {
                padding: 1.5rem 2rem;
                border-top: 1px solid var(--border-color);
                background: var(--bg-light);
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                text-align: center;
            }

            .stat-item {
                padding: 1rem;
                background: var(--bg-white);
                border-radius: 6px;
                box-shadow: var(--shadow-sm);
            }

            .stat-number {
                font-size: 24px;
                font-weight: 700;
                color: var(--primary-color);
                display: block;
            }

            .stat-label {
                font-size: 14px;
                color: var(--text-light);
                margin-top: 0.25rem;
            }

            /* Sidebar */
            .solution-sidebar {
                position: sticky;
                top: 2rem;
            }

            /* Search Solution Box */
            .searchSolution-box {
                background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                color: white;
                padding: 2rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
                box-shadow: var(--shadow);
            }

            .searchSolution-title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .searchSolution-subtitle {
                opacity: 0.9;
                margin-bottom: 1.5rem;
                font-size: 14px;
            }

            .searchSolution-form {
                position: relative;
            }

            .searchSolution-input {
                width: 100%;
                padding: 0.8rem 3rem 0.8rem 1rem;
                border: none;
                border-radius: 25px;
                font-size: 14px;
                outline: none;
                transition: all 0.3s;
            }

            .searchSolution-input:focus {
                box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
            }

            .searchSolution-button {
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%);
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.6rem;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .searchSolution-button:hover {
                background: var(--primary-dark);
                transform: translateY(-50%) scale(1.1);
            }

            .searchSolution-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-radius: 8px;
                box-shadow: var(--shadow);
                max-height: 300px;
                overflow-y: auto;
                z-index: 1000;
                display: none;
            }

            .searchSolution-result-item {
                padding: 0.8rem 1rem;
                border-bottom: 1px solid var(--border-color);
                cursor: pointer;
                transition: background 0.3s;
            }

            .searchSolution-result-item:hover {
                background: var(--bg-light);
            }

            .searchSolution-result-item:last-child {
                border-bottom: none;
            }

            .searchSolution-result-title {
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.3rem;
            }

            .searchSolution-result-excerpt {
                font-size: 12px;
                color: var(--text-secondary);
                line-height: 1.4;
            }

            .searchSolution-no-results {
                padding: 1rem;
                text-align: center;
                color: var(--text-light);
                font-size: 14px;
            }

            /* Sidebar Widgets */
            .sidebar-widget {
                background: var(--bg-white);
                border-radius: 8px;
                box-shadow: var(--shadow-sm);
                margin-bottom: 1.5rem;
                overflow: hidden;
            }

            .widget-title {
                background: var(--primary-color);
                color: white;
                padding: 1rem 1.5rem;
                font-size: 16px;
                font-weight: 600;
            }

            .widget-content {
                padding: 1.5rem;
            }

            .category-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .category-item {
                padding: 0.8rem 0;
                border-bottom: 1px solid var(--border-color);
            }

            .category-item:last-child {
                border-bottom: none;
            }

            .category-link {
                color: var(--text-secondary);
                text-decoration: none;
                font-size: 15px;
                display: flex;
                align-items: center;
                transition: color 0.3s;
            }

            .category-link:before {
                content: "•";
                margin-right: 0.5rem;
                color: var(--primary-color);
                font-weight: bold;
            }

            .category-link:hover {
                color: var(--primary-color);
            }

            /* Hotline Box */
            .hotline-box {
                background: var(--primary-color);
                color: white;
                padding: 1.5rem;
                border-radius: 8px;
                text-align: center;
            }

            .hotline-label {
                font-size: 14px;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .hotline-number {
                font-size: 24px;
                font-weight: 700;
            }

            /* Related Solutions */
            .related-solutions-section {
                margin-top: 3rem;
            }

            .section-title {
                font-size: 24px;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid var(--primary-color);
            }

            /* Swiper Container */
            .related-solutions-swiper {
                width: 100%;
                padding-bottom: 2rem;
            }

            .related-solutions-swiper .swiper-wrapper {
                align-items: stretch;
            }

            .related-solutions-swiper .swiper-slide {
                height: auto;
                display: flex;
            }

            .related-solution-card {
                background: var(--bg-white);
                border-radius: 8px;
                overflow: hidden;
                box-shadow: var(--shadow-sm);
                transition: all 0.3s ease;
                text-decoration: none;
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
            }

            .related-solution-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow);
                text-decoration: none;
            }

            .related-solution-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .related-solution-card:hover .related-solution-image {
                transform: scale(1.05);
            }

            .related-solution-content {
                padding: 1.5rem;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
            }

            .related-solution-title {
                font-size: 16px;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.8rem;
                line-height: 1.4;
                flex-grow: 1;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .related-solution-excerpt {
                font-size: 14px;
                color: var(--text-secondary);
                line-height: 1.6;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .related-solution-meta {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                color: var(--text-light);
            }

            .solution-category-badge {
                background: var(--primary-color);
                color: white;
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
            }

            /* Swiper Navigation */
            .swiper-button-next,
            .swiper-button-prev {
                color: var(--primary-color);
                background: var(--bg-white);
                width: 44px;
                height: 44px;
                border-radius: 50%;
                box-shadow: var(--shadow);
                transition: all 0.3s ease;
            }

            .swiper-button-next:after,
            .swiper-button-prev:after {
                font-size: 18px;
                font-weight: 600;
            }

            .swiper-button-next:hover,
            .swiper-button-prev:hover {
                background: var(--primary-color);
                color: white;
                transform: scale(1.1);
            }

            .swiper-button-disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }

            .swiper-button-disabled:hover {
                background: var(--bg-white);
                color: var(--primary-color);
                transform: none;
            }

            /* Swiper Pagination */
            .swiper-pagination {
                position: relative;
                margin-top: 1rem;
            }

            .swiper-pagination-bullet {
                width: 12px;
                height: 12px;
                background: var(--border-color);
                opacity: 1;
                transition: all 0.3s ease;
            }

            .swiper-pagination-bullet-active {
                background: var(--primary-color);
                transform: scale(1.2);
            }

            /* Progress Bar */
            .swiper-scrollbar {
                background: var(--bg-light);
                height: 4px;
                border-radius: 2px;
                margin-top: 1rem;
            }

            .swiper-scrollbar-drag {
                background: var(--primary-color);
                border-radius: 2px;
            }

            /* Loading State */
            .related-solutions-loading {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200px;
                color: var(--text-light);
            }

            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid var(--border-color);
                border-top: 3px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-right: 1rem;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* No Solutions State */
            .no-related-solutions {
                text-align: center;
                padding: 3rem 1rem;
                color: var(--text-light);
            }

            .no-related-solutions i {
                font-size: 48px;
                margin-bottom: 1rem;
                opacity: 0.5;
            }

            /* Responsive Breakpoints */
            @media (max-width: 992px) {
                .related-solution-image {
                    height: 180px;
                }
                
                .related-solution-content {
                    padding: 1.2rem;
                }
                
                .swiper-button-next,
                .swiper-button-prev {
                    width: 40px;
                    height: 40px;
                }
                
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 16px;
                }
            }

            @media (max-width: 768px) {
                .related-solution-image {
                    height: 160px;
                }
                
                .related-solution-title {
                    font-size: 15px;
                }
                
                .related-solution-excerpt {
                    font-size: 13px;
                }
                
                .swiper-button-next,
                .swiper-button-prev {
                    display: none; /* Ẩn arrows trên mobile, chỉ dùng swipe */
                }
            }

            /* Share Buttons */
            .share-section {
                padding: 1.5rem 2rem;
                border-top: 1px solid var(--border-color);
                border-bottom: 1px solid var(--border-color);
                margin-top: 2rem;
            }

            .share-label {
                font-weight: 600;
                margin-right: 1rem;
                color: var(--text-primary);
            }

            .share-buttons {
                display: inline-flex;
                gap: 0.5rem;
            }

            .share-btn {
                display: inline-flex;
                align-items: center;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                text-decoration: none;
                font-size: 14px;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
            }

            .share-btn i {
                margin-right: 0.3rem;
            }

            .share-btn.facebook {
                background: #1877f2;
                color: white;
            }

            .share-btn.twitter {
                background: #1da1f2;
                color: white;
            }

            .share-btn.linkedin {
                background: #0077b5;
                color: white;
            }

            .share-btn.copy {
                background: var(--bg-light);
                color: var(--text-secondary);
                border: 1px solid var(--border-color);
            }

            .share-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }

            /* Responsive */
            @media (max-width: 992px) {
                .solution-detail-layout {
                    grid-template-columns: 1fr;
                }

                .solution-sidebar {
                    position: static;
                    margin-top: 2rem;
                }

                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                /* Related solutions grid fallback */
                .related-solutions-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
            }

            @media (max-width: 768px) {
                .solution-title {
                    font-size: 24px;
                }

                .solution-content {
                    font-size: 15px;
                }

                .solution-meta {
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .share-buttons {
                    flex-wrap: wrap;
                }

                .stats-grid {
                    grid-template-columns: 1fr;
                }
                
                /* Related solutions grid fallback */
                .related-solutions-grid {
                    grid-template-columns: 1fr !important;
                    gap: 1rem;
                }
            }
        </style>

        <!-- Breadcrumb -->
        <div class="breadcrumb-section">
            <div class="breadcrumb-container">
                <nav class="breadcrumb">
                    <a href="{{ route('home') }}">TRANG CHỦ</a>
                    <span class="breadcrumb-separator">/</span>
                    <a href="{{ route('solutions') }}">GIẢI PHÁP</a>
                    <span class="breadcrumb-separator">/</span>
                    @if ($solution->categorySolution)
                        <a href="{{ route('solutions', ['category' => $solution->categorySolution->slug]) }}">
                            {{ strtoupper($solution->categorySolution->name) }}
                        </a>
                        <span class="breadcrumb-separator">/</span>
                    @endif
                    <span>{{ strtoupper(Str::limit($solution->title, 50)) }}</span>
                </nav>
            </div>
        </div>

        <!-- Main Content Layout -->
        <div class="solution-detail-wrapper">
            <div class="solution-detail-layout">
                <!-- Main Content -->
                <div class="solution-main-content">
                    <!-- Solution Header -->
                    <header class="solution-header">
                        @if ($solution->categorySolution)
                            <div class="solution-category">
                                {{ $solution->categorySolution->name }}
                            </div>
                        @endif
                        
                        <h1 class="solution-title">{{ $solution->title }}</h1>
                        
                        @if ($solution->excerpt)
                            <div class="solution-excerpt">
                                {{ $solution->excerpt }}
                            </div>
                        @endif
                        
                        <div class="solution-meta">
                            <span class="meta-item">
                                <i class="far fa-calendar"></i>
                                {{ $solution->published_at ? $solution->published_at->format('d/m/Y') : $solution->created_at->format('d/m/Y') }}
                            </span>
                            <span class="meta-item author-info">
                                <i class="far fa-user"></i>
                                <div class="author-avatar">
                                    {{ strtoupper(substr($solution->user->name, 0, 1)) }}
                                </div>
                                {{ $solution->user->name }}
                            </span>
                            @if ($solution->view_count)
                                <span class="meta-item">
                                    <i class="far fa-eye"></i>
                                    {{ number_format($solution->view_count) }} lượt xem
                                </span>
                            @endif
                            <span class="meta-item">
                                <i class="far fa-clock"></i>
                                {{ $solution->reading_time ?? '5 phút đọc' }}
                            </span>
                        </div>
                    </header>

                    <!-- Featured Image -->
                    @if ($solution->featured_image)
                        <div class="featured-image-container">
                            <img src="{{ Storage::url($solution->featured_image) }}" alt="{{ $solution->title }}" class="featured-image">
                        </div>
                    @endif

                    <!-- Solution Content -->
                    <article class="solution-body">
                        <div class="solution-content">
                            {!! $solution->content !!}
                        </div>
                    </article>

                    <!-- Stats Section -->
                    <div class="solution-stats">
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-number">{{ number_format($solution->view_count ?? 0) }}</span>
                                <span class="stat-label">Lượt xem</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">{{ number_format($solution->like_count ?? 0) }}</span>
                                <span class="stat-label">Lượt thích</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">{{ number_format($solution->comment_count ?? 0) }}</span>
                                <span class="stat-label">Bình luận</span>
                            </div>
                        </div>
                    </div>

                    <!-- Share Section -->
                    <div class="share-section">
                        <span class="share-label">Chia sẻ:</span>
                        <div class="share-buttons">
                            <button class="share-btn facebook" onclick="shareOnFacebook()">
                                <i class="fab fa-facebook-f"></i> Facebook
                            </button>
                            <button class="share-btn twitter" onclick="shareOnTwitter()">
                                <i class="fab fa-twitter"></i> Twitter
                            </button>
                            <button class="share-btn linkedin" onclick="shareOnLinkedIn()">
                                <i class="fab fa-linkedin-in"></i> LinkedIn
                            </button>
                            <button class="share-btn copy" onclick="copyLink()">
                                <i class="far fa-copy"></i> Sao chép
                            </button>
                        </div>
                    </div>

                    <!-- Tags -->
                    @if ($solution->tagSolutions->count() > 0)
                        <div class="solution-tags">
                            <span class="tags-label">Tags:</span>
                            @foreach ($solution->tagSolutions as $tag)
                                <a href="{{ route('solutions', ['tag' => $tag->slug]) }}" class="tag-item">
                                    {{ $tag->name }}
                                </a>
                            @endforeach
                        </div>
                    @endif
                </div>

                <!-- Sidebar -->
                <aside class="solution-sidebar">
                    <!-- Search Solution Box -->
                    <div class="searchSolution-box">
                        <div class="searchSolution-title">
                            <i class="fas fa-search"></i>
                            Tìm kiếm bài viết
                        </div>
                        <div class="searchSolution-subtitle">Nhập từ khóa để tìm kiếm giải pháp phù hợp</div>
                        <div class="searchSolution-form">
                            <input type="text" class="searchSolution-input" placeholder="Nhập từ khóa tìm kiếm..." id="searchSolutionInput">
                            <button type="button" class="searchSolution-button" onclick="performSearchSolution()">
                                <i class="fas fa-search"></i>
                            </button>
                            <div class="searchSolution-results" id="searchSolutionResults"></div>
                        </div>
                    </div>

                    <!-- Solution Categories -->
                    @if (isset($solutionCategories) && $solutionCategories->count() > 0)
                        <div class="sidebar-widget">
                            <h3 class="widget-title">Danh mục giải pháp</h3>
                            <div class="widget-content">
                                <ul class="category-list">
                                    <li class="category-item">
                                        <a href="{{ route('solutions') }}" class="category-link">
                                            TẤT CẢ GIẢI PHÁP
                                        </a>
                                    </li>
                                    @foreach ($solutionCategories as $category)
                                        <li class="category-item">
                                            <a href="{{ route('solutions', ['category' => $category->slug]) }}" class="category-link">
                                                {{ strtoupper($category->name) }}
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    @endif

                    <!-- Featured Solutions -->
                    @if (isset($featuredSolutions) && $featuredSolutions->count() > 0)
                        <div class="sidebar-widget">
                            <h3 class="widget-title">Giải pháp nổi bật</h3>
                            <div class="widget-content">
                                @foreach ($featuredSolutions->take(5) as $featured)
                                    <div class="featured-solution-item" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                                        <a href="{{ route('solutions.show', $featured->slug) }}" style="text-decoration: none; color: inherit;">
                                            <h4 style="font-size: 14px; margin-bottom: 0.5rem; color: var(--text-primary);">
                                                {{ Str::limit($featured->title, 60) }}
                                            </h4>
                                            <p style="font-size: 12px; color: var(--text-light); margin: 0;">
                                                {{ Str::limit($featured->excerpt, 80) }}
                                            </p>
                                        </a>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    <!-- Hotline -->
                    <div class="hotline-box">
                        <div class="hotline-label">
                            <i class="fas fa-phone-alt"></i> Hotline
                        </div>
                        <div class="hotline-number">19006921</div>
                    </div>
                </aside>
            </div>

            <!-- Related Solutions -->
            @if (isset($relatedSolutions) && $relatedSolutions->count() > 0)
                <section class="related-solutions-section">
                    <h2 class="section-title">
                        {{-- <i class="fas fa-lightbulb"></i> --}}
                        Giải pháp liên quan
                        {{-- <span style="font-size: 14px; font-weight: normal; color: var(--text-light);">
                            ({{ $relatedSolutions->count() }} giải pháp)
                        </span> --}}
                    </h2>
                    
                    @if ($relatedSolutions->count() <= 3)
                        <!-- Static Grid for <= 3 solutions -->
                        <div class="related-solutions-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                            @foreach ($relatedSolutions as $relatedSolution)
                                <a href="{{ route('solutions.show', $relatedSolution->slug) }}" class="related-solution-card">
                                    <img src="{{ $relatedSolution->featured_image ? Storage::url($relatedSolution->featured_image) : 'https://placehold.co/350x200/1e9cdb/ffffff?text=' . urlencode(substr($relatedSolution->title, 0, 20)) }}"
                                         alt="{{ $relatedSolution->title }}" class="related-solution-image">
                                    <div class="related-solution-content">
                                        <h3 class="related-solution-title">{{ Str::limit($relatedSolution->title, 60) }}</h3>
                                        <p class="related-solution-excerpt">
                                            {{ Str::limit($relatedSolution->excerpt ?: strip_tags($relatedSolution->content), 100) }}
                                        </p>
                                        <div class="related-solution-meta">
                                            <span>{{ $relatedSolution->view_count ?? 0 }} lượt xem</span>
                                            @if ($relatedSolution->categorySolution)
                                                <span class="solution-category-badge">{{ $relatedSolution->categorySolution->name }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </a>
                            @endforeach
                        </div>
                    @else
                        <!-- Swiper Slideshow for > 3 solutions -->
                        <div class="swiper related-solutions-swiper">
                            <div class="swiper-wrapper">
                                @foreach ($relatedSolutions as $relatedSolution)
                                    <div class="swiper-slide">
                                        <a href="{{ route('solutions.show', $relatedSolution->slug) }}" class="related-solution-card">
                                            <img src="{{ $relatedSolution->featured_image ? Storage::url($relatedSolution->featured_image) : 'https://placehold.co/350x200/1e9cdb/ffffff?text=' . urlencode(substr($relatedSolution->title, 0, 20)) }}"
                                                 alt="{{ $relatedSolution->title }}" class="related-solution-image">
                                            <div class="related-solution-content">
                                                <h3 class="related-solution-title">{{ Str::limit($relatedSolution->title, 60) }}</h3>
                                                <p class="related-solution-excerpt">
                                                    {{ Str::limit($relatedSolution->excerpt ?: strip_tags($relatedSolution->content), 100) }}
                                                </p>
                                                <div class="related-solution-meta">
                                                    <span>{{ $relatedSolution->view_count ?? 0 }} lượt xem</span>
                                                    @if ($relatedSolution->categorySolution)
                                                        <span class="solution-category-badge">{{ $relatedSolution->categorySolution->name }}</span>
                                                    @endif
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                @endforeach
                            </div>
                            
                            <!-- Navigation buttons -->
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                            
                            <!-- Pagination dots -->
                            <div class="swiper-pagination"></div>
                            
                            <!-- Scrollbar -->
                            <div class="swiper-scrollbar"></div>
                        </div>
                    @endif
                </section>
            @else
                <!-- No Related Solutions State -->
                <section class="related-solutions-section">
                    <h2 class="section-title">Giải pháp liên quan</h2>
                    <div class="no-related-solutions">
                        <i class="fas fa-search"></i>
                        <h3>Không có giải pháp liên quan</h3>
                        <p>Hiện tại chưa có giải pháp liên quan nào được tìm thấy.</p>
                        <a href="{{ route('solutions.index') }}" class="cta-button" style="margin-top: 1rem;">
                            Xem tất cả giải pháp
                        </a>
                    </div>
                </section>
            @endif
        </div>

        <script>
            let searchSolutionTimeout;
            let allSolutions = []; // This should be populated with actual solution data from backend

            // Initialize search functionality
            document.addEventListener('DOMContentLoaded', function() {
                const searchSolutionInput = document.getElementById('searchSolutionInput');
                const searchSolutionResults = document.getElementById('searchSolutionResults');

                // Load sample data (replace with actual AJAX call to your backend)
                loadSampleSolutions();

                searchSolutionInput.addEventListener('input', function() {
                    clearTimeout(searchSolutionTimeout);
                    const query = this.value.trim();

                    if (query.length === 0) {
                        searchSolutionResults.style.display = 'none';
                        return;
                    }

                    searchSolutionTimeout = setTimeout(() => {
                        performLiveSearchSolution(query);
                    }, 300);
                });

                // Hide search results when clicking outside
                document.addEventListener('click', function(e) {
                    if (!e.target.closest('.searchSolution-form')) {
                        searchSolutionResults.style.display = 'none';
                    }
                });

                // Show search results when focusing on input
                searchSolutionInput.addEventListener('focus', function() {
                    if (this.value.trim().length > 0) {
                        searchSolutionResults.style.display = 'block';
                    }
                });
            });

            function loadSampleSolutions() {
                // Not needed anymore - we use real-time API calls
                allSolutions = [];
            }

            function performLiveSearchSolution(query) {
                const searchSolutionResults = document.getElementById('searchSolutionResults');
                
                // Show loading state
                searchSolutionResults.innerHTML = '<div class="searchSolution-no-results">Đang tìm kiếm...</div>';
                searchSolutionResults.style.display = 'block';

                // Call API
                fetch(`{{ route('api.solutions.search') }}?q=${encodeURIComponent(query)}`)
                    .then(response => response.json())
                    .then(solutions => {
                        if (solutions.length > 0) {
                            let resultsHTML = '';
                            solutions.slice(0, 5).forEach(solution => {
                                resultsHTML += `
                                    <div class="searchSolution-result-item" onclick="goToSolution('${solution.slug}')">
                                        <div class="searchSolution-result-title">${solution.title}</div>
                                        <div class="searchSolution-result-excerpt">${solution.excerpt}</div>
                                        ${solution.category ? `<div style="font-size: 11px; color: var(--primary-color); margin-top: 2px;">${solution.category}</div>` : ''}
                                    </div>
                                `;
                            });
                            searchSolutionResults.innerHTML = resultsHTML;
                        } else {
                            searchSolutionResults.innerHTML = '<div class="searchSolution-no-results">Không tìm thấy kết quả phù hợp</div>';
                        }
                        searchSolutionResults.style.display = 'block';
                    })
                    .catch(error => {
                        console.error('Error searching solutions:', error);
                        searchSolutionResults.innerHTML = '<div class="searchSolution-no-results">Có lỗi xảy ra khi tìm kiếm</div>';
                        searchSolutionResults.style.display = 'block';
                    });
            }

            function performSearchSolution() {
                const query = document.getElementById('searchSolutionInput').value.trim();
                if (query) {
                    // Redirect to solutions page with search query
                    window.location.href = `{{ route('solutions') }}?search=${encodeURIComponent(query)}`;
                }
            }

            function goToSolution(slug) {
                // Sử dụng URL pattern đúng với routes của bạn
                window.location.href = `/solutions/${slug}`;
            }

            // Handle Enter key in search input
            document.getElementById('searchSolutionInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearchSolution();
                }
            });

            // Share functions
            function shareOnFacebook() {
                const url = encodeURIComponent('{{ url()->current() }}');
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
            }

            function shareOnTwitter() {
                const url = encodeURIComponent('{{ url()->current() }}');
                const title = encodeURIComponent('{{ $solution->title }}');
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
            }

            function shareOnLinkedIn() {
                const url = encodeURIComponent('{{ url()->current() }}');
                const title = encodeURIComponent('{{ $solution->title }}');
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank', 'width=600,height=400');
            }

            function copyLink() {
                const url = '{{ url()->current() }}';
                navigator.clipboard.writeText(url).then(function() {
                    const btn = event.target.closest('.share-btn');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!';
                    btn.style.background = '#28a745';
                    btn.style.color = 'white';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.style.color = '';
                    }, 2000);
                }).catch(function(err) {
                    console.error('Không thể sao chép link: ', err);
                    alert('Không thể sao chép link. Vui lòng thử lại.');
                });
            }

            // Add Font Awesome for icons
            if (!document.querySelector('link[href*="font-awesome"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
                document.head.appendChild(link);
            }

            // Add Swiper CSS and JS
            function loadSwiper() {
                // Load Swiper CSS
                if (!document.querySelector('link[href*="swiper"]')) {
                    const swiperCSS = document.createElement('link');
                    swiperCSS.rel = 'stylesheet';
                    swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
                    document.head.appendChild(swiperCSS);
                }

                // Load Swiper JS
                if (!document.querySelector('script[src*="swiper"]')) {
                    const swiperJS = document.createElement('script');
                    swiperJS.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
                    swiperJS.onload = initializeSwiper;
                    document.head.appendChild(swiperJS);
                } else {
                    // Swiper already loaded
                    initializeSwiper();
                }
            }

            // Initialize Swiper
            function initializeSwiper() {
                const swiperContainer = document.querySelector('.related-solutions-swiper');
                if (!swiperContainer) return;

                const swiper = new Swiper('.related-solutions-swiper', {
                    // Basic settings
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    grabCursor: true,
                    centeredSlides: false,

                    // Responsive breakpoints
                    breakpoints: {
                        // Mobile
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        // Tablet
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        // Desktop
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                        },
                        // Large Desktop
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    },

                    // Navigation arrows
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    // Pagination
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 3,
                    },

                    // Scrollbar
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                        dragSize: 50,
                    },

                    // Auto play (optional)
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },

                    // Effects
                    effect: 'slide',
                    speed: 600,
                    
                    // Touch settings
                    touchRatio: 1,
                    touchAngle: 45,
                    simulateTouch: true,
                    
                    // Keyboard control
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },

                    // Mouse wheel control
                    mousewheel: {
                        forceToAxis: true,
                        sensitivity: 1,
                        releaseOnEdges: true,
                    },

                    // Accessibility
                    a11y: {
                        prevSlideMessage: 'Giải pháp trước',
                        nextSlideMessage: 'Giải pháp tiếp theo',
                        firstSlideMessage: 'Giải pháp đầu tiên',
                        lastSlideMessage: 'Giải pháp cuối cùng',
                    },

                    // Events
                    on: {
                        init: function () {
                            console.log('Related Solutions Swiper initialized');
                        },
                        slideChange: function () {
                            // Optional: Track slide changes for analytics
                            console.log('Slide changed to:', this.activeIndex);
                        },
                        touchStart: function () {
                            // Pause autoplay on touch start
                            this.autoplay.stop();
                        },
                        touchEnd: function () {
                            // Resume autoplay on touch end
                            this.autoplay.start();
                        }
                    }
                });

                // Add custom controls
                addCustomControls(swiper);
            }

            // Add custom controls and features
            function addCustomControls(swiper) {
                const swiperContainer = document.querySelector('.related-solutions-swiper');
                if (!swiperContainer) return;

                // Add slide counter
                const slideCounter = document.createElement('div');
                slideCounter.className = 'swiper-slide-counter';
                slideCounter.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                    z-index: 10;
                `;
                
                function updateSlideCounter() {
                    const current = swiper.realIndex + 1;
                    const total = swiper.slides.length;
                    slideCounter.textContent = `${current} / ${total}`;
                }

                swiperContainer.appendChild(slideCounter);
                updateSlideCounter();

                // Update counter on slide change
                swiper.on('slideChange', updateSlideCounter);

                // Add play/pause button
                const playPauseBtn = document.createElement('button');
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseBtn.className = 'swiper-play-pause';
                playPauseBtn.style.cssText = `
                    position: absolute;
                    top: 10px;
                    left: 15px;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    border: none;
                    padding: 8px;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 10;
                    transition: background 0.3s;
                `;

                let isPlaying = true;
                playPauseBtn.addEventListener('click', function() {
                    if (isPlaying) {
                        swiper.autoplay.stop();
                        this.innerHTML = '<i class="fas fa-play"></i>';
                        isPlaying = false;
                    } else {
                        swiper.autoplay.start();
                        this.innerHTML = '<i class="fas fa-pause"></i>';
                        isPlaying = true;
                    }
                });

                swiperContainer.appendChild(playPauseBtn);

                // Add hover effects
                swiperContainer.addEventListener('mouseenter', function() {
                    swiper.autoplay.stop();
                });

                swiperContainer.addEventListener('mouseleave', function() {
                    if (isPlaying) {
                        swiper.autoplay.start();
                    }
                });
            }

            // Load Swiper when page is ready
            document.addEventListener('DOMContentLoaded', function() {
                // Delay to ensure DOM is fully loaded
                setTimeout(loadSwiper, 100);
            });
        </script>
    </main>
@endsection
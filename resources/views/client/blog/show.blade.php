@extends('client.layouts.master')
@section('title', $post->meta_title ?: $post->title)
@section('meta_description', $post->meta_description ?: Str::limit(strip_tags($post->excerpt ?: $post->content), 160))
@section('meta_keywords', $post->meta_keywords ?: ($post->tags->count() > 0 ? $post->tags->pluck('name')->implode(', ')
    : ''))

    @if ($post->canonical_url)
        @section('canonical_url', $post->canonical_url)
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
                .blog-detail-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .blog-detail-layout {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 2rem;
                    align-items: start;
                }

                /* Main Content */
                .blog-main-content {
                    background: var(--bg-white);
                    border-radius: 8px;
                    box-shadow: var(--shadow-sm);
                    overflow: hidden;
                }

                /* Post Header */
                .post-header {
                    padding: 2rem;
                    border-bottom: 1px solid var(--border-color);
                }

                .post-title {
                    font-size: 32px;
                    font-weight: 700;
                    line-height: 1.3;
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                }

                .post-meta {
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

                /* Featured Image */
                .featured-image-container {
                    position: relative;
                    width: 100%;
                    padding-bottom: 56.25%;
                    /* 16:9 Aspect Ratio */
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

                /* Article Content */
                .article-body {
                    padding: 2rem;
                }

                .article-content {
                    font-size: 16px;
                    line-height: 1.8;
                    color: var(--text-secondary);
                }

                .article-content h2 {
                    font-size: 24px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 2rem 0 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid var(--primary-color);
                }

                .article-content h3 {
                    font-size: 20px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 1.5rem 0 0.8rem;
                }

                .article-content p {
                    margin-bottom: 1.2rem;
                    text-align: justify;
                }

                .article-content ul,
                .article-content ol {
                    margin: 1.2rem 0;
                    padding-left: 2rem;
                }

                .article-content li {
                    margin-bottom: 0.5rem;
                }

                .article-content img {
                    max-width: 100%;
                    height: auto;
                    margin: 1.5rem 0;
                    border-radius: 4px;
                }

                .article-content blockquote {
                    background: var(--bg-light);
                    border-left: 4px solid var(--primary-color);
                    padding: 1rem 1.5rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                }

                /* Tags */
                .post-tags {
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

                /* Sidebar */
                .blog-sidebar {
                    position: sticky;
                    top: 2rem;
                }

                /* Search Box */
                .sidebar-search {
                    background: var(--bg-white);
                    padding: 1.5rem;
                    border-radius: 8px;
                    box-shadow: var(--shadow-sm);
                    margin-bottom: 1.5rem;
                }

                .search-form {
                    position: relative;
                }

                .search-input {
                    width: 100%;
                    padding: 0.75rem 2.5rem 0.75rem 1rem;
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    font-size: 14px;
                }

                .search-btn {
                    position: absolute;
                    right: 0.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: var(--text-light);
                    cursor: pointer;
                    padding: 0.5rem;
                }

                /* Categories Widget */
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

                /* Contact Form */
                .contact-widget {
                    background: var(--primary-color);
                    color: white;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .contact-widget .widget-title {
                    background: rgba(0, 0, 0, 0.1);
                    text-align: center;
                    padding: 1.2rem;
                    font-size: 18px;
                }

                .contact-form {
                    padding: 1.5rem;
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                .form-control {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    background: rgba(255, 255, 255, 0.9);
                }

                .form-control:focus {
                    outline: none;
                    background: white;
                }

                .submit-btn {
                    width: 100%;
                    padding: 0.8rem;
                    background: white;
                    color: var(--primary-color);
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .submit-btn:hover {
                    background: var(--bg-light);
                    transform: translateY(-2px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                }

                /* Hotline Box */
                .hotline-box {
                    background: var(--primary-color);
                    color: white;
                    padding: 1.5rem;
                    border-radius: 8px;
                    text-align: center;
                    margin-top: 1.5rem;
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

                /* Related Posts */
                .related-posts-section {
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

                .related-posts-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                .related-post-card {
                    background: var(--bg-white);
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                    transition: all 0.3s;
                    text-decoration: none;
                }

                .related-post-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow);
                }

                .related-post-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                }

                .related-post-content {
                    padding: 1.2rem;
                }

                .related-post-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    line-height: 1.4;
                }

                .related-post-excerpt {
                    font-size: 14px;
                    color: var(--text-secondary);
                    line-height: 1.6;
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
                    .blog-detail-layout {
                        grid-template-columns: 1fr;
                    }

                    .blog-sidebar {
                        position: static;
                        margin-top: 2rem;
                    }

                    .related-posts-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .post-title {
                        font-size: 24px;
                    }

                    .article-content {
                        font-size: 15px;
                    }

                    .post-meta {
                        flex-wrap: wrap;
                        gap: 1rem;
                    }

                    .related-posts-grid {
                        grid-template-columns: 1fr;
                    }

                    .share-buttons {
                        flex-wrap: wrap;
                    }
                }
            </style>

            <!-- Breadcrumb -->
            <div class="breadcrumb-section">
                <div class="breadcrumb-container">
                    <nav class="breadcrumb">
                        <a href="{{ route('home') }}">TRANG CHỦ</a>
                        <span class="breadcrumb-separator">/</span>
                        @if ($post->category)
                            <a
                                href="{{ route('blog', ['category' => $post->category->slug]) }}">{{ strtoupper($post->category->name) }}</a>
                            <span class="breadcrumb-separator">/</span>
                        @endif
                        <span>{{ strtoupper(Str::limit($post->title, 50)) }}</span>
                    </nav>
                </div>
            </div>

            <!-- Main Content Layout -->
            <div class="blog-detail-wrapper">
                <div class="blog-detail-layout">
                    <!-- Main Content -->
                    <div class="blog-main-content">
                        <!-- Post Header -->
                        <header class="post-header">
                            <h1 class="post-title">{{ $post->title }}</h1>
                            <div class="post-meta">
                                <span class="meta-item">
                                    <i class="far fa-calendar"></i>
                                    {{ $post->published_at ? $post->published_at->format('d/m/Y') : $post->created_at->format('d/m/Y') }}
                                </span>
                                <span class="meta-item">
                                    <i class="far fa-user"></i>
                                    Admin
                                </span>
                                @if ($post->views)
                                    <span class="meta-item">
                                        <i class="far fa-eye"></i>
                                        {{ number_format($post->views) }} lượt xem
                                    </span>
                                @endif
                                <span class="meta-item">
                                    <i class="far fa-clock"></i>
                                    {{ $post->reading_time ?? '5 phút đọc' }}
                                </span>
                            </div>
                        </header>

                        <!-- Featured Image -->
                        @if ($post->thumbnail)
                            <div class="featured-image-container">
                                <img src="{{ asset('storage/' . $post->thumbnail) }}" alt="{{ $post->title }}"
                                    class="featured-image">
                            </div>
                        @endif

                        <!-- Article Content -->
                        <article class="article-body">
                            <div class="article-content">
                                {!! $post->content !!}
                            </div>
                        </article>

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
                        @if ($post->tags->count() > 0)
                            <div class="post-tags">
                                <span class="tags-label">Tags:</span>
                                @foreach ($post->tags as $tag)
                                    <a href="{{ route('blog', ['tag' => $tag->slug]) }}" class="tag-item">
                                        {{ $tag->name }}
                                    </a>
                                @endforeach
                            </div>
                        @endif
                    </div>

                    <!-- Sidebar -->
                    <aside class="blog-sidebar">
                        <!-- Search Box -->
                        <div class="sidebar-search">
                            <form class="search-form" action="{{ route('blog') }}" method="GET">
                                <input type="text" name="search" class="search-input" placeholder="Tìm kiếm..."
                                    value="{{ request('search') }}">
                                <button type="submit" class="search-btn">
                                    <i class="fas fa-search"></i>
                                </button>
                            </form>
                        </div>

                        <!-- Categories -->
                        <div class="sidebar-widget">
                            <h3 class="widget-title">Danh mục tin tức</h3>
                            <div class="widget-content">
                                <ul class="category-list">
                                    <li class="category-item">
                                        <a href="{{ route('blog') }}" class="category-link">TIN TỨC NỔI BẬT</a>
                                    </li>
                                    @if (isset($categories) && $categories->count() > 0)
                                        @foreach ($categories as $category)
                                            <li class="category-item">
                                                <a href="{{ route('blog', ['category' => $category->slug]) }}"
                                                    class="category-link">
                                                    {{ strtoupper($category->name) }}
                                                </a>
                                            </li>
                                        @endforeach
                                    @endif
                                </ul>
                            </div>
                        </div>

                        <!-- Contact Form -->
                        <div class="sidebar-widget contact-widget">
                            <h3 class="widget-title">ĐĂNG KÝ NHẬN TƯ VẤN</h3>
                            <form class="contact-form" id="consultForm">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Họ và tên" name="name" required>
                                </div>
                                <div class="form-group">
                                    <input type="tel" class="form-control" placeholder="Số điện thoại" name="phone"
                                        required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Khu vực" name="area">
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control" placeholder="Lời nhắn" name="message" rows="3"></textarea>
                                </div>
                                <button type="submit" class="submit-btn">GỬI ĐI</button>
                            </form>
                        </div>

                        <!-- Hotline -->
                        <div class="hotline-box">
                            <div class="hotline-label">
                                <i class="fas fa-phone-alt"></i> Hotline
                            </div>
                            <div class="hotline-number">19006921</div>
                        </div>
                    </aside>
                </div>

                <!-- Related Posts -->
                @if (isset($relatedPosts) && $relatedPosts->count() > 0)
                    <section class="related-posts-section">
                        <h2 class="section-title">Bài viết liên quan</h2>
                        <div class="related-posts-grid">
                            @foreach ($relatedPosts as $relatedPost)
                                <a href="{{ route('blog.show', $relatedPost->slug) }}" class="related-post-card">
                                    <img src="{{ $relatedPost->thumbnail ? asset('storage/' . $relatedPost->thumbnail) : asset('images/blog-placeholder.jpg') }}"
                                        alt="{{ $relatedPost->title }}" class="related-post-image">
                                    <div class="related-post-content">
                                        <h3 class="related-post-title">{{ Str::limit($relatedPost->title, 60) }}</h3>
                                        <p class="related-post-excerpt">
                                            {{ Str::limit($relatedPost->excerpt ?: strip_tags($relatedPost->content), 100) }}
                                        </p>
                                    </div>
                                </a>
                            @endforeach
                        </div>
                    </section>
                @endif
            </div>

            <script>
                // Share functions
                function shareOnFacebook() {
                    const url = encodeURIComponent('{{ url()->current() }}');
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
                }

                function shareOnTwitter() {
                    const url = encodeURIComponent('{{ url()->current() }}');
                    const title = encodeURIComponent('{{ $post->title }}');
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
                }

                function shareOnLinkedIn() {
                    const url = encodeURIComponent('{{ url()->current() }}');
                    const title = encodeURIComponent('{{ $post->title }}');
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank',
                        'width=600,height=400');
                }

                function copyLink() {
                    const url = '{{ url()->current() }}';
                    navigator.clipboard.writeText(url).then(function() {
                        // Show notification
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

                // Contact form submission
                document.getElementById('consultForm').addEventListener('submit', function(e) {
                    e.preventDefault();

                    // Get form data
                    const formData = new FormData(this);

                    // Here you would normally send the data to your server
                    // For now, we'll just show a success message

                    const submitBtn = this.querySelector('.submit-btn');
                    const originalText = submitBtn.textContent;

                    submitBtn.textContent = 'ĐANG GỬI...';
                    submitBtn.disabled = true;

                    // Simulate API call
                    setTimeout(() => {
                        submitBtn.textContent = 'GỬI THÀNH CÔNG!';
                        submitBtn.style.background = '#28a745';

                        // Reset form
                        this.reset();

                        // Reset button after 3 seconds
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 3000);
                    }, 1000);
                });

                // Add Font Awesome for icons
                if (!document.querySelector('link[href*="font-awesome"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
                    document.head.appendChild(link);
                }
            </script>
        </main>
    @endsection

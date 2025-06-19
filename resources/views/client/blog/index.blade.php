@extends('client.layouts.master')
@section('title', 'Trang tin tức')
@section('content')
    <main role="main" id="main-content">

        <script>
            $(function() {
                // move request quote button to the end of nav menu
                $('.navi>li>a[href*="support/request_quote"]').parent('li.panel').insertAfter(
                    "#navigation-sub li.panel:last")
            });
        </script>
        <h1 class="sr-only">Blog & Tin Tức</h1>

        <div class="clear"></div>
        <div class="clear visible-xs"></div>
        <div class="clear"></div>
        <div class="page_content breadcrumb ">
            <nav aria-label="breadcrumbs">
                <ul>
                    <li>
                        {{-- <a href="/" title="Homepage">
                            <img src="/themes/site/image/icons_home.png" class="img-home" alt="Homepage"
                                style="width: 20px;" />
                        </a> --}}
                    </li>
                    <li class="title">
                        <span>Trang chủ / </span>
                    </li>
                    <li>
                        <span>Blog</span>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="clear"></div>

        <div class="page_content videos-images press-releases-page">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <div class="section-header">
                        <h2 class="uppercase">Blog & Tin Tức</h2>
                    </div>
                </div>
            </div>
            <!-- Filter Section -->
        <div class="page_content">
            <div class="row">
                <div class="col-xs-12">
                    <form action="{{ route('blog') }}" method="GET" class="row"
                        style="margin-bottom: 30px; padding: 15px; background: #f8f9fa;">
                        <div class="col-md-4 col-sm-6 col-xs-12">
                            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm bài viết..."
                                value="{{ request('search') }}">
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <select name="category" class="form-control" onchange="this.form.submit()">
                                <option value="">Tất cả chuyên mục</option>
                                @if (isset($categories))
                                    @foreach ($categories as $category)
                                        <option value="{{ $category->slug }}"
                                            {{ request('category') === $category->slug ? 'selected' : '' }}>
                                            {{ $category->name }}
                                        </option>
                                    @endforeach
                                @endif
                            </select>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <select name="sort" class="form-control" onchange="this.form.submit()">
                                <option value="latest" {{ request('sort') === 'latest' ? 'selected' : '' }}>Mới nhất
                                </option>
                                <option value="oldest" {{ request('sort') === 'oldest' ? 'selected' : '' }}>Cũ nhất</option>
                                <option value="popular" {{ request('sort') === 'popular' ? 'selected' : '' }}>Phổ biến
                                </option>
                            </select>
                        </div>
                        <div class="col-md-2 col-sm-6 col-xs-12">
                            <button type="submit" class="btn btn-primary btn-block">Tìm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            <div class="row">
                <div class="col-xs-12">
                    @if (isset($posts) && $posts->count() > 0)
                        <ul class="list-post">
                            @foreach ($posts as $post)
                                <li class="item col-md-3 col-sm-4 col-xs-12">
                                    <div class="item-card bg-none" role="group" aria-label="article">
                                        <div class="image">
                                            <img style="cursor: default"
                                                src="{{ $post->thumbnail ? asset('storage/' . $post->thumbnail) : asset('images/blog-placeholder.jpg') }}"
                                                alt="{{ $post->title }}" />
                                        </div>
                                        <div class="content col-xs-12">
                                            <h2 class="title">{{ $post->title }}</h2>
                                            <p class="desc">
                                                {{ Str::limit($post->excerpt ?: strip_tags($post->content), 150) }}
                                            </p>
                                            <style>
                                                .read-more-blog .aa {
                                                    display: inline-block;
                                                    padding: 10px 20px;
                                                    border: 1px solid #000;
                                                    color: #000;
                                                    font-weight: bold;
                                                    text-decoration: none;
                                                    font-size: 14px;
                                                    box-sizing: border-box;
                                                    transition: all 0.3s ease;
                                                }

                                                .read-more-blog .aa:hover {
                                                    background-color: #000;
                                                    color: #fff;
                                                }
                                            </style>

                                            <div class="read-more-blog">
                                                <a class="aa" href="{{ route('blog.show', $post->slug) }}">Read
                                                    More</a>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            @endforeach
                        </ul>

                        <!-- Debug Info -->
                        {{-- <div style="background: lightgreen; padding: 10px; margin: 10px;">
                            <strong>Success!</strong> Found {{ $posts->count() }} posts (Total: {{ $posts->total() }})
                        </div> --}}

                        <!-- Pagination -->
                        @if ($posts->hasPages())
                            <div class="row">
                                <div class="col-xs-12 text-center">
                                    {{ $posts->appends(request()->query())->links() }}
                                </div>
                            </div>
                        @endif
                    @else
                        <ul class="list-post">
                            <li class="item col-md-12 col-sm-12 col-xs-12">
                                <div class="text-center" style="padding: 50px 20px;">
                                    <h3 style="font-size: 2rem; color: #333;">
                                        Không tìm thấy bài viết nào
                                    </h3>

                                    <!-- Debug info -->
                                    {{-- <div class="debug-info" style="font-size: 1rem; color: #666; margin-top: 20px;">
                                        <p>Posts variable: {{ isset($posts) ? 'exists' : 'NOT exists' }}</p>
                                        @if (isset($posts))
                                            <p>Posts count: {{ $posts->count() }}</p>
                                            <p>Posts total: {{ $posts->total() ?? 'N/A' }}</p>
                                        @endif
                                    </div> --}}
                                </div>
                            </li>
                        </ul>
                    @endif
                </div>
            </div>
        </div>

        <script type="text/javascript">
            $(document).ready(function() {
                // Handle click on blog post item
                $(".press-releases-page .list-post .item .item-card").each(function() {
                    var link = $(this).find("a").attr('href');
                    $(this).find("img, .title").on("click", function() {
                        if (link) {
                            window.location.href = link;
                        }
                    })
                });
            });
        </script>
    </main>
@endsection

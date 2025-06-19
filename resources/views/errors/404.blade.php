@extends('client.layouts.master')

@section('title', '404 Not Found')

@section('content')
    <style>
        .notfound {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
            flex-direction: column;
            text-align: center;
            font-family: Arial, sans-serif;
        }

        .notfound h1 {
            font-size: 6rem;
            color: black;
        }

        .notfound p {
            font-size: 1.5rem;
            color: #555;
        }

        .notfound a {
            margin-top: 20px;
            display: inline-block;
            padding: 10px 20px;
            color: white;
            background-color: black;
            text-decoration: none;
            border-radius: 5px;
        }

        .notfound a:hover {
            background-color: #e61d27;
        }
    </style>

    <div class="notfound">
        <h1>404</h1>
        <p>Trang bạn tìm kiếm không tồn tại.</p>
        <a href="{{ url('/') }}">Quay về trang chủ</a>
    </div>
@endsection

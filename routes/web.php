<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('client.index');
});
Route::get('/product', function () {
    return view('client.products.index');
});
Route::get('/show', function () {
    return view('client.products.show');
});
Route::get('/dashboard', function () {
    return view('admin.index');
});
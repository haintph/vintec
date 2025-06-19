<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo category mẫu nếu chưa có (chỉ với các trường có trong bảng)
        $category = Category::firstOrCreate(
            ['name' => 'Hotel Phones'],
            [
                'slug' => 'hotel-phones',
                'is_active' => true
            ]
        );

        // Dữ liệu sản phẩm mẫu
        $products = [
            [
                'product_code' => 'NG-A3211',
                'name' => 'Next Gen 1-Line Analog Corded Phone',
                'description' => 'Professional 1-line analog corded phone designed specifically for hotel environments. Features premium build quality and reliable performance.',
                'specs' => json_encode([
                    'Type' => '1-Line Analog Corded',
                    'Display' => 'LCD with backlight',
                    'Features' => ['Caller ID', 'Call Waiting', 'Redial', 'Mute'],
                    'Power' => 'Line powered',
                    'Dimensions' => '8.5" x 7.2" x 3.1"',
                    'Weight' => '2.2 lbs',
                    'Warranty' => '2 years'
                ]),
                'image' => 'ng-a3211.jpg',
                'meta_title' => 'NG-A3211 Hotel Phone - Professional 1-Line Analog',
                'meta_description' => 'Professional 1-line analog corded phone for hotels. Features caller ID, call waiting, and premium build quality.',
                'meta_keywords' => 'hotel phone, analog phone, corded phone, hospitality'
            ],
            [
                'product_code' => 'NG-A3212',
                'name' => 'Next Gen 2-Line Analog Corded Phone',
                'description' => 'Advanced 2-line analog corded phone with enhanced features for busy hotel operations. Perfect for front desk and management use.',
                'specs' => json_encode([
                    'Type' => '2-Line Analog Corded',
                    'Display' => 'Large LCD with backlight',
                    'Features' => ['Dual Line Support', 'Caller ID', 'Call Transfer', 'Conference Call', 'Hold', 'Mute'],
                    'Power' => 'Line powered + AC adapter',
                    'Dimensions' => '9.0" x 7.5" x 3.5"',
                    'Weight' => '2.8 lbs',
                    'Warranty' => '2 years'
                ]),
                'image' => 'ng-a3212.jpg',
                'meta_title' => 'NG-A3212 Hotel Phone - Professional 2-Line Analog',
                'meta_description' => 'Advanced 2-line analog phone for hotels with call transfer, conference features, and enhanced functionality.',
                'meta_keywords' => 'hotel phone, 2-line phone, analog phone, hospitality, front desk'
            ],
            [
                'product_code' => 'NG-VIP',
                'name' => 'Next Gen VIP Suite Phone',
                'description' => 'Premium VIP suite phone with luxury design and advanced features. Perfect for high-end hotel suites and executive rooms.',
                'specs' => json_encode([
                    'Type' => 'VIP Suite Phone',
                    'Display' => 'Premium LCD with ambient lighting',
                    'Features' => ['Bluetooth Connectivity', 'USB Charging Port', 'Premium Materials', 'Customizable Ringtones', 'Do Not Disturb'],
                    'Power' => 'AC powered with battery backup',
                    'Dimensions' => '10.0" x 8.0" x 4.0"',
                    'Weight' => '3.5 lbs',
                    'Warranty' => '3 years premium'
                ]),
                'image' => 'ng-vip.jpg',
                'meta_title' => 'NG-VIP Suite Phone - Luxury Hotel Phone System',
                'meta_description' => 'Premium VIP suite phone with Bluetooth, USB charging, and luxury design for high-end hotel accommodations.',
                'meta_keywords' => 'VIP phone, luxury hotel phone, suite phone, premium hospitality'
            ]
        ];

        // Tạo sản phẩm
        foreach ($products as $productData) {
            Product::create([
                'product_code' => $productData['product_code'],
                'name' => $productData['name'],
                'description' => $productData['description'],
                'specs' => $productData['specs'],
                'image' => $productData['image'],
                'category_id' => $category->id,
                'is_active' => true,
                'meta_title' => $productData['meta_title'],
                'meta_description' => $productData['meta_description'],
                'meta_keywords' => $productData['meta_keywords']
            ]);
        }

        $this->command->info('3 sample products created successfully!');
    }
}
<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class ProductVariantSeeder extends Seeder
{
    public function run()
    {
        // Danh sách màu sắc phổ biến
        $colors = [
            ['name' => 'Đỏ', 'code' => '#FF0000'],
            ['name' => 'Xanh dương', 'code' => '#0000FF'],
            ['name' => 'Xanh lá', 'code' => '#00FF00'],
            ['name' => 'Vàng', 'code' => '#FFFF00'],
            ['name' => 'Tím', 'code' => '#800080'],
            ['name' => 'Cam', 'code' => '#FFA500'],
            ['name' => 'Hồng', 'code' => '#FF69B4'],
            ['name' => 'Đen', 'code' => '#000000'],
            ['name' => 'Trắng', 'code' => '#FFFFFF'],
            ['name' => 'Xám', 'code' => '#808080'],
            ['name' => 'Nâu', 'code' => '#8B4513'],
            ['name' => 'Bạc', 'code' => '#C0C0C0'],
            ['name' => 'Vàng đồng', 'code' => '#B8860B'],
            ['name' => 'Xanh navy', 'code' => '#000080'],
            ['name' => 'Xanh ngọc', 'code' => '#40E0D0']
        ];

        // Lấy tất cả sản phẩm
        $products = Product::all();

        echo "Đang tạo biến thể cho " . $products->count() . " sản phẩm...\n";

        foreach ($products as $index => $product) {
            // Random số lượng biến thể (1-4 biến thể)
            $variantCount = rand(1, 4);
            
            // Lấy random màu sắc không trùng lặp
            $selectedColors = collect($colors)->random($variantCount);
            
            echo "Sản phẩm #{$product->id} - {$product->name}: {$variantCount} biến thể\n";

            foreach ($selectedColors as $colorIndex => $color) {
                // Tính giá biến thể dựa trên giá gốc (+-20%)
                $basePrice = $product->price;
                $priceVariation = rand(-20, 20); // -20% đến +20%
                $variantPrice = $basePrice + ($basePrice * $priceVariation / 100);
                
                // Làm tròn giá đến hàng nghìn
                $variantPrice = round($variantPrice / 1000) * 1000;
                
                // Đảm bảo giá không âm
                $variantPrice = max($variantPrice, 10000);

                ProductVariant::create([
                    'product_id' => $product->id,
                    'name' => $color['name'],
                    'color_code' => $color['code'],
                    'image' => null, // Sẽ upload ảnh thực tế sau
                    'price' => $variantPrice,
                    'is_active' => rand(1, 10) <= 8 // 80% chance active
                ]);

                echo "  - {$color['name']} ({$color['code']}): " . number_format($variantPrice, 0, ',', '.') . " VNĐ\n";
            }

            echo "\n";
        }

        $totalVariants = ProductVariant::count();
        echo "✅ Đã tạo thành công {$totalVariants} biến thể sản phẩm!\n";
        
        // Thống kê
        $activeVariants = ProductVariant::where('is_active', true)->count();
        $inactiveVariants = ProductVariant::where('is_active', false)->count();
        
        echo "📊 Thống kê:\n";
        echo "   - Biến thể hoạt động: {$activeVariants}\n";
        echo "   - Biến thể tạm ẩn: {$inactiveVariants}\n";
        
        // Hiển thị một số sản phẩm mẫu
        echo "\n🎨 Một số sản phẩm có biến thể:\n";
        $sampleProducts = Product::with('variants')->whereHas('variants')->take(3)->get();
        
        foreach ($sampleProducts as $product) {
            echo "• {$product->name} ({$product->variants->count()} màu): {$product->price_range}\n";
            foreach ($product->variants as $variant) {
                $status = $variant->is_active ? '✓' : '✗';
                echo "  {$status} {$variant->name}: " . number_format($variant->price, 0, ',', '.') . " VNĐ\n";
            }
        }
    }
}
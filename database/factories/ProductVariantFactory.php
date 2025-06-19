<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductVariantFactory extends Factory
{
    protected $model = ProductVariant::class;

    public function definition()
    {
        $colors = [
            ['name' => 'Đỏ', 'code' => '#FF0000'],
            ['name' => 'Xanh dương', 'code' => '#0000FF'],
            ['name' => 'Xanh lá', 'code' => '#00FF00'],
            ['name' => 'Vàng', 'code' => '#FFFF00'],
            ['name' => 'Tím', 'code' => '#800080'],
            ['name' => 'Cam', 'code' => '#FFA500'],
            ['name' => 'Hồng', 'code' => '#FFC0CB'],
            ['name' => 'Đen', 'code' => '#000000'],
            ['name' => 'Trắng', 'code' => '#FFFFFF'],
            ['name' => 'Xám', 'code' => '#808080'],
        ];

        $color = $this->faker->randomElement($colors);

        return [
            'product_id' => Product::factory(),
            'name' => $color['name'],
            'color_code' => $color['code'],
            'image' => null, // Sẽ được upload thực tế
            'price' => $this->faker->randomFloat(2, 100000, 5000000), // 100k - 5M VNĐ
            'is_active' => $this->faker->boolean(85), // 85% chance active
        ];
    }

    /**
     * State để tạo biến thể không hoạt động
     */
    public function inactive()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false,
            ];
        });
    }

    /**
     * State để tạo biến thể với giá cao
     */
    public function expensive()
    {
        return $this->state(function (array $attributes) {
            return [
                'price' => $this->faker->randomFloat(2, 2000000, 10000000), // 2M - 10M VNĐ
            ];
        });
    }
}

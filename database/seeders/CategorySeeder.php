<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Điện tử', 
                'img_category' => null, 
                'is_active' => true
            ],
            [
                'name' => 'Thời trang', 
                'img_category' => null, 
                'is_active' => true
            ],
            [
                'name' => 'Sách', 
                'img_category' => null, 
                'is_active' => true
            ],
            [
                'name' => 'Nhà cửa & Sân vườn', 
                'img_category' => null, 
                'is_active' => false
            ],
            [
                'name' => 'Thể thao', 
                'img_category' => null, 
                'is_active' => true
            ],
            [
                'name' => 'Làm đẹp & Sức khỏe', 
                'img_category' => null, 
                'is_active' => false
            ],
        ];

        foreach ($categories as $category) {
            // Slug sẽ được tự động tạo trong model boot method
            Category::create($category);
        }
    }
}

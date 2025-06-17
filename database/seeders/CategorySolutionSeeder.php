<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CategorySolution;

class CategorySolutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Giải pháp Web',
                'slug' => 'giai-phap-web',
                'description' => 'Các giải pháp phát triển website chuyên nghiệp',
                'meta_title' => 'Giải pháp Web - Phát triển website chuyên nghiệp',
                'meta_description' => 'Cung cấp các giải pháp phát triển website hiện đại, tối ưu SEO và trải nghiệm người dùng.',
                'meta_keywords' => 'giải pháp web, phát triển website, thiết kế web',
                'canonical_url' => 'https://example.com/giai-phap-web',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Giải pháp Mobile',
                'slug' => 'giai-phap-mobile',
                'description' => 'Phát triển ứng dụng di động đa nền tảng',
                'meta_title' => 'Giải pháp Mobile - Ứng dụng di động chuyên nghiệp',
                'meta_description' => 'Phát triển ứng dụng mobile iOS, Android với công nghệ hiện đại.',
                'meta_keywords' => 'giải pháp mobile, ứng dụng di động, iOS, Android',
                'canonical_url' => 'https://example.com/giai-phap-mobile',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Giải pháp E-commerce',
                'slug' => 'giai-phap-e-commerce',
                'description' => 'Xây dựng hệ thống thương mại điện tử hoàn chỉnh',
                'meta_title' => 'Giải pháp E-commerce - Thương mại điện tử',
                'meta_description' => 'Thiết kế và phát triển website bán hàng online chuyên nghiệp.',
                'meta_keywords' => 'e-commerce, thương mại điện tử, bán hàng online',
                'canonical_url' => 'https://example.com/giai-phap-e-commerce',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Giải pháp ERP',
                'slug' => 'giai-phap-erp',
                'description' => 'Hệ thống quản trị doanh nghiệp tổng thể',
                'meta_title' => 'Giải pháp ERP - Quản trị doanh nghiệp',
                'meta_description' => 'Phần mềm ERP giúp quản lý toàn bộ hoạt động doanh nghiệp hiệu quả.',
                'meta_keywords' => 'ERP, quản trị doanh nghiệp, phần mềm quản lý',
                'canonical_url' => 'https://example.com/giai-phap-erp',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Giải pháp CRM',
                'slug' => 'giai-phap-crm',
                'description' => 'Quản lý quan hệ khách hàng chuyên nghiệp',
                'meta_title' => 'Giải pháp CRM - Quản lý khách hàng',
                'meta_description' => 'Hệ thống CRM giúp quản lý khách hàng và tăng doanh số bán hàng.',
                'meta_keywords' => 'CRM, quản lý khách hàng, chăm sóc khách hàng',
                'canonical_url' => 'https://example.com/giai-phap-crm',
                'sort_order' => 5,
                'is_active' => true,
            ]
        ];

        foreach ($categories as $category) {
            CategorySolution::create($category);
        }
    }
}
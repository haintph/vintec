<?php

namespace Database\Seeders;

use App\Models\TagSolution;
use Illuminate\Database\Seeder;

class TagSolutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
                'description' => 'Phát triển website và ứng dụng web hiện đại',
                'meta_title' => 'Web Development - Phát triển Website chuyên nghiệp',
                'meta_description' => 'Tìm hiểu về phát triển website, ứng dụng web với các công nghệ hiện đại như HTML, CSS, JavaScript, PHP, Laravel.',
                'meta_keywords' => 'web development, phát triển web, website, HTML, CSS, JavaScript',
                'sort_order' => 1,
                'is_active' => true,
                'post_count' => 15
            ],
            [
                'name' => 'Mobile App',
                'slug' => 'mobile-app',
                'description' => 'Phát triển ứng dụng di động cho iOS và Android',
                'meta_title' => 'Mobile App Development - Phát triển ứng dụng di động',
                'meta_description' => 'Học phát triển ứng dụng di động với React Native, Flutter, iOS Swift, Android Kotlin.',
                'meta_keywords' => 'mobile app, ứng dụng di động, iOS, Android, React Native, Flutter',
                'sort_order' => 2,
                'is_active' => true,
                'post_count' => 12
            ],
            [
                'name' => 'E-commerce',
                'slug' => 'e-commerce',
                'description' => 'Giải pháp thương mại điện tử và bán hàng online',
                'meta_title' => 'E-commerce Solutions - Giải pháp thương mại điện tử',
                'meta_description' => 'Xây dựng website thương mại điện tử, cửa hàng online với các tính năng hoàn chỉnh.',
                'meta_keywords' => 'e-commerce, thương mại điện tử, bán hàng online, website bán hàng',
                'sort_order' => 3,
                'is_active' => true,
                'post_count' => 8
            ],
            [
                'name' => 'UI/UX Design',
                'slug' => 'ui-ux-design',
                'description' => 'Thiết kế giao diện và trải nghiệm người dùng',
                'meta_title' => 'UI/UX Design - Thiết kế giao diện người dùng',
                'meta_description' => 'Tìm hiểu về thiết kế UI/UX, nguyên tắc thiết kế, công cụ Figma, Adobe XD.',
                'meta_keywords' => 'UI design, UX design, thiết kế giao diện, Figma, Adobe XD',
                'sort_order' => 4,
                'is_active' => true,
                'post_count' => 10
            ],
            [
                'name' => 'SEO',
                'slug' => 'seo',
                'description' => 'Tối ưu hóa công cụ tìm kiếm',
                'meta_title' => 'SEO - Tối ưu hóa công cụ tìm kiếm',
                'meta_description' => 'Học SEO từ cơ bản đến nâng cao, tối ưu website lên top Google.',
                'meta_keywords' => 'SEO, tối ưu hóa, Google, từ khóa, ranking',
                'sort_order' => 5,
                'is_active' => true,
                'post_count' => 20
            ],
            [
                'name' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'description' => 'Marketing số và quảng cáo trực tuyến',
                'meta_title' => 'Digital Marketing - Marketing số chuyên nghiệp',
                'meta_description' => 'Chiến lược marketing số hiệu quả với Facebook Ads, Google Ads, Content Marketing.',
                'meta_keywords' => 'digital marketing, marketing số, Facebook Ads, Google Ads, content marketing',
                'sort_order' => 6,
                'is_active' => true,
                'post_count' => 14
            ],
            [
                'name' => 'Cloud Computing',
                'slug' => 'cloud-computing',
                'description' => 'Điện toán đám mây và dịch vụ cloud',
                'meta_title' => 'Cloud Computing - Điện toán đám mây',
                'meta_description' => 'Tìm hiểu về AWS, Google Cloud, Azure và các dịch vụ điện toán đám mây.',
                'meta_keywords' => 'cloud computing, AWS, Google Cloud, Azure, điện toán đám mây',
                'sort_order' => 7,
                'is_active' => true,
                'post_count' => 6
            ],
            [
                'name' => 'Cybersecurity',
                'slug' => 'cybersecurity',
                'description' => 'Bảo mật thông tin và an ninh mạng',
                'meta_title' => 'Cybersecurity - Bảo mật thông tin',
                'meta_description' => 'Học về bảo mật website, an ninh mạng, phòng chống tấn công mạng.',
                'meta_keywords' => 'cybersecurity, bảo mật, an ninh mạng, security, hacker',
                'sort_order' => 8,
                'is_active' => true,
                'post_count' => 4
            ],
            [
                'name' => 'Blockchain',
                'slug' => 'blockchain',
                'description' => 'Công nghệ blockchain và cryptocurrency',
                'meta_title' => 'Blockchain Technology - Công nghệ blockchain',
                'meta_description' => 'Tìm hiểu về blockchain, smart contract, DeFi, NFT và các ứng dụng.',
                'meta_keywords' => 'blockchain, cryptocurrency, Bitcoin, smart contract, DeFi, NFT',
                'sort_order' => 9,
                'is_active' => true,
                'post_count' => 3
            ],
            [
                'name' => 'Machine Learning',
                'slug' => 'machine-learning',
                'description' => 'Học máy và trí tuệ nhân tạo',
                'meta_title' => 'Machine Learning - Học máy và AI',
                'meta_description' => 'Học về machine learning, deep learning, Python, TensorFlow, AI applications.',
                'meta_keywords' => 'machine learning, AI, trí tuệ nhân tạo, Python, TensorFlow, deep learning',
                'sort_order' => 10,
                'is_active' => true,
                'post_count' => 7
            ],
            [
                'name' => 'DevOps',
                'slug' => 'devops',
                'description' => 'Phát triển và vận hành phần mềm',
                'meta_title' => 'DevOps - Development và Operations',
                'meta_description' => 'Tìm hiểu về DevOps, CI/CD, Docker, Kubernetes, automation tools.',
                'meta_keywords' => 'DevOps, CI/CD, Docker, Kubernetes, automation, deployment',
                'sort_order' => 11,
                'is_active' => true,
                'post_count' => 5
            ],
            [
                'name' => 'Database',
                'slug' => 'database',
                'description' => 'Quản lý và thiết kế cơ sở dữ liệu',
                'meta_title' => 'Database Management - Quản lý cơ sở dữ liệu',
                'meta_description' => 'Học về MySQL, PostgreSQL, MongoDB, Redis và các hệ quản trị cơ sở dữ liệu.',
                'meta_keywords' => 'database, MySQL, PostgreSQL, MongoDB, Redis, SQL, NoSQL',
                'sort_order' => 12,
                'is_active' => true,
                'post_count' => 9
            ],
            [
                'name' => 'API Development',
                'slug' => 'api-development',
                'description' => 'Phát triển API và web services',
                'meta_title' => 'API Development - Phát triển API',
                'meta_description' => 'Tạo RESTful API, GraphQL, microservices với Laravel, Node.js.',
                'meta_keywords' => 'API, REST, GraphQL, microservices, web services, Laravel, Node.js',
                'sort_order' => 13,
                'is_active' => true,
                'post_count' => 11
            ],
            [
                'name' => 'Performance',
                'slug' => 'performance',
                'description' => 'Tối ưu hóa hiệu suất website và ứng dụng',
                'meta_title' => 'Performance Optimization - Tối ưu hiệu suất',
                'meta_description' => 'Tối ưu tốc độ website, caching, CDN, database optimization.',
                'meta_keywords' => 'performance, optimization, tối ưu, speed, caching, CDN',
                'sort_order' => 14,
                'is_active' => true,
                'post_count' => 6
            ],
            [
                'name' => 'Testing',
                'slug' => 'testing',
                'description' => 'Kiểm thử phần mềm và quality assurance',
                'meta_title' => 'Software Testing - Kiểm thử phần mềm',
                'meta_description' => 'Unit testing, integration testing, automation testing với PHPUnit, Jest.',
                'meta_keywords' => 'testing, kiểm thử, PHPUnit, Jest, automation testing, QA',
                'sort_order' => 15,
                'is_active' => false,
                'post_count' => 2
            ]
        ];

        foreach ($tags as $tagData) {
            TagSolution::create($tagData);
        }
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Solution;
use App\Models\CategorySolution;
use App\Models\User;
use App\Models\TagSolution;
use Carbon\Carbon;
use Illuminate\Support\Str;

class SolutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Đảm bảo có ít nhất một user, category và tag
        $this->ensureRequiredData();

        // Lấy user đầu tiên để gán cho solutions
        $user = User::first();
        $category = CategorySolution::first();

        $solutions = [
            [
                'title' => 'Cách tối ưu hóa hiệu suất Laravel cho ứng dụng lớn',
                'excerpt' => 'Khám phá các kỹ thuật tối ưu hóa hiệu suất Laravel để xử lý hàng triệu request mỗi ngày.',
                'content' => $this->getLaravelOptimizationContent(),
                'featured_image' => 'images/solutions/laravel-optimization.jpg',
                'meta_title' => 'Tối ưu hóa hiệu suất Laravel - Hướng dẫn chi tiết',
                'meta_description' => 'Học cách tối ưu hóa hiệu suất Laravel với caching, database optimization, và các kỹ thuật nâng cao.',
                'meta_keywords' => 'laravel, optimization, performance, caching, database',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(5),
                'is_featured' => true,
                'allow_comments' => true,
                'view_count' => 1250,
                'like_count' => 89,
                'comment_count' => 23,
                'sort_order' => 1,
                'user_id' => $user->id, // Thêm user_id
                'category_solution_id' => $category->id, // Thêm category_id
                'additional_data' => [
                    'difficulty' => 'advanced',
                    'estimated_time' => '45 minutes',
                    'prerequisites' => ['Laravel Basics', 'Database Knowledge']
                ]
            ],
            [
                'title' => 'Xây dựng API RESTful với Laravel Sanctum',
                'excerpt' => 'Hướng dẫn từng bước để tạo API bảo mật với Laravel Sanctum và best practices.',
                'content' => $this->getApiSanctumContent(),
                'featured_image' => 'images/solutions/laravel-sanctum-api.jpg',
                'meta_title' => 'Xây dựng API RESTful với Laravel Sanctum',
                'meta_description' => 'Hướng dẫn chi tiết cách xây dựng API bảo mật với Laravel Sanctum, authentication và authorization.',
                'meta_keywords' => 'laravel, sanctum, api, restful, authentication',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(3),
                'is_featured' => false,
                'allow_comments' => true,
                'view_count' => 987,
                'like_count' => 67,
                'comment_count' => 18,
                'sort_order' => 2,
                'user_id' => $user->id, // Thêm user_id
                'category_solution_id' => $category->id, // Thêm category_id
            ],
            [
                'title' => 'Implement Design Patterns trong PHP',
                'excerpt' => 'Tìm hiểu và áp dụng các Design Patterns phổ biến trong PHP để code clean và maintainable.',
                'content' => $this->getDesignPatternsContent(),
                'featured_image' => 'images/solutions/php-design-patterns.jpg',
                'meta_title' => 'Design Patterns trong PHP - Singleton, Factory, Observer',
                'meta_description' => 'Học cách implement các Design Patterns như Singleton, Factory, Observer trong PHP với ví dụ thực tế.',
                'meta_keywords' => 'php, design patterns, singleton, factory, observer, oop',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(7),
                'is_featured' => true,
                'allow_comments' => true,
                'view_count' => 2156,
                'like_count' => 143,
                'comment_count' => 34,
                'sort_order' => 3,
                'user_id' => $user->id, // Thêm user_id
                'category_solution_id' => $category->id, // Thêm category_id
            ],
            [
                'title' => 'Docker cho Laravel Development Environment',
                'excerpt' => 'Cấu hình Docker để tạo môi trường phát triển Laravel nhất quán và portable.',
                'content' => $this->getDockerLaravelContent(),
                'featured_image' => 'images/solutions/docker-laravel.jpg',
                'meta_title' => 'Docker cho Laravel - Setup Development Environment',
                'meta_description' => 'Hướng dẫn setup Docker cho Laravel với Nginx, MySQL, Redis và các service cần thiết.',
                'meta_keywords' => 'docker, laravel, nginx, mysql, redis, development',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(10),
                'is_featured' => false,
                'allow_comments' => true,
                'view_count' => 834,
                'like_count' => 52,
                'comment_count' => 15,
                'sort_order' => 4,
                'user_id' => $user->id, // Thêm user_id
                'category_solution_id' => $category->id, // Thêm category_id
            ],
            [
                'title' => 'Testing Strategy cho Laravel Application',
                'excerpt' => 'Xây dựng chiến lược testing toàn diện với Unit Tests, Feature Tests và Integration Tests.',
                'content' => $this->getTestingStrategyContent(),
                'featured_image' => 'images/solutions/laravel-testing.jpg',
                'meta_title' => 'Laravel Testing - Unit Test, Feature Test, Integration Test',
                'meta_description' => 'Học cách viết test hiệu quả cho Laravel với PHPUnit, Pest và các tool testing hiện đại.',
                'meta_keywords' => 'laravel, testing, phpunit, pest, unit test, feature test',
                'status' => 'draft',
                'published_at' => null,
                'is_featured' => false,
                'allow_comments' => true,
                'view_count' => 0,
                'like_count' => 0,
                'comment_count' => 0,
                'sort_order' => 5,
                'user_id' => $user->id, // Thêm user_id
                'category_solution_id' => $category->id, // Thêm category_id
            ],
            [
                'title' => 'Microservices Architecture với Laravel',
                'excerpt' => 'Thiết kế và implement kiến trúc microservices sử dụng Laravel và các công cụ hỗ trợ.',
                'content' => $this->getMicroservicesContent(),
                'featured_image' => 'images/solutions/laravel-microservices.jpg',
                'meta_title' => 'Microservices với Laravel - Kiến trúc và Implementation',
                'meta_description' => 'Hướng dẫn thiết kế microservices với Laravel, API Gateway, Service Discovery và Message Queue.',
                'meta_keywords' => 'laravel, microservices, api gateway, service discovery, message queue',
                'status' => 'scheduled',
                'published_at' => Carbon::now()->addDays(3),
                'is_featured' => true,
                'allow_comments' => true,
                'view_count' => 0,
                'like_count' => 0,
                'comment_count' => 0,
                'sort_order' => 6,
                'user_id' => $user->id, // Thêm user_id
                'category_solution_id' => $category->id, // Thêm category_id
            ],
            [
                'title' => 'Real-time Features với Laravel WebSockets',
                'excerpt' => 'Implement các tính năng real-time như chat, notifications và live updates với Laravel WebSockets.',
                'content' => $this->getWebSocketsContent(),
                'featured_image' => 'images/solutions/laravel-websockets.jpg',
                'meta_title' => 'Laravel WebSockets - Real-time Chat và Notifications',
                'meta_description' => 'Xây dựng ứng dụng real-time với Laravel WebSockets, Pusher và Broadcasting.',
                'meta_keywords' => 'laravel, websockets, real-time, chat, notifications, broadcasting',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(1),
                'is_featured' => false,
                'allow_comments' => true,
                'view_count' => 456,
                'like_count' => 28,
                'comment_count' => 7,
                'sort_order' => 7,
                'user_id' => $user->id, // Thêm user_id
                'category_solution_id' => $category->id, // Thêm category_id
            ],
            [
                'title' => 'Security Best Practices cho Laravel',
                'excerpt' => 'Bảo mật ứng dụng Laravel với các kỹ thuật và công cụ bảo mật tiên tiến.',
                'content' => $this->getSecurityContent(),
                'featured_image' => 'images/solutions/laravel-security.jpg',
                'meta_title' => 'Laravel Security - CSRF, XSS, SQL Injection Protection',
                'meta_description' => 'Học cách bảo vệ ứng dụng Laravel khỏi các lỗ hổng bảo mật phổ biến và implement best practices.',
                'meta_keywords' => 'laravel, security, csrf, xss, sql injection, authentication',
                'status' => 'archived',
                'published_at' => Carbon::now()->subDays(30),
                'is_featured' => false,
                'allow_comments' => false,
                'view_count' => 3421,
                'like_count' => 198,
                'comment_count' => 45,
                'sort_order' => 8,
                'user_id' => $user->id, // Thêm user_id
                'category_solution_id' => $category->id, // Thêm category_id
            ]
        ];

        foreach ($solutions as $solutionData) {
            $solution = Solution::create($solutionData);
            
            // Gán tags ngẫu nhiên
            $this->attachRandomTags($solution);
        }
    }

    /**
     * Đảm bảo có dữ liệu cần thiết
     */
    private function ensureRequiredData(): void
    {
        // Tạo user nếu chưa có
        if (User::count() === 0) {
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
            ]);
        }

        // Tạo categories nếu chưa có
        if (CategorySolution::count() === 0) {
            CategorySolution::create([
                'name' => 'Laravel',
                'slug' => 'laravel',
                'description' => 'Laravel framework solutions'
            ]);
        }

        // Tạo tags nếu chưa có
        if (TagSolution::count() === 0) {
            $tags = ['PHP', 'Laravel', 'Docker', 'Testing', 'Security', 'Performance', 'API', 'WebSockets'];
            foreach ($tags as $tag) {
                TagSolution::create([
                    'name' => $tag,
                    'slug' => Str::slug($tag)
                ]);
            }
        }
    }

    /**
     * Gán tags ngẫu nhiên cho solution
     */
    private function attachRandomTags(Solution $solution): void
    {
        $tags = TagSolution::inRandomOrder()->limit(rand(2, 4))->get();
        $solution->tagSolutions()->attach($tags->pluck('id'));
    }

    /**
     * Content cho Laravel Optimization
     */
    private function getLaravelOptimizationContent(): string
    {
        return '<h2>Giới thiệu</h2>
<p>Khi ứng dụng Laravel của bạn phát triển và phải xử lý hàng triệu request mỗi ngày, việc tối ưu hóa hiệu suất trở nên cực kỳ quan trọng.</p>

<h2>1. Database Optimization</h2>
<h3>Query Optimization</h3>
<ul>
<li>Sử dụng Eager Loading để tránh N+1 queries</li>
<li>Index các columns thường xuyên được query</li>
<li>Optimize các câu query phức tạp</li>
</ul>

<h3>Database Connection</h3>
<ul>
<li>Sử dụng connection pooling</li>
<li>Cấu hình read/write splitting</li>
<li>Database replication</li>
</ul>

<h2>2. Caching Strategy</h2>
<h3>Application Caching</h3>
<ul>
<li>Route caching</li>
<li>Config caching</li>
<li>View caching</li>
</ul>

<h3>Data Caching</h3>
<ul>
<li>Redis cho session và cache</li>
<li>Memcached cho object caching</li>
<li>CDN cho static assets</li>
</ul>

<h2>3. Code Optimization</h2>
<p>Optimize code PHP với các kỹ thuật advanced như opcode caching, autoloader optimization, và memory management.</p>';
    }

    /**
     * Content cho API Sanctum
     */
    private function getApiSanctumContent(): string
    {
        return '<h2>Laravel Sanctum Overview</h2>
<p>Laravel Sanctum cung cấp một hệ thống authentication nhẹ cho SPAs, mobile applications và simple token-based APIs.</p>

<h2>Installation và Setup</h2>
<pre><code>composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate</code></pre>

<h2>API Token Authentication</h2>
<h3>Tạo Tokens</h3>
<pre><code>$token = $user->createToken("token-name");
return $token->plainTextToken;</code></pre>

<h2>SPA Authentication</h2>
<p>Cấu hình Sanctum cho Single Page Applications với CSRF protection và session-based authentication.</p>

<h2>Mobile App Authentication</h2>
<p>Implement token-based authentication cho mobile applications với refresh token strategy.</p>';
    }

    /**
     * Content cho Design Patterns
     */
    private function getDesignPatternsContent(): string
    {
        return '<h2>Design Patterns trong PHP</h2>
<p>Design patterns là các giải pháp tái sử dụng cho các vấn đề phổ biến trong software design.</p>

<h2>Singleton Pattern</h2>
<h3>Khi nào sử dụng</h3>
<ul>
<li>Database connections</li>
<li>Logger instances</li>
<li>Configuration objects</li>
</ul>

<h3>Implementation</h3>
<pre><code>class DatabaseConnection
{
    private static $instance = null;
    
    private function __construct() {}
    
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}</code></pre>

<h2>Factory Pattern</h2>
<p>Factory pattern được sử dụng để tạo objects mà không cần specify exact class của object được tạo.</p>

<h2>Observer Pattern</h2>
<p>Observer pattern định nghĩa one-to-many dependency giữa objects, khi một object thay đổi state, tất cả dependents được notify.</p>';
    }

    /**
     * Content cho Docker Laravel
     */
    private function getDockerLaravelContent(): string
    {
        return '<h2>Docker cho Laravel Development</h2>
<p>Docker giúp tạo môi trường development nhất quán across different machines và operating systems.</p>

<h2>Dockerfile cho Laravel</h2>
<pre><code>FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd</code></pre>

<h2>Docker Compose Setup</h2>
<p>Cấu hình multi-container application với Nginx, MySQL, Redis và Laravel.</p>

<h2>Development Workflow</h2>
<ul>
<li>Hot reloading với volumes</li>
<li>Database seeding và migrations</li>
<li>Testing environment</li>
</ul>';
    }

    /**
     * Content cho Testing Strategy
     */
    private function getTestingStrategyContent(): string
    {
        return '<h2>Laravel Testing Strategy</h2>
<p>Comprehensive testing strategy để đảm bảo code quality và reliability.</p>

<h2>Unit Testing</h2>
<ul>
<li>Test individual methods và classes</li>
<li>Mock external dependencies</li>
<li>Fast execution và isolated</li>
</ul>

<h2>Feature Testing</h2>
<ul>
<li>Test user workflows</li>
<li>HTTP requests và responses</li>
<li>Database interactions</li>
</ul>

<h2>Testing Tools</h2>
<ul>
<li>PHPUnit - Traditional testing framework</li>
<li>Pest - Modern testing framework</li>
<li>Laravel Dusk - Browser testing</li>
</ul>';
    }

    /**
     * Content cho Microservices
     */
    private function getMicroservicesContent(): string
    {
        return '<h2>Microservices với Laravel</h2>
<p>Thiết kế và implement kiến trúc microservices để scale applications hiệu quả.</p>

<h2>Service Decomposition</h2>
<ul>
<li>Domain-driven design</li>
<li>Business capability separation</li>
<li>Data consistency strategies</li>
</ul>

<h2>Communication Patterns</h2>
<ul>
<li>Synchronous communication với HTTP APIs</li>
<li>Asynchronous messaging với queues</li>
<li>Event-driven architecture</li>
</ul>

<h2>Infrastructure</h2>
<ul>
<li>API Gateway</li>
<li>Service discovery</li>
<li>Load balancing</li>
<li>Monitoring và logging</li>
</ul>';
    }

    /**
     * Content cho WebSockets
     */
    private function getWebSocketsContent(): string
    {
        return '<h2>Real-time Features với Laravel</h2>
<p>Implement real-time functionality với Laravel WebSockets và Broadcasting.</p>

<h2>Setup Laravel WebSockets</h2>
<pre><code>composer require beyondcode/laravel-websockets
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider"</code></pre>

<h2>Broadcasting Events</h2>
<ul>
<li>Real-time notifications</li>
<li>Live chat systems</li>
<li>Collaborative editing</li>
<li>Live updates</li>
</ul>

<h2>Client-side Implementation</h2>
<p>Connect frontend applications với WebSocket server sử dụng Laravel Echo và Pusher.</p>';
    }

    /**
     * Content cho Security
     */
    private function getSecurityContent(): string
    {
        return '<h2>Laravel Security Best Practices</h2>
<p>Bảo vệ ứng dụng Laravel khỏi các threats phổ biến và implement security best practices.</p>

<h2>Common Vulnerabilities</h2>
<ul>
<li>SQL Injection protection</li>
<li>Cross-Site Scripting (XSS)</li>
<li>Cross-Site Request Forgery (CSRF)</li>
<li>Authentication và Authorization</li>
</ul>

<h2>Security Headers</h2>
<ul>
<li>Content Security Policy</li>
<li>X-Frame-Options</li>
<li>X-Content-Type-Options</li>
<li>Strict-Transport-Security</li>
</ul>

<h2>Data Protection</h2>
<ul>
<li>Encryption và hashing</li>
<li>Secure file uploads</li>
<li>Input validation và sanitization</li>
</ul>';
    }
}
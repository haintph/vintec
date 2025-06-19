<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $categories = DB::table('categories_post')->pluck('id')->toArray();

        for ($i = 1; $i <= 3; $i++) {
            $title = "Bài viết thử nghiệm số $i";
            $slug = Str::slug($title);

            Post::create([
                'title' => $title,
                'slug' => $slug,
                'excerpt' => "Đây là đoạn trích bài viết số $i",
                'content' => "<p>Nội dung chính của bài viết $i, có thể chứa HTML.</p>",
                'meta_title' => "Meta Title bài viết $i",
                'meta_description' => "Meta Description bài viết $i",
                'meta_keywords' => "từ khóa $i, bài viết, demo",
                'canonical_url' => "https://example.com/bai-viet-$i",
                'category_id' => !empty($categories) ? fake()->randomElement($categories) : null,
                'thumbnail' => "thumbnails/post$i.jpg",
                'is_published' => true,
                'published_at' => now(),
            ]);
        }
    }
}

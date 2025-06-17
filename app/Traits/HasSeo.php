<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSeo
{
    public function getSeoData()
    {
        return [
            'title' => $this->seo_title,
            'description' => $this->seo_description,
            'keywords' => $this->meta_keywords,
            'canonical' => $this->canonical_url ?? url()->current(),
            'og_image' => $this->getOgImage(),
            'robots' => $this->robots ?? 'index,follow',
        ];
    }
    
    public function getSeoTitleAttribute()
    {
        return $this->meta_title ?: $this->title;
    }
    
    public function getSeoDescriptionAttribute()
    {
        if ($this->meta_description) {
            return $this->meta_description;
        }
        
        // Tự động tạo từ excerpt hoặc content
        $description = $this->excerpt ?: $this->content;
        return Str::limit(strip_tags($description), 160);
    }
    
    public function getOgImage()
    {
        if (property_exists($this, 'thumbnail') && $this->thumbnail) {
            return asset($this->thumbnail);
        }
        
        return asset('images/default-og-image.jpg');
    }
    
    public function generateMetaTags()
    {
        $seo = $this->getSeoData();
        
        $html = '<title>' . e($seo['title']) . '</title>' . PHP_EOL;
        $html .= '<meta name="description" content="' . e($seo['description']) . '">' . PHP_EOL;
        
        if ($seo['keywords']) {
            $html .= '<meta name="keywords" content="' . e($seo['keywords']) . '">' . PHP_EOL;
        }
        
        $html .= '<link rel="canonical" href="' . $seo['canonical'] . '">' . PHP_EOL;
        $html .= '<meta property="og:title" content="' . e($seo['title']) . '">' . PHP_EOL;
        $html .= '<meta property="og:description" content="' . e($seo['description']) . '">' . PHP_EOL;
        $html .= '<meta property="og:url" content="' . $seo['canonical'] . '">' . PHP_EOL;
        $html .= '<meta property="og:image" content="' . $seo['og_image'] . '">' . PHP_EOL;
        $html .= '<meta name="robots" content="' . $seo['robots'] . '">' . PHP_EOL;
        
        return $html;
    }
}
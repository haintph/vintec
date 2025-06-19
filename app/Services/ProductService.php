<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ProductService
{
    public function store(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Upload main image if exists (backward compatibility)
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $data['image'] = $this->uploadImage($data['image']);
            }

            // Auto generate meta fields
            $data = $this->generateMetaFields($data);

            // Create product
            $product = Product::create($data);

            // Handle album images
            if (isset($data['album_images']) && is_array($data['album_images'])) {
                $this->handleAlbumImages($product, $data);
            }

            return $product;
        });
    }

    public function update(Product $product, array $data)
    {
        return DB::transaction(function () use ($product, $data) {
            // Handle main image upload (backward compatibility)
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                if ($product->image) {
                    Storage::disk('public')->delete('products/' . $product->image);
                }
                $data['image'] = $this->uploadImage($data['image']);
            }

            // Auto generate meta fields
            $data = $this->generateMetaFields($data, $product);

            // Update product
            $product->update($data);

            // Handle album images
            if (isset($data['album_images']) && is_array($data['album_images'])) {
                $this->handleAlbumImages($product, $data);
            }

            // Update primary image if specified
            if (isset($data['primary_image_index']) && is_numeric($data['primary_image_index'])) {
                $this->updatePrimaryImage($product, $data['primary_image_index']);
            }

            return $product;
        });
    }

    public function delete(Product $product)
    {
        return DB::transaction(function () use ($product) {
            // Delete all album images
            foreach ($product->images as $image) {
                $this->deleteImageFile($image->image_path);
            }

            // Delete main image (backward compatibility)
            if ($product->image) {
                Storage::disk('public')->delete('products/' . $product->image);
            }

            return $product->delete();
        });
    }

    public function deleteAlbumImage(ProductImage $image)
    {
        $this->deleteImageFile($image->image_path);
        return $image->delete();
    }

    public function reorderImages(Product $product, array $imageIds)
    {
        foreach ($imageIds as $index => $imageId) {
            ProductImage::where('id', $imageId)
                ->where('product_id', $product->id)
                ->update(['sort_order' => $index]);
        }
    }

    private function handleAlbumImages(Product $product, array $data)
    {
        $albumImages = $data['album_images'] ?? [];
        $altTexts = $data['album_alt_texts'] ?? [];
        $primaryIndex = $data['primary_image_index'] ?? 0;

        foreach ($albumImages as $index => $image) {
            if ($image instanceof UploadedFile) {
                $imagePath = $this->uploadImage($image, true); // true for create thumbnail

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imagePath,
                    'alt_text' => $altTexts[$index] ?? null,
                    'sort_order' => $index,
                    'is_primary' => $index == $primaryIndex,
                ]);
            }
        }
    }

    private function updatePrimaryImage(Product $product, int $imageIndex)
    {
        // Reset all images to non-primary
        $product->images()->update(['is_primary' => false]);

        // Set new primary image
        $image = $product->images()->skip($imageIndex)->first();
        if ($image) {
            $image->update(['is_primary' => true]);
        }
    }

    private function uploadImage(UploadedFile $image, bool $createThumbnail = false)
    {
        $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();

        // Store original image
        $image->storeAs('products', $filename, 'public');

        // Create thumbnail if requested
        if ($createThumbnail) {
            $this->createThumbnail($filename);
        }

        return $filename;
    }

    private function createThumbnail($filename)
    {
        try {
            $originalPath = storage_path('app/public/products/' . $filename);
            $thumbnailDir = storage_path('app/public/products/thumbs/');

            // Create thumbs directory if not exists
            if (!file_exists($thumbnailDir)) {
                mkdir($thumbnailDir, 0755, true);
            }

            $pathInfo = pathinfo($filename);
            $thumbnailName = $pathInfo['filename'] . '_thumb.' . $pathInfo['extension'];
            $thumbnailPath = $thumbnailDir . $thumbnailName;

            // Create thumbnail using Intervention Image (if available)
            if (class_exists('Intervention\Image\Facades\Image')) {
                Image::make($originalPath)
                    ->resize(300, 300, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    })
                    ->save($thumbnailPath, 80);
            }
        } catch (\Exception $e) {
            // If thumbnail creation fails, continue without it
            Log::warning('Failed to create thumbnail: ' . $e->getMessage());
        }
    }

    private function deleteImageFile($imagePath)
    {
        // Delete original image
        Storage::disk('public')->delete('products/' . $imagePath);

        // Delete thumbnail if exists
        $pathInfo = pathinfo($imagePath);
        $thumbnailPath = $pathInfo['dirname'] . '/thumbs/' . $pathInfo['filename'] . '_thumb.' . $pathInfo['extension'];
        Storage::disk('public')->delete('products/' . $thumbnailPath);
    }

    private function generateMetaFields(array $data, Product $product = null)
    {
        if (empty($data['meta_title'])) {
            $data['meta_title'] = $data['name'];
        }

        if (empty($data['meta_description']) && !empty($data['description'])) {
            $data['meta_description'] = Str::limit(strip_tags($data['description']), 160);
        }

        if (empty($data['meta_keywords'])) {
            $keywords = [];
            $keywords[] = $data['name'];
            if (isset($data['category_id']) && $data['category_id']) {
                $category = \App\Models\Category::find($data['category_id']);
                if ($category) {
                    $keywords[] = $category->name;
                }
            }
            $data['meta_keywords'] = implode(', ', $keywords);
        }

        return $data;
    }
}

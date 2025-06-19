<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $productId = $this->route('product') ? $this->route('product')->id : null;

        return [
            'product_code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('products')->ignore($productId)
            ],
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0', // ⬅️ Thêm dòng này
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'album_images' => 'nullable|array|max:10',
            'album_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'album_alt_texts' => 'nullable|array',
            'album_alt_texts.*' => 'nullable|string|max:255',
            'primary_image_index' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'description' => 'nullable|string',
            'specs' => 'nullable|string',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'product_code.required' => 'Mã sản phẩm là bắt buộc',
            'product_code.unique' => 'Mã sản phẩm đã tồn tại',
            'name.required' => 'Tên sản phẩm là bắt buộc',
            'category_id.required' => 'Danh mục là bắt buộc',
            'category_id.exists' => 'Danh mục không tồn tại',
            'price.required' => 'Giá sản phẩm là bắt buộc',
            'price.numeric' => 'Giá sản phẩm phải là số',
            'price.min' => 'Giá sản phẩm phải lớn hơn hoặc bằng 0',
            'image.image' => 'File phải là hình ảnh',
            'image.max' => 'Kích thước hình ảnh tối đa 2MB',
            'album_images.max' => 'Tối đa 10 ảnh trong album',
            'album_images.*.image' => 'Tất cả file phải là hình ảnh',
            'album_images.*.max' => 'Kích thước mỗi ảnh tối đa 2MB',
            'meta_title.max' => 'Meta title tối đa 60 ký tự',
            'meta_description.max' => 'Meta description tối đa 160 ký tự',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'is_active' => $this->has('is_active') ? true : false,
        ]);
    }
}

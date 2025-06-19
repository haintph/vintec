<?php
// ==================== MIGRATION: database/migrations/xxxx_create_product_variants_table.php ====================

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('name', 100); // Tên biến thể: "Đỏ", "Xanh dương", "Vàng"
            $table->string('color_code', 7)->nullable(); // Mã màu hex: #FF0000
            $table->string('image')->nullable(); // Ảnh riêng cho biến thể
            $table->decimal('price', 15, 2); // Giá riêng cho từng biến thể
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Index cho tối ưu query
            $table->index(['product_id', 'is_active']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_variants');
    }
};

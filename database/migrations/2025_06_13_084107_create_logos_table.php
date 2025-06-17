<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('logos', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->enum('type', ['main', 'small', 'dark', 'light', 'favicon'])->default('main');
            $table->string('name')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Chỉ có 1 logo active cho mỗi type
            $table->unique(['type', 'is_active']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('logos');
    }
};
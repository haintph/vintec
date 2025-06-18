<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solution_tag_solution', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solution_id')->constrained()->onDelete('cascade');
            $table->foreignId('tag_solution_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Unique constraint to prevent duplicate relationships
            $table->unique(['solution_id', 'tag_solution_id']);
            
            // Indexes for performance
            $table->index('solution_id');
            $table->index('tag_solution_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solution_tag_solution');
    }
};
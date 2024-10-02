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
        Schema::create('tracecats', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
 
						$table->foreignId('cat_id')->constrained();
						$table->bigInteger('status')->nullable()->default(null);
						$table->text('tag')->nullable()->default(null);
						$table->text('note')->nullable()->default(null);
			});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracecats');
    }
};

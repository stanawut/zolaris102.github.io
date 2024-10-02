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
        Schema::create('defaultassets', function (Blueprint $table) {
            $table->id();
						$table->foreignId('user_id')->constrained();
						$table->string('type');
						$table->bigInteger('asset_id')->constrained();
						$table->text('note')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('defaultassets');
    }
};

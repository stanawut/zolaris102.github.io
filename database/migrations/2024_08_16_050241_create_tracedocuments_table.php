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
        Schema::create('tracedocuments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
 
						$table->foreignId('document_id')->constrained();
						$table->foreignId('cat_id')->constrained();
						$table->bigInteger('cat_status')->nullable()->default(null);
						$table->timestamp('cat_updatetime')->nullable()->default(null);
						$table->text('cat_nonedefault')->nullable()->default(null);
						$table->foreignId('library_id')->nullable()->default(null);
						$table->bigInteger('lib_status')->nullable()->default(null);
						$table->timestamp('lib_updatetime')->nullable()->default(null);
						$table->text('lib_nonedefault')->nullable()->default(null);
						$table->text('note')->nullable()->default(null);
				});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracedocuments');
    }
};

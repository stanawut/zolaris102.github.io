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
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
						$table->string('type')->nullable()->default(null);
						$table->string('template')->nullable()->default(null);
						$table->string('language')->nullable()->default(null);
						$table->string('title');
						$table->string('status')->nullable()->default(null);
						$table->bigInteger('inherit_id')->unsigned()->nullable()->default(null);
						$table->string('inherit_type')->nullable()->default(null);
						$table->text('note')->nullable()->default(null);
						$table->timestamp('published_date')->nullable()->default(null);
						$table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
				Schema::table('forms',function (Blueprint $table){
            $table->foreign('inherit_id')->references('id')->on('forms');
				});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};

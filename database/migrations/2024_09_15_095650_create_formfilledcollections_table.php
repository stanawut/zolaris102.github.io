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
        Schema::create('formfilledcollections', function (Blueprint $table) {
            $table->id()																							;
						$table->foreignId('form_id')->constrained()								;
						$table->string('language')																;
						$table->string('title')																		;
						$table->string('description')->nullable()->default(null)	;
						$table->text('note')->nullable()->default(null)						;
						$table->text('tag')->nullable()->default(null)						;
						$table->bigInteger('status')->nullable()->default(null)		;
            $table->timestamps()																			;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formfilledcollections');
    }
};

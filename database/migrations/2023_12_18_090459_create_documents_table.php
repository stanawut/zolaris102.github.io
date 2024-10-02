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
        Schema::create('documents', function (Blueprint $table) {
            $table->id()																;
						$table->string('type')											;
						$table->foreignId('form_id')->constrained()	;
						$table->string('language')									;
						$table->string('title')											;
						$table->string('cat_ref')										;
						$table->string('book_ref')									;
						$table->string('bind_ref')									;
						$table->string('cat_seq')										;
						$table->string('book_seq')									;
						$table->foreignId('user_id')->constrained()	;
            $table->timestamps()												;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};

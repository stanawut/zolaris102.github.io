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
        Schema::create('libraries', function (Blueprint $table) {
            $table->id()																;
						$table->string('type')											;
						$table->string('template')									;
						$table->string('language')									;
						$table->string('title')											;
						$table->bigInteger('inherit_id')						;
						$table->string('ref')												;
						$table->string('note')											;
						$table->string('extend')										;
						$table->string('feuri_json_doc')						;
						$table->foreignId('user_id')->constrained()	;
            $table->timestamps()												;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('libraries');
    }
};

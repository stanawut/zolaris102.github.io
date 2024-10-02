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
        Schema::create('formfilleds', function (Blueprint $table) {
						$table->id();
						$table->bigInteger('form_id')->unsigned()->nullable()->default(null);
						$table->bigInteger('store_id')->unsigned()->nullable()->default(null);
						$table->string('might_be_unique_search_key')->nullable()->default(null); //mbusk
						$table->string('mixed_tid_values_search_key')->nullable()->default(null); //mtvsk
						$table->string('tmp_object_id')->nullable()->default(null);
						$table->string('pmn_object_id')->nullable()->default(null);
						$table->text('cat_list')->nullable()->default(null);
						$table->text('lib_list')->nullable()->default(null);
						$table->bigInteger('user_id')->unsigned()->nullable()->default(null);
						$table->bigInteger('owner_id')->unsigned()->nullable()->default(null);
            $table->timestamps();
        });
			
				Schema::table('formfilleds',function (Blueprint $table){
            $table->foreign('form_id')->references('id')->on('forms');
            $table->foreign('store_id')->references('id')->on('formfilledcollections');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('owner_id')->references('id')->on('users');
	        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formfilleds');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class formfilled extends Model
{
    use HasFactory;
	//protected $guarded = [];
		protected $fillable = [
		'form_id',
		'store_id',
		'might_be_unique_search_key',
		'mixed_tid_values_search_key',
		'cat_list',
		'lib_list',
		'user_id',
		'owner_id',
		];
}

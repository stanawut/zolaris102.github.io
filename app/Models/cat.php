<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cat extends Model
{
    use HasFactory;
		
		protected $fillable = [
		'type',
		'template',
		'language',
		'title',
		'inherit_id',
		'ref',
		'note',
		'extend',
		'feuri_json_doc',
		'user_id',
		];

}

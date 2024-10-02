<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class formfilledcollection extends Model
{
    use HasFactory;
		protected $fillable = [
		'form_id',
		'language',
		'title',
		'description',
		'note',
		'tag',
		'status'];
}

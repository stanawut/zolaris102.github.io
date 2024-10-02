<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tracedocument extends Model
{
    use HasFactory;
		protected $fillable = [
		'document_id',
		'cat_id',
		'cat_status'];
}

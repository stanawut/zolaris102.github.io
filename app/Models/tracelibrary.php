<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tracelibrary extends Model
{
    use HasFactory;
		protected $fillable = [
		'library_id',
		'status',
		'tag',
		'note'];
}

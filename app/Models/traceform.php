<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class traceform extends Model
{
    use HasFactory;
		protected $fillable = [
		'form_id',
		'library_id',
		'lib_status'];
}

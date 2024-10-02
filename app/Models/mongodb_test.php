<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class mongodb_test extends Model
{
    protected $connection = 'mongodb';//'mongodb';
		protected $collection = 'collectionA';
		protected $fillable = ['guid','first_name','family_name'];
}

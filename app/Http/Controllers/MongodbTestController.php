<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\mongodb_test;

class MongodbTestController extends Controller
{
    public function store(Request $request)
		{
			$oJRec = new mongodb_test;
			$oJRec->guid = 'Hello mongo';
			$oJRec->first_name = 'This is the new no-sql database test';
			$oJRec->family_name = 'See more...';
			$oJRec->save();
			return response()->json(["result"=>"ok"],201);
		}
}

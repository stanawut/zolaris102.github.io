<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MongodbTestController;
use App\Models\mongodb_test;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
	stanawut,hHdPXuhpRmHcsCwe
	mongodb+srv://stanawut:hHdPXuhpRmHcsCwe@cluster0.ap142.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
*/

Route::resource('mongodb_tests',MongodbTestController::class)->only(['store']);
Route::get('/mongodb_test',[MongodbTestController::class,'store']);
Route::get('/ping',function(Request $request) {
	$connection = DB::connection('mongodb');
	$col = $connection->table('collectionA')->get();//worked
	//$x = json_decode('{"x":"1","y":"2"}');
	//$fields = Schema::getColumns('collectionA');
	//dd($fields);
	//dd($x);
	//$y = json_encode($x);
	//$x = 'Hello';
	//$db = $connection.Data;
	//$col = $db.CollectionA;
	dd($col);
	$y = ' check connection ';
	$msg = 'MongoDB is accesible!'.'__'.$y;
	try {
				$connection->command(['ping'=>1]);
				//$col.insertOne({"item":"car1","qty":"2"});
	} catch (\Exception $e) {
		$msg = 'MongoDB is not accesible. Error: '.$e->getMessage().$y;
	}
	return ['msg'=>$msg];
});

Route::get('/create_eloquent_sql/', function (Request  $request) {
    $success = mongodb_test::create([
        'guid'=> 'cust_0000',
        'first_name'=> 'John',
        'family_name' => 'Doe',
        'email' => 'j.doe@gmail.com',
        'address' => '123 my street, my city, zip, state, country'
    ]);


});

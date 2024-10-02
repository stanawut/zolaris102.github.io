<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\LandingMercuryController;
use App\Http\Controllers\MercuryUploadTempImageController;
use App\Http\Controllers\MercuryDeleteTempImageController;
use App\Http\Controllers\MercuryStoreProfileController;

use App\Http\Controllers\VenusDocumentController;
use App\Http\Controllers\VenusCatController;
use App\Http\Controllers\VenusFormController;
use App\Http\Controllers\VenusLibraryController;
use App\Http\Controllers\MarsQueriesController;

use App\Http\Controllers\MongodbTestController; //_wip_

use App\Http\Controllers\MarsTraceDocumentController;
use App\Http\Controllers\MarsTraceCatController;
use App\Http\Controllers\MarsTraceFormController;

use App\Http\Controllers\EarthFormFilledCollectionController;
use App\Http\Controllers\EarthFormFilledController;

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;
use Illuminate\Http\Request;

use App\Http\Controllers\VenusUploadTempImageController;
use App\Http\Controllers\VenusDeleteTempImageController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
/*
Route::get('/Venus/xdocx_xxxxx_00100_xxxxx',function() {
	return view('transaction_layouts.tx01.xdocx_xxxxx_00100_xxxxx');
});
*/
/* ------------------------------------------------------------------------------------------------ */
Route::middleware('auth')->group(function () {
    Route::get(		'/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch(	'/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
/* ------------------------------------------------------------------------------------------------ */
Route::get('/', 			function 	() {return view('welcome');});
Route::get('/app_lis',function	() {return Inertia::render('app_lis_landing');});
/* ------------------------------------------------------------------------------------------------ */
Route::get('/list_publish_public', function () { return view('welcome'); });
Route::get('/Mars/xdocx_dcatx_00600_00025',[MarsQueriesController::class,'tx_xdocx_dcatx_00600_00025']);
Route::get('/Mars/xdocx_xxxxx_00300_xxxxx/{writer_id}/{doc_id}/{parent_type}/{parent_doc_id}/{current_page}',function ($writer_id,$doc_id,$parent_type,$parent_doc_id,$current_page)
{
	Inertia::share('user_id',$writer_id);
	Inertia::share('file_id',$doc_id);
	Inertia::share('parent_type',$parent_type);
	Inertia::share('parent_file_id',$parent_doc_id);
	Inertia::share('current_page',$current_page);
	Inertia::share('feuri',lib1_lis_get_feuri_document_pmn($writer_id,$doc_id));
	Inertia::share('storage',storage_path());
	return Inertia::render('apb_lis_xdocx_xxxxx_00300_xxxxx');
});
/*
Route::get('/Mars/xdocx_xxxxx_00300_xxxxx/{writer_id}/{cat_id}/{current_page}/{doc_id}',
function ($writer_id,$cat_id,$current_page,$doc_id)
{
	
	Inertia::share('user_id',$writer_id);
	
	Inertia::share('cat_file_id',$cat_id);
	
	Inertia::share('current_page',$current_page);
	Inertia::share('file_id',$doc_id);
	
	Inertia::share('feuri',lib1_lis_get_feuri_document_pmn($writer_id,$doc_id));
	Inertia::share('storage',storage_path());
	return Inertia::render('apb_lis_xdocx_xxxxx_00300_xxxxx');
});
*/

Route::get('/Mars/xcatx_xxxxx_00600_00025',[MarsQueriesController::class,'tx_xcatx_xxxxx_00600_00025']);
Route::get(	'/Mars/xcatx_xxxxx_00300_xxxxx/{writer_id}/{doc_id}/{current_page}',function ($writer_id,$doc_id,$current_page) 
{ 
	Inertia::share('user_id',$writer_id);
	Inertia::share('file_id',$doc_id);
	Inertia::share('feuri',lib1_lis_get_feuri_category_pmn($writer_id,$doc_id));
	Inertia::share('storage',storage_path());
	Inertia::share('current_page',$current_page);
	return Inertia::render('apb_lis_xcatx_xxxxx_00300_xxxxx');
});
/* ------------------------------------------------------------------------------------------------ */
Route::get(		'/Mercury',LandingMercuryController::class);
Route::post(	'/Mercury/upload_tempimage',MercuryUploadTempImageController::class);
Route::delete('/Mercury/delete_tempimage',MercuryDeleteTempImageController::class);
Route::post(	'/Mercury/store_profile',MercuryStoreProfileController::class)->name('mercury.store_profile');
/* ------------------------------------------------------------------------------------------------ */
Route::get('/dashboard', function () {return view('dashboard');})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/gridboard', function () {return view('gridboard');})->middleware(['auth', 'verified'])->name('gridboard');
/* ------------------------------------------------------------------------------------------------ */
Route::get(		'/Venus/xdocx_xxxxx_00100_xxxxx',[VenusDocumentController::class,'create'])->name('xdocx_xxxxx_00100_form');
Route::post(	'/Venus/xdocx_xxxxx_00100_xxxxx',[VenusDocumentController::class,'store'])->name('xdocx_xxxxx_00100_store');

Route::get(		'/Venus/xdocx_xxxxx_00600_xxxxx',[VenusDocumentController::class,'index_extend_trace'])->name('xdocx_xxxxx_00600_list');
Route::post(	'/Mars/xdocx_xxxxx_00200_xxxxx/updatestatus',[MarsTraceDocumentController::class,'update'])->name('xdocx_xxxxx_00200_updatestatus');

Route::delete('/Venus/xdocx_xxxxx_00200_xxxxx/{id}/delete_tempimage',VenusDeleteTempImageController::class);
Route::post(	'/Venus/xdocx_xxxxx_00200_xxxxx/{id}/upload_tempimage',VenusUploadTempImageController::class);
Route::post(	'/Venus/xdocx_xxxxx_00200_xxxxx/{id}/update',[VenusDocumentController::class,'update'])->name('xdocx_xxxxx_00200_update');
Route::post(	'/Venus/xdocx_xxxxx_00200_xxxxx/{id}/revert',[VenusDocumentController::class,'revert'])->name('xdocx_xxxxx_00200_revert');
Route::get(		'/Venus/xdocx_xxxxx_00200_xxxxx/recent',[VenusDocumentController::class,'edit_recent'])->name('xdocx_xxxxx_00200_recent');
Route::get(		'/Venus/xdocx_xxxxx_00200_xxxxx/{id}',function ($id) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_document_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done','');
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xdocx_xxxxx_00200_xxxxx');
});
Route::get(		'/Venus/xdocx_xxxxx_00300_xxxxx/{id}/{action_done}',function ($id,$action_done) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_document_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done',$action_done);
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xdocx_xxxxx_00300_xxxxx');
});
Route::get(		'/Venus/xdocx_xcatx_02B02_xxxxx/{id}',function($id)
{
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_document_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	return Inertia::render('app_lis_xdocx_xcatx_02B02_xxxxx');
});
/* ------------------------------------------------------------------------------------------------ */
Route::get(		'/Venus/xcatx_xxxxx_00100_xxxxx',[VenusCatController::class,'create'])->name('xcatx_xxxxx_00100_form');
Route::post(	'/Venus/xcatx_xxxxx_00100_xxxxx',[VenusCatController::class,'store'])->name('xcatx_xxxxx_00100_store');

Route::get(		'/Venus/xcatx_xxxxx_00600_xxxxx',[VenusCatController::class,'index_extend_trace'])->name('xcatx_xxxxx_00600_list');
Route::post(	'/Mars/xcatx_xxxxx_00200_xxxxx/updatestatus',[MarsTraceCatController::class,'update'])->name('xcatx_xxxxx_00200_updatestatus');

Route::post(	'/Venus/xcatx_xxxxx_00600_xxxxx/list',[VenusCatController::class,'jsonIndex']);
Route::post(	'/Venus/xcatx_xxxxx_00200_xxxxx/{id}/update',[VenusCatController::class,'update'])->name('xcatx_xxxxx_00200_update');
Route::get(		'/Venus/xcatx_xxxxx_00200_xxxxx/recent',[VenusCatController::class,'edit_recent'])->name('xcatx_xxxxx_00200_recent');
Route::get(		'/Venus/xcatx_xxxxx_00200_xxxxx/{id}',function ($id) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_category_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done','');
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xcatx_xxxxx_00200_xxxxx');
});
Route::get(		'/Venus/xcatx_xxxxx_00300_xxxxx/{id}/{action_done}',function ($id,$action_done) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_category_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done',$action_done);
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xcatx_xxxxx_00300_xxxxx');
});
Route::get(		'/Venus/xcatx_xdocx_02B02_xxxxx/{id}',function($id)
{
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_category_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	return Inertia::render('app_lis_xcatx_xdocx_02B02_xxxxx');
});
/* ------------------------------------------------------------------------------------------------ */
Route::get(		'/Venus/xfrmx_xxxxx_00100_xxxxx',[VenusFormController::class,'create'])->name('xfrmx_xxxxx_00100_form');
Route::post(	'/Venus/xfrmx_xxxxx_00100_xxxxx',[VenusFormController::class,'store'])->name('xfrmx_xxxxx_00100_store');
//Route::get(		'/Venus/xfrmx_xxxxx_00600_xxxxx',[VenusFormController::class,'index'])->name('xfrmx_xxxxx_00600_list');
Route::get(		'/Venus/xfrmx_xxxxx_00600_xxxxx',[VenusFormController::class,'index_extend_trace'])->name('xfrmx_xxxxx_00600_list');
Route::post(	'/Mars/xfrmx_xxxxx_00200_xxxxx/updatestatus',[MarsTraceFormController::class,'update'])->name('xfrmx_xxxxx_00200_updatestatus');

Route::post(	'/Venus/xfrmx_xxxxx_00200_xxxxx/{id}/update',[VenusFormController::class,'update'])->name('xfrmx_xxxxx_00200_update');
Route::get(		'/Venus/xfrmx_xxxxx_00200_xxxxx/recent',[VenusFormController::class,'edit_recent'])->name('xfrmx_xxxxx_00200_recent');
Route::get(		'/Venus/xfrmx_xxxxx_00200_xxxxx/{id}',function ($id) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_form_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done','');
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xfrmx_xxxxx_00200_xxxxx');
});
Route::get(		'/Venus/xfrmx_xxxxx_00300_xxxxx/{id}/{action_done}',function ($id,$action_done) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_form_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done',$action_done);
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xfrmx_xxxxx_00300_xxxxx');
});
Route::get(		'/Venus/xfrmx_xlibx_02B02_xxxxx/{id}',function($id)
{
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_form_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	return Inertia::render('app_lis_xfrmx_xlibx_02B02_xxxxx');
});
Route::get(		'Earth/xfrmx_xstrx_02B02_xxxxx/{id}',function($id)
{
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_form_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	return Inertia::render('app_lis_xfrmx_xstrx_02B02_xxxxx');
	
});
Route::get(		'/Earth/xstrx_xfrmx_00100_xxxxx/{frm_id}',[EarthFormFilledCollectionController::class,'create'])->name('xstrx_xfrmx_00100_xxxxx');
Route::post(	'/Earth/xstrx_xfrmx_00100_xxxxx',[EarthFormFilledCollectionController::class,'store'])->name('xstrx_xfrmx_00100_store');
/*
Route::get(		'/Earth/xstrx_xfrmx_00200_xxxxx/{id}/{frm_id}',function ($id,$frm_id)
{
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('user_id',Auth::id());
	Inertia::share('store_id',$id);
	Inertia::share('file_id',$frm_id);
	Inertia::share('feuri',lib1_lis_get_feuri_form_pmn(Auth::id(),$frm_id));
	Inertia::share('storage',storage_path());
	return Inertia::render('app_lis_xstrx_xfrmx_00200_xxxxx');
});
*/
Route::get(		'/Earth/xstrx_xfrmx_00200_xxxxx/{id}/{frm_id}',[EarthFormFilledCollectionController::class,'retrieve'])->name('xstrx_xfrmx_00200_4edit');
Route::post(	'/Earth/xstrx_xfrmx_00200_xxxxx/update',[EarthFormFilledCollectionController::class,'update'])->name('xstrx_xfrmx_00200_update');

/*
Route::post(	'/Earth/xstrx_xfrmx_00200_xxxxx',function ()
{
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
})->name('xstrx_xfrmx_00200_update');
*/
Route::get( 	'/Earth/xstrx_xfrmx_00300_xxxxx/{store_id}/{frm_id}',[EarthFormFilledCollectionController::class,'data'])->name('xstrx_xfrmx_00300_data');
/*
Route::get(		'/Earth/xstrx_xfrmx_00300_xxxxx/{store_id}/{frm_id}',function ($store_id,$frm_id)
{
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('user_id',Auth::id());
	Inertia::share('store_id',$store_id);
	Inertia::share('file_id',$frm_id);
	Inertia::share('feuri',lib1_lis_get_feuri_form_pmn(Auth::id(),$frm_id));
	Inertia::share('storage',storage_path());
	return Inertia::render('app_lis_xstrx_xfrmx_00300_xxxxx');
});
*/
Route::get(	'/Venus/xfrmx_xstrx_00600_xxxxx/{frm_id}',[VenusFormController::class,'retrieve_stores'])->name('xfrmx_xstrx_00600_4list');
/* ------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------ */
Route::get(		'/Venus/xlibx_xxxxx_00100_xxxxx',[VenusLibraryController::class,'create'])->name('xlibx_xxxxx_00100_form');
Route::post(	'/Venus/xlibx_xxxxx_00100_xxxxx',[VenusLibraryController::class,'store'])->name('xlibx_xxxxx_00100_store');
Route::get(		'/Venus/xlibx_xxxxx_00600_xxxxx',[VenusLibraryController::class,'index'])->name('xlibx_xxxxx_00600_list');
Route::post(	'/Venus/xlibx_xxxxx_00600_xxxxx/list',[VenusLibraryController::class,'jsonIndex']);
Route::post(	'/Venus/xlibx_xxxxx_00200_xxxxx/{id}/update',[VenusLibraryController::class,'update'])->name('xlibx_xxxxx_00200_update');
Route::get(		'/Venus/xlibx_xxxxx_00200_xxxxx/recent',[VenusLibraryController::class,'edit_recent'])->name('xlibx_xxxxx_00200_recent');
Route::get(		'/Venus/xlibx_xxxxx_00200_xxxxx/{id}',function ($id) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_library_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done','');
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xlibx_xxxxx_00200_xxxxx');
});
Route::get(		'/Venus/xlibx_xxxxx_00300_xxxxx/{id}/{action_done}',function ($id,$action_done) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_library_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done',$action_done);
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xlibx_xxxxx_00300_xxxxx');
});
Route::get(		'/Venus/xlibx_xfrmx_02B02_xxxxx/{id}',function($id)
{
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$id);
	Inertia::share('feuri',lib1_lis_get_feuri_library_pmn(Auth::id(),$id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	return Inertia::render('app_lis_xlibx_xfrmx_02B02_xxxxx');
});
/* ------------------------------------------------------------------------------------------------ */
//Route::get(		'/Earth/xfilx_xxxxx_00100_xxxxx/{form_id}/{store_id}',EarthFormFilledController::class,'create');
Route::post(	'/Venus/xfrmx_xstrx_00600_xxxxx/list',[VenusFormController::class,'retrieve_stores_list'])->name('xfrmx_xstrx_00600_4fill');

Route::get(		'/Earth/xfilx_xxxxx_00100_xxxxx/{form_id}/{store_id}',function ($form_id,$store_id) 
{ 
	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$form_id); // get form to fill and save to store_id
	Inertia::share('store_id',$store_id);
	
//Inertia::share('feuri',lib1_lis_get_feuri_form_pmn(Auth::id(),$form_id));
	Inertia::share('feuri',lib1_lis_get_feuri_userform_pmn(Auth::id(),$form_id)); // form for user to fill in
	
	
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done','');
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xfilx_xxxxx_00100_xtmpx');
});
Route::post('/Earth/xfilx_xxxxx_00100_xxxxx/{form_id}/{store_id}/store',[EarthFormFilledController::class,'store'])->name('xfilx_xxxxx_00100_4init');
Route::get('/Earth/xfilx_xxxxx_00200_xxxxx/recent',[EarthFormFilledController::class,'edit_recent'])->name('xfilx_xxxxx_00200_recent');
//Route::post('/Earth/xfilx_xxxxx_00200_xxxxx/{form_id}/{store_id}/{fil_id}/update',[EarthFormFilledController::class,'edit'])->name('xfilx_xxxxx_00200_update');
Route::post('/Earth/xfilx_xxxxx_00200_xxxxx/{form_id}/{store_id}/{fil_id}/update',[EarthFormFilledController::class,'update'])->name('xfilx_xxxxx_00200_update');

Route::get('/Earth/xfilx_xxxxx_00300_xxxxx/{form_id}/{store_id}/{fil_id}',function($form_id,$store_id,$fil_id)
{

	//Inertia::share('file_type','document');
	Inertia::share('user_id',Auth::id());
//Inertia::share('file_id',$form_id);
	Inertia::share('form_id',$form_id);
	Inertia::share('store_id',$store_id);
	Inertia::share('doc_id',$fil_id);
	Inertia::share('fil_id',$fil_id);
	Inertia::share('file_id',$fil_id);
//Inertia::share('feuri',lib1_lis_get_feuri_library_pmn(Auth::id(),$id));
	Inertia::share('feuri',lib1_lis_get_feuri_formfilled_tmp(Auth::id(),$form_id,$store_id,$fil_id));
	Inertia::share('storage',storage_path());
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('action_done','');
//Inertia::setRootView('app_?');
	return Inertia::render('app_lis_xfilx_xxxxx_00300_xtmpx');
		
});	
/* ------------------------------------------------------------------------------------------------ */
// normally 00100 create view page stay inside resources/views/transaction_layouts/tx01/x???x_x???x_00100_xxxxx.blade.php
// but this one is inside resources/js/Pages/app_lis_xfilx_xxxxx_00100_xxxxx.svelte
// because not ui complexity for in 2 selection required [form,store]
// and all create view is used url begin with Venus
// just for user input automaticcally generated
// with <a href=/Earth/xfix_xxxxx_00100_xxxxx/{form_id}/{store_id}
Route::get('/Venus/xfilx_xxxxx_00100_xxxxx', function()
{
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});

	Inertia::share('user_id',Auth::id());
	return Inertia::render('app_lis_xfilx_xxxxx_00100_xxxxx');
})->name('xfilx_xxxxx_00100_xxxxx-tmp');
// ++++++++++++++++++++++++++++++++++++++++++++++
// with handleSave will call LibTX.fetchXmlUpdate(...)
Route::get('/Earth/xfilx_xxxxx_00100_xxxxx/{form_id}/{store_id}',function ($form_id,$store_id) 
{ 
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('storage',storage_path());

	Inertia::share('user_id',Auth::id());
	Inertia::share('file_id',$form_id); // get form to fill and save to store_id
	Inertia::share('form_id',$form_id);
	Inertia::share('store_id',$store_id);
	Inertia::share('feuri',lib1_lis_get_feuri_userform_pmn(Auth::id(),$form_id)); // form for user to fill in
	Inertia::share('action_done','');
	return Inertia::render('app_lis_xfilx_xxxxx_00100_xtmpx');
});
// ++++++++++++++++++++++++++++++++++++++++++++++
Route::get('/Earth/xfilx_xxxxx_00200_xxxxx/{form_id}/{store_id}/{fil_id}',function($form_id,$store_id,$fil_id)
{
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('storage',storage_path());

	Inertia::share('user_id',Auth::id());
	Inertia::share('form_id',$form_id);
	Inertia::share('store_id',$store_id);
	Inertia::share('doc_id',$fil_id);
	Inertia::share('fil_id',$fil_id);
	Inertia::share('file_id',$fil_id);
	Inertia::share('feuri',lib1_lis_get_feuri_formfilled_tmp(Auth::id(),$form_id,$store_id,$fil_id));
	Inertia::share('action_done','');
	return Inertia::render('app_lis_xfilx_xxxxx_00200_xtmpx');
});
// ++++++++++++++++++++++++++++++++++++++++++++++
Route::get('/Earth/xfilx_xxxxx_00300_xxxxx/{form_id}/{store_id}/{fil_id}',function($form_id,$store_id,$fil_id)
{
	Inertia::share('_laravel_session_token',function(Request $request){ return $request->session()->token();});
	Inertia::share('storage',storage_path());

	Inertia::share('user_id',Auth::id());
	Inertia::share('form_id',$form_id);
	Inertia::share('store_id',$store_id);
//Inertia::share('doc_id',$fil_id);
	Inertia::share('fil_id',$fil_id);
	Inertia::share('file_id',$fil_id);
	Inertia::share('feuri',lib1_lis_get_feuri_formfilled_tmp(Auth::id(),$form_id,$store_id,$fil_id));
	Inertia::share('action_done','');
	return Inertia::render('app_lis_xfilx_xxxxx_00300_xtmpx');
		
});	
// ++++++++++++++++++++++++++++++++++++++++++++++
/*
SELECT distinct formfilleds.store_id,formfilledcollections.form_id,forms.title, formfilledcollections.title FROM `formfilleds` 
left join formfilledcollections on formfilleds.store_id = formfilledcollections.id 
left join forms on formfilledcollections.form_id = forms.id 
where formfilleds.user_id = 12 order by formfilledcollections.form_id asc;
*/
/*
Route::get('/Earth/xstrx_xfrmx_00600_xfilx',[]);
*/
//gridboard:
Route::get('/Mars/xfrmx_xstrx_00600_xxxxx/data/{user_id}',[MarsQueriesController::class,'tx_xfrmx_xstrx_00600_xxxxx'])->name('xfrmx_xstrx_00600_xxxxx-dropdown');
//fetch_3Columns_List app_lis_xfrmx_xstrx_00600_xfilx
Route::post('/Mars/xstrx_xfilx_00600_xxxxx/data/list',[EarthFormFilledController::class,'retrieve_formfilled_list_by_store']);
//☰ Fil
Route::get('/Mars/xstrx_xfrmx_00600_xfilx/data/{user_id}',[MarsQueriesController::class,'tx_xfilx_xxxxx_00600_xxxxx'])->name('xfilx_xxxxx_00600_xxxxx-rawlist');
Route::post('/Mars/xfilx_xxxxx_00600_xxxxx/json/{user_id}',[MarsQueriesController::class,'retrieve_formfilled_list_frm_str_fil'])->name('xfilx_xxxxx_00600_xxxxx-lawlist2');
/* ------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------ */
require __DIR__.'/auth.php';

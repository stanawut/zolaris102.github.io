<?php


namespace App\Http\Controllers;
use App\Http\Controllers\ProfileController;

use App\Models\defaultasset;
use App\Models\tracedocument;
use App\Models\document;
use App\Models\tracecat;
use App\Models\cat;
use App\Models\form;
use App\Models\formfilledcollection;
use App\Models\formfilled;

use Illuminate\Http\Request;
//use Illuminate\Support\Collection;

use Inertia\Inertia;

class MarsQueriesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */
		public function tx_xdocx_dcatx_00600_00025()
		{
			// select documents.id, documents.title from documents left join tracedocuments on documents.id = tracedocuments.document_id;
			
			$aDefaultAssetAllWriters = defaultasset::where('type','cat')->get('asset_id');
			$aDocumentId = tracedocument::whereIn('cat_id',$aDefaultAssetAllWriters)->where('cat_status','25')->get('document_id');
		//$result = document::whereIn('id',$aDocumentId)->get(['user_id','id','title']);
			$result_page = document::whereIn('id',$aDocumentId)->paginate(2)
								->through(function($result)
								{
									return ['user_id'=>$result->user_id,'id'=>$result->id,'title'=>$result->title];
								})->onEachSide(2);
			return Inertia::render('apb_lis_xdocx_dcatx_00600_00025',['pagedata'=>$result_page]);
		}
		/* -------------------------------------------------------------------------------------------- */
		public function tx_xcatx_xxxxx_00600_00025()
		{
			$aCatId = tracecat::where('status','25')->get('cat_id');
			$result_page = cat::join('users','cats.user_id','=','users.id')
											->select('users.id as user_id','users.name as user_name','cats.id as id', 'cats.title as title')
											->whereIn('cats.id',$aCatId)->paginate(2)
											->through(function($result)
											{
												return ['user_id'=>$result->user_id,'user_name'=>$result->user_name,'id'=>$result->id,'title'=>$result->title];
											})->onEachSide(2);
											
			return Inertia::render('apb_lis_xcatx_xxxxx_00600_00025',['pagedata'=>$result_page]);								
		}
		/* -------------------------------------------------------------------------------------------- */
		public function tx_xfrmx_xstrx_00600_xxxxx(Request $request,$p_user_id)
		{
			$aR = array();
			$aLevel_store = array();
			$aUniqueForm = formfilled::join('forms','formfilleds.form_id','=','forms.id')
													 ->select('forms.id as id',
																		'forms.title as title')
													->where('formfilleds.user_id',$p_user_id) // _wip_
													->distinct()->get(['id','title'])->toArray();
			for ($i = 0; $i < sizeof($aUniqueForm); $i++)
			{
				$aUniqueStore = formfilled::join('formfilledcollections','formfilleds.store_id','=','formfilledcollections.id')
																		->select(	'formfilledcollections.id as id',
																							'formfilledcollections.title as title')
														->where('formfilleds.user_id',$p_user_id)
														->where('formfilleds.form_id',$aUniqueForm[$i]['id'])
														->distinct('store_id')->get(['id','title'])->toArray();
				$aLevel_store[$aUniqueForm[$i]['id']] = $aUniqueStore;
			}
			$aR = array('unique_form_result'=>$aUniqueForm,'unique_form_store_result'=>$aLevel_store);
			return Inertia::render('app_lis_xfrmx_xstrx_00600_xfilx',['pagedata'=>$aR,
																																'_laravel_session_token'=>$request->session()->token(),
																																'user_id'=>$p_user_id]);													
		}
		/* -------------------------------------------------------------------------------------------- */
		public function worked1_tx_xfilx_xxxxx_00600_xxxxx(Request $request,$p_user_id)
		{
			$result_page = formfilled::join('formfilledcollections','formfilleds.store_id','=','formfilledcollections.id')
													 ->join('forms','formfilledcollections.form_id','=','forms.id')
													 ->select('formfilledcollections.id as store_id',
																		'formfilledcollections.title as store_title',
																		'forms.id as form_id',
																		'forms.title as form_title',
																		'formfilleds.id as fil_id',
																		'formfilleds.might_be_unique_search_key as fil_info',
																		'formfilleds.mixed_tid_values_search_key as fil_more_info'
																		)
																		
													->where('formfilleds.user_id',$p_user_id)
													->orderBy('form_id','ASC')
													->orderBy('store_id','ASC')
													->orderBy('fil_id','ASC')
													//->get()
													//->toArray();
													->paginate(10)
													->through(function($result)
													{
														return ['store_id'=>$result->store_id,
																		'store_title'=>$result->store_title,
																		'form_id'=>$result->form_id,
																		'form_title'=>$result->form_title,
																		'fil_id'=>$result->fil_id,
																		'fil_info'=>$result->fil_info,
																		'fil_more_info'=>$result->fil_more_info,
														];
													})->onEachSide(10);
			//$x = array('data'=>$result_page);
			return Inertia::render('_app_lis_xstrx_xfrmx_00600_xfilx',['pagedata'=>$result_page]);

			//$temp = MarsQueriesController::retrieve_formfilled_list_frm_str_fil($request,$p_user_id);
			//return Inertia::render('_app_lis_xstrx_xfrmx_00600_xfilx',['pagedata'=>$result_page,'temp'=>$temp->getData()->list_tuple]);
		}	
		/* -------------------------------------------------------------------------------------------- */
		public function retrieve_formfilled_list_frm_str_fil(Request $request,$p_user_id){}
		
		public function worked2_tx_xfilx_xxxxx_00600_xxxxx(Request $request,$p_user_id)
		{
			$result_page = formfilled::join('formfilledcollections','formfilleds.store_id','=','formfilledcollections.id')
													 ->join('forms','formfilledcollections.form_id','=','forms.id')
													 ->select('formfilledcollections.id as store_id',
																		'formfilledcollections.title as store_title',
																		'forms.id as form_id',
																		'forms.title as form_title',
																		'formfilleds.id as fil_id',
																		'formfilleds.might_be_unique_search_key as fil_info',
																		'formfilleds.mixed_tid_values_search_key as fil_more_info'
																		)
																		
													->where('formfilleds.user_id',$p_user_id)
													->orderBy('form_id','ASC')
													->orderBy('store_id','ASC')
													->orderBy('fil_id','ASC')
													//->get()
													//->toArray();
													->paginate(10)
													->through(function($result)
													{
														return ['level_2_id'=>$result->store_id,
																		'level_2_title'=>$result->store_title,
																		'level_1_id'=>$result->form_id,
																		'level_1_title'=>$result->form_title,
																		'col_id'=>$result->fil_id,
																		'col_2'=>$result->fil_info,
																		'col_3'=>$result->fil_more_info,
														];
													})->onEachSide(10);
			$kv_level_1						= array('id'=>'form_id','title'=>'form_title');
			$kv_level_2						= array('id'=>'store_id','title'=>'store_title');
			$list_key			 				= array();
			$list_key[0]	 				= 'fil_id';
			$list_key[1]	 				= 'fil_info';
			$list_key[2]	 				= 'fil_more_info';
													
			$list_link		 				= [];
			$list_link['prefix']	= '/Earth/xfilx_xxxxx_00200_xxxxx/';
			$list_link['suffix']	= '';//'/'.$request->form_id;
			$list_tuple						= $result_page->items();
		//return response()->json(['list_key'=>$list_key,'list_link'=>$list_link,'list_tuple'=>$list_tuple,'pagedata'=>$result_page],201);
			return Inertia::render('_app_lis_xstrx_xfrmx_00600_xfilx',['list_key'=>$list_key,'list_link'=>$list_link,'pagedata'=>$result_page]);

		}	
		/* -------------------------------------------------------------------------------------------- */
		public function tx_xfilx_xxxxx_00600_xxxxx(Request $request,$p_user_id)
		{
			$result_page = formfilled::join('formfilledcollections','formfilleds.store_id','=','formfilledcollections.id')
													 ->join('forms','formfilledcollections.form_id','=','forms.id')
													 ->select('formfilledcollections.id as store_id',
																		'formfilledcollections.title as store_title',
																		'forms.id as form_id',
																		'forms.title as form_title',
																		'formfilleds.id as fil_id',
																		'formfilleds.might_be_unique_search_key as fil_info',
																		'formfilleds.mixed_tid_values_search_key as fil_more_info'
																		)
																		
													->where('formfilleds.user_id',$p_user_id)
													->orderBy('form_id','ASC')
													->orderBy('store_id','ASC')
													->orderBy('fil_id','ASC')
													//->get()
													//->toArray();
													->paginate(10)
													->through(function($result)
													{
														return ['store_id'=>$result->store_id,
																		'store_title'=>$result->store_title,
																		'form_id'=>$result->form_id,
																		'form_title'=>$result->form_title,
																		'fil_id'=>$result->fil_id,
																		'fil_info'=>$result->fil_info,
																		'fil_more_info'=>$result->fil_more_info,
														];
													})->onEachSide(10);
			$kv_level_1						= array('id'=>'form_id','title'=>'form_title');
			$kv_level_2						= array('id'=>'store_id','title'=>'store_title');
			$list_key			 				= array('col_1'=>'fil_id','col_2'=>'fil_info','col_3'=>'fil_more_info');
			$list_link						= array('prefix'=>'/Earth/xfilx_xxxxx_00200_xxxxx/','suffix'=>'');
			return Inertia::render('_app_lis_xstrx_xfrmx_00600_xfilx',
																																[
																																'kv_level_1'=>$kv_level_1,
																																'kv_level_2'=>$kv_level_2,
																																'list_key'=>$list_key,
																																'list_link'=>$list_link,
																																'pagedata'=>$result_page]);

		}	
}

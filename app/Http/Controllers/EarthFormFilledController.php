<?php

namespace App\Http\Controllers;

use App\Models\formfilled;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use Inertia\Inertia;

class EarthFormFilledController extends Controller
{
   public function __invoke(Request $request)
    {
        //
    }
    /**
     * Display a listing of the resource.
     */
		/* -------------------------------------------------------------------------------------------- */		
		private function _get_feuri_document_tmp($p_owner_id,$p_store_id,$p_user_id,$p_doc_id)
		{
			return 	$p_owner_id."/".
							config('config_earth.path_before_store_id')."/".
							$p_store_id."/".
							config('config_earth.path_after_store_id_tmp')."/".
							$p_doc_id."/".$p_user_id."_".$p_doc_id.".xml";
		}
		/* -------------------------------------------------------------------------------------------- */		
		private function _get_feuri_document_tmp_json($p_owner_id,$p_store_id,$p_user_id,$p_doc_id)
		{
			return 	$p_owner_id."/".
							config('config_earth.path_before_store_id')."/".
							$p_store_id."/".
							config('config_earth.path_after_store_id_tmp')."/".
							$p_doc_id."/".$p_user_id."_".$p_doc_id.".json";
		}
		/* -------------------------------------------------------------------------------------------- */		
    public function index()
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */		
		public function retrieve_formfilled_list_by_store(Request $request)
		{
		//dd($request->store_id);
			
			$result = formfilled::where('store_id',$request->store_id)
								->get([	'id as fil_id',
												'form_id',
												'store_id',
												'might_be_unique_search_key as info',
												'mixed_tid_values_search_key as more_info']);
			
			$list_key			 				= array();
			$list_key[0]	 				= 'fil_id';
			$list_key[1]	 				= 'info';
			$list_key[2]	 				= 'more_info';
			
			$list_link		 				= [];
			$list_link['prefix']	= '/Earth/xfilx_xxxxx_00200_xxxxx/'.$request->form_id.'/'.$request->store_id.'/';//'/Earth/xfilx_xxxxx_00100_xxxxx/'.$request->form_id.'/';
			$list_link['suffix']	= '';//'/'.$request->form_id;

			$list_tuple = array();
			for ($i = 0; $i < sizeof($result); $i++)
			{
				$list_tuple[$i]['fil_id'] 		= $result[$i]['fil_id'];
				$list_tuple[$i]['info'] 			= $result[$i]['info'];
				$list_tuple[$i]['more_info'] = $result[$i]['more_info'];
			}
			//dd($list_key);					
			return response()->json(['list_key'=>$list_key,'list_link'=>$list_link,'list_tuple'=>$list_tuple,'jsondata'=>$result],201);
			
			//return $request->store_id;
		}
		/* -------------------------------------------------------------------------------------------- */		
    /**
     * Show the form for creating a new resource.
     */
    public function create() 
    {
        //
				//dd($request->form_id.'/'.$request->store_id);
				
				return '';
    }
		/* -------------------------------------------------------------------------------------------- */		
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
				//dd($request);
			$validator = Validator::make($request->all(),
										[
											'form_id' 			=> 'required',
											'store_id'			=> 'required',
											'user_id'				=> 'required',
											'owner_id'			=> 'required',
										]);
	
			if ($validator->fails())
			{
				
				return redirect('/Venus/xfilx_xxxxx_00100_xxxxx/'.$request->form_id.'/'.$request->store_id)->withErrors($validator)->withInput();
			}				
			$record = formfilled::create([
				'form_id' 										=> $request->form_id,
				'store_id' 										=> $request->store_id,
			//'might_be_unique_search_key' 	=> 'x',
			//'mixed_tid_values_search_key' => 'x',
			//'tmp_object_id' 							=> 'x',
			//'pmn_objet_id' 								=> 'x',
			//'cat_list' 										=> 'x',
			//'lib_list' 										=> 'x',
				'user_id' 										=> $request->user_id,
				'owner_id' 										=> $request->owner_id,
			]);
				
			$feuri 	= $this->_get_feuri_document_tmp($record->owner_id,$record->store_id,$record->user_id,$record->id);
			Storage::put($feuri,$request->serialized_xml);
			$sQueryUrl		= $request->form_id."/".$request->store_id."/".$record->id;
			$redirectUrl	= '/Earth/xfilx_xxxxx_00300_xxxxx/'.$sQueryUrl;
				
			return redirect($redirectUrl)->withErrors($validator)->withInput();
    }
		/* -------------------------------------------------------------------------------------------- */		
    /**
     * Display the specified resource.
     */
    public function show(formfilled $formfilled)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */		
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(formfilled $formfilled)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */
		public function edit_recent() : RedirectResponse
		{
			$result = formfilled::where('user_id',Auth::id())->latest('updated_at')->first();
			$sQueryUrl = $result->form_id.'/'.$result->store_id.'/'.$result->id;
			// Earth/xfilx_xxxxx_00200_xxxxx/{form_id}/{store_id}/{doc_id:id}
			return redirect('/Earth/xfilx_xxxxx_00200_xxxxx/'.$sQueryUrl); // redirect()->to('Venus/...')->send()?
		}
		/* -------------------------------------------------------------------------------------------- */		
    /**
     * Update the specified resource in storage.
     */
   // public function update(Request $request, formfilled $formfilled)
 		public function update(Request $request) : RedirectResponse
		{
			$validator = Validator::make($request->all(),
										[
											'form_id' 			=> 'required',
											'store_id'			=> 'required',
											'user_id'				=> 'required',
											'owner_id'			=> 'required',
											'fil_id'				=> 'required',
										]);
	
			if ($validator->fails())
			{
				return redirect('/Venus/xlibx_xxxxx_00100_xxxxx')->withErrors($validator)->withInput();
			}				
			$feuri 				= $this->_get_feuri_document_tmp($request->user_id,$request->store_id,$request->user_id,$request->fil_id);
			Storage::put($feuri,$request->serialized_xml);

			$feuri 				= $this->_get_feuri_document_tmp_json($request->user_id,$request->store_id,$request->user_id,$request->fil_id);
			Storage::put($feuri,$request->serialized_jsn);
			

			$sQueryUrl		= $request->form_id."/".$request->store_id."/".$request->fil_id;
			// Earth/xfilx_xxxxx_00300_xxxxx/{form_id}/{store_id}/{doc_id:id}
			$redirectUrl	= '/Earth/xfilx_xxxxx_00300_xxxxx/'.$sQueryUrl;
			return redirect($redirectUrl);
		}
		/* -------------------------------------------------------------------------------------------- */		
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(formfilled $formfilled)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */		
}

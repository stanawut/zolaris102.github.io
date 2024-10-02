<?php

namespace App\Http\Controllers;

use App\Models\cat;
use App\Models\tracecat;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use Inertia\Inertia;

class VenusCatController extends Controller
{
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
				$result = cat::where('user_id',Auth::id())->get(['id','title']);
				return Inertia::render('app_lis_xcatx_xxxxx_00600_xxxxx',['cats'=>$result]);
    }
		/* ------------------------------------------ */
		public function index_extend_trace(Request $request)
		{
				$result = cat::join('tracecats','tracecats.cat_id','=','cats.id')
				->where('cats.user_id','=',Auth::id())
				->get(['cats.id as file_id','cats.title','tracecats.status as status_code']);
				//dd($result);
				return Inertia::render('app_lis_xcatx_xxxxx_00600_xxxxx',
																[
																'list'=>$result,
																'list_type'=>'cat',
																'_laravel_session_token'=>$request->session()->token()]
																);
		}
		/* ------------------------------------------ */
		public function jsonIndex(Request $request)
		{
				$result = cat::where('user_id',Auth::id())->get(['id','title']);
				return response()->json(['jsondata'=>$result],201);
		}
		/* -------------------------------------------------------------------------------------------- */
		public function edit_recent() : RedirectResponse
		{
			$result = cat::where('user_id',Auth::id())->latest('updated_at')->first();
			return redirect('/Venus/xcatx_xxxxx_00200_xxxxx/'.$result->id); // redirect()->to('/Venus...')->send()?
		}
		/* -------------------------------------------------------------------------------------------- */
		/* -------------------------------------------------------------------------------------------- */
		public function create() : View
		{
			return view('transaction_layouts.tx01.xcatx_xxxxx_00100_xxxxx');
		}
		/* -------------------------------------------------------------------------------------------- */
		/* -------------------------------------------------------------------------------------------- */		
		private function _get_feuri_document_pmn($p_user_id,$p_doc_id)
		{
			return 	$p_user_id."/".
							config('config_venus.path_before_cat_id')."/".
							$p_doc_id."/".
							config('config_venus.path_after_cat_id_document_pmn')."/".
							$p_user_id."_".$p_doc_id.".xml";
		}
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Store a newly created resource in storage.
     */
		/* -------------------------------------------------------------------------------------------- */
		public function store_default()//Request $request)
		{
			$fake_request = array('document_lang'=>'uni','title'=>'Predefined Cat','user_id'=>Auth::id());
			$record = cat::create(
				[
						'type'					=> 'xml',
						'template' 			=> 'none',
						'language'			=> 'uni',
						'title'					=> 'Predefined Cat',
						'inherit_id'		=> 0,
						'ref'						=> 'none',
						'note'					=> 'none',
						'extend'				=> 'none',
						'feuri_json_doc'=> 'none',
						'user_id'				=> Auth::id(),
				]);
				//when using calling from other controller fn with app('App\..to this')->store_default()
				//this fn can not use this._any inner fn(); inside this fn
				$dst_feuri =	Auth::id()."/".
											config('config_venus.path_before_cat_id')."/".
											$record->id."/".
											config('config_venus.path_after_cat_id_document_pmn')."/".
											Auth::id()."_".$record->id.".xml";
				Storage::copy(config('config_venus.archetype_cat_default_feuri'),$dst_feuri);
				return $record->id;
		}
		/* -------------------------------------------------------------------------------------------- */
    public function store(Request $request)
    {
			if (!lib1_xxx_is_commit($request->commit))
				return redirect('/gridboard');
						
			$request->merge(["user_id" => Auth::id()]);
			$validator = Validator::make($request->all(),
										[
											'user_id' 			=> 'required',
											'document_lang'	=> 'required',
											'title'					=> 'required'
										]);
	
			if ($validator->fails())
			{
				return redirect('/Venus/xcatx_xxxxx_00100_xxxxx')->withErrors($validator)->withInput();
			}
			$record = cat::create(
				[
					'type'					=> 'xml',
					'template' 			=> 'none',
					'language'			=> $request->document_lang,
					'title'					=> $request->title,
					'inherit_id'		=> 0,
					'ref'						=> 'none',
					'note'					=> 'none',
					'extend'				=> 'none',
					'feuri_json_doc'=> 'none',
					'user_id'				=> $request->user_id,
				]);
				
				tracecat::create([
					'cat_id'			=> $record->id,
					'status' 			=> 25,
					'tag'					=> 'math',
					'note'				=> 'no data']);
	
			$xml 		= lib1_xxx_rs_archetype_xml($record->title,7,'');
			$feuri 	= $this->_get_feuri_document_pmn($record->user_id,$record->id);
			Storage::put($feuri,$xml);
			
			return redirect('/Venus/xcatx_xxxxx_00200_xxxxx/'.$record->id);
    }
		/* -------------------------------------------------------------------------------------------- */
		public function update(Request $request) : RedirectResponse
		{
			$request->merge(["user_id" => Auth::id()]);
			$feuri 	= $this->_get_feuri_document_pmn($request->user_id,$request->file_id);
			Storage::put($feuri,$request->serialized_xml);
			
			//return redirect('/Venus/xcatx_xxxxx_00300_xxxxx/'.$request->file_id.'/updated');
			//return redirect('/Venus/xcatx_xxxxx_00600_xxxxx');
			//return response()->json(['action_done'=>'updated'],201);
			//return redirect('/Venus/xcatx_xxxxx_00200_xxxxx/'.$request->file_id);
			cat::where('id', $request->file_id)->update(array('updated_at' => NOW()));
			return redirect('/Venus/xcatx_xxxxx_00300_xxxxx/'.$request->file_id.'/updated');

		}
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Display the specified resource.
     */
    public function show(cat $cat)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cat $cat)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, cat $cat){}
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cat $cat)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */
}

<?php

namespace App\Http\Controllers;

use App\Models\form;
use App\Models\defaultasset;
use App\Models\traceform;
use App\Models\formfilledcollection;


use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use App\Http\Controller\MarsTraceFormController;

use Inertia\Inertia;

class VenusFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
 			$result = form::where('user_id',Auth::id())->get(['id','title']);
			return Inertia::render('app_lis_xfrmx_xxxxx_00600_xxxxx',['docs'=>$result]);
   }
		/* -------------------------------------------------------------------------------------------- */
		public function index_extend_trace(Request $request)
		{
			//dd($request);
			$result = form::join('traceforms','traceforms.form_id','=','forms.id')
								->where('forms.user_id','=',Auth::id())
								->get(['forms.id as file_id','forms.title','traceforms.lib_status as status_code']);
			//dd($result);
			return Inertia::render('app_lis_xfrmx_xxxxx_00600_xxxxx',
															[
																'list'=>$result,
																'list_type'=>'form',
																'_laravel_session_token'=>$request->session()->token()]
															);
		}
		/* -------------------------------------------------------------------------------------------- */
		public function index_extend_store(Request $request) 
		{
			
			
		}
		/* -------------------------------------------------------------------------------------------- */
		public function edit_recent() : RedirectResponse
		{
			$result = form::where('user_id',Auth::id())->latest('updated_at')->first();
			return redirect('/Venus/xfrmx_xxxxx_00200_xxxxx/'.$result->id); // redirect()->to('Venus/...')->send()?
		}

    /**
     * Show the form for creating a new resource.
     */
		/* -------------------------------------------------------------------------------------------- */
		/* -------------------------------------------------------------------------------------------- */
    public function create() : View
    {
			return view('transaction_layouts.tx01.xfrmx_xxxxx_00100_xxxxx');
    }
		/* -------------------------------------------------------------------------------------------- */
		private function _get_feuri_document_pmn_dynamic_name($p_user_id,$p_doc_id,$p_name_suffix,$p_file_extension)
		{
			return 	$p_user_id."/".
							config('config_venus.path_before_frm_id')."/".
							$p_doc_id."/".
							config('config_venus.path_after_frm_id_document_pmn')."/".
							$p_user_id."_".$p_doc_id."_".$p_name_suffix.".".$p_file_extension;
		}
		/* -------------------------------------------------------------------------------------------- */
		private function _get_feuri_document_pmn($p_user_id,$p_doc_id)
		{
			return 	$p_user_id."/".
							config('config_venus.path_before_frm_id')."/".
							$p_doc_id."/".
							config('config_venus.path_after_frm_id_document_pmn')."/".
							$p_user_id."_".$p_doc_id.".xml";
		}
		/* -------------------------------------------------------------------------------------------- */
		private function _get_feuri_images_tmp($p_user_id,$p_doc_id)
		{
			return 	$p_user_id."/".
							config('config_venus.path_before_frm_id')."/".
							$p_doc_id."/".
							config('config_venus.path_after_frm_id_images_tmp')."/".
							$p_user_id."_".$p_doc_id.".xml";
		}
		/* -------------------------------------------------------------------------------------------- */
		private function _get_druri_images_tmp($p_user_id,$p_doc_id)
		{
			return 	$p_user_id."/".
							config('config_venus.path_before_frm_id')."/".
							$p_doc_id."/".
							config('config_venus.path_after_frm_id_images_tmp');
		}
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Store a newly created resource in storage.
            $table->id();
						$table->string('type')->nullable()->default(null);
						$table->string('template')->nullable()->default(null);
						$table->string('language')->nullable()->default(null);
						$table->string('title');
						$table->string('status')->nullable()->default(null);
						$table->bigInteger('inherit_id')->unsigned()->nullable()->default(null);
						$table->string('inherit_type')->nullable()->default(null);
						$table->text('note')->nullable()->default(null);
						$table->timestamp('published_date')->nullable()->default(null);
						$table->foreignId('user_id')->constrained();
            $table->timestamps();
		*/
		public function store(Request $request) : RedirectResponse
		{
			$ciLibStatus_just_started = 25;

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
				return redirect('/Venus/xfrmx_xxxxx_00100_xxxxx')->withErrors($validator)->withInput();
			}
			$record = form::create(
				[
					'language' 	=> $request->document_lang,
					'title'  		=> $request->title,
					'user_id' 	=> $request->user_id,
				]);
				
				$result					= defaultasset::where('user_id',Auth::id())->where('type','lib')->get(['asset_id'])->first();
				$iDefaultLibId 	= $result->asset_id;
				traceform::create([
					'form_id'			=> $record->id,
					'library_id' 	=> $iDefaultLibId,
					'lib_status'	=> $ciLibStatus_just_started]);
				
			$xml 		= lib1_xxx_rs_archetype_xml($record->title,7,''); // lastid = 7
			$feuri 	= $this->_get_feuri_document_pmn($record->user_id,$record->id);
			Storage::put($feuri,$xml);
			
			return redirect('/Venus/xfrmx_xxxxx_00200_xxxxx/'.$record->id);
		}
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Display the specified resource.
     */
    public function show(form $form)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(form $form)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
		/*
    public function update(Request $request, form $form)
    {
        //
    }
		*/
		/* -------------------------------------------------------------------------------------------- */
		public function update(Request $request) : RedirectResponse
		{
			$request->merge(["user_id" => Auth::id()]);
			$feuri 	= $this->_get_feuri_document_pmn($request->user_id,$request->file_id);
			Storage::put($feuri,$request->serialized_xml);
			
			$feuri 	= $this->_get_feuri_document_pmn_dynamic_name($request->user_id,$request->file_id,'xsd','xsd');
			Storage::put($feuri,$request->serialized_xsd);

			$feuri 	= $this->_get_feuri_document_pmn_dynamic_name($request->user_id,$request->file_id,'frm','xml');
			Storage::put($feuri,$request->serialized_frm);

			form::where('id', $request->file_id)->update(array('updated_at' => NOW()));
			return redirect('/Venus/xfrmx_xxxxx_00300_xxxxx/'.$request->file_id.'/updated');

		}
		/* -------------------------------------------------------------------------------------------- */
		public function retrieve_stores(Request $request, $p_form_id)
		{
			$result = formfilledcollection::where('form_id',$p_form_id)
								->get([
									'id as store_id',
									'title as store_title',
									'description as store_description'
								]);
			$list_key			 				= array();
			$list_key[0]	 				= 'store_id';
			$list_key[1]	 				= 'store_title';
			$list_key[2]	 				= 'store_description';
			$list_link		 				= [];
			$list_link['prefix']	= '/Earth/xstrx_xfrmx_00300_xxxxx/';
			$list_link['suffix']	= '/'.$p_form_id;
			$list_tuple = array();
			for ($i = 0; $i < sizeof($result); $i++)
			{
				$list_tuple[$i]['store_id'] 					= $result[$i]['store_id'];
				$list_tuple[$i]['store_title'] 			= $result[$i]['store_title'];
				$list_tuple[$i]['store_description'] = $result[$i]['store_description'];
			}
		//dd($list_tuple);
			return Inertia::render('app_lis_xfrmx_xstrx_00600_xxxxx',
															[
																'form_id'									=> $p_form_id,
																'store_id'								=> 0,
																'list_key'								=> $list_key,
																'list_link'								=> $list_link,
																'list_tuple'						=> $list_tuple,
																'user_id'									=> Auth::id(),
																'file_id'									=> $p_form_id,
																'feuri'										=> '',
																'storage'									=> '',
																'_laravel_session_token'	=> $request->session()->token(),
															]);
		}
		/* -------------------------------------------------------------------------------------------- */
		public function retrieve_stores_list(Request $request)
		{
			//return [ 'hello' ];
			//dd($p_akv);
			$result = formfilledcollection::where('form_id',$request->form_id)
								->get([
									'id as store_id',
									'title as store_title',
									'description as store_description'
								]);

			$list_key			 				= array();
			$list_key[0]	 				= 'store_id';
			$list_key[1]	 				= 'store_title';
			$list_key[2]	 				= 'store_description';
			
			$list_link		 				= [];
			$list_link['prefix']	= '/Earth/xfilx_xxxxx_00100_xxxxx/'.$request->form_id.'/';
			$list_link['suffix']	= '';//'/'.$request->form_id;

			$list_tuple = array();
			for ($i = 0; $i < sizeof($result); $i++)
			{
				$list_tuple[$i]['store_id'] 					= $result[$i]['store_id'];
				$list_tuple[$i]['store_title'] 			= $result[$i]['store_title'];
				$list_tuple[$i]['store_description'] = $result[$i]['store_description'];
			}
								
		return response()->json(['list_key'=>$list_key,'list_link'=>$list_link,'list_tuple'=>$list_tuple,'jsondata'=>$result],201);
			//return response()->json(['jsondata'=>$result],201);
			/*					
			$list_key			 				= array();
			$list_key[0]	 				= 'store_id';
			$list_key[1]	 				= 'store_title';
			$list_key[2]	 				= 'store_description';
			
			$list_link		 				= [];
			$list_link['prefix']	= '/Earth/xstrx_xfrmx_00300_xxxxx/';
			$list_link['suffix']	= '/'.$p_form_id;
			
			$list_tuple = array();
			for ($i = 0; $i < sizeof($result); $i++)
			{
				$list_tuple[$i]['store_id'] 					= $result[$i]['store_id'];
				$list_tuple[$i]['store_title'] 			= $result[$i]['store_title'];
				$list_tuple[$i]['store_description'] = $result[$i]['store_description'];
			}
			//dd($list_tuple);
			return	(
								[
									'form_id'									=> $p_akv['form_id'],
									'store_id'								=> 0,
									'list_key'								=> $list_key,
									'list_link'								=> $list_link,
									'list_tuple'						=> $list_tuple,
									'user_id'									=> Auth::id(),
									'file_id'									=> $p_form_id,
									'feuri'										=> '',
									'storage'									=> '',
									'_laravel_session_token'	=> $request->session()->token(),
								]);
			*/
		}
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(form $form)
    {
        //
    }
}

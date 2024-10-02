<?php

namespace App\Http\Controllers;

use App\Models\formfilledcollection;
use App\Models\forms;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use Inertia\Inertia;

class EarthFormFilledCollectionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */
		public function create($frm_id) : View
		{
			//dd($id);
			return view('transaction_layouts.tx01.xstrx_xfrmx_00100_xxxxx')->with('frm_id',$frm_id);
		}
		/* -------------------------------------------------------------------------------------------- */
		private function _get_druri_store_pmn($p_user_id,$p_store_id)
		{
			return 	$p_user_id."/".
							config('config_earth.filled_collections')."/".$p_store_id."/".config('config_earth.path_after_store_id_pmn');
		}
		/* -------------------------------------------------------------------------------------------- */
		private function _get_druri_store_tmp($p_user_id,$p_store_id)
		{
			return 	$p_user_id."/".
							config('config_earth.filled_collections')."/".$p_store_id."/".config('config_earth.path_after_store_id_tmp');
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
				return redirect('/Venus/xstrx_xfrmx_00100_xxxxx')->withErrors($validator)->withInput();
			}
			$record = formfilledcollection::create(
			[
						'form_id'			=>	$request->frm_id,
						'language'		=>	$request->document_lang,
						'title'				=>	$request->title,
						'description'	=>	'',
						'note'				=>	'',		
						'tag'					=>	'',
						'status'			=>	25,
			]);
			$druri = $this->_get_druri_store_pmn(Auth::id(),$record->id);
			Storage::makeDirectory($druri);
			$druri = $this->_get_druri_store_tmp(Auth::id(),$record->id);
			Storage::makeDirectory($druri);

			/*
			$result_record = formfilledcollection::where('id','=',$record->id)
												->where('form_id','=',$request->frm_id)
												->get(['id as store_id','language','title','form_id','description','note','tag','status']);
			*/
			
			$result_record = formfilledcollection::join('forms','forms.id','=','formfilledcollections.form_id')
												->where('formfilledcollections.id','=',$record->id)
												->where('formfilledcollections.form_id','=',$request->frm_id)
											->get([
															'formfilledcollections.id as store_id',
															'formfilledcollections.language as store_language',
															'formfilledcollections.title as store_title',
															'formfilledcollections.description as store_description',
															'formfilledcollections.note as store_note',
															'formfilledcollections.tag as store_tag',
															'formfilledcollections.status as store_status',
															'formfilledcollections.form_id as form_id',
															'forms.title as form_title',
														]);
														
			$form_template = 
			[
				0=>['name'=>'store_id',					'input_type'=>'text','label'=>'store id',	'value'=>$result_record[0]['store_id'],					'editable'=>0],
				1=>['name'=>'store_language',		'input_type'=>'text','label'=>'language',	'value'=>$result_record[0]['store_language'],		'editable'=>0],
				2=>['name'=>'store_title',			'input_type'=>'text','label'=>'title',		'value'=>$result_record[0]['store_title'],			'editable'=>1],
				3=>['name'=>'store_description','input_type'=>'text','label'=>'desc',			'value'=>$result_record[0]['store_description'],'editable'=>1],
				4=>['name'=>'store_note',				'input_type'=>'text','label'=>'note',			'value'=>$result_record[0]['store_note'],				'editable'=>1],
				5=>['name'=>'store_tag',				'input_type'=>'text','label'=>'tag',			'value'=>$result_record[0]['store_tag'],				'editable'=>1],
				6=>['name'=>'store_status',			'input_type'=>'text','label'=>'status',		'value'=>$result_record[0]['store_status'],			'editable'=>1],
				7=>['name'=>'form_id',					'input_type'=>'text','label'=>'form id',	'value'=>$result_record[0]['form_id'],					'editable'=>0],
				8=>['name'=>'form_title',				'input_type'=>'text','label'=>'name',			'value'=>$result_record[0]['form_title'],				'editable'=>0],
			];
			/* if fn is 
			public function() :RedirectResponse 
			return redirect('/Earth/xstrx_xfrmx_00200_xxxxx/'.$record->id.'/'.$request->frm_id);
			*/
			
			//feuri on render:"http://localhost:5173/storage/app/public/11/venus/forms/13/document/pmn/11_13.xml"
			return Inertia::render('app_lis_xstrx_xfrmx_00200_xxxxx',
						[
							'result_record'						=>$result_record,
							'form_template'						=>$form_template,
							'user_id'									=>Auth::id(),
							'file_id'									=>$request->frm_id,
							'feuri'										=>'',
							'storage'									=>'',
							'_laravel_session_token'	=>$request->session()->token(),
						]);
			
		}
		/* -------------------------------------------------------------------------------------------- */
		public function retrieve(Request $request,$p_store_id,$p_form_id)
		{
			$result_record = formfilledcollection::join('forms','forms.id','=','formfilledcollections.form_id')
												->where('formfilledcollections.id','=',$p_store_id)
												->where('formfilledcollections.form_id','=',$p_form_id)
												->get([
															'formfilledcollections.id as store_id',
															'formfilledcollections.language as store_language',
															'formfilledcollections.title as store_title',
															'formfilledcollections.description as store_description',
															'formfilledcollections.note as store_note',
															'formfilledcollections.tag as store_tag',
															'formfilledcollections.status as store_status',
															'formfilledcollections.form_id as form_id',
															'forms.title as form_title',
														]);
														
			$form_template = 
			[
				0=>['name'=>'store_id',					'input_type'=>'text','label'=>'store id',	'value'=>$result_record[0]['store_id'],					'editable'=>0],
				1=>['name'=>'store_language',		'input_type'=>'text','label'=>'language',	'value'=>$result_record[0]['store_language'],		'editable'=>0],
				2=>['name'=>'store_title',			'input_type'=>'text','label'=>'title',		'value'=>$result_record[0]['store_title'],			'editable'=>1],
				3=>['name'=>'store_description','input_type'=>'text','label'=>'desc',			'value'=>$result_record[0]['store_description'],'editable'=>1],
				4=>['name'=>'store_note',				'input_type'=>'text','label'=>'note',			'value'=>$result_record[0]['store_note'],				'editable'=>1],
				5=>['name'=>'store_tag',				'input_type'=>'text','label'=>'tag',			'value'=>$result_record[0]['store_tag'],				'editable'=>1],
				6=>['name'=>'store_status',			'input_type'=>'text','label'=>'status',		'value'=>$result_record[0]['store_status'],			'editable'=>1],
				7=>['name'=>'form_id',					'input_type'=>'text','label'=>'form id',	'value'=>$result_record[0]['form_id'],					'editable'=>0],
				8=>['name'=>'form_title',				'input_type'=>'text','label'=>'name',			'value'=>$result_record[0]['form_title'],				'editable'=>0],
			];
			
			return Inertia::render('app_lis_xstrx_xfrmx_00200_xxxxx',
						[
							'store_id'								=>$p_store_id,
							'form_id'									=>$p_form_id,
							'result_record'						=>$result_record,
							'form_template'						=>$form_template,
							'user_id'									=>Auth::id(),
							'file_id'									=>$p_form_id,
							'feuri'										=>'',
							'storage'									=>'',
							'_laravel_session_token'	=>$request->session()->token(),
						]);
			
		}
		/* -------------------------------------------------------------------------------------------- */
		public function update(Request $request) : RedirectResponse
		{
			//dd($request); when debug cause error 
			
			formfilledcollection::where('id',$request->store_id)
														->update(array(
														'description'=>$request->store_description,
														'note'=>$request->store_note,
														'tag'=>$request->store_tag,
														));
														
			return redirect('/Earth/xstrx_xfrmx_00300_xxxxx/'.$request->store_id.'/'.$request->form_id);
		}
		/* -------------------------------------------------------------------------------------------- */
		public function data(Request $request,$p_store_id,$p_form_id)
		{
			$result_record = formfilledcollection::join('forms','forms.id','=','formfilledcollections.form_id')
												->where('formfilledcollections.id','=',$p_store_id)
												->where('formfilledcollections.form_id','=',$p_form_id)
												->get([
															'formfilledcollections.id as store_id',
															'formfilledcollections.language as store_language',
															'formfilledcollections.title as store_title',
															'formfilledcollections.description as store_description',
															'formfilledcollections.note as store_note',
															'formfilledcollections.tag as store_tag',
															'formfilledcollections.status as store_status',
															'formfilledcollections.form_id as form_id',
															'forms.title as form_title',
														]);
														
			$form_template = 
			[
				0=>['name'=>'store_id',					'input_type'=>'text','label'=>'store id',	'value'=>$result_record[0]['store_id'],					'editable'=>0],
				1=>['name'=>'store_language',		'input_type'=>'text','label'=>'language',	'value'=>$result_record[0]['store_language'],		'editable'=>0],
				2=>['name'=>'store_title',			'input_type'=>'text','label'=>'title',		'value'=>$result_record[0]['store_title'],			'editable'=>0],
				3=>['name'=>'store_description','input_type'=>'text','label'=>'desc',			'value'=>$result_record[0]['store_description'],'editable'=>0],
				4=>['name'=>'store_note',				'input_type'=>'text','label'=>'note',			'value'=>$result_record[0]['store_note'],				'editable'=>0],
				5=>['name'=>'store_tag',				'input_type'=>'text','label'=>'tag',			'value'=>$result_record[0]['store_tag'],				'editable'=>0],
				6=>['name'=>'store_status',			'input_type'=>'text','label'=>'status',		'value'=>$result_record[0]['store_status'],			'editable'=>0],
				7=>['name'=>'form_id',					'input_type'=>'text','label'=>'form id',	'value'=>$result_record[0]['form_id'],					'editable'=>0],
				8=>['name'=>'form_title',				'input_type'=>'text','label'=>'name',			'value'=>$result_record[0]['form_title'],				'editable'=>0],
			];
			
			return Inertia::render('app_lis_xstrx_xfrmx_00300_xxxxx',
						[
							'store_id'								=>$p_store_id,
							'form_id'									=>$p_form_id,
							'result_record'						=>$result_record,
							'form_template'						=>$form_template,
							'user_id'									=>Auth::id(),
							'file_id'									=>$p_form_id,
							'feuri'										=>'',
							'storage'									=>'',
							'_laravel_session_token'	=>$request->session()->token(),
						]);
		}
		/* -------------------------------------------------------------------------------------------- */
		
		/* -------------------------------------------------------------------------------------------- */
}

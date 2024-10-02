<?php

namespace App\Http\Controllers;

use App\Models\document;
use App\Models\defaultasset;
use App\Models\tracedocument;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use App\Http\Controllers\MarsTraceDocumentController;

use Inertia\Inertia;

class VenusDocumentController extends Controller
{
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
    }
		/* -------------------------------------------------------------------------------------------- */
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      //
			$result = document::where('user_id',Auth::id())->get(['id','title']);
			return Inertia::render('app_lis_xdocx_xxxxx_00600_xxxxx',['docs'=>$result]);
    }		
		/* -------------------------------------------------------------------------------------------- */
		public function index_extend_trace(Request $request)
		{
			$result = document::join('tracedocuments','tracedocuments.document_id','=','documents.id')
								->where('documents.user_id','=',Auth::id())
								->get(['documents.id as file_id','documents.title','tracedocuments.cat_status as status_code']);
			return Inertia::render('app_lis_xdocx_xxxxx_00600_xxxxx',
														 [
															'list'=>$result,
															'list_type'=>'document',
															'_laravel_session_token'=>$request->session()->token()]
														 );
		}
		/* -------------------------------------------------------------------------------------------- */
		public function edit_recent() : RedirectResponse
		{
			$result = document::where('user_id',Auth::id())->latest('updated_at')->first();
			return redirect('/Venus/xdocx_xxxxx_00200_xxxxx/'.$result->id); // redirect()->to('Venus/...')->send()?
		}
		/* -------------------------------------------------------------------------------------------- */
		/* -------------------------------------------------------------------------------------------- */
		public function create() : View
		{
			return view('transaction_layouts.tx01.xdocx_xxxxx_00100_xxxxx');
		}
		/* -------------------------------------------------------------------------------------------- */
		/* -------------------------------------------------------------------------------------------- */
		private function _get_feuri_document_pmn($p_user_id,$p_doc_id)
		{
			return 	$p_user_id."/".
							config('config_venus.path_before_doc_id')."/".
							$p_doc_id."/".
							config('config_venus.path_after_doc_id_document_pmn')."/".
							$p_user_id."_".$p_doc_id.".xml";
		}
		/* -------------------------------------------------------------------------------------------- */
		private function _get_feuri_images_tmp($p_user_id,$p_doc_id)
		{
			return 	$p_user_id."/".
							config('config_venus.path_before_doc_id')."/".
							$p_doc_id."/".
							config('config_venus.path_after_doc_id_images_tmp')."/".
							$p_user_id."_".$p_doc_id.".xml";
		}
		/* -------------------------------------------------------------------------------------------- */
		private function _get_druri_images_tmp($p_user_id,$p_doc_id)
		{
			return 	$p_user_id."/".
							config('config_venus.path_before_doc_id')."/".
							$p_doc_id."/".
							config('config_venus.path_after_doc_id_images_tmp');
							
		}
		/* -------------------------------------------------------------------------------------------- */
		public function store(Request $request) : RedirectResponse
		{
			$ciCatStatus_just_started = 25;
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
				return redirect('/Venus/xdocx_xxxxx_00100_xxxxx')->withErrors($validator)->withInput();
			}
			$record = document::create(
				[
					'type' 			=> 'doc',
					'template' 	=> 'none',
					'language' 	=> $request->document_lang,
					'title'  		=> $request->title,
					'cat_ref' 	=> 'none',
					'book_ref' 	=> 'none',
					'bind_ref' 	=> 'none',
					'cat_seq' 	=> 'none',
					'book_seq' 	=> 'none',
					'user_id' 	=> $request->user_id,
				]);

				$result					= defaultasset::where('user_id',Auth::id())->where('type','cat')->get(['asset_id'])->first();
				$iDefaultCatId 	= $result->asset_id;
				tracedocument::create([
					'document_id'	=> $record->id,
					'cat_id' 			=> $iDefaultCatId,
					'cat_status'	=> $ciCatStatus_just_started]);
				
			$xml 		= lib1_xxx_rs_archetype_xml($record->title,7,''); // lastid = 7
			$feuri 	= $this->_get_feuri_document_pmn($record->user_id,$record->id);
			Storage::put($feuri,$xml);
			
			return redirect('/Venus/xdocx_xxxxx_00200_xxxxx/'.$record->id);
		}
		/* -------------------------------------------------------------------------------------------- */
		public function update(Request $request) : RedirectResponse
		{
			$request->merge(["user_id" => Auth::id()]);
			$feuri 	= $this->_get_feuri_document_pmn($request->user_id,$request->file_id);
			Storage::put($feuri,$request->serialized_xml);
			
			$subdruri 	= $this->_get_druri_images_tmp($request->user_id,$request->file_id);
		//Ex.subdruri=1/Venus/documents/61/images/tmp *** not ending /
			$sSrc_druri = Storage::disk('public')->directories($subdruri);
			$sSrc_feuri = '';
			$sDes_feuri = '';
			for ($i = 0; $i < sizeof($sSrc_druri); $i++) 
			{
				$tmp 				= str_replace('tmp','pmn',$sSrc_druri[$i]);
				$tmp				= str_replace('tempimage_','permimage_',$tmp);
				$sSrc_feuri = $sSrc_druri[$i].'/tempimage.jpg';
				$sDes_feuri = $tmp.'/permimage.jpg';
				Storage::copy($sSrc_feuri,$sDes_feuri);
				Storage::deleteDirectory($sSrc_druri[$i]);
			
			//File::copyDirectory not working
			}
			/*
			Ex.update,get record updated,get latest via updated_at timestamp
			document::where('id', $request->file_id)->update(array('updated_at' => NOW()));
			$record = document::find($request->file_id);
			$result = document::latest('updated_at')->first();

			p fn x(Request $.) { ... return response()->json(['key1'=>'val1',...,'keyN'=>'valN']);
			p fn x(Request $.) : RedirectResponse { ... return redirec('/Venus...') }
			*/
			document::where('id', $request->file_id)->update(array('updated_at' => NOW()));
			return redirect('/Venus/xdocx_xxxxx_00300_xxxxx/'.$request->file_id.'/updated');
		}
		/* -------------------------------------------------------------------------------------------- */
		public function revert(Request $request) : RedirectResponse
		{
			$user_id	= Auth::id();
			
			$subdruri 	= $this->_get_druri_images_tmp($user_id,$request->file_id);
			$sSrc_druri = Storage::disk('public')->directories($subdruri);
			for ($i = 0; $i < sizeof($sSrc_druri); $i++) 
			{
				Storage::deleteDirectory($sSrc_druri[$i]);
			}
			//return redirect('/Venus/xdocx_xxxxx_00300_xxxxx/'.$request->file_id.'/reverted');
			//return redirect('/Venus/xdocx_xxxxx_00600_xxxxx');
			return redirect('/Venus/xdocx_xxxxx_00200_xxxxx/'.$request->file_id);
		}
		/* -------------------------------------------------------------------------------------------- */
}

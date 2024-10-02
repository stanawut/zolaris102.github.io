<?php

namespace App\Http\Controllers;

use App\Models\document;
use App\Models\tracedocument;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Inertia\Inertia;

class MarsTraceDocumentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
    }
		public function update(Request $request) : RedirectResponse
		{
			tracedocument::where('document_id',$request->file_id)->update(array('cat_status'=>$request->status_code_new));
			return redirect('/Venus/xdocx_xxxxx_00600_xxxxx');
		}
		/*
		public function store(Request $request)
		{
			dd($request);
			$record = tracedocument::create([
				'document_id' =>	$request->document_id ,
				'cat_id' 			=>	$request->cat_id,
				'cat_status' 	=>	$request->cat_status,
			]);
		}
		*/
}

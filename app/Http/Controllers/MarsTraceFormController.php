<?php

namespace App\Http\Controllers;

use App\Models\form;
use App\Models\traceform;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class MarsTraceFormController extends Controller
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
			traceform::where('form_id',$request->file_id)->update(array('lib_status'=>$request->status_code_new));
			return redirect('/Venus/xfrmx_xxxxx_00600_xxxxx');
		}
}

<?php

namespace App\Http\Controllers;

use App\Models\cat;
use App\Models\tracecat;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Inertia\Inertia;

class MarsTraceCatController extends Controller
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
			tracecat::where('cat_id', $request->file_id)->update(array('status' => $request->status_code_new));
			return redirect('/Venus/xcatx_xxxxx_00600_xxxxx/');
		}
}

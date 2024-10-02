<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class VenusDeleteTempImageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
      //
			$folder = request()->getContent();
			//$folder	= $request->file('file_to_upload');
			
			if ($folder)
			{
				$druri	= Auth::id().	'/'.config('config_venus.path_before_doc_id').
															'/'.$request->id.
															'/'.config('config_venus.path_after_doc_id_images_tmp').
															'/'.$folder;
				Storage::deleteDirectory($druri);
			}
			return response()->noContent();
    }
}

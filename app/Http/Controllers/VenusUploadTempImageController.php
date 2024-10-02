<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VenusUploadTempImageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
			if ($request->hasFile('file_to_upload'))
			{
				$image	= $request->file('file_to_upload');
			//$fename = $image->getClientOriginalName();
				$fename = 'tempimage.jpg';
				$folder = uniqid('tempimage_',true);
				$druri	= Auth::id().	'/'.config('config_venus.path_before_doc_id').
															'/'.$request->id.
															'/'.config('config_venus.path_after_doc_id_images_tmp').
															'/'.$folder;
				$image->storeAs($druri,$fename);
				return $folder;//response()->json(['folder'=>$folder]);
			}
			return '';    
		}
}

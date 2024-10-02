<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\tempimage;

class MercuryUploadTempImageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
				if ($request->hasFile('file_to_upload'))
				{
					$image 	= $request->file('file_to_upload');
					$fename = $image->getClientOriginalName();
					$folder = uniqid('tempimage_',true);
					$druri 	= Auth::id() .'/' . config('config_mercury.profile_images_tmp') . '/' . $folder;
					$image->storeAs($druri,$fename);
					
					tempimage::create([
						'user_id' => Auth::id(),
						'folder' 	=> $folder,
						'fename' 	=> $fename
					]);
					
					return $folder;
				}
				return '';
    }
}

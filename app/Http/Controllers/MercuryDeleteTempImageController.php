<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\tempimage;
use Illuminate\Support\Facades\Storage;

class MercuryDeleteTempImageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        //
				$image = tempimage::where('folder',request()->getContent())->first();
				if ($image)
				{
					$druri 	= Auth::id() .'/' . config('config_mercury.profile_images_tmp') . '/' . $image->folder;

					Storage::deleteDirectory($druri);
					$image->delete();
				}	
				response()->noContent();
				
    }
}

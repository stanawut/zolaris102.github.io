<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\tempimage;
use App\Models\profile;
use App\Models\profileimage;

class MercuryStoreProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
				$request->merge(['user_id'=>Auth::id()]);
				$validator = Validator::make($request->all(),
											[
												'user_id' 		=> 'required',
												'title' 			=> 'required',
												'description' => 'required'
											]);

			//$a_image = tempimage::all();
				$a_image = tempimage::where('user_id',Auth::id())->get();
				
				// case fail or data invalidated
				if ($validator->fails())
				{
					foreach($a_image as $image)
					{
						$src_druri 	= Auth::id() .'/' . config('config_mercury.profile_images_tmp') . '/' . $image->folder;
						Storage::deleteDirectory($src_druri);
						$image->delete();
					}
					return redirect('/dashboard')->withErrors($validator)->withInput();
				}

				// case data validated
				$profile = profile::create($validator->validated());
				foreach($a_image as $image)
				{
					$src_feuri 	= Auth::id() .'/' . config('config_mercury.profile_images_tmp') . '/' . $image->folder . '/' . $image->fename;
					$dst_feuri 	= Auth::id() .'/' . config('config_mercury.profile_images_pmn') . '/' . $image->folder . '/' . $image->fename;

					Storage::copy($src_feuri,$dst_feuri);
					profileimage::create(
						[
							'profile_id' 	=> $profile->id,
							'feuri'				=> $image->folder.'/'.$image->fename,
							'fename' 			=> $image->fename
						]);
						$src_druri 	= Auth::id() .'/' . config('config_mercury.profile_images_tmp') . '/' . $image->folder;
						Storage::deleteDirectory($src_druri);
						$image->delete();						
				}
				return redirect('/profile');
				
    }
}

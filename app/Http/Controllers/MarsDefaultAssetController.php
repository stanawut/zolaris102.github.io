<?php

namespace App\Http\Controllers;

use App\Models\defaultasset;

use Illuminate\Http\Request;

use Inertia\Inertia;

class MarsDefaultAssetController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
    }
		public function store(Request $request)
		{
			$record = defaultasset::create([
				'user_id' => $request->user_id,
				'type' => $request->type,
				'asset_id' => $request->asset_id
			]);
		}
}

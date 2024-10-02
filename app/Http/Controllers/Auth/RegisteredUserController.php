<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\defaultasset;

use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\VenusCatController;
use App\Http\Controllers\MarsDefaultAssetController;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);
				Storage::makeDirectory(Auth::id().'/'.config('config_mercury.profile_images_tmp'));
				Storage::makeDirectory(Auth::id().'/'.config('config_mercury.profile_images_pmn'));

				Storage::makeDirectory(Auth::id().'/'.config('config_earth.filled_collections'));
				
				$iCatId = app('App\Http\Controllers\VenusCatController')->store_default();
				$iLibId = app('App\Http\Controllers\VenusLibraryController')->store_default();
				defaultasset::create([
					'user_id'	=> Auth::id(),
					'type' => 'cat',
					'asset_id' => $iCatId
				]);
				defaultasset::create([
					'user_id' => Auth::id(),
					'type' => 'lib',
					'asset_id' => $iLibId
				]);
				

        return redirect(RouteServiceProvider::HOME);
    }
}

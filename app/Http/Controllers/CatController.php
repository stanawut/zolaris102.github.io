<?php

namespace App\Http\Controllers;

use App\Models\cat;
use App\Http\Requests\StorecatRequest;
use App\Http\Requests\UpdatecatRequest;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
				$result = cat::where('user_id',Auth::id())->get(['id','title']);
				return Inertia::render('app_lis_list_cats_by_user_id',['cats'=>$result]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorecatRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(cat $cat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cat $cat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecatRequest $request, cat $cat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cat $cat)
    {
        //
    }
}

<script>
	import {inertia} 												from '@inertiajs/svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibUI 											from '../Svelte_AllLibs/libUI.js';
	/* ---------------------------------------------------------------------------------------------- */
	import { sdgb_src_lang,sdgb_wrt_lang	} from '../Svelte_Store/session_data.js';
	import { sdgb_default_emid1grouplang }	from '../Svelte_Store/session_data.js';
	/* ------------------------------------------------------------------------------------------------ */
	let src_lang,wrt_lang;
	let gb_default_emid1grouplang;
	sdgb_src_lang.subscribe(								(value)=>{ src_lang = value});
	sdgb_wrt_lang.subscribe(								(value)=>{ wrt_lang = value});
	sdgb_default_emid1grouplang.subscribe(	(value)=>{ gb_default_emid1grouplang = value});
	/* ------------------------------------------------------------------------------------------------ */
	let sTitle = '_LIS_';
	/* ------------------------------------------------------------------------------------------------ */
	function handleClickSourceIn(e)
	{
		console.log(e.target.id); // source-in-{uni,th,en,ch,mul}
		$sdgb_src_lang = (e.target.id).substring('source-in-'.length);
		console.log(src_lang);
	}
	/* ------------------------------------------------------------------------------------------------ */
	function handleClickWriteIn(e)
	{
		console.log(e.target.id); // write-in-{uni,th,en,ch,mul}
		$sdgb_wrt_lang = (e.target.id).substring('write-in-'.length);
		console.log(wrt_lang);
		$sdgb_default_emid1grouplang = LibUI._get_lang2emenur1_map(wrt_lang);
	}
	/* ------------------------------------------------------------------------------------------------ */
</script>

<style>

</style>

<svelte:head>
<title>{sTitle}</title>
</svelte:head>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/dashboard">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="/dashboard">Home</a>
        <a class="nav-link" 					href="/gridboard">Gridboard</a>
        <a class="nav-link" 					href="/dashboard">No link</a>
        <a class="nav-link disabled" 	href="/dashboard" aria-disabled="true">Language</a>

				<div class="dropdown">
					<button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						Source 
					</button>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						<li><button id="source-in-uni" 	name="source-in" on:click={e=>handleClickSourceIn(e)} on:keypress={handleClickSourceIn} class="dropdown-item">Uni</button></li>
						<li><button id="source-in-th" 	name="source-in" on:click={e=>handleClickSourceIn(e)} on:keypress={handleClickSourceIn} class="dropdown-item">Thai</button></li>
						<li><button id="source-in-en" 	name="source-in" on:click={e=>handleClickSourceIn(e)} on:keypress={handleClickSourceIn} class="dropdown-item">English</button></li>
						<li><button id="source-in-ch" 	name="source-in" on:click={e=>handleClickSourceIn(e)} on:keypress={handleClickSourceIn} class="dropdown-item">Chinese</button></li>
						<li><button id="source-in-mul" 	name="source-in" on:click={e=>handleClickSourceIn(e)} on:keypress={handleClickSourceIn} class="dropdown-item">All</button></li>
					</ul>
				</div>				

				<div class="dropdown">
					<button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
						Write in
					</button>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
						<li><button id="write-in-uni" 	name="write-in" on:click={e=>handleClickWriteIn(e)} on:keypress={handleClickWriteIn} class="dropdown-item">Uni</button></li>
						<li><button id="write-in-th" 		name="write-in" on:click={e=>handleClickWriteIn(e)} on:keypress={handleClickWriteIn} class="dropdown-item">Thai</button></li>
						<li><button id="write-in-en" 		name="write-in" on:click={e=>handleClickWriteIn(e)} on:keypress={handleClickWriteIn} class="dropdown-item">English</button></li>
						<li><button id="write-in-ch" 		name="write-in" on:click={e=>handleClickWriteIn(e)} on:keypress={handleClickWriteIn} class="dropdown-item">Chinese</button></li>
						<li><button id="write-in-mul" 	name="write-in" on:click={e=>handleClickWriteIn(e)} on:keypress={handleClickWriteIn} class="dropdown-item">All</button></li>
					</ul>
				</div>				

      </div>
    </div>
  </div>
</nav>
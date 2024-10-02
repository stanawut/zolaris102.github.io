<script>
	import Layout from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibUI 					from '../Svelte_AllLibs/libUI.js';
	import * as LibTX 					from '../Svelte_AllLibs/libTX.js';
	/* ---------------------------------------------------------------------------------------------- */
	let oXmlAnyInactive 				= null;
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 						from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 			from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	/* ---------------------------------------------------------------------------------------------- */
	sd_xid.subscribe((value)=>{xid=value});
	sd_tid.subscribe((value)=>{tid=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let 	errors;
	export let 	storage;
	/* ---------------------------------------------------------------------------------------------- */
	export let 	_laravel_session_token;
	export let 	file_id;
	export let 	user_id;
	export let 	feuri;
	export let 	action_done;
	/* ---------------------------------------------------------------------------------------------- */
	let	data_list = null;
	let open			=	false;
	/* ---------------------------------------------------------------------------------------------- */
	onMount( async () => {
			let akv_loadXml2Doc = {
															class_type		:'any',
															_edit_cat			:'none',

															user_id				:user_id,
															file_id				:file_id,
															feuri					:feuri,
															action_done		:action_done,
															hemroot_id		:'INACTIVE_ROOT',
															status_active	:false,
															target_folder	:'documents',
														};
			$sd_xid							= file_id;
			oXmlAnyInactive 		= await LibTX.loadXml2Dog(akv_loadXml2Doc);
	});
	/* ---------------------------------------------------------------------------------------------- */
	let clicked 		= false;
	const handleListCat = async (e)=>{ 
															let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
															clicked = !clicked;
															open		=	!open;
															if (open == false) 			return;
															if (data_list !== null) return;
															let akvInputParams = 
																										{ 
																											laravel_session_token		: _laravel_session_token,
																										};
																											
															let txurl	= '/Venus/xcatx_xxxxx_00600_xxxxx/list';
															data_list = await LibTX.fetch_Cat_Lib_files2json(txurl,akvInputParams);
														//{jsondata:[{id:1,title:'aa'},{id:2,title:'bb'}]};
	}	
	// --------------------------------------------
	const handleListBook = (e)=>{ 
															let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
															clicked = !clicked	;
															let akvInputParams = 
																										{ 
																											laravel_session_token		: _laravel_session_token,
																										};
																											
	}
	/* ---------------------------------------------------------------------------------------------- */
	const resetClick 	= (e)=>{ clicked = false			; console.log('xx'); 	}
	/* ---------------------------------------------------------------------------------------------- */
</script>

<style>
@import '/public/my_style.css';
</style>

<main>

	<Layout>
		<div class="container">
			<header class="d-flex justify-content-center py-3">
				<ul class="nav nav-pills">
					<li class="nav-item"><a href="/Venus/xcatx_xxxxx_00200_xxxxx/{file_id}" class="nav-link active" aria-current="page">Edit</a></li>
					<li class="nav-item"><button id="xditor_main_cat" 	class="nav-link" on:click={e=>handleListCat(e)} 	on:keypress={handleListCat}>☰ Doc</button></li>
					<li class="nav-item"><button id="xditor_main_bkx" 	class="nav-link" on:click={e=>handleListBook(e)} 	on:keypress={handleListBook}>☰ _?_</button></li>
					<li class="nav-item"><a href="/gridboard" class="nav-link">&#10006;</a></li>
				</ul>
			</header>
		</div>
		<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
		<p class="alert alert-success">uid_{user_id}_,xid_{file_id}_,tid_{tid}_</p>

		<div id="INACTIVE_ROOT">
		</div>

	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}{storage}</div>
</main>
<script>
	import Layout 							from '@/Pages_Layouts/Layout_apb_lis_xxxxx_xxxxx_00300_xxxxx.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibUI 					from '../Svelte_AllLibs/libUI.js';
	import * as LibTX 					from '../Svelte_AllLibs/libTX.js';
	/* ---------------------------------------------------------------------------------------------- */
	let oXmlAnyInactive					= null;
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
	export let 	current_page;
	export let 	feuri;
	export let 	action_done;
	let page_number;
	/* ---------------------------------------------------------------------------------------------- */
	page_number = current_page;
	/* ---------------------------------------------------------------------------------------------- */
	onMount( async () => {
			let akv_loadXml2Doc = {
															class_type						:'any',
															doc_type							:'cat',
															_edit_cat							:'none',
				
															user_id								:user_id,
															file_id								:file_id,
															feuri									:feuri,
															action_done						:action_done,
															hemroot_id						:'INACTIVE_ROOT',
															status_active					:false,
															target_folder					:'documents',
																	
															_enable_link_doc 			: true,
															_current_page					: page_number, // wip_wip
														};
			$sd_xid							= file_id;
			oXmlAnyInactive 		= await LibTX.loadXml2Dog(akv_loadXml2Doc);
	});
	/* ---------------------------------------------------------------------------------------------- */
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	const resetClick 	= (e)=>{ clicked = false			; console.log('xx'); 	}
	/* ---------------------------------------------------------------------------------------------- */
</script>

<style>
@import '/public/my_style.css';
</style>

<main>

	<Layout {page_number}>
		<div class="container">
			<!-- header class="d-flex justify-content-center py-3">
				<ul class="nav nav-pills">
					<li class="nav-item"><a href="/Venus/xdocx_xxxxx_00200_xxxxx/{file_id}" class="nav-link active" aria-current="page">Edit</a></li>
					<li class="nav-item"><a href="/Venus/xdocx_xcatx_02B02_xxxxx/{file_id}" class="nav-link">☰ Cat</a></li>
					<li class="nav-item"><a href="/Venus/xdocx_xbxkx_02B02_xxxxx/{file_id}" class="nav-link">☰ Book</a></li>
					<li class="nav-item"><a href="/gridboard" class="nav-link">&#10006;</a></li>
				</ul>
			</header -->
		</div>
		<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
		<p class="alert alert-success">uid_{user_id}_,xid_{file_id}_,tid_{tid}_</p>

		<div id="INACTIVE_ROOT">
		</div>
	</Layout>

	<!-- slot></slot -->
	
<div style="display:none">{errors}{storage}</div>
</main>
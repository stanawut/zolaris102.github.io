<script>
	import Layout from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibUI 					from '../Svelte_AllLibs/libUI.js';
	import * as LibTX 					from '../Svelte_AllLibs/libTX.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 						from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	let oXmlInstance 						= null;
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 			from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(	(value)=>{tid=value});
	sd_xid.subscribe(	(value)=>{xid=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	export let storage;
	/* ---------------------------------------------------------------------------------------------- */
	export let 	_laravel_session_token;
	export let	store_id							;
	export let 	form_id								;
	export let 	file_id								;	// frm_id
	export let 	user_id								;
	export let 	feuri									; // frm_id file uri
	export let list_key								;
	export let list_link							;
	export let 	list_tuple					;
		console.log(list_tuple);
	
//	export let 	action_done						;
//export let	result_record					;
//console.log(result_record)				;
//	export let 	form_template					;
//	console.log(form_template);

	feuri = LibTX.get_feuri_document_pmn('frm',user_id,file_id);
	/* ---------------------------------------------------------------------------------------------- */
	onMount( async () => {
			let akv_loadXml2Doc = {
															class_type		:'frm',
															_edit_cat			:'none',

															user_id				:user_id,
															file_id				:file_id,
															feuri					:feuri,
															action_done		:'',
															hemroot_id		:'DOCUMENT_ROOT',
															status_active	:true,
															target_folder	:'documents',
														};
			$sd_xid							= file_id;
			oXmlInstance				= await LibTX.loadXml2Dog(akv_loadXml2Doc);
			LibUI.showEditableList('linkable_list',list_key,list_link,list_tuple);
	});
	/* ---------------------------------------------------------------------------------------------- */
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	const resetClick 	= (e)=>{ clicked = false			; console.log('xx'); 	}
	const handleSave = (e)=>{
		console.log('Save');
		let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
		/*
		console.log(_laravel_session_token);
		console.log(form_template);
		for(let i=0; i < form_template.length;i++)
		{
			let e = document.getElementById(form_template[i].name);
			console.log(e.value);
			form_template[i].value = e.value;
		}
		console.log(form_template);
		LibTX.fetch002Update(form_template,_laravel_session_token);
		*/
	
	}
	const handleIgnore = (e)=>{
		console.log('Ignore');
	}
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
					<li class="nav-item"><a href="/Earth/xstrx_xfrmx_00200_xxxxx/{store_id}/{form_id}"		class="nav-link">Edit</a></li>
					<li class="nav-item"><button id="xditor_main_ignore" 																	class="nav-link" on:click={e=>handleIgnore(e)} on:keypress={handleIgnore}>Ignore</button></li>
					<li class="nav-item"><a href="/Venus/xdocx_xcatx_02B02_xxxxx/{file_id}" 							class="nav-link">Drop</a></li>
					<li class="nav-item"><a href="/Venus/xdocx_xxxxx_00600_xxxxx" 												class="nav-link">x</a></li>
				</ul>
			</header>
		</div>

		<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
		<p class="alert alert-success">uid_{user_id}_,xid_{file_id}_,tid_{tid}_</p>
		
		<div id="DOCUMENT_ROOT">
		</div>
		<div id="linkable_list">
		</div>

	</Layout>

	<slot></slot>

<div style="display:none">{errors}{storage}</div>
</main>
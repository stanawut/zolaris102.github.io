<script>
	import Layout from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibUI 					from '../Svelte_AllLibs/libUI.js';
	import * as LibTX 					from '../Svelte_AllLibs/libTX.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 						from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import Event_DOCUMENT_ROOT 	from '../Svelte_Events/Event_DOCUMENT_ROOT.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	let oXFil = null;
	let oXXsd = null;
	/* ---------------------------------------------------------------------------------------------- */
	import KXditorMenuBar 			from '../Svelte_Components/KXditorMenuBar.svelte';
	import { 
						xditor_menubarRow1 as xmenubarRow1,
						xditor_menubarRow2 as xmenubarRow2,
						xditor_menubarRow3 as xmenubarRow3
					} 									from '../Svelte_Allconstants/ConstantSet2_xditor_menubar.js';
	/* ---------------------------------------------------------------------------------------------- */
	import KEditorMenuBar 			from '../Svelte_Components/KEditorMenuBar.svelte';
	import { 
						editor_menubarRow1 as emenubarRow1,
						editor_menubarRow2 as emenubarRow2
					} 									from '../Svelte_Allconstants/ConstantSet2_editor_menubar.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 																	from '../Svelte_Store/session_data.js';
	import {sd_emid1grouplang,sd_emid1edit,sd_emid2insert} 	from '../Svelte_Store/session_data.js';
	import { sdgb_default_emid1grouplang } 									from '../Svelte_Store/session_data';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	let emid1grouplang,emid1edit,emid2insert;
	let	gb_default_emid1grouplang ;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(											(value)=>{tid=value});
	sd_xid.subscribe(											(value)=>{xid=value});
	sd_emid1grouplang.subscribe(					(value)=>{emid1grouplang=value});
	sd_emid1edit.subscribe(								(value)=>{emid1edit=value});
	sd_emid2insert.subscribe(							(value)=>{emid2insert=value});
	sdgb_default_emid1grouplang.subscribe((value)=>{gb_default_emid1grouplang = value;});
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	export let storage;
	/* ---------------------------------------------------------------------------------------------- */
	export let uuid = self.crypto.randomUUID();
	export let _laravel_session_token;

	export let user_id;
	export let form_id;
	export let store_id;
	export let fil_id;
	export let file_id; // form template for user to fill
	
	export let feuri; // location of form template
	export let action_done;
	/* ---------------------------------------------------------------------------------------------- */
	function _fget_feuri(p_user_id,p_form_id,p_store_id,p_fil_id,p_suffix,p_fext)
	{
		let fename = '';
	
		switch (p_suffix)
		{
			case ''	:
										fename = p_user_id+'_'+p_fil_id+p_suffix+'.'+p_fext;
										return "http://localhost:5173/storage/app/public/"+p_user_id+
													"/earth/filled_collections/"+p_store_id+
													"/tmp/"+p_fil_id+
													"/"+fename;
			case '_xsd' :	
										fename = p_user_id+'_'+p_form_id+p_suffix+'.'+p_fext;
										return "http://localhost:5173/storage/app/public/"+p_user_id+
													"/venus/forms/"+p_form_id+
													"/document/pmn/"+fename;
			default : 		console.log('_fget_feuri:unknown');
										return '';
		}
		return '';
	}
	/* ---------------------------------------------------------------------------------------------- */
		//http://localhost:5173/storage/app/public
	let sDebug = 'user_id | form:file_id | store_id | fil_id | feuri'+" __|__ "+
								user_id+','+form_id+':'+file_id+','+store_id+','+fil_id+"\n"+
								feuri.substring(40);
	/* ---------------------------------------------------------------------------------------------- */
	onMount( async () => {
			let akv_loadXml2Doc = {
															class_type		:'fil',
															_edit_cat			:'none',

															user_id				:user_id,
															form_id				:form_id,
															store_id			:store_id,
															fil_id				:fil_id,
															file_id				:fil_id,
															feuri					:feuri,

															action_done		:action_done,
															hemroot_id		:'DOCUMENT_ROOT',
															status_active	:true,
															target_folder	:'documents',
														};
			$sd_xid										= file_id;
			akv_loadXml2Doc['feuri'] 	= _fget_feuri(user_id,form_id,store_id,fil_id,'','xml');
			oXFil											= await LibTX.loadXml2Dog(akv_loadXml2Doc);
		//let feuri_xsd 						= 'http://localhost:5173/storage/app/public/12/venus/forms/18/document/pmn/12_18_xsd.xsd';
			let feuri_xsd							= _fget_feuri(user_id,form_id,store_id,fil_id,'_xsd','xsd');
			oXXsd											= await LibTX.loadXsd2Array(feuri_xsd);
	});
	/* ---------------------------------------------------------------------------------------------- */
	let clicked 		= false;
	const handleSave = (e)=>{ 
															console.log('**********************************');
															console.log(oXFil._xmldoc);
															let jsonString = oXFil.jsonCreate();
															console.log(jsonString);
															let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
															clicked = !clicked	;
															let akvInputParams = 
																										{ 
																											doc_type								: 'fil',
																											laravel_session_token		: _laravel_session_token,
																											user_id									: user_id,
																											form_id									: form_id,
																											store_id								: store_id,
																											fil_id									: fil_id,
																											file_id									: fil_id,
																											owner_id								: user_id,
																											serxml									:	oXFil.fnXml2Ser(),
																											serjsn									: jsonString,
																											commit									: 1,																										
																										};
																											
															LibTX.fetchXmlUpdate(akvInputParams);
	}
	// --------------------------------------------
	const handleIgnore = (e)=>{ 
															let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
															clicked = !clicked	;
															let akvInputParams = 
																										{ 
																											doc_type								: 'doc',
																											laravel_session_token		: _laravel_session_token,
																											file_id									: file_id,
																											serxml									:	'',
																											commit									: 0,
																										};
																											
															LibTX.fetchXmlRevert(akvInputParams);
	}
	/* ---------------------------------------------------------------------------------------------- */
	const resetClick 	= (e)=>{ clicked = false			; console.log('xx'); 	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_emenu(p_tid)
	{
		var dem 		= document.getElementById(p_tid);
		var new_mem	= document.createElement('div');
		new_mem.setAttribute('id','active_editor');

		var kEditorMenubarRow1 = new KEditorMenuBar({target:new_mem,props:{sourcedata:{oxml:oXFil},data:{menu:emenubarRow1,tid:p_tid}}});
		var kEditorMenubarRow2 = new KEditorMenuBar({target:new_mem,props:{sourcedata:{oxml:oXFil},data:{menu:emenubarRow2,tid:p_tid}}});
		dem.parentNode.insertBefore(new_mem,dem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function trace_event(e,p_xid,p_tid)
	{
		let any_tid = e.detail.any_tid;
		let bMenu		= isNaN(any_tid);
		if (bMenu) // emenur{1,2}_{0..6}
		{
		}
		else // 1,2,3,4,...
		{
			if (any_tid !== tid)
			{
				sd_tid.set(any_tid);
				if (LibUI._is_active_editor())
				{
					LibUI._de_active_editor();
					LibUI._de_active_input();
					sd_emid1grouplang.set(gb_default_emid1grouplang);
					sd_emid1edit.set(			"none");
					sd_emid2insert.set(		"none");
				}
				_attach_emenu(tid);
			}
			else
			{
				if (LibUI._is_active_editor())
				{
					LibUI._de_active_editor();
					LibUI._de_active_input();
					sd_emid1grouplang.set(gb_default_emid1grouplang);
					sd_emid1edit.set(			"none");
					sd_emid2insert.set(		"none");
					return;
				}
				else
				{
					_attach_emenu(tid);
				}
			}
		}
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
					<li class="nav-item"><button id="xditor_main_save" 	class="nav-link" on:click={e=>handleSave(e)} 	on:keypress={handleSave}>Save</button></li>
					<li class="nav-item"><a href="/Earth/xfilx_xxxxx_00300_xxxxx/{form_id}/{store_id}/{file_id}" class="nav-link">Ignore</a></li>
					<li class="nav-item"><a href="/gridboard" 					class="nav-link">x</a></li>
				</ul>
			</header>
		</div>

		<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
		<p class="alert alert-success" style="font-size:10px;">{sDebug}</p>

		<div id="DOCUMENT_ROOT">
		</div>
		<Event_DOCUMENT_ROOT on:interject={(e)=>{ trace_event(e,xid,tid);}} />
	</Layout>

	<slot></slot>

<div style="display:none">{errors}{storage}</div>
</main>
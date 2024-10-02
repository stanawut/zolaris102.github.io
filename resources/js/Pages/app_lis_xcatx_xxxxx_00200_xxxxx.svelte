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
	let oXmlInstance 						= null; 
	/* ---------------------------------------------------------------------------------------------- */
	import KXditorMenuBar 			from '../Svelte_Components/KXditorMenuBar.svelte';
	import { 
						xditor_menubarRow1 as xmenubarRow1,
						xditor_menubarRow2 as xmenubarRow2,
						xditor_menubarRow3 as xmenubarRow3
					} 									from '../Svelte_Allconstants/ConstantSet2_xditor_menubar.js';
	/* ---------------------------------------------------------------------------------------------- */
	import KEditorMenuBar from '../Svelte_Components/KEditorMenuBar.svelte';
	import { 
						editor_menubarRow1 as emenubarRow1,
						editor_menubarRow2 as emenubarRow2
					} from '../Svelte_Allconstants/ConstantSet2_editor_menubar.js';
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
	export let 	_laravel_session_token;
	export let 	file_id;
	export let 	user_id;
	export let 	feuri;
	export let 	action_done;
	/* ---------------------------------------------------------------------------------------------- */
	onMount( async () => {
			let akv_loadXml2Doc = {
															class_type		:'cat',
															_edit_cat			:'editable',
			
															user_id				:user_id,
															file_id				:file_id,
															feuri					:feuri,
															action_done		:action_done,
															hemroot_id		:'DOCUMENT_ROOT',
															status_active	:true,
															target_folder	:'documents',
														};
			$sd_xid							= file_id;
			oXmlInstance	=	await LibTX.loadXml2Dog(akv_loadXml2Doc);
	});
	/* ---------------------------------------------------------------------------------------------- */
	let clicked 		= false;
	const handleSave = (e)=>{ 
															let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
															clicked = !clicked	;
															let akvInputParams = 
																										{ 
																											doc_type								: 'cat',
																											laravel_session_token		: _laravel_session_token,
																											file_id									: file_id,
																											serxml									:	oXmlInstance.fnXml2Ser(),
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
																											doc_type								: 'cat',
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

		var kEditorMenubarRow1 = new KEditorMenuBar({target:new_mem,props:{sourcedata:{oxml:oXmlInstance},data:{menu:emenubarRow1,tid:p_tid}}});
		var kEditorMenubarRow2 = new KEditorMenuBar({target:new_mem,props:{sourcedata:{oxml:oXmlInstance},data:{menu:emenubarRow2,tid:p_tid}}});
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
					<li class="nav-item"><button id="xditor_main_save" 											class="nav-link active" on:click={e=>handleSave(e)} 	on:keypress={handleSave}>Save</button></li>
					<li class="nav-item"><a href="/Venus/xcatx_xxxxx_00200_xxxxx/{file_id}" class="nav-link" aria-current="page">Ignore</a></li>
					<li class="nav-item"><a href="/Venus/xcatx_xdocx_02B02_xxxxx/{file_id}" class="nav-link" aria-current="page">☰ Doc</a></li>
					<li class="nav-item"><a href="/Venus/xcatx_xxxxx_00600_xxxxx" 					class="nav-link">x</a></li>
				</ul>
			</header>
		</div>

		<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
		<p class="alert alert-success">LISB:uid{user_id}:fid:{file_id}:tid{tid}</p>
		<div id="DOCUMENT_ROOT">
		</div>
		<Event_DOCUMENT_ROOT on:interject={(e)=>{ trace_event(e,xid,tid);}} />
	</Layout>

	<slot></slot>

<div style="display:none">{errors}{storage}</div>
</main>
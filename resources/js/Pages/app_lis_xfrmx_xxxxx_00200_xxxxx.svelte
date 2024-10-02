<script>
	import Layout from '@/Pages_Layouts/LayoutXsd.svelte';
	import CXSD101							from '../Svelte_Classes/CXSD101.js';	
	/* ---------------------------------------------------------------------------------------------- */
	import * as SXsdUI 					from '../Svelte_AllLibs/xsdUI.js';
	import * as LibTX 					from '../Svelte_AllLibs/libTX.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 						from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import Event_DOCUMENT_ROOT 	from '../Svelte_Events/Event_DOCUMENT_ROOT.svelte';
	let oXmlInstance 						= null;
	/* ---------------------------------------------------------------------------------------------- */
	import KXditorMenuBar 			from '../Svelte_Components/KXditorMenuBar.svelte';
	import { 
						xditor_menubarRow1 as xmenubarRow1,
						xditor_menubarRow2 as xmenubarRow2,
						xditor_menubarRow3 as xmenubarRow3
					} 									from '../Svelte_Allconstants/ConstantSet2_xditor_menubar.js';
	/* ---------------------------------------------------------------------------------------------- */
	import KXsdtorMenuBar 			from '../Svelte_Components/KXsdtorMenuBar.svelte';
	import { 
						editor_menubarRow1 as emenubarRow1,
						editor_menubarRow2 as emenubarRow2,
						editor_menubarRow3 as emenubarRow2next
					} 									from '../Svelte_Allconstants/ConstantSet4_xsdtor_menubar.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 														from '../Svelte_Store/session_data.js';
	import {sd_emid1edit,sd_emid2insert} 							from '../Svelte_Store/session_data.js';
	import {sd_emid1and2xsd,sd_emid1and2xsdgrouplang}	from '../Svelte_Store/session_data';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	let emid1edit,emid2insert;
	let emid1and2xsd;
	let emid1and2xsdgrouplang;
	let emid2xsdinsert;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(												(value)=>{tid=value});
	sd_xid.subscribe(												(value)=>{xid=value});
	sd_emid1edit.subscribe(									(value)=>{emid1edit=value});
	sd_emid2insert.subscribe(								(value)=>{emid2insert=value});
	sd_emid1and2xsd.subscribe(							(value)=>{emid1and2xsd = value;});
	sd_emid1and2xsdgrouplang.subscribe(			(value)=>{emid1and2xsdgrouplang =  value;});
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
	let oXsdInstance = null;
	let pairs_xsdfrm = {};
	/* ---------------------------------------------------------------------------------------------- */
	onMount( async () => {
			let akv_loadXml2Doc = {
															class_type		:'frm',
															_edit_cat			:'none',

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
			
			oXsdInstance 	= new CXSD101(oXmlInstance);
			pairs_xsdfrm = oXsdInstance.debug();
	});
	/* ---------------------------------------------------------------------------------------------- */
	let clicked 		= false;
	const handleSave = (e)=>{ 
															let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
															clicked = !clicked	;
															//oXmlInstance.buildDocumentRoot();
															
															let doc_root = oXmlInstance._xmldoc.getElementById('0');
															oXmlInstance._aleaf = [];
															oXmlInstance.syncDocumentRoot2ALeaf(null,doc_root,'0',oXmlInstance._aleaf);
															
															
															oXsdInstance 	= new CXSD101(oXmlInstance);
															
															pairs_xsdfrm = oXsdInstance.debug();
															
														//exit;
															
															let akvInputParams = 
																										{ 
																											doc_type								: 'frm',
																											laravel_session_token		: _laravel_session_token,
																											file_id									: file_id,
																											serxml									:	oXmlInstance.fnXml2Ser(),
																											serxsd									: pairs_xsdfrm['xsd'],
																											serfrm									: pairs_xsdfrm['frm'],
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
																											doc_type								: 'frm',
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

		var kEditorMenubarRow1 = new KXsdtorMenuBar({target:new_mem,props:{sourcedata:{oxml:oXmlInstance},data:{menu:emenubarRow1,		tid:p_tid}}});
		var kEditorMenubarRow2 = new KXsdtorMenuBar({target:new_mem,props:{sourcedata:{oxml:oXmlInstance},data:{menu:emenubarRow2,		tid:p_tid}}});
		var kEditorMenubarRow3 = new KXsdtorMenuBar({target:new_mem,props:{sourcedata:{oxml:oXmlInstance},data:{menu:emenubarRow2next,tid:p_tid}}});
		dem.parentNode.insertBefore(new_mem,dem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function trace_event(e,p_xid,p_tid)
	{
		let any_tid = e.detail.any_tid;
		let bMenu		= isNaN(any_tid);
		if (bMenu) // all emenur1_[0-4] EDIT,2_[0-4,5-9] INSERT
		{
			sd_emid1and2xsdgrouplang.set(SXsdUI._get_emenurN2lang_map(any_tid));
		}
		else // 1,2,3,4,...
		{
			if (any_tid !== tid)
			{
				sd_tid.set(any_tid);
				if (SXsdUI._is_active_editor())
				{
					SXsdUI._de_active_editor();
					SXsdUI._de_active_input();
					sd_emid1edit.set(					"none");
					sd_emid2insert.set(				"none");
					sd_emid1and2xsd.set(			"none");
				}
				_attach_emenu(tid);
			}
			else
			{
				if (SXsdUI._is_active_editor())
				{
					SXsdUI._de_active_editor();
					SXsdUI._de_active_input();
					sd_emid1edit.set(					"none");
					sd_emid2insert.set(				"none");
					sd_emid1and2xsd.set(			"none");
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
					<li class="nav-item"><button id="xditor_main_save" 															class="nav-link" on:click={e=>handleSave(e)} 	on:keypress={handleSave}>Save</button></li>
					<li class="nav-item"><button id="xditor_main_ignore" 														class="nav-link" on:click={e=>handleIgnore(e)} on:keypress={handleIgnore}>Ignore</button></li>
					<li class="nav-item"><a href="/Venus/xfrmx_xlibx_02B02_xxxxx/{file_id}" 				class="nav-link">Bind</a></li>
					<li class="nav-item"><a href="/Venus/xdocx_xxxxx_00600_xxxxx" 									class="nav-link">x</a></li>
				</ul>
			</header>
		</div>

		<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
		<p class="alert alert-success">uid_{user_id}_,xid_{file_id}_,tid_{tid}_</p>

		<div id="DOCUMENT_ROOT">
		</div>
		
		<Event_DOCUMENT_ROOT on:interject={(e)=>{ trace_event(e,xid,tid);}} />
	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}{storage}</div>
</main>
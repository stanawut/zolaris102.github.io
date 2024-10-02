<script>
	import Layout from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibUI from '../Svelte_AllLibs/libUI.js';
	import * as LibTX from '../Svelte_AllLibs/libTX.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 	from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import Event_DOCUMENT_ROOT 													from '../Svelte_Events/Event_DOCUMENT_ROOT.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	let oXmlInstance 																		= null;
	/* ---------------------------------------------------------------------------------------------- */
	import {nditor_menubarRow9_unbind as nmenubarRow9} 	from '../Svelte_Allconstants/ConstantSet2_nditor_menubar_fetchcommit.js';
	import KInput_fetch_commit 													from '../Svelte_Components_in_Form/KInput_fetch_commit.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 															from '../Svelte_Store/session_data.js';
	import {sd_doc_xid,sd_doc_tid,sd_doc_bind_tid} 			from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	let doc_xid,doc_tid,doc_bind_tid;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(					(value)=>{tid=value});
	sd_xid.subscribe(					(value)=>{xid=value});
	sd_doc_xid.subscribe(			(value)=>{doc_xid=value});
	sd_doc_tid.subscribe(			(value)=>{doc_tid=value});
	sd_doc_bind_tid.subscribe((value)=>{doc_bind_tid=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let 	errors;
	export let 	storage;
	/* ---------------------------------------------------------------------------------------------- */
	export let 	_laravel_session_token;
	export let 	file_id;
	export let 	user_id;
	export let 	feuri;
	/* ---------------------------------------------------------------------------------------------- */
	let bBind = true;
	let bOpen = false;
	/* ---------------------------------------------------------------------------------------------- */
	onMount( async () => {
			let akv_loadXml2Doc = {
															class_type		:'lib',
															_edit_lib			:'none',

															user_id				:user_id,
															file_id				:file_id,
															feuri					:feuri,
															action_done		:'dummy',
															hemroot_id		:'DOCUMENT_ROOT',
															status_active	:true,
															target_folder	:'documents',
														};
			$sd_xid							= file_id;
			oXmlInstance				=	await LibTX.loadXml2Dog(akv_loadXml2Doc);
	});
	/* ---------------------------------------------------------------------------------------------- */
	let clicked 		= false;
	const handleSave = (e)=>{ 
															let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
															clicked = !clicked	;
															let akvInputParams = 
																										{ 
																											doc_type								: 'lib',
																											laravel_session_token		: _laravel_session_token,
																											file_id									: file_id,
																											serxml									:	oXmlDoc.fnXml2Ser(),
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
																											doc_type								: 'lib',
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
	function get_oKInputFetchCommit(p_target,p_props_data)
	{
		return new KInput_fetch_commit({
																			target:p_target,
																			props	:p_props_data,
																		});
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _inject_nmenu(p_hemCat,p_iactiveCatTid)
	{
		if (document.getElementById('active_editor'))	document.getElementById('active_editor').remove();

		let atext 						= {type:'lib',tagname:'PR_01',th:'',en:'',ch:'',xx:p_iactiveCatTid,textcontent:''};
		let akv_sourcedata		= {oxml:oXmlInstance};
		let akv_data					= {menu:nmenubarRow9,tid:p_iactiveCatTid,title:'none',file_id:xid,atext:atext};
		let akvInputParams		= null;
		var new_hemMenu				= document.createElement('div'); 
														new_hemMenu.setAttribute('id','active_editor');
		akvInputParams				= {sourcedata:akv_sourcedata,data:akv_data};
		var kFetchCommit			= get_oKInputFetchCommit(new_hemMenu,akvInputParams);
		p_hemCat.parentNode.insertBefore(new_hemMenu,p_hemCat.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_nmenu(p_iactiveCatTid)
	{
		var hemCat 						= document.getElementById(p_iactiveCatTid);
		var hemCat_sTag				= hemCat.getAttribute('current-tag');

		var xemCat						= oXmlInstance._xmldoc.getElementById(p_iactiveCatTid);
		var fake_parent_tid		= xemCat.getAttribute('fake-parent');
		var doc_id						= xemCat.getAttribute('doc_id');
		
		if (hemCat_sTag == 'PR_01')
		{
			if (!bOpen)
			{
				_inject_nmenu(hemCat,p_iactiveCatTid);
				bOpen = !bOpen;
				$sd_doc_tid = p_iactiveCatTid;
			}
			else
			{
				if (doc_tid == p_iactiveCatTid)
				{
					if (document.getElementById('active_editor'))
						document.getElementById('active_editor').remove();
					bOpen = !bOpen;	
				}
				else
				{
					_inject_nmenu(hemCat,p_iactiveCatTid);
					$sd_doc_tid = p_iactiveCatTid;
				}
			}
		}	
	}
	/* ---------------------------------------------------------------------------------------------- */
	function trace_event(e,p_xid,p_tid)
	{
		let any_tid = e.detail.any_tid;
		let bMenu		= isNaN(any_tid);
		if (bMenu) // none DOCUMENT_ROOT id is alphanumeric such as menu id
		{
			return;
		}
		else // include PR_01 specify for doc attached, HX,TT_01 are for category
		{
			_attach_nmenu(any_tid);
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
					<li class="nav-item"><button id="xditor_main_save" 											class="nav-link" on:click={e=>handleSave(e)} 	on:keypress={handleSave}>Save</button></li>
					<li class="nav-item"><a href="/Venus/xlibx_xxxxx_00200_xxxxx/{file_id}" class="nav-link" aria-current="page">Ignore</a></li>
					<li class="nav-item"><a href="/Venus/xlibx_xfrmx_02B02_xxxxx/{file_id}" class="nav-link active" aria-current="page">☰ Frm</a></li>
					<li class="nav-item"><a href="/Venus/xlibx_xxxxx_00600_xxxxx" 					class="nav-link">x</a></li>
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

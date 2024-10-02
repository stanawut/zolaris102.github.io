<script>
	import Layout from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibTX 	from '../Svelte_AllLibs/libTX.js';
	import * as LibUI 	from '../Svelte_AllLibs/libUI.js';
	import * as LibUIA	from '../Svelte_AllLibs/LibUIAsync.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 	from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import Event_DOCUMENT_ROOT_BINDING 								from '../Svelte_Events/Event_DOCUMENT_ROOT_BINDING.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	let oXmlInstance 																	= null;
	let oXmlAnyInactive																= null;
	/* ---------------------------------------------------------------------------------------------- */
	import {nditor_menubarRow9_bind as nmenubarRow9} 	from '../Svelte_Allconstants/ConstantSet2_nditor_menubar_fetchcommit.js';
	import KInput_fetch_commit 												from '../Svelte_Components_in_Form/KInput_fetch_commit.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {handleDropdownFileList_selection as hDDFileList} from '../Svelte_AllLibs/libUI_handle_dropdown.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 														from '../Svelte_Store/session_data.js';
	import {sd_cat_xid,sd_cat_tid,sd_cat_bind_tid} 		from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let file_id_prefix 			= 'fileid_';	
	let active_file_id			= 0; 
	let default_title_file 	= 'Categories';	
	let active_title_file 	= '';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	let	cat_xid,cat_tid,cat_bind_tid;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(					(value)=>{tid=value});
	sd_xid.subscribe(					(value)=>{xid=value});
	sd_cat_xid.subscribe(			(value)=>{cat_xid=value});
	sd_cat_tid.subscribe(			(value)=>{cat_tid=value});
	sd_cat_bind_tid.subscribe((value)=>{cat_bind_tid=value});
	/* ---------------------------------------------------------------------------------------------- */
	let selected_cat_xid 	= 'initial';	// return from cat dropdown when choosed with dispatch->child_interject->trace_event_child
	let bBind 						= false;
	/* ---------------------------------------------------------------------------------------------- */
	export let 	errors;
	export let 	storage;
	/* ---------------------------------------------------------------------------------------------- */
	export let 	_laravel_session_token;
	export let 	user_id;
	export let 	file_id;
	export let 	feuri;
	// INACTIVE_ROOT:doc that will be binded to cat
	/* ---------------------------------------------------------------------------------------------- */
	let 				data_list_title			= 'Categories';
	let					data_list 					= null;		// fetch all categories
	let 				inactive_root_title = '';			// document title
	let					inactive_file_id		= '';
	let 				open								=	false;
	/* ---------------------------------------------------------------------------------------------- */
	onMount( async () => {
			let akv_loadXml2Doc = {
															class_type		:'any',
															_edit_cat			:'none',

															user_id				:user_id,
															file_id				:file_id,
															feuri					:feuri,
															action_done		:'dummy',
															hemroot_id		:'INACTIVE_ROOT',
															status_active	:false,
															target_folder	:'documents',
														};
			$sd_xid							= file_id;
			
			oXmlAnyInactive 		= await LibTX.loadXml2Dog(akv_loadXml2Doc);
			inactive_root_title = oXmlAnyInactive._xmldoc.getElementById('2').textContent;
			inactive_file_id		= file_id;
	});
	/* ---------------------------------------------------------------------------------------------- */
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	// return LN_01-PR_01 display in html for BIND commit  
	function _get_dummy_hem(p_fake_parent_tid,p_textcontent)
	{
		return	'<div current-tag="LN_01" css="none"></div>'+
						'<div style="font-style:normal" current-tag="PR_01" current-fake-parent="'+p_fake_parent_tid+'" '+
						'css="c_pr_01 c_lv_00" class="list-group list-group-item">'+
						p_textcontent+
						'</div>';
	}
	/* ---------------------------------------------------------------------------------------------- */
	function get_oKInputFetchCommit(p_target,p_props_data)
	{
		return new KInput_fetch_commit({
																			target:p_target,
																			//props	:{data:p_props_data}
																			props	:p_props_data,
																		});
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _inject_nmenu(p_hemCat,p_iactiveCatTid)
	{
		if (document.getElementById('active_editor'))	document.getElementById('active_editor').remove();
		
		let atext 						= {type:'cat',tagname:'PR_01',th:'',en:'',ch:'',xx:xid,textcontent:inactive_root_title};
		let akv_sourcedata		= {oxml:oXmlInstance};
		let akv_data					= {menu:nmenubarRow9,tid:p_iactiveCatTid,title:inactive_root_title,file_id:cat_xid,atext:atext};
		let akvInputParams		= null;

		var new_hemMenu				= document.createElement('div'); 
		new_hemMenu.setAttribute('id','active_editor');
		new_hemMenu.innerHTML = _get_dummy_hem(p_iactiveCatTid,inactive_root_title);

		akvInputParams				= {sourcedata:akv_sourcedata,data:akv_data};

		var kFetchCommit			= get_oKInputFetchCommit(new_hemMenu,akvInputParams);
		p_hemCat.parentNode.insertBefore(new_hemMenu,p_hemCat.nextSibling);
		$sd_cat_bind_tid 			= p_iactiveCatTid;
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_nmenu(p_iactiveCatTid) // Note:INACTIVE_ROOT:doc{xid} has no integer id attribute,
	{
		var hemCat 						= document.getElementById(p_iactiveCatTid);
		var hemCat_sTag				= hemCat.getAttribute('current-tag');
		var fake_parent_tid		= 0;
		// binding menu can be attached both PR_01 (aleady binded doc) and (HX,TT_01) main category
		if (!bBind)
		{
			_inject_nmenu(hemCat,p_iactiveCatTid);
			bBind 								= !bBind;
		}
		else
		{
			if (cat_bind_tid == p_iactiveCatTid)
			{
				console.log('Repeat the same');
				if (document.getElementById('active_editor'))
					document.getElementById('active_editor').remove();
				bBind = !bBind;
			}
			else
			{
				_inject_nmenu(hemCat,p_iactiveCatTid);
			}
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	const handleListBook = (e)=>{ console.log("List Books");	}
	/* ---------------------------------------------------------------------------------------------- */
	const resetClick 	= (e)=>{ clicked = false			; console.log('xx'); 	}
	/* ---------------------------------------------------------------------------------------------- */
	function trace_event(e,p_xid,p_tid)
	{
		let any_tid = e.detail.any_tid;
		let bMenu		= isNaN(any_tid);
		if (bMenu) // none DOCUMENT_ROOT id is alphanumeric such as menu id
		{
			console.log('Menu:'+e.detail.any_tid);
			return;
		}
		else
		{
			$sd_cat_tid = any_tid;
			_attach_nmenu(cat_tid);
			
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	const trace_event_child = async (e)=>{
		// ============================================================================================
		// case: CAny.js => class CAny { _xmldoc as member }; export const oCAny = new CAny();
		// import('..Class/CAny.js').then((exportO)=> { oAny = exportO.oCAny; ...;LibTx.loadXml2Doc(oAny,...)
		// ============================================================================================
		let feuri								= LibTX.get_feuri_document_pmn('cat',user_id,cat_xid);
		let akv_loadXml2Doc 		= {
																class_type		:'cat',
																_edit_cat			:'none',

																user_id				:user_id,
																file_id				:cat_xid,
																feuri					:feuri,
																action_done		:'dummy',
																hemroot_id		:'DOCUMENT_ROOT',
																status_active	:true,
																target_folder	:'categories',
															};
		const document_root 		= document.querySelector('#DOCUMENT_ROOT');
		document_root.innerHTML = '';
		oXmlInstance = await LibTX.loadXml2Dog(akv_loadXml2Doc);
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

					<li class="nav-item"><a href="/Venus/xdocx_xxxxx_00200_xxxxx/{file_id}" class="nav-link" aria-current="page">Edit</a></li>
					<li class="nav-item">
						<button id="xditor_main_lib" 											
										class="nav-link active" 
										on:click={e=>LibTX.fetchDDUI_Cat_Lib_files(e,'/Venus/xcatx_xxxxx_00600_xxxxx/list',oXmlInstance,oXmlAnyInactive)} 	
										on:keypress={e=>LibTX.fetchDDUI_Cat_Lib_files(e,'/Venus/xcatx_xxxxx_00600_xxxxx/list',oXmlInstance,oXmlAnyInactive)}>☰ Cat</button>
					</li>
					<li class="nav-item"><button id="xditor_main_bkx" class="nav-link" on:click={e=>handleListBook(e)} 	on:keypress={handleListBook}>☰ Book</button></li>
					<li class="nav-item"><a href="/gridboard" class="nav-link">&#10006;</a></li>

				</ul>
			</header>
		</div>

		<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
		<p class="alert alert-success">uid_{user_id}_,xid_{file_id}_,tid_{tid}_</p>
		
		<div id="LIST_FILES" 	aria-hidden	="true"
													on:click		={e=>hDDFileList(	e,sd_cat_xid	,file_id_prefix	,trace_event_child)} 
													on:keypress	={e=>hDDFileList(	e,sd_cat_xid	,file_id_prefix	,trace_event_child)}></div>

		<div id="DOCUMENT_ROOT">
		</div>


		<Event_DOCUMENT_ROOT_BINDING on:interject={(e)=>{trace_event(e,xid,cat_bind_tid);}} />

		<div id="INACTIVE_ROOT"></div>
		
	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}{storage}</div>
</main>
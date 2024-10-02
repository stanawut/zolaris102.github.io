<script>
	import Layout from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibTX 	from '../Svelte_AllLibs/libTX.js';
	import * as LibUI 	from '../Svelte_AllLibs/libUI.js';
	import * as LibUIA 	from '../Svelte_AllLibs/libUIAsync.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 		from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import Event_DOCUMENT_ROOT_LIST_PR_BINDING 				from '../Svelte_Events/Event_DOCUMENT_ROOT_LIST_PR_BINDING.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	let oXLib = null;
	let oXNul	=	null;
	/* ---------------------------------------------------------------------------------------------- */
	import {nditor_menubarRow9_bind as nmenubarRow9} 	from '../Svelte_Allconstants/ConstantSet5_nditor_menubar_fetchcommit.js';
	import KDropdownCascadeList												from '../Svelte_Components/KDropdownCascadeList.svelte';
	import KSimpleList																from '../Svelte_Components/KSimpleList.svelte';
	import KInput_fetch_commit 												from '../Svelte_Components_in_Form/KInput_fetch_commit.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import { handleDropdownFileList_selection as hDDFileList	} from '../Svelte_AllLibs/libUI_handle_dropdown.js';
	import { handleDropdownFileLib_HXList 		as hDDHXList		} from '../Svelte_AllLibs/libUI_handle_dropdown.js';
	import { handleDropdownFileLib_TTList 		as hDDTTList		} from '../Svelte_AllLibs/libUI_handle_dropdown.js';
	import { handleDropdownFileLib_PRList 		as hDDPRList		} from '../Svelte_AllLibs/libUI_handle_dropdown.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 														from '../Svelte_Store/session_data.js';
	import {sd_cat_xid,sd_cat_tid,sd_cat_bind_tid} 		from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	let	cat_xid,cat_tid,cat_bind_tid;
	/* ---------------------------------------------------------------------------------------------- */
	let file_id_prefix = 'fileid_';	let active_file_id	= 0; let default_title_file 	= 'Categories';	let active_title_file = '';
	let hx_id_prefix 		= ''			;	let active_hx_id 		= 0; let default_title_hx			=	'Main:HX'			;	let active_title_hx 	= '';
	let tt_id_prefix 		= ''			;	let active_tt_id 		= 0; let default_title_tt			= 'Submain:TT'	;	let active_title_tt 	= '';
	let pr_id_prefix 		= ''			;	let active_pr_id		=	0; let	default_title_pr		= 'Form:PR'		;	let active_title_pr 	= '';
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(					(value)=>{tid=value});
	sd_xid.subscribe(					(value)=>{xid=value});
	sd_cat_xid.subscribe(			(value)=>{cat_xid=value});
	sd_cat_xid.subscribe(			(value)=>{active_file_id=value});
	sd_cat_tid.subscribe(			(value)=>{cat_tid=value});
	sd_cat_bind_tid.subscribe((value)=>{cat_bind_tid=value});
	/* ---------------------------------------------------------------------------------------------- */
	let selected_cat_xid 	= 'initial';	// return from cat dropdown when choosed with dispatch->child_interject->trace_event_child
	let bBind 						= false;
	/* ---------------------------------------------------------------------------------------------- */
	export let 	errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let 	_laravel_session_token;
	export let 	user_id;
	/* ---------------------------------------------------------------------------------------------- */
	let data_list_title			= 'Libraries (≍cat)';
	let	data_list 					= null;		// fetch all categories
	let inactive_root_title = '';			// document title
	let open								=	false;
	/* ---------------------------------------------------------------------------------------------- */
	let iCurrentListFile 	= 0;
	let iCurrentListHX	 	= 0;
	let iCurrentListTT		= 0;
	let iCurrentListPR		= 0;
	let form_id = 0;
	/* ---------------------------------------------------------------------------------------------- */
	onMount(async () => {
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
	function _inject_nmenu(p_hemCat,p_iactiveCatTid)
	{
		if (document.getElementById('active_editor'))	document.getElementById('active_editor').remove();
		
		let atext 						= {type:'lib',tagname:'PR_01',th:'',en:'',ch:'',xx:xid,textcontent:inactive_root_title};
		let akv_sourcedata		= {oxml:oXLib,active_tt_id:active_tt_id};
		let akv_data					= {menu:nmenubarRow9,tid:p_iactiveCatTid,title:inactive_root_title,file_id:cat_xid,atext:atext};
		let akvInputParams		= null;

		var new_hemMenu				= document.createElement('div'); 
		new_hemMenu.setAttribute('id','active_editor');
		new_hemMenu.innerHTML = _get_dummy_hem(p_iactiveCatTid,inactive_root_title);

		akvInputParams				= {sourcedata:akv_sourcedata,data:akv_data};

		var kFetchCommit			= new KInput_fetch_commit({target:new_hemMenu,props:akvInputParams});
		p_hemCat.parentNode.insertBefore(new_hemMenu,p_hemCat.nextSibling);
		$sd_cat_bind_tid 			= p_iactiveCatTid;
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_nmenu(p_iactiveCatTid) // Note:INACTIVE_ROOT:doc{xid} has no integer id attribute,
	{
		var hemCat 						= document.getElementById(p_iactiveCatTid);
		var hemCat_sTag				= hemCat.getAttribute('current-tag');
		var fake_parent_tid		= 0;
		// binding menu can be attached both PR_01 (already binded doc) and (HX,TT_01) main category
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
	const showDDHXList = async (e)=>
	{
		const document_root 			= document.querySelector('#DOCUMENT_ROOT');
		document_root.innerHTML 	= '';
		let feuri									= LibTX.get_feuri_document_pmn('lib',user_id,cat_xid);
		let akv_loadXml2Doc 			= {
																	user_id				:user_id,
																	file_id				:cat_xid,
																	feuri					:feuri,
																	action_done		:'dummy',
																	hemroot_id		:'DOCUMENT_ROOT',
																	status_active	:true,
																	target_folder	:'categories',
																};
		oXLib 							= await LibTX.loadXml2LeafData(akv_loadXml2Doc);
		LibUI.showDropdown(KDropdownCascadeList,'LIST_HX',oXLib.aHX_01);
		console.log('====================');console.log(oXLib.aHX_01);
		iCurrentListFile 	= e.target.id;
		iCurrentListHX	 	= 0;
		iCurrentListTT		= 0;
		iCurrentListPR		= 0;
	}
	/* ---------------------------------------------------------------------------------------------- */
	function showDDTTList(e)
	{
		LibUI.showDropdown(KDropdownCascadeList,'LIST_TT',oXLib.aHX_TT[e.target.id]);
		iCurrentListHX 		= e.target.id;
		iCurrentListTT		= 0;
		iCurrentListPR		= 0;
	}
	/* ---------------------------------------------------------------------------------------------- */
	function showDDPRList(e)
	{
		LibUI.showDropdown(KSimpleList,'LIST_PR',oXLib.aTT_PR[e.target.id]);
		iCurrentListTT 		= e.target.id;
		iCurrentListPR		= 0;
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _clickDDPRList(e)
	{
		iCurrentListPR = e.target.id;
		let xem = oXLib._xmldoc.getElementById(e.target.id);
		form_id = xem.getAttribute('doc_id');
	}
	/* ---------------------------------------------------------------------------------------------- */
	const clickDDPRList = async (e) =>
	{
			let _token = document.getElementById('_laravel_session_token').innerHTML;
			let pakv = 	{
										'laravel_session_token' : _token,
										'form_id' : form_id, 
									};
			let stores_list = await LibTX.fetch_3Columns_List('/Venus/xfrmx_xstrx_00600_xxxxx/list',pakv);
			let dem = document.getElementById('active_editor');
			let new_dem = document.createElement('div');
			new_dem.setAttribute('id','ID_STORE');
			dem.appendChild(new_dem);
			LibUI.showEditableList('ID_STORE',stores_list['list_key'],stores_list['list_link'],stores_list['list_tuple']);
	}
	/* ---------------------------------------------------------------------------------------------- */
	const handleListLibs = (e) => { LibTX.fetchDDUI_Cat_Lib_files(e,'/Venus/xlibx_xxxxx_00600_xxxxx/list',oXNul,oXNul); }
	const handleListStores = (e)=>{ console.log("List Stores");	}
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
			clickDDPRList(null);
			return;
		}
		else
		{
			$sd_cat_tid = any_tid;
			_attach_nmenu(cat_tid);
			console.log('trace_event');
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

					<li class="nav-item"><button id="xditor_main_lib" 	class="nav-link active" on:click={e=>handleListLibs(e)} on:keypress={e=>handleListLibs(e)}>☰ Lib</button></li>
					<li class="nav-item"><a href="/Venus/xfrmx_xxxxx_00600_xxxxx" class="nav-link" aria-current="page">☰ Form</a></li>
					<li class="nav-item"><button id="xditor_main_bkx" class="nav-link" on:click={e=>handleListStores(e)} 	on:keypress={handleListStores}>Stores</button></li>
					<li class="nav-item"><a href="/gridboard" class="nav-link">&#10006;</a></li>

				</ul>
			</header>
		</div>
		<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
		<input type="hidden" id="current_list_files" 	value={iCurrentListFile} />
		<input type="hidden" id="current_list_hx" 		value={iCurrentListHX} />
		<input type="hidden" id="current_list_tt" 		value={iCurrentListTT} />
		<input type="hidden" id="current_list_pr" 		value={iCurrentListPR} />

		<div id="LIST_FILES"		 	aria-hidden	="true"
															on:click		={e=>hDDFileList(	e,sd_cat_xid	,file_id_prefix	,showDDHXList)} 
															on:keypress	={e=>hDDFileList(	e,sd_cat_xid	,file_id_prefix	,showDDHXList)}></div>
		<div id="LIST_HX"					aria-hidden	="true"
															on:click		={e=>hDDHXList(		e,active_hx_id,''							,showDDTTList)} 
															on:keypress	={e=>hDDHXList(		e,active_hx_id,''							,showDDTTList)}></div>
		<div id="LIST_TT"					aria-hidden	="true"
															on:click		={e=>hDDTTList(		e,active_tt_id,''							,showDDPRList)} 
															on:keypress	={e=>hDDTTList(		e,active_tt_id,''							,showDDPRList)}></div>
		<div id="LIST_PR"					aria-hidden	="true"
															on:click		={e=>hDDPRList(		e,active_pr_id,''							,_clickDDPRList)} 								
															on:keypress	={e=>hDDPRList(		e,active_pr_id,''							,_clickDDPRList)}></div>

		<div id="DOCUMENT_ROOT">
		</div>

		<Event_DOCUMENT_ROOT_LIST_PR_BINDING on:interject={(e)=>{trace_event(e,xid,cat_bind_tid);}} />

		<div id="INACTIVE_ROOT">
		</div>
	</Layout>
	
	<slot></slot>
	
<div style="display:none">{errors}</div>
</main>

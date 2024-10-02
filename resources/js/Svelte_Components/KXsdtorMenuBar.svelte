<script>
	/* ---------------------------------------------------------------------------------------------- */
	import * as SXsdUI 			from '../Svelte_AllLibs/xsdUI.js';
	import * as AXsd1 			from '../AllShareLibs/xsd1.js';
	/* ---------------------------------------------------------------------------------------------- */
	import KInput_doc_lang 				from '../Svelte_Components_in_Form_xsd/KInput_doc_lang.svelte';
	import KInput_doc_level 			from '../Svelte_Components_in_Form_xsd/KInput_doc_level.svelte';
	import KInput_tid_restriction	from '../Svelte_Components_in_Form_xsd/KInput_tid_restriction.svelte';
	import KInput_tid_default			from '../Svelte_Components_in_Form_xsd/KInput_tid_default.svelte';
	import KInput_tid_occurs			from '../Svelte_Components_in_Form_xsd/KInput_tid_occurs.svelte';
	import KInput_image 					from '../Svelte_Components_in_Form_xsd/KInput_image.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_tid,sd_xid} 									from '../Svelte_Store/session_data.js';
	import {sd_emid1edit,sd_emid2insert} 		from '../Svelte_Store/session_data.js';
	import {sdgb_wrt_lang}									from '../Svelte_Store/session_data.js';

	import {sd_emid1and2xsdgrouplang}				from '../Svelte_Store/Session_data.js';
	import {sd_emid1and2xsd}								from '../Svelte_Store/Session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid,emid1edit,emid2insert;
	let gb_wrt_lang;
	
	let emid1and2xsd;
	let emid1and2xsdgrouplang;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(												(value)=>{tid=value});
	sd_xid.subscribe(												(value)=>{xid=value});
	sd_emid1edit.subscribe(									(value)=>{emid1edit=value});
	sd_emid2insert.subscribe(								(value)=>{emid2insert=value});
	sdgb_wrt_lang.subscribe(								(value)=>{gb_wrt_lang=value});
	
	sd_emid1and2xsdgrouplang.subscribe(			(value)=>{emid1and2xsdgrouplang=value});
	sd_emid1and2xsd.subscribe(							(value)=>{emid1and2xsd=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let sourcedata;
	export let data;
	/* ---------------------------------------------------------------------------------------------- */
	let oXmlAny = sourcedata.oxml;
	/* ---------------------------------------------------------------------------------------------- */
	let windowWidth = window.innerWidth;
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	function handleResize()	
	{	
		windowWidth = window.innerWidth;
		if (windowWidth >= 1024) {	clicked = false;	}
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_input_new_field(p_data)
	{
		var newhem 	= document.createElement('div');
		newhem.setAttribute('id','active_input');
		var oTmp 		= new KInput_doc_lang({target:newhem,props:{sourcedata:{oxml:oXmlAny},data:p_data,tid:tid}});
		var hem 		= document.getElementById('active_editor');
		hem.parentNode.insertBefore(newhem,hem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_input(p_data)
	{
		var newhem 	= document.createElement('div');
		newhem.setAttribute('id','active_input');
		var oTmp 		= new KInput_doc_lang({target:newhem,props:{sourcedata:{oxml:oXmlAny},data:p_data,tid:tid}});
		var hem 		= document.getElementById('active_editor');
		hem.parentNode.insertBefore(newhem,hem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_input_image(p_data)
	{
		var newhem 	= document.createElement('div');
		newhem.setAttribute('id','active_input');
		var oTmp 		= new KInput_image({target:newhem,props:{sourcedata:{oxml:oXmlAny},data:p_data,tid:tid}});
		var hem 		= document.getElementById('active_editor');
		hem.parentNode.insertBefore(newhem,hem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_input_level(p_data)
	{
		var newhem 	= document.createElement('div');
		newhem.setAttribute('id','active_input');
		var oTmp 		= new KInput_doc_level({target:newhem,props:{sourcedata:{oxml:oXmlAny},data:p_data,tid:tid}});
		var hem 		= document.getElementById('active_editor');
		hem.parentNode.insertBefore(newhem,hem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_input_restriction(p_data)
	{
		var newhem	= document.createElement('div');
		newhem.setAttribute('id','active_input');
		var oTmp		= new KInput_tid_restriction({target:newhem,props:{sourcedata:{oxml:oXmlAny},data:p_data,tid:tid}});
		var hem			= document.getElementById('active_editor');
		hem.parentNode.insertBefore(newhem,hem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_input_default(p_data)
	{
		var newhem	= document.createElement('div');
		newhem.setAttribute('id','active_input');
		var oTmp		= new KInput_tid_default({target:newhem,props:{sourcedata:{oxml:oXmlAny},data:p_data,tid:tid}});
		var hem			= document.getElementById('active_editor');
		hem.parentNode.insertBefore(newhem,hem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _attach_input_occurs(p_data)
	{
		var newhem	= document.createElement('div');
		newhem.setAttribute('id','active_input');
		var oTmp		= new KInput_tid_occurs({target:newhem,props:{sourcedata:{oxml:oXmlAny},data:p_data,tid:tid}});
		var hem			= document.getElementById('active_editor');
		hem.parentNode.insertBefore(newhem,hem.nextSibling);
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _sync_target_id_to_emid1or2(p_sTargetId)
	{
			/* ---------------------------------------- */
			if (SXsdUI._is_emenur1_edit_element(p_sTargetId))
			{
				if (p_sTargetId == emid1edit)
				{
					sd_emid1edit.set('none');
					SXsdUI._de_active_input();
					return;
				}
				else
				{
					sd_emid1edit.set(p_sTargetId);
					sd_emid2insert.set('none');
				}
			}
			/* ---------------------------------------- */
			if (SXsdUI._is_emenur2(p_sTargetId))
			{
				if (p_sTargetId == emid2insert)
				{
					sd_emid2insert.set('none');
					SXsdUI._de_active_input();
					return;
				}
				else
				{
					sd_emid1edit.set('none');
					sd_emid2insert.set(p_sTargetId);
				}
			}
			/* ---------------------------------------- */
	}
	/* ---------------------------------------------------------------------------------------------- */
	const handleClick = (e)=>{ 
		clicked = !clicked	;
		//NOTE: e.target.id = emenurR_C note !== Event_DOCUMENT_ROOT -> e.detail.any_id from interject -> dispatch
			console.log("dispatch('interject',{any_tid:tid_in_document_root})"+' -> e.detail.any_tid='+e.detail.any_tid+' | e.target.id='+e.target.id);
			/* ------------------------------------------------------------------------------------------ */
			let aMeaningData = [];
			sd_emid1and2xsdgrouplang.set(SXsdUI._get_emenurN2lang_map(e.target.id));
			/* ------------------------------------------------------------------------------------------ */
			if (SXsdUI._is_emenur1_edit_element(e.target.id)) /* EDIT:UPDATE */
			{
				// emenur1_0 : name 							(1 lang)
				// emenur1_1 : rule_restriction		(1 lang)
				// emenur1_2 : default_value 			(1 lang)
				// emenur1_3 : title 							(3 lang)
				// emenur1_4 : occurs							(1 lang)
				
				_sync_target_id_to_emid1or2(e.target.id);
				
				if (SXsdUI._is_emenur1_edit_element(emid1edit))
				{
					console.log(emid1edit);
					SXsdUI._de_active_input();
					switch (emid1edit)
					{
						case 'emenur1_0'	:	aMeaningData = oXmlAny.get_meaning_data_by_tid(tid); // name
																_attach_input(aMeaningData);
																break;
						case 'emenur1_4'	:	aMeaningData = oXmlAny.get_prop_for_tid(tid,emid1edit); // occurs
																console.log(aMeaningData);
																_attach_input_occurs(aMeaningData);
																break; 
						case 'emenur1_1'	: aMeaningData = oXmlAny.get_prop_for_tid(tid,emid1edit); // restriction
																_attach_input_restriction(aMeaningData);
																break;
						case 'emenur1_2'	: aMeaningData = oXmlAny.get_prop_for_tid(tid,emid1edit); // default
																_attach_input_default(aMeaningData);
																break;
						case 'emenur1_3'	:	aMeaningData = oXmlAny.get_prop_for_tid(tid,emid1edit); // title 3 lang
																_attach_input(aMeaningData);
																break;
						default						: break;
					}
					/* -------------------------------------------------------------------------------------- */
				}
			}
			/* ------------------------------------------------------------------------------------------ */
			if (SXsdUI._is_emenur2(e.target.id)) /* INSERT:CREATE */
			{
				// emenur2_0						:	level	(1 lang)
				// emenur2_1-emenur2_9	: HX		(1 lang)
				// emenur2_8						: image
				
				_sync_target_id_to_emid1or2(e.target.id);
				
				if (!SXsdUI._is_emenur2_new_element_image(emid2insert))
				{
					SXsdUI._de_active_input();
					aMeaningData = oXmlAny.get_default_data_for_new_tid(emid2insert,1);
					/* -------------------------------------------------------------------------------------- */
					if (SXsdUI._is_emenur2_level_group(emid2insert))	_attach_input_level(aMeaningData);
					else																							_attach_input(aMeaningData);
					/* -------------------------------------------------------------------------------------- */
					return;
				}
				if (SXsdUI._is_emenur2_new_element_image(emid2insert))
				{
					SXsdUI._de_active_input();
					_attach_input_image('');
					return;
				}
			}
			/* ------------------------------------------------------------------------------------------ */
}
/* ------------------------------------------------------------------------------------------------ */
const resetClick 	= (e)=>{ clicked = false			; console.log('xx'); 	}
</script>

<svelte:window on:resize={handleResize} />
<nav id={data.menu.id} class='navbar navbar-expand navbar-light bg-light nav-justify'>
	<div class="container-fluid">
		<ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-justify text-center w-100">

			{#each data.menu.links as link}
				{#if link.displayInNav}
					<li class='nav-item w-100'>
							<button id={link.id} gid={link.gid} class='nav-link' on:click={e=>handleClick(e)} on:keypress={handleClick}>{link.linkText}</button>
					</li>
				{/if}
			{/each}
			
		</ul>
	</div>
</nav>
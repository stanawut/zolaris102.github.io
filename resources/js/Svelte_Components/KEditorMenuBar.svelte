<script>
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibUI 			from '../Svelte_AllLibs/libUI.js';
	import * as ALib1 			from '../AllShareLibs/lib1.js';
	/* ---------------------------------------------------------------------------------------------- */
	import KInput_doc_lang 	from '../Svelte_Components_in_Form/KInput_doc_lang.svelte';
	import KInput_image 		from '../Svelte_Components_in_Form/KInput_image.svelte';
	import KInput_doc_level from '../Svelte_Components_in_Form/KInput_doc_level.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_tid,sd_xid} 																	from '../Svelte_Store/session_data.js';
	import {sd_emid1grouplang,sd_emid1edit,sd_emid2insert} 	from '../Svelte_Store/session_data.js';
	import {sdgb_wrt_lang}																	from '../Svelte_Store/session_data.js';
	import {sdgb_default_emid1grouplang}										from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid,emid1grouplang,emid1edit,emid2insert;
	let gb_wrt_lang;
	let gb_default_emid1grouplang;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(												(value)=>{tid=value});
	sd_xid.subscribe(												(value)=>{xid=value});
	sd_emid1grouplang.subscribe(						(value)=>{emid1grouplang=value});
	sd_emid1edit.subscribe(									(value)=>{emid1edit=value});
	sd_emid2insert.subscribe(								(value)=>{emid2insert=value});
	sdgb_wrt_lang.subscribe(								(value)=>{gb_wrt_lang=value});
	sdgb_default_emid1grouplang.subscribe(	(value)=>{gb_default_emid1grouplang=value});
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
	function _sync_target_id_to_emid1or2(p_sTargetId)
	{
			/* ---------------------------------------- */
			if (LibUI._is_emenur1_lang_group(p_sTargetId))
			{
				LibUI._de_active_input();
				if (p_sTargetId == emid1grouplang)
				{
					sd_emid1grouplang.set('none');
					sd_emid1edit.set('none');
					sd_emid2insert.set('none');
					return;
				}
				else
				{
					sd_emid1grouplang.set(p_sTargetId);
					sd_emid1edit.set('none');
					sd_emid2insert.set('none');
				}
			}
			/* ---------------------------------------- */
			
			/* ---------------------------------------- */
			if (LibUI._is_emenur1_edit_element(p_sTargetId))
			{
				if (p_sTargetId == emid1edit)
				{
					sd_emid1edit.set('none');
					LibUI._de_active_input();
					return;
				}
				else
				{
					sd_emid1edit.set(p_sTargetId);
					sd_emid2insert.set('none');
				}
			}
			/* ---------------------------------------- */
			if (LibUI._is_emenur2(p_sTargetId))
			{
				if (p_sTargetId == emid2insert)
				{
					sd_emid2insert.set('none');
					LibUI._de_active_input();
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
			console.log('e.detail.any_tid='+e.detail.any_tid+' | e.target.id='+e.target.id);
			/* ------------------------------------------------------------------------------------------ */
			let aMeaningData = [];
			/* ---------------------------------------- */
			if (LibUI._is_emenur1_lang_group(e.target.id)) /* SYNC MENU R1,R2 */
			{
				_sync_target_id_to_emid1or2(e.target.id);
				console.log('return from e:LibUI._is_emenur1_lang_group(e.target.id)');
				return;
			}
			/* ---------------------------------------- */
			console.log('emid1grouplang:'+emid1grouplang+' || gb_default_emid1grouplang:'+gb_default_emid1grouplang);	
			if (emid1grouplang == 'none' || emid1grouplang == '')
			{
				if (gb_default_emid1grouplang == 0)
					return;
				else
					_sync_target_id_to_emid1or2(gb_default_emid1grouplang);
			}
			/* ---------------------------------------- */
			if (LibUI._is_emenur1_lang_group(emid1grouplang) && LibUI._is_crud_operation(e.target.id)) 
			{
				_sync_target_id_to_emid1or2(e.target.id);
			}
			else if (e.target.id == 'emenur2_6')
			{
				_sync_target_id_to_emid1or2(e.target.id);
			}
			/* ---------------------------------------- */
			if (LibUI._is_emenur1_edit_element(e.target.id)) /* EDIT:UPDATE */
			{
				if (LibUI._is_emenur1_lang_group(emid1grouplang) && LibUI._is_emenur1_edit_element(emid1edit))
				{
					LibUI._de_active_input();
					if (ALib1._is_required_1_input_text(emid1grouplang))
					{
						aMeaningData = oXmlAny.get_meaning_data_by_tid(tid);
					}
					else if (ALib1._is_required_3_input_text(emid1grouplang))
					{
						aMeaningData = oXmlAny.get_meaning_data_by_tid(tid);
					}
					_attach_input(aMeaningData);
				}
			}
			/* ---------------------------------------- */
			if (LibUI._is_emenur2(e.target.id)) /* INSERT:CREATE */
			{
				if (LibUI._is_emenur1_lang_group(emid1grouplang) && !LibUI._is_emenur2_new_element_image(emid2insert))
				{
					LibUI._de_active_input();
					if (ALib1._is_required_1_input_text(emid1grouplang))
					{
						aMeaningData = oXmlAny.get_default_data_for_new_tid(emid2insert,1);
					}
					else if (ALib1._is_required_3_input_text(emid1grouplang))
					{
						aMeaningData = oXmlAny.get_default_data_for_new_tid(emid2insert,3);
					}
					if (LibUI._is_emenur2_level_group(emid2insert))	_attach_input_level(aMeaningData);
					else																						_attach_input(aMeaningData);
					return;
				}
				if (LibUI._is_emenur2_new_element_image(emid2insert))
				{
					LibUI._de_active_input();
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
<script>
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibTX 									from '../Svelte_AllLibs/libTX.js';
	import { createEventDispatcher } 		from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid} 										from '../Svelte_Store/session_data.js';
	import {sd_cat_bind_tid,sd_cat_xid} from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let xid;
	let cat_xid,cat_bind_tid;
	/* ---------------------------------------------------------------------------------------------- */
	sd_xid.subscribe(					(value)=>{xid=value})						; // now 		is INACTIVE_ROOT xml current doc to be attached to cat file selected in dropdown
	sd_cat_xid.subscribe(			(value)=>{cat_xid=value})				; // now		is DOCUMENT_ROOT xml (cat xml)
	sd_cat_bind_tid.subscribe((value)=>{cat_bind_tid=value})	;	// last bind cat tid HX,TT tag
	/* ---------------------------------------------------------------------------------------------- */
	const dispatch = createEventDispatcher(); // child_interject->trace_event_child to return cat_xid to caller
	/* ---------------------------------------------------------------------------------------------- */
	export let 	user_id;
	export let 	_laravel_session_token;
	export let 	inactive_root_title;
	/* ---------------------------------------------------------------------------------------------- */
	let 				action_done	= "";
	let					bAttached		= false;
	let					bBind				= false;
	/* ---------------------------------------------------------------------------------------------- */
	export let data;
	console.log(" ------------ KSimpleList ------------ ",data.jsondata);
	let windowWidth = window.innerWidth;
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	let oXmlCat 		= null;
	/* ---------------------------------------------------------------------------------------------- */
	function handleResize()	
	{	
		windowWidth = window.innerWidth;
		if (windowWidth >= 1024) {	clicked = false;	}
	}
	/* ---------------------------------------------------------------------------------------------- */
	function handleClick(e)
	{
	
	}
	/* ---------------------------------------------------------------------------------------------- */	
	function handleSelectCat(e)
	{
		console.log('KSimpleList:cat file_id:'+e.target.id);
		if (cat_xid !== e.target.id)
			dispatch('child_interject', { selected_cat_xid: e.target.id });
	}
	/* ---------------------------------------------------------------------------------------------- */
</script>
<style>
</style>
<!-- note:add css="none" for by pass data in CLIS101_Xem constructor sCss -->
<svelte:window on:resize={handleResize} />
{#if data}

		<ul class="list-group mt-1" style="width:100%">
				<li>
					<button id=-1 class='list-group-item' css="none" style="white-space:normal;width:100%" on:click={e=>handleSelectCat(e)} on:keypress={handleSelectCat}>insert at beginning</button>
				</li>
				{#each data.jsondata as link,i}
					<li>
						<button id={link.id} class='list-group-item list-group-item-secondary' css="none" style="white-space:normal;width:100%" on:click={e=>handleSelectCat(e)} on:keypress={handleSelectCat}>{link.title}</button>
					</li>
				{/each}
		</ul>

{/if}

<div style="display:none">{user_id}{_laravel_session_token}{inactive_root_title}</div>

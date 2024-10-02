<script>
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibTX 									from '../Svelte_AllLibs/libTX.js';
	import { createEventDispatcher } 		from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 										from 'svelte';
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
	export let 	sourcedata;
	/* ---------------------------------------------------------------------------------------------- */
	let 				action_done		= "";
	let					bAttached			= false;
	let					bBind					= false;
	let					sDefaultTitle	=	sourcedata.data_list_title;
	let					sActiveTitle	=	'';
	/* ---------------------------------------------------------------------------------------------- */
	export let data;
	let windowWidth = window.innerWidth;
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	let oXmlCat 		= null;
	/* ---------------------------------------------------------------------------------------------- */
	onMount(() => { sActiveTitle = sDefaultTitle;	}); 
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
		let selected_id = e.target.id;
		console.log('KDDFileList:cat file_id:'+e.target.id);
		if (cat_xid !== e.target.id)
		{
			dispatch('child_interject', { selected_cat_xid: e.target.id });
			//sd_cat_xid.set(e.target.id);
			sActiveTitle = document.getElementById(selected_id).innerHTML;
		}
		else
		{
			console.log('same');
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
</script>
<style>
</style>
<svelte:window on:resize={handleResize} />
{#if data}

	<div class="btn-group" style="display:block">
		<button type="button" class="btn btn-primary dropdown-toggle" style="width:100%" data-bs-toggle="dropdown" aria-expanded="false">
			{sActiveTitle}
		</button>

		<ul class="dropdown-menu dropdown-menu-dark" style="width:100%">
				{#each data.jsondata as link,i}
						<li>
								<button id={sourcedata.link_id_prefix}{link.id} class='dropdown-item' style="white-space:normal;width:100%" on:click={e=>handleSelectCat(e)} on:keypress={handleSelectCat}>{link.title}</button>
						</li>
				{/each}
		</ul>


	</div>

{/if}

<div style="display:none">{user_id}{_laravel_session_token}{inactive_root_title}</div>

<script>
	/* ---------------------------------------------------------------------------------------------- */
	import * as ALib1 			from '../AllShareLibs/lib1.js';
	import * as LibTX				from '../Svelte_AllLibs/libTX.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 	from '../Svelte_Store/session_data.js';
	import {sd_cat_tid} 		from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid,cat_tid;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(	(value)=>{tid=value});
	sd_xid.subscribe(	(value)=>{xid=value});
	sd_cat_tid.subscribe( (value)=>{cat_tid=value});
	/* ---------------------------------------------------------------------------------------------- */
	//export let sourcedata;
	export let data;
	//let oXmlAny = sourcedata.oxml;
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
	const handleClick = (e)=>{ 
		let _laravel_session_token 	= document.getElementById('_laravel_session_token').innerHTML;
		let file_id									= document.getElementById('file_id').getAttribute('value');
		let status_code							= document.getElementById('status_code').getAttribute('value');
		let status_code_new					= document.getElementById('status_code_new').getAttribute('value');
		let list_type							 	= document.getElementById('list_type').innerHTML;
		let akvInputParams 					= null;
		akvInputParams							= {
																		laravel_session_token	: _laravel_session_token,
																		'file_id'							: file_id,
																		'status_code'					: status_code,
																		'status_code_new'			: status_code_new,
																		'list_type'						: list_type,
																	};
		console.log('e.target.id:'+e.target.id+' ======== |||||||||||||||||||||| '+list_type);
		console.log(akvInputParams);
		switch (e.target.id)
		{
			case '00600R9_0': // Update
												if (status_code !== status_code_new)
												{
													LibTX.fetch006Update(akvInputParams);
												}
												break;
			case '00600R9_1': // Cancel
			
												break;
			case '00600R9_2': // Close
			
												break;
		}
		
	}
	/* ---------------------------------------------------------------------------------------------- */
	let a_button = {0:'btn btn-outline-success',1:'btn btn-outline-danger',2:'btn btn-outline-primary'};
	/* ---------------------------------------------------------------------------------------------- */
</script>

<svelte:window on:resize={handleResize} />
<nav id='active_commit' class='navbar navbar-expand navbar-light bg-light nav-justify'>
	<div class="container-fluid">
		<ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-justify text-center w-100">
		
			{#each data.menu.links as link, i}
				{#if link.displayInNav}
					<li class='nav-item w-100'>
							<button id={link.id} gid={link.gid} class={a_button[i]} style="width:90%;" on:click={e=>handleClick(e)} on:keypress={handleClick}>{link.linkText}</button>
					</li>
				{/if}
			{/each}
			
		</ul>
	</div>
</nav>
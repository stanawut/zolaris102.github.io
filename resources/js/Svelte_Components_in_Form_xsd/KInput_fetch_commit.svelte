<script>
	/* ---------------------------------------------------------------------------------------------- */
	import * as ALib1 from '../AllShareLibs/lib1.js';
	import * as LibTX	from '../Svelte_AllLibs/libTX.js';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(	(value)=>{tid=value});
	sd_xid.subscribe(	(value)=>{xid=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let sourcedata;
	export let data;
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
	const handleClick = (e)=>{ 
		clicked = !clicked	;
		console.log('Now action:'+e.target.id);
		let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
		let akvInputParams = null;
		switch (e.target.id)
		{
			case 'nditor_main_bind':
															console.log('bind');
															console.log(data.title);
															oXmlAny.commit_bind_doc(data.tid,data.atext);
															console.log(oXmlAny._xmldoc);
															
															clicked = !clicked	;
															akvInputParams = 
																										{ 
																											doc_type								: 'cat',
																											laravel_session_token		: _laravel_session_token,
																											file_id									: data.file_id,
																											serxml									:	oXmlAny.fnXml2Ser(),
																											commit									: 1,
																										};
																											
															LibTX.fetchXmlUpdate(akvInputParams);
															
															console.log("Updated");

															break;
			case 'nditor_main_unbind':
															console.log('unbind');
															oXmlAny.commit_unbind_doc(data.tid,data.atext);
															clicked = !clicked	;
															akvInputParams = 
																										{ 
																											doc_type								: 'cat',
																											laravel_session_token		: _laravel_session_token,
																											file_id									: data.file_id,
																											serxml									:	oXmlAny.fnXml2Ser(),
																											commit									: 1,
																										};
																											
															LibTX.fetchXmlUpdate(akvInputParams);
															break;
			case 'nditor_main_close':
															console.log('Close');
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
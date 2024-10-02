<script>
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} from '../Svelte_Store/session_data.js';
	let tid,xid;
	sd_tid.subscribe((value)=>{tid=value});
	sd_xid.subscribe((value)=>{xid=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let data;
//export let tid;

	let windowWidth = window.innerWidth;
	let clicked 		= false;
	function handleResize()	
	{	
		windowWidth = window.innerWidth;
		if (windowWidth >= 1024) {	clicked = false;	}
	}
	const handleClick = (e)=>{ 
															clicked = !clicked	; 
														//e.target.id = xmenur1_1
															let menu_id = e.target.id;
															let menu_rc = menu_id.split('xmenur')[1].split('_');
														}
	const resetClick 	= (e)=>{ clicked = false			; console.log('xx'); 	}
/*
<a id={link.id} gid={link.gid} class='nav-link' href={link.url} on:click={handleClick} on:keypress={handleClick}>{link.linkText}</a>
to button
*/
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
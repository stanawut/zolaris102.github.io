<script>
	import {onMount}						from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import NavAPB 						from '@/Pages_Elements/NavAPB.svelte';
	import Footer 						from '@/Pages_Elements/Footer.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	let current_url = '';
	let close_url 	= '';
	let page_number = 1;
	onMount(() =>
	{
		current_url = window.location.href;
		if (current_url.includes('xdocx_dcatx_00600_00025'))
		{
			close_url = 'http://localhost:8000/';
			const url = new URL(window.location.href);
			const queryParams = new URLSearchParams(url.search);
      page_number = queryParams.get('page') ? queryParams.get('page') : 1;
		}	
		else if (current_url.includes('xcatx_xxxxx_00600_00025'))
		{
			console.log('here');
			close_url = 'http://localhost:8000/';
			const url = new URL(window.location.href);
			const queryParams = new URLSearchParams(url.search);
      page_number = queryParams.get('page') ? queryParams.get('page') : 1;
		}	
	});
	/* ------------------------------------------------------------------------------------------------ */
</script>

<style>

</style>

<NavAPB {close_url} {page_number}/>

<div class="container">
	<slot></slot>
</div>

<br>
<!-- Footer/ -->

<script>
	import {onMount}					from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import NavAPB 						from '@/Pages_Elements/NavAPB.svelte';
	import Footer 						from '@/Pages_Elements/Footer.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	let current_url = '';
	let close_url 	= '';
	export let current_page;
	export let page_number;
	onMount(() =>
	{
		// ex:http:.../Mars/xdocx_xxxxx_00300_xxxxx/{user_id:9}/{doc_id:19}/{parent_type:none,cat,lib}/{parent_id:0}/{page:3}
		current_url = window.location.href;
		
		if (current_url.includes('xdocx_xxxxx_00300_xxxxx'))
		{
			/*
			if (current_url.includes('/cat/'))
				close_url = 'http://localhost:8000/Mars/xcatx_xxxxx_00300_xxxxx';
			else if (current_url.includes('/lib/'))
				close_url = 'http://localhost:8000/Mars/xlibx_xxxxx_00300_xxxxx';
			else
			*/
				close_url = 'http://localhost:8000/Mars/xdocx_dcatx_00600_00025';
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
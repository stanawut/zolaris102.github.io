<script>
	import Layout 							from '@/Pages_Layouts/Layout_apb_lis_xxxxx_xxxxx_00600_xxxxx.svelte';
	import * as LibUI 	from '../Svelte_AllLibs/libUI.js';
	import PaginationAPB from 	'@/Pages_Elements/PaginationAPB.svelte';
	import {onMount} 						from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let pagedata; //docs;
	console.log(pagedata);
//	export let temp;
//	console.log('TEMP ...');
//	console.log(temp);
	
	export let kv_level_1;
	export let kv_level_2;
	export let list_key;
	export let list_link;
	let list_tuple = pagedata.data;
	console.log(list_tuple);
	
	/* ---------------------------------------------------------------------------------------------- */
	let txurl = '/Mars/xdocx_xxxxx_00300_xxxxx';
	let parent_type = 'none';
	let parent_doc_id = 0;
	let s_r='<table class="table"><tbody>';
	onMount( async () => {
		/*
		| title level 1
		| title level 2
		| tuple r1c1 | tuple r1c2 | tuple r1c3
		| tuple r2c1 | tuple r2c2 | tuple r2c3
		| ...
		| title level 1
		| title level 2
		| tuple r1c1 | tuple r1c2 | tuple r1c3
		| tuple r2c1 | tuple r2c2 | tuple r2c3
		| ...
		*/
		s_r = LibUI.showEditableList2Levels(kv_level_1,kv_level_2,list_key,list_link,list_tuple);
	});
 
	/* ---------------------------------------------------------------------------------------------- */
</script>

<style>
</style>

<main>

	<Layout>
		<h>{@html s_r}</h>

		<!--table class="table">
			<thead>
				<tr>
					<th scope="col">form_id</th>
					<th scope="col">form_title</th>
					<th scope="col">store_id</th>
					<th scope="col">store_title</th>
					<th scope="col">fil_id</th>
				</tr>
			</thead>
			<tbody>
				{#each pagedata.data as doc}
					<tr>
					<th>{doc.form_id}</th>
					<td>{doc.form_title}</td>
					<th>{doc.store_id}</th>
					<td>{doc.store_title}</td>
					<th>{doc.fil_id}</th>
					</tr>
				{/each}
			</tbody>
		</table-->


	<PaginationAPB links={pagedata.links}/>

	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}</div>
</main>
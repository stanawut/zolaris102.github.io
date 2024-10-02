<script>
	import Layout 							from '@/Pages_Layouts/Layout_apb_lis_xxxxx_xxxxx_00600_xxxxx.svelte';
	import PaginationAPB from 	'@/Pages_Elements/PaginationAPB.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let pagedata; //docs;
	/* ---------------------------------------------------------------------------------------------- */
	let txurl = '/Mars/xdocx_xxxxx_00300_xxxxx';
	let parent_type = 'none';
	let parent_doc_id = 0;
	/* ---------------------------------------------------------------------------------------------- */
</script>

<style>

</style>

<main>

	<Layout>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Title</th>
				</tr>
			</thead>
			<tbody>
				{#each pagedata.data as doc}
					<tr>
					<th scope="row"><a href={txurl}/{doc.user_id}/{doc.id}/{parent_type}/{parent_doc_id}/{pagedata.current_page} class="link-underline-light">{doc.id}</a></th>
					<td>{doc.title}</td>
					</tr>
				{/each}
			</tbody>
		</table>

	<PaginationAPB links={pagedata.links}/>

	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}</div>
</main>
<script>
	import Layout 							from '@/Pages_Layouts/Layout_apb_lis_xxxxx_xxxxx_00600_xxxxx.svelte';
	import PaginationAPB from 	'@/Pages_Elements/PaginationAPB.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let pagedata; //docs;
	console.log(pagedata);
	/* ---------------------------------------------------------------------------------------------- */
	let txurl = '/Mars/xcatx_xxxxx_00300_xxxxx';
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
					<th scope="col">Writer</th>
				</tr>
			</thead>
			<tbody>
				{#each pagedata.data as doc}
					<tr>
					<th scope="row"><a href={txurl}/{doc.user_id}/{doc.id}/{pagedata.current_page} class="link-underline-light">{doc.id}</a></th>
					<td>{doc.title}</td>
					<td>{doc.user_name}</td>
					</tr>
				{/each}
			</tbody>
		</table>

	<PaginationAPB links={pagedata.links}/>

	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}</div>
</main>
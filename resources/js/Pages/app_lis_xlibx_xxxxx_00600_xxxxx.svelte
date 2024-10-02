<script>
	import Layout from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let libraries;
	/* ---------------------------------------------------------------------------------------------- */
	let txurl = '/Venus/xlibx_xxxxx_00200_xxxxx';
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
				{#each libraries as lib}
					<tr>
					<th scope="row"><a href={txurl}/{lib.id} class="link-underline-light">{lib.id}</a></th>
					<td>{lib.title}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}</div>
</main>
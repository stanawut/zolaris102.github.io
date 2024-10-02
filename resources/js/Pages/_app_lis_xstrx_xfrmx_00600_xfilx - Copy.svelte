<script>
	import Layout 							from '@/Pages_Layouts/Layout_apb_lis_xxxxx_xxxxx_00600_xxxxx.svelte';
	import PaginationAPB from 	'@/Pages_Elements/PaginationAPB.svelte';
	import {onMount} 						from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let pagedata; //docs;
	console.log(pagedata);
	export let temp;
	console.log('TEMP ...');
	console.log(temp);
	/*
	export let list_key;
	export let list_link;
	let list_tuple = pagedata.data;
	console.log(list_tuple);
	*/
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
		let prev_form_id 	= -1;
		let prev_store_id = -1;
		let sStyle 				= 'style="--bs-alert-padding-y: 0.2rem!important;--bs-alert-margin-bottom: 0.2rem!important;"';
		let bBegin 				= true;
		
		s_r='<table class="table"><tbody>';
		for(let i = 0; i < pagedata.data.length;i++)
		{
			let oRec = pagedata.data[i];
			if (oRec.form_id !== prev_form_id)
			{
					s_r += '<tr><th colspan="3" class="bg-dark text-white" '+sStyle+'>'+
									oRec.form_id+":"+oRec.form_title+
									'</th></tr>';
			}	
			if (oRec.store_id !== prev_store_id)
			{
				
				s_r += 	'<tr><th colspan="3" class="bg-secondary text-white" '+sStyle+'>'+
								oRec.store_id+":"+oRec.store_title+
								"</th></tr>";
				if (bBegin)
				{
					bBegin = false;
				}
			}
				
			
			prev_store_id = oRec.store_id;
			prev_form_id 	= oRec.form_id;
			s_r +='<tr>'+
						'<th scope="row">'+oRec.fil_id+'</td>'+
						'<td>'						+((oRec.fil_info) ? oRec.fil_info:'no info')		+'</td>'+
						'<td>'						+((oRec.fil_more_info) ? oRec.fil_more_info:'no more info')+'</td>'+
						'</tr>';
			if (i == pagedata.data.length-1 )
			{
				s_r += '</tbody></table>';
				bBegin = true;
			}
			else if (i < pagedata.data.length-1)
			{
				if (oRec.store_id !== pagedata.data[i+1].store_id)
				{
					bBegin = true;
				}
			}
		}
		s_r += '</tbody></table>';
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
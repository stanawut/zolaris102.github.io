<script>
	import Layout 								from '@/Pages_Layouts/Layout.svelte';
	import * as LibTX 						from '../Svelte_AllLibs/libTX.js';
	import * as LibUI 						from '../Svelte_AllLibs/libUI.js';
	import KDropdownCascadeList		from '../Svelte_Components/KDropdownCascadeList.svelte';
	
	import {onMount} 		from 'svelte';
	
	import PaginationAPB from 	'@/Pages_Elements/PaginationAPB.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let pagedata; //docs;
	export let _laravel_session_token;
	console.log(pagedata);
	console.log(pagedata.unique_form_store_result);
	let _token = _laravel_session_token;
	console.log(_token);
	export let user_id;
	/* ---------------------------------------------------------------------------------------------- */
	let txurl = '/Mars/xdocx_xxxxx_00300_xxxxx';
	let parent_type = 'none';
	let parent_doc_id = 0;
	let form_id = 0;
	let store_id = 0;
	/* ---------------------------------------------------------------------------------------------- */
	onMount(async () => {
		LibUI.showDropdown(KDropdownCascadeList,'LIST_FORMS',pagedata.unique_form_result);
	});
	/* ---------------------------------------------------------------------------------------------- */
	const handleDDFormList = async (e,p_dummy_1,p_dummy_2,p_fn) =>
	{
	
		console.log('Form click at '+e.target.id);
		form_id = e.target.id;
		LibUI.showDropdown(KDropdownCascadeList,'LIST_STORES',pagedata.unique_form_store_result[e.target.id]);
	}
	/* ---------------------------------------------------------------------------------------------- */
	const handleDDStoreList = async (e,p_dummy_1,p_dummy_2,p_fn) =>
	{
	
		console.log('Store click at '+e.target.id);
		store_id = e.target.id;
		let pakv = 	{
									'laravel_session_token' : _token,
									'form_id'	: form_id,
									'store_id' : store_id, 
								};
		let formfilleds_list = await LibTX.fetch_3Columns_List('/Mars/xstrx_xfilx_00600_xxxxx/data/list/',pakv);
		console.log(formfilleds_list);
		LibUI.showEditableList('LIST_FILLEDS',formfilleds_list['list_key'],formfilleds_list['list_link'],formfilleds_list['list_tuple']);
	}
	/* ---------------------------------------------------------------------------------------------- */
	
	/* ---------------------------------------------------------------------------------------------- */
	const showDDStoreList = async (e) =>
	{
		//LibUI.showDropdown(KDropdownCascadeList,'LIST_FORMS',pagedata.unique_form_result);
		LibUI.showDropdown(KDropdownCascadeList,'LIST_STORES',pagedata.unique_form_store_result[16]);
	}
	/* ---------------------------------------------------------------------------------------------- */
</script>

<style>

</style>

<main>

	<Layout>

		<div class="container">
			<header class="d-flex justify-content-center py-3">
				<ul class="nav nav-pills">
					<li class="nav-item"><a href="" class="nav-link active">Store</a></li>
					<li class="nav-item"><a href="/Mars/xstrx_xfrmx_00600_xfilx/data/{user_id}" class="nav-link">☰ Fil</a></li>
					<li class="nav-item"><a href="" class="nav-link">Search</a></li>
					<li class="nav-item"><a href="" class="nav-link">x</a></li>
				</ul>
			</header>
		</div>

		<div id="LIST_FORMS" 	on:click={e=>handleDDFormList(	e,null,null,null)}></div>
		<div id="LIST_STORES" on:click={e=>handleDDStoreList(	e,null,null,null)}></div>
		<div id="LIST_FILLEDS"></div>

	<!-- PaginationAPB links={pagedata.links}/ -->

	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}</div>
</main>
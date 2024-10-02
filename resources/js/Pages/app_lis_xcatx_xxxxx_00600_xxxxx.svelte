<script>
	/* ---------------------------------------------------------------------------------------------- */
	import Layout 																	from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_00600_prev_file_id }									from '../Svelte_Store/session_data.js';
	import K00600Options												from '../Svelte_components_in_00600/KInput_status_options.svelte';
	import {_00600_menubarRow9 as nmenubarRow9}	from '../Svelte_AllConstants/ConstantSet2_00600_status_fetchcommit.js';
	import K00600Commit													from '../Svelte_components_in_00600/KInput_status_fetch_commit.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let list;
	export let list_type;
	export let _laravel_session_token;
	/* ---------------------------------------------------------------------------------------------- */
	let txurl = '/Venus/xcatx_xxxxx_00200_xxxxx';
	/* ---------------------------------------------------------------------------------------------- */
	let prev_file_id;
	sd_00600_prev_file_id.subscribe((value) => {prev_file_id = value});
	/* ---------------------------------------------------------------------------------------------- */
	/*
	function _attach_emenu(p_tid)
	{
		var dem 		= document.getElementById(p_tid);
		var new_mem	= document.createElement('div');
		new_mem.setAttribute('id','active_editor');

		var kEditorMenubarRow1 = new KEditorMenuBar({target:new_mem,props:{sourcedata:{oxml:oXmlInstance},data:{menu:emenubarRow1,tid:p_tid}}});
		var kEditorMenubarRow2 = new K00600options();
		dem.parentNode.insertBefore(new_mem,dem.nextSibling);
		
	}	
	*/
	/* ---------------------------------------------------------------------------------------------- */
	/*
	function _inject_nmenu(cat_id,cat_status)
	{
		var cur_trem	= null;
		var new_trem 	= null, new_tdem = null;
		let akv_data	= null;
		
		// attach options ---------------------------
		akv_data			= {cat_id:cat_id,cat_status:cat_status};
		cur_trem			= document.getElementById(cat_id);
		new_trem 			= document.createElement('tr');
		new_tdem 			= document.createElement('td');
		new_tdem.setAttribute('colspan','3');
		new_trem.setAttribute('id','tr_options');
		new_trem.appendChild(new_tdem);
		var k00600Options = new K00600Options({target:new_tdem,props:{data:akv_data}});
		
		if (cur_trem.nextSibling)
			cur_trem.parentNode.insertBefore(new_trem,cur_trem.nextSibling);
		else
			cur_trem.parentNode.appendChild(new_trem);
	
		// attach commit ----------------------------
		akv_data 			= {menu:nmenubarRow9,_token:_laravel_session_token};
		cur_trem			= document.getElementById('tr_options');
		new_trem 			= document.createElement('tr');
		new_tdem 			= document.createElement('td');
		new_tdem.setAttribute('colspan','3');
		new_trem.setAttribute('id','tr_commit');
		new_trem.appendChild(new_tdem);
		var k00600Commit = new K00600Commit({target:new_tdem,props:{data:akv_data}});

		if (cur_trem.nextSibling)
			cur_trem.parentNode.insertBefore(new_trem,cur_trem.nextSibling);
		else
			cur_trem.parentNode.appendChild(new_trem);
	
	}
	*/
	/* ---------------------------------------------------------------------------------------------- */
	/*
	const handleCatListOptions = (e,cat_id,cat_status) => {

		// list cat with table tr > td when insert in between tr can not insert div
		// inserting <tr id=tr_options><td colspan=3> then <div>
		// inserting <tr id=tr_commit><td colspan=3> then <div>
		var bToggleSameCat		= prevcatid === cat_id;
		var eRowOptions				= document.getElementById('tr_options');
		var eRowCommit				= document.getElementById('tr_commit');
		let inlineFnClearRow 	= function(p_eRowOptions,p_eRowCommit,p_bToggleSameCat) 
														{
															if (p_eRowOptions)
															{
																p_eRowOptions.remove();
																p_eRowCommit.remove();
															if (p_bToggleSameCat) return true;
															}
															return false;
														};
		
		if (bToggleSameCat)
		{
			if (inlineFnClearRow(eRowOptions,eRowCommit,bToggleSameCat)) return;
		}
		else
		{
			prevcatid = cat_id;
			inlineFnClearRow(eRowOptions,eRowCommit,bToggleSameCat);
		}
		_inject_nmenu(cat_id,cat_status);
	}
	*/
	
	
	function _inject_nmenu(file_id,status_code)
	{
		var cur_trem = null;
		var new_trem = null, new_tdem = null;
		let akv_data = null;
		// attach options =========================================================
		akv_data = {file_id:file_id,status_code:status_code};
		cur_trem	= document.getElementById(file_id);
		new_trem	= document.createElement('tr');
		new_tdem	= document.createElement('td');
		new_tdem.setAttribute('colspan','3');
		new_trem.setAttribute('id','tr_options');
		
		new_trem.appendChild(new_tdem);
		var k00600Options = new K00600Options({target:new_tdem,props:{data:akv_data}});
		
		if (cur_trem.nextSibling)
			cur_trem.parentNode.insertBefore(new_trem,cur_trem.nextSibling);
		else
			cur_trem.parentNode.appendChild(new_trem);	
		// attach commit ==========================================================
		akv_data 			= {menu:nmenubarRow9,_token:_laravel_session_token};
		cur_trem			= document.getElementById('tr_options');
		new_trem 			= document.createElement('tr');
		new_tdem 			= document.createElement('td');
		new_tdem.setAttribute('colspan','3');
		new_trem.setAttribute('id','tr_commit');
		new_trem.appendChild(new_tdem);
		var k00600Commit = new K00600Commit({target:new_tdem,props:{data:akv_data}});

		if (cur_trem.nextSibling)
			cur_trem.parentNode.insertBefore(new_trem,cur_trem.nextSibling);
		else
			cur_trem.parentNode.appendChild(new_trem);
	}
	/* ---------------------------------------------------------------------------------------------- */
	
	
	function handleFileListStatusOtions(e,file_id,status_code)
	{
		var bToggleSameFileId	= prev_file_id === file_id;
		var eRowStatusOptions = document.getElementById('tr_options');
		var eRowCommit				= document.getElementById('tr_commit');
		let inlineFnClearRow	= function(p_eRowStatusOptions,p_eRowCommit,p_bToggleSameFileId)
														{
															if (p_eRowStatusOptions)
															{
																p_eRowStatusOptions.remove();
																p_eRowCommit.remove();
																if (p_bToggleSameFileId) return true;
															}
															return false;
														};
		if (bToggleSameFileId)
		{
			if (inlineFnClearRow(eRowStatusOptions,eRowCommit,bToggleSameFileId)) return;
		}
		else
		{
			prev_file_id = file_id;
			inlineFnClearRow(eRowStatusOptions,eRowCommit,bToggleSameFileId);
		}
		_inject_nmenu(file_id,status_code);
	}
	
	/* ---------------------------------------------------------------------------------------------- */
</script>

<style>

</style>

<main>
	<div id="_laravel_session_token" style="display:none">{_laravel_session_token}</div>	
	<div id="list_type" style="display:none">{list_type}</div>	
	<Layout>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Title</th>
					<th scope="col">...</th>
				</tr>
			</thead>
			<tbody>
				{#each list as cat}
					<tr id={cat.file_id}>
						<th scope="row"><a href={txurl}/{cat.file_id} class="link-underline-light">{cat.file_id}</a></th>
						<td>{cat.title}</td>
						<td><button class="btn btn-sm btn-outline-info" 
								on:click={e=>handleFileListStatusOtions(e,cat.file_id,cat.status_code)} 
								on:keypress={e=>handleFileListStatusOtions(e,cat.file_id,cat.status_code)}>&#x2630;{cat.status_code}</button>
							</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Layout>

	<slot></slot>
	
<div style="display:none">{errors}</div>
</main>
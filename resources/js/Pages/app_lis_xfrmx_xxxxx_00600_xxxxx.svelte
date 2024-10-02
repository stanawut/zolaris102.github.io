<script>
	import Layout from '@/Pages_Layouts/Layout.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import K00600Options												from '../Svelte_components_in_00600/KInput_status_options.svelte';
	import {_00600_menubarRow9 as nmenubarRow9}	from '../Svelte_AllConstants/ConstantSet2_00600_status_fetchcommit.js';
	import K00600Commit													from '../Svelte_components_in_00600/KInput_status_fetch_commit.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	export let errors;
	/* ---------------------------------------------------------------------------------------------- */
	export let list;
	export let list_type;
	export let _laravel_session_token;
	
//export let docs;
	let prev_file_id = 0;
	/* ---------------------------------------------------------------------------------------------- */
	let txurl = '/Venus/xfrmx_xxxxx_00200_xxxxx';
	/* ---------------------------------------------------------------------------------------------- */
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
		console.log('FILE_ID:HFLSTATUS_OPTION=============>'+file_id);
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
				{#each list as form}
					<tr id={form.file_id}>
					<th scope="row"><a href={txurl}/{form.file_id} class="link-underline-light">{form.file_id}</a></th>
					<td>{form.title}</td>
					<td><button class="btn btn-sm btn-outline-info"
						on:click={e=>handleFileListStatusOtions(e,form.file_id,form.status_code)}
						on:keypress={e=>handleFileListStatusOtions(e,form.file_id,form.status_code)}>&#x2630;{form.status_code}</button></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Layout>
	
	<slot></slot>
	
<div style="display:none">{errors}</div>
</main>

<script>
	/* ---------------------------------------------------------------------------------------------- */
	import CXem	  												from '../Svelte_Classes/CLIS103_Xem.js';
	import { g_style_text } 							from '../Svelte_AllConstants/ConstantSet1.js';
	import { FieldsCollection as Fields } from '../Svelte_AllConstants/ConstantSet3_form.js';
	import KInput_local_commit 						from '../Svelte_Components_in_Form_xsd/KInput_local_commit.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_tid,sd_xid} 								from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let store_session_tid,xid;
	sd_tid.subscribe((value)=>{store_session_tid=value});
	sd_xid.subscribe((value)=>{xid=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let sourcedata;
	export let data;
	export let tid;
	let oXmlAny = sourcedata.oxml;
	/* ---------------------------------------------------------------------------------------------- */
	let encap_lang 	= ['th','en','ch','xx'];
	let windowWidth = window.innerWidth;
	let clicked 		= false;
	let akvLevel		= CXem.get_leaf_data_LV(oXmlAny._xmldoc,tid);
	/* ---------------------------------------------------------------------------------------------- */
	function handleResize()	
	{	
		windowWidth = window.innerWidth;
		if (windowWidth >= 1024) {	clicked = false;	}
	}
	const handleClick = (e)=>{ clicked = !clicked	; console.log(FieldCollection); }
	const resetClick 	= ()=>{ clicked = false			; console.log('xx'); }
	/* ---------------------------------------------------------------------------------------------- */
/*
change
<input type="hidden" id="tagname" value={data.tag}/>
to
akvLevel['_xpp_sSubLevel']
*/

</script>


<svelte:window on:resize={handleResize} />
<style>
</style>

<div class="bd-example">
	{#if data.type == "mul"}
			<div style={g_style_text['c_lv_begin']} class="list-group list-group-item">{akvLevel['_xpp_sSubLevel']}:{akvLevel['_xpp_sTextContent']}</div>
			<form>
				<input type="hidden" id="type" value={data.type}/>
				<input type="hidden" id="tagname" value={akvLevel['_xpp_sSubLevel']}/>
				{#each Fields.input_text.input_text_3_lang as field,i}
					<div class="form-floating mb-3">
						<textarea class="form-control" id={field.id} rows="3" style="height:100%">{data[encap_lang[i]]}</textarea>
						<label for={field.id}>Hello:sd_tid{store_session_tid}:tid{tid}</label>
					</div>
				{/each}
			</form>
			<div style={g_style_text['c_lv_end']} class="list-group list-group-item"><div class="float-end">End</div></div>
			<KInput_local_commit {sourcedata} />

		{:else if data.type == "uni"}
			<div style={g_style_text['c_lv_begin']} class="list-group list-group-item">Begin:{akvLevel['_xpp_sSubLevel']}:{akvLevel['_xpp_sTextContent']}</div>
			<form>
				<input type="hidden" id="type" value={data.type}/>
				<input type="hidden" id="tagname" value={akvLevel['_xpp_sSubLevel']}/>
				{#each Fields.input_text.input_text_1_lang as field,i}
					<div class="form-floating mb-3">
						<textarea class="form-control" id={field.id} rows="3" style="height:100%">{data['xx']}</textarea>
						<label for={field.id}>Hello:sd_tid{store_session_tid}:tid{tid}</label>
					</div>
				{/each}
			</form>
			<div style={g_style_text['c_lv_end']} class="list-group list-group-item"><div class="float-end">End</div></div>
			<KInput_local_commit {sourcedata} />
	{/if}

</div>

<script>
	/* ---------------------------------------------------------------------------------------------- */
	import { FieldsCollection as Fields } from '../Svelte_AllConstants/ConstantSet4_form.js';
	import KInput_local_commit 						from '../Svelte_Components_in_Form_xsd/KInput_local_commit.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_tid,sd_xid} 								from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let store_session_tid,xid;
	sd_tid.subscribe((value)=>{store_session_tid=value});
	sd_xid.subscribe((value)=>{xid=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let sourcedata; // sourcedata:{oxml:oXmlAny} pass to KInput_local_commit
	export let data;
	export let tid;
	/* ---------------------------------------------------------------------------------------------- */
	let encap_lang 	= ['th','en','ch','xx'];
	let windowWidth = window.innerWidth;
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	function handleResize()	
	{	
		windowWidth = window.innerWidth;
		if (windowWidth >= 1024) {	clicked = false;	}
	}
	const handleClick = (e)=>{ clicked = !clicked	; console.log(FieldCollection); }
	const resetClick 	= ()=>{ clicked = false			; console.log('xx'); }
	/* ---------------------------------------------------------------------------------------------- */
</script>


<svelte:window on:resize={handleResize} />
<style>
</style>

<div class="bd-example">

			<form>
				<input type="hidden" id="type" value={data.type}/>
				<input type="hidden" id="tagname" value={data.tag}/>

				<div class="row">
				{#each Fields.input_text.input_radiotext_default_value as field,i}

					<div class="col-4">
								{field.placeholder}
					</div>
					<div class="col-8">
							<input type="text" class="form-control" id={field.id}  value={data.xx[field.id]}/>
					</div>
					<div class="w-100"></div>
				
				{/each}
				</div>
				
			</form>
			<KInput_local_commit {sourcedata}/>

</div>

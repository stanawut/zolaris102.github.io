<script>
	/* ---------------------------------------------------------------------------------------------- */
	import { FieldsCollection as Fields } from '../Svelte_AllConstants/ConstantSet2_00600_status_options.js';
	/* ---------------------------------------------------------------------------------------------- */
	export let data;
	let	sSelected		= ''+data.status_code;	
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
	function onChange(e)
	{
		sSelected	= e.currentTarget.value;
	}
	/* ---------------------------------------------------------------------------------------------- */
</script>


<svelte:window on:resize={handleResize} />
<style>
</style>

<div class="bd-example">

			<form>
				<input type="hidden" id="file_id" 				value={data.file_id}/>
				<input type="hidden" id="status_code"			value={data.status_code}/>
				<input type="hidden" id="status_code_new"	value={sSelected}/>

				{#each Fields.input_text.input_text_options as field,i}
					
					<div class="form-check">
						<input 	class="form-check-input" type="radio" name="flexRadioDefault" value={field.placeholder.value}
										id={field.id} on:change={onChange} checked={field.placeholder.value===sSelected}/>
						<label class="form-check-label" for={field.id}>{field.placeholder.text}:{field.placeholder.value}:{field.placeholder.symbol}</label>
					</div>
			
				{/each}
			</form>

</div>

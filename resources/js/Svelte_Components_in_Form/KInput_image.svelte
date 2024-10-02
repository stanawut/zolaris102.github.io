<script>
	/* ---------------------------------------------------------------------------------------------- */
	import  FilePond,{registerPlugin,supported} from 'svelte-filepond';
	import 	{setOptions} 												from 'filepond';
	import 	FilePondPluginImagePreview 					from 'filepond-plugin-image-preview';
	import 	'filepond/dist/filepond.min.css';
	import 	'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
	/* ---------------------------------------------------------------------------------------------- */
	import { FieldsCollection as Fields } 			from '../Svelte_AllConstants/ConstantSet3_form.js';
	import KInput_local_commit 									from '../Svelte_Components_in_Form/KInput_local_commit.svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_tid,sd_xid} from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let store_session_tid,xid;
	sd_tid.subscribe((value)=>{store_session_tid=value});
	sd_xid.subscribe((value)=>{xid=value});
	/* ---------------------------------------------------------------------------------------------- */
	export let sourcedata;
	export let data;
	export let tid;
	/* ---------------------------------------------------------------------------------------------- */
	let encap_lang = ['th','en','ch','xx'];
	let windowWidth = window.innerWidth;
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	//headers: { 'X-CSRF-TOKEN':'{{csrf_token()}}'} change to headers: { 'X-CSRF-TOKEN':_laravel_session_token}
	let _laravel_session_token = document.getElementById('_laravel_session_token').innerHTML;
	/* ---------------------------------------------------------------------------------------------- */
	registerPlugin(FilePondPluginImagePreview);
	let pond;
	/* ---------------------------------------------------------------------------------------------- */
	setOptions({
			server: {
								process:'/Venus/xdocx_xxxxx_00200_xxxxx/'+xid+'/upload_tempimage',
								fetch:null,
								revert:'/Venus/xdocx_xxxxx_00200_xxxxx/'+xid+'/delete_tempimage',
								headers: { 'X-CSRF-TOKEN':_laravel_session_token}
			},
	});
	let name = 'file_to_upload';	//let name = 'filepond';
	/* ---------------------------------------------------------------------------------------------- */
	function handleInit()
	{
		console.log('FilePond has initialised');
	}
	/* ---------------------------------------------------------------------------------------------- */
	function handleAddFile(err,fileItem)
	{
		console.log('A file has been added',fileItem);
	}
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
    <FilePond
        bind:this={pond}
        {name}
				
        allowMultiple={true}
        oninit={handleInit}
        onaddfile={handleAddFile}
    />
		
	<KInput_local_commit {sourcedata}/>

</div>

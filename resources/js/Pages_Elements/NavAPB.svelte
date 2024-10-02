<script>
	import {inertia} 												from '@inertiajs/svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import {onMount} 												from 'svelte';
	/* ---------------------------------------------------------------------------------------------- */
	import * as LibUI 											from '../Svelte_AllLibs/libUI.js';
	/* ---------------------------------------------------------------------------------------------- */
	import { sdgb_src_lang,sdgb_wrt_lang	} from '../Svelte_Store/session_data.js';
	import { sdgb_default_emid1grouplang }	from '../Svelte_Store/session_data.js';
	/* ------------------------------------------------------------------------------------------------ */
	let current_url = '';
	let close_url;
	export let page_number;
	onMount(() =>
	{
		current_url = window.location.href;
		if (current_url.includes('xdocx_dcatx_00600_00025'))
		{
			close_url = 'http://localhost:8000/';
		}	
		else if (current_url.includes('xcatx_xxxxx_00600_00025'))
		{
			close_url = 'http://localhost:8000/';
		}	
		else if (current_url.includes('xdocx_xxxxx_00300_xxxxx'))
		{
			if (current_url.includes('/cat/') || current_url.includes('/lib/'))
			{
				// wip_wip need rewrite for better understanding
				// ex:http:.../Mars/xdocx_xxxxx_00300_xxxxx/{user_id:9}/{doc_id:19}/{parent_type:none,cat,lib}/{parent_id:0}/{page:3}
				/* ex: http://localhost:8000/Mars/xdocx_xxxxx_00300_xxxxx/8/13/cat/14/2 */
				let posSubParam = current_url.indexOf('xdocx_xxxxx_00300_xxxxx')+'xdocx_xxxxx_00300_xxxxx/'.length;
				let sSubParam		= current_url.substring(posSubParam); // 0/13/cat/14/2
				let aSubParam		= sSubParam.split('/'); //0:user_id,1:doc_id,2:parent_type,3:parent_id,4:page#
				console.log(aSubParam);
				close_url				= 'http://localhost:8000/Mars/xcatx_xxxxx_00300_xxxxx/'+aSubParam[0]+'/'+aSubParam[3]+'/'+aSubParam[4];
				console.log(close_url);
			}
			else
				close_url = 'http://localhost:8000/Mars/xdocx_dcatx_00600_00025?page='+page_number;
		}
		else if (current_url.includes('xcatx_xxxxx_00300_xxxxx'))
		{
			close_url = 'http://localhost:8000/Mars/xcatx_xxxxx_00600_00025?page='+page_number;
		}
	});
	/* ------------------------------------------------------------------------------------------------ */
	let src_lang,wrt_lang;
	let gb_default_emid1grouplang;
	sdgb_src_lang.subscribe(								(value)=>{ src_lang = value});
	sdgb_wrt_lang.subscribe(								(value)=>{ wrt_lang = value});
	sdgb_default_emid1grouplang.subscribe(	(value)=>{ gb_default_emid1grouplang = value});
	/* ------------------------------------------------------------------------------------------------ */
	let sTitle = '_LIS_';
	/* ------------------------------------------------------------------------------------------------ */
	function handleClickSourceIn(e)
	{
		console.log(e.target.id); // source-in-{uni,th,en,ch,mul}
		$sdgb_src_lang = (e.target.id).substring('source-in-'.length);
		console.log(src_lang);
	}
	/* ------------------------------------------------------------------------------------------------ */
	function handleClickWriteIn(e)
	{
		console.log(e.target.id); // write-in-{uni,th,en,ch,mul}
		$sdgb_wrt_lang = (e.target.id).substring('write-in-'.length);
		console.log(wrt_lang);
		$sdgb_default_emid1grouplang = LibUI._get_lang2emenur1_map(wrt_lang);
	}
	/* ------------------------------------------------------------------------------------------------ */
	function handleClickClose(e)
	{
		if (current_page.include('xdocx_dcatx_00600_00025'))
		{
			
		}
	}
	/* ------------------------------------------------------------------------------------------------ */
</script>

<style>

</style>

<svelte:head>
<title>{sTitle}</title>
</svelte:head>
<nav class="navbar bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">APB</a>
    <!--button type="button" class="btn-close" aria-label="Close" on:click={handleClickClose}></button-->
		<a class="btn-close" aria-label="Close" href={close_url}/>
  </div>
</nav>
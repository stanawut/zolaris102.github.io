<script>
	/* ---------------------------------------------------------------------------------------------- */
	import * as ALib1 from '../AllShareLibs/lib1.js';
	/* ---------------------------------------------------------------------------------------------- */
	export let sourcedata;
	let oXmlAny = sourcedata.oxml;
	/* ---------------------------------------------------------------------------------------------- */
	import {sd_xid,sd_tid} 																	from '../Svelte_Store/session_data.js';
	import {sd_emid1grouplang,sd_emid1edit,sd_emid2insert} 	from '../Svelte_Store/session_data.js';
	/* ---------------------------------------------------------------------------------------------- */
	let tid,xid;
	let emid1grouplang,emid1edit,emid2insert;
	/* ---------------------------------------------------------------------------------------------- */
	sd_tid.subscribe(							(value)=>{tid=value});
	sd_xid.subscribe(							(value)=>{xid=value});
	sd_emid1grouplang.subscribe(	(value)=>{emid1grouplang=value});
	sd_emid1edit.subscribe(				(value)=>{emid1edit=value});
	sd_emid2insert.subscribe(			(value)=>{emid2insert=value});
	/* ---------------------------------------------------------------------------------------------- */
	let windowWidth = window.innerWidth;
	let clicked 		= false;
	/* ---------------------------------------------------------------------------------------------- */
	import { 
						editor_menubarRow9 as emenubarRow9
					} from '../Svelte_Allconstants/ConstantSet4_xsdtor_menubar_localcommit.js';
	/* ---------------------------------------------------------------------------------------------- */
	function handleResize()	
	{	
		windowWidth = window.innerWidth;
		if (windowWidth >= 1024) {	clicked = false;	}
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _get_inputa_text()
	{
		let ra_text = {	type:'',tagname:'',th:'',en:'',ch:'',xx:'',textcontent:'',
										prop:{emenur2:''}
									};
		if (ALib1._is_input_text_3_lang())
		{
			ra_text['type'] 				= document.getElementById('type').value;
			ra_text['tagname'] 			= document.getElementById('tagname').value;
			ra_text['th'] 					= document.getElementById('input_text_3_lang_sub_th').value;
			ra_text['en'] 					= document.getElementById('input_text_3_lang_sub_en').value;
			ra_text['ch'] 					= document.getElementById('input_text_3_lang_sub_ch').value;
			ra_text['textcontent']	= ALib1._get_textcontent_encap_3_lang(ra_text['th'],ra_text['en'],ra_text['ch']);
		}
		else if (ALib1._is_input_text_1_lang())
		{
			ra_text['type'] 				= document.getElementById('type').value;
			ra_text['tagname'] 			= document.getElementById('tagname').value;
			ra_text['xx'] 					= document.getElementById('input_text_1_lang_sub_xx').value;
			ra_text['textcontent']	= ra_text['xx'];
		}
		else if (ALib1._is_input_file_to_upload())
		{
			ra_text['type']					= 'uni';
			ra_text['tagname']			= 'IM_01';
			let ahem								= document.getElementsByName('file_to_upload');
			for (let i = 0; i < ahem.length; i++)
			{
				ra_text['textcontent'] += ahem[i].getAttribute('value')+',';
			}
		}
		return ra_text;
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _get_inputa_proptext(p_emenur1_C)
	{
		let ra_text 	= {	type:'',tagname:'',th:'',en:'',ch:'',xx:'',textcontent:''};
		let sProp 		= oXmlAny.mapEmenur1_Meaning[p_emenur1_C];
		let aPropKey 	= null;
		let akv 			= {};
		switch (sProp)
		{
			case 'restriction'	: aPropKey 	= oXmlAny.mapRestriction_Meaning	;	break;
			case 'default'			: aPropKey	= oXmlAny.mapDefault_Meaning			;	break;
			case 'occurs'				: aPropKey	= oXmlAny.mapOccurs_Meaning				;	break;
		}
		ra_text['type'] 				= document.getElementById('type').value;
		ra_text['tagname'] 			= document.getElementById('tagname').value;
		Object.keys(aPropKey).forEach(key=>{ akv[key] = document.getElementById(key).value; });
		ra_text['textcontent'] 	= JSON.stringify(akv);
		return ra_text;
	}
	/* ---------------------------------------------------------------------------------------------- */
	function _get_crud_emid(emid1edit,emid2insert)
	{
		return (emid1edit !== "none" ? emid1edit : (emid2insert !== "none" ? emid2insert : "none"));
	}
	/* ---------------------------------------------------------------------------------------------- */
	const handleClick = (e)=>{ 
															clicked 			= !clicked	;
															let lastid 		= 0					;
															let aText 		= ''				;
															console.log(emid1edit,emid2insert);
															let sCrudEmid = _get_crud_emid(emid1edit,emid2insert);
															switch (sCrudEmid)
															{
																case 'emenur1_0'	:	//HX textContent name
																										aText = _get_inputa_text();
																										oXmlAny.commit_update_input_text(tid,aText);
																										break;
																case 'emenur1_4'	: 
																case 'emenur1_1'	: 
																case 'emenur1_2'	:	
																										aText =_get_inputa_proptext(sCrudEmid);
																										oXmlAny.commit_update_prop(sCrudEmid,tid,aText);
																										break;
																case 'emenur1_3'	:	//prop title (3 lang field translation)
																										aText = _get_inputa_text();
																										oXmlAny.commit_update_prop(sCrudEmid,tid,aText);
																										console.log(aText);
																										break;

																case 'emenur2_0'	: //{+}
																										aText = _get_inputa_text();
																										aText['prop']['emenur2'] = sCrudEmid;
																										oXmlAny.commit_insert_level_text(sCrudEmid,tid,aText);
																										break;
																
																case 'emenur2_1'	: //+HX a,b,c
																case 'emenur2_2'	: //+HX text
																case 'emenur2_3'	: //+HX 1,2,3
																case 'emenur2_4'	: //+HX 1.23
																case 'emenur2_5'	: //+HX date
																case 'emenur2_6'	: //+HX time
																case 'emenur2_7'	: //+HX T/F
																										aText = _get_inputa_text();
																										aText['prop']['emenur2'] = sCrudEmid;
																										oXmlAny.commit_insert_input_text(sCrudEmid,tid,aText);
																										break;
																case 'emenur2_8'	: //  ☐,☐	filepond
																case 'emenur2_9'	: // more..
																										break;
															}
	}
	/* ---------------------------------------------------------------------------------------------- */
	let a_button = {0:'btn btn-success',1:'btn btn-danger',2:'btn btn-primary'};
/*
<a id={link.id} gid={link.gid} class={a_button[i]} style="width:90%;" href={link.url} on:click={e=>handleClick(e)} on:keypress={handleClick}>{link.linkText}</a>
*/
</script>

<svelte:window on:resize={handleResize} />
<nav id='active_commit' class='navbar navbar-expand navbar-light bg-light nav-justify'>
	<div class="container-fluid">
		<ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-justify text-center w-100">
		
			{#each emenubarRow9.links as link, i}
				{#if link.displayInNav}
					<li class='nav-item w-100'>
							<button id={link.id} gid={link.gid} class={a_button[i]} style="width:90%;" on:click={e=>handleClick(e)} on:keypress={handleClick}>{link.linkText}</button>
					</li>
				{/if}
			{/each}
			
		</ul>
	</div>
</nav>
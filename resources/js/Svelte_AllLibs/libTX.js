import CLIS101_XmlDoc 			from '../Svelte_Classes/CLIS101_XmlDoc.js';
import CLIS101_XmlCat				from '../Svelte_Classes/CLIS101_XmlCat.js';
import CLIS101_XmlLib 			from '../Svelte_Classes/CLIS101_XmlLib.js';
import CLIS101_XmlFrm 			from '../Svelte_Classes/CLIS101_XmlFrm.js';
import CLIS101_XmlFil 			from '../Svelte_Classes/CLIS101_XmlFil.js';
import CLIS101_Xml_inactive from '../Svelte_Classes/CLIS101_Xml_inactive.js';
import KDropdownFileList 		from '../Svelte_Components/KDropdownFileList.svelte';
import * as LibUIA					from '../Svelte_AllLibs/LibUIAsync.js';
import CXSD100							from '../Svelte_Classes/CXSD100.js';

/* ------------------------------------------------------------------------------------------------ */
/*
export default
{
	data() {value: ''},
}
*/
/* ------------------------------------------------------------------------------------------------ */
export function fn1() {console.log('Hello');}
/* ------------------------------------------------------------------------------------------------ */
export function get_feuri_document_pmn(p_doc_type,p_user_id,p_doc_id)
{
	let	r_feuri = '';
	switch (p_doc_type)
	{
		case 'doc' 	:
									r_feuri	= '//localhost:5173/storage/app/public/'+p_user_id+'/venus/documents/'+p_doc_id+'/document/pmn/'+
														p_user_id+'_'+p_doc_id+'.xml';
									break;
		case 'cat'	: 
									r_feuri	= '//localhost:5173/storage/app/public/'+p_user_id+'/venus/categories/'+p_doc_id+'/document/pmn/'+
														p_user_id+'_'+p_doc_id+'.xml';
									break;
		case 'frm' 	:
									r_feuri	= '//localhost:5173/storage/app/public/'+p_user_id+'/venus/forms/'+p_doc_id+'/document/pmn/'+
														p_user_id+'_'+p_doc_id+'.xml';
									break;
		case 'lib'	: 
									r_feuri	= '//localhost:5173/storage/app/public/'+p_user_id+'/venus/libraries/'+p_doc_id+'/document/pmn/'+
														p_user_id+'_'+p_doc_id+'.xml';
									break;
									
	}
	return r_feuri;
}
/* ------------------------------------------------------------------------------------------------ */
export const loadXml2LeafData = async (pakv_loadxml2doc) => 
{
	/* 
		feuri ex. http: //localhost:5173/storage/app/public/{uid=1}/venus/documents/{doc_id=35}/document/pmn/{1}_{35}.xml 
	*/
//$sd_xid is set before enter the fn
	let r_oXmlInstance = new CLIS101_XmlLib();

	console.log(pakv_loadxml2doc);
	const response 	= await fetch(pakv_loadxml2doc['feuri']);
	let text 				= await response.text();
	r_oXmlInstance.members_set(	pakv_loadxml2doc['user_id'],
															pakv_loadxml2doc['file_id'],
															pakv_loadxml2doc['hemroot_id'],
															pakv_loadxml2doc['status_active'],
															pakv_loadxml2doc['target_folder']
														);
	r_oXmlInstance.parse(text);
	r_oXmlInstance.buildLeafData();
	return r_oXmlInstance;
};
/* ------------------------------------------------------------------------------------------------ */
export const loadXsd2Array = async (pakv_loadxsd2array) =>
{
	//let r_oXsdInstance = new
	console.log(pakv_loadxsd2array);
	const response 	= await fetch(pakv_loadxsd2array);
	let sXsdFile 				= await response.text();
	
	let domXsd 	= (new window.DOMParser()).parseFromString(sXsdFile/*p_xml*/,"text/xml");//this.parse(sXsdFile);
	let domRoot = domXsd.getElementsByTagName('xs:element')[0]; // <xs:element name="root",id="root"
	let aXsd		= CXSD100.getXsdArray(domRoot,0);
	console.log(aXsd);
}
/* ------------------------------------------------------------------------------------------------ */

export const loadXml2Dog = async (pakv_loadxml2doc) => 
{
	/* 
		feuri ex. http: //localhost:5173/storage/app/public/{uid=1}/venus/documents/{doc_id=35}/document/pmn/{1}_{35}.xml 
	*/
//$sd_xid is set before enter the fn
	console.log(pakv_loadxml2doc);

	const response 	= await fetch(pakv_loadxml2doc['feuri']);
	let text 				= await response.text();
	let r_oXml			= null;
	if (pakv_loadxml2doc['status_active'])
	{
		switch (pakv_loadxml2doc['class_type'])
		{
			case 'cat':	r_oXml						= new CLIS101_XmlCat(); console.log('wip_wip');
									r_oXml._edit_cat	=	pakv_loadxml2doc['_edit_cat'] == 'none' ? false : true;
									break;
			case 'doc':	r_oXml						= new CLIS101_XmlDoc(); 
									r_oXml._edit_cat	=	pakv_loadxml2doc['_edit_cat'] == 'none' ? false : true;
									break;
			case 'lib':	r_oXml						= new CLIS101_XmlLib(); 
									r_oXml._edit_lib	=	pakv_loadxml2doc['_edit_lib'] == 'none' ? false : true;
									break;
			case 'frm':	r_oXml						= new CLIS101_XmlFrm(); 
									r_oXml._edit_cat	=	pakv_loadxml2doc['_edit_cat'] == 'none' ? false : true;
									break;
			case 'fil': r_oXml						= new CLIS101_XmlFil();
									r_oXml._edit_cat	=	pakv_loadxml2doc['_edit_cat'] == 'none' ? false : true;
									
		}
	}
	else
	{
		console.log('============================ libTX loadXml2Dog Any');
		console.log(pakv_loadxml2doc);
		switch (pakv_loadxml2doc['class_type'])
		{
			case 'any':	r_oXml									= new CLIS101_Xml_inactive();
																						console.log('wip_wip'+Math.random());
																						console.log(pakv_loadxml2doc);
									r_oXml._doc_type				= (pakv_loadxml2doc['doc_type']) ? pakv_loadxml2doc['doc_type']:'';
									r_oXml._edit_cat				=	pakv_loadxml2doc['_edit_cat'] == 'none' ? false : true;
									r_oXml._enable_link_doc = pakv_loadxml2doc['_enable_link_doc'];
									
									r_oXml._parent_type			= (pakv_loadxml2doc['_parent_type'])		?	pakv_loadxml2doc['_parent_type']:'none';
									r_oXml._parent_file_id	= (pakv_loadxml2doc['_parent_file_id'])	?	pakv_loadxml2doc['_parent_file_id']:0;
									
									r_oXml._current_page		= pakv_loadxml2doc['_current_page'];
									break;
		}	
	}
	console.log(pakv_loadxml2doc);
	r_oXml.members_set(	pakv_loadxml2doc['user_id'],
											pakv_loadxml2doc['file_id'],
											pakv_loadxml2doc['hemroot_id'],
											pakv_loadxml2doc['status_active'],
											pakv_loadxml2doc['target_folder']
										);
									r_oXml.members_debug();
	r_oXml.parse(text);
	r_oXml.buildDocumentRoot();
	console.log('***'+pakv_loadxml2doc['action_done']);
	console.log(r_oXml._xmldoc);
	return r_oXml;
};
/* ------------------------------------------------------------------------------------------------ */
export const fetchXmlUpdate = async(pakv_inputParams) =>
{
	let pstUrl = '';
	let resUrl = '';

	const inputParams 	= new URLSearchParams();
	inputParams.append('serialized_xml'	,pakv_inputParams['serxml']);
	inputParams.append('_token'					,pakv_inputParams['laravel_session_token']);
	inputParams.append('file_id'				,pakv_inputParams['file_id']);
	inputParams.append('commit'					,pakv_inputParams['commit']);

	switch (pakv_inputParams['doc_type'])
	{
		case 'doc'	: pstUrl = '/Venus/xdocx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/update';
								//resUrl = '/Venus/xdocx_xxxxx_00600_xxxxx';
									break;
		case 'cat'	: pstUrl = '/Venus/xcatx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/update';
								//resUrl = '/Venus/xcatx_xxxxx_00600_xxxxx';
									break;
		case 'frm'	: pstUrl = '/Venus/xfrmx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/update';
									inputParams.append('serialized_xsd',pakv_inputParams['serxsd']);
									inputParams.append('serialized_frm',pakv_inputParams['serfrm']);
								//resUrl = '/Venus/xfrmx_xxxxx_00600_xxxxx';
									break;
		case 'lib'	: pstUrl = '/Venus/xlibx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/update';
								//resUrl = '/Venus/xlibx_xxxxx_00600_xxxxx';
									break;
		case 'fil'	:	
									if (pakv_inputParams['fil_id'] !== '')
									{
										pstUrl = '/Earth/xfilx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/'+pakv_inputParams['store_id']+'/'+pakv_inputParams['fil_id']+'/update';
										inputParams.append('fil_id',pakv_inputParams['fil_id']);
									}
									else
										pstUrl = '/Earth/xfilx_xxxxx_00100_xxxxx/'+pakv_inputParams['file_id']+'/'+pakv_inputParams['store_id']+'/store';
									console.log(pstUrl);
									inputParams.append('serialized_jsn',pakv_inputParams['serjsn']);
									inputParams.append('form_id',pakv_inputParams['form_id']);
									inputParams.append('store_id',pakv_inputParams['store_id']);
									inputParams.append('user_id',pakv_inputParams['user_id']);
									inputParams.append('owner_id',pakv_inputParams['owner_id']);
									console.log(pakv_inputParams);
									break;
	}
	console.log('---------------');
	const response 	= await 
													fetch(pstUrl, 
													{
														method: 'POST',
														body: inputParams,
													});
	console.log('---------------'+response.url);

	if (response.ok)
		window.location.href= response.url; // or resUrl

	//return response;
	/*
	Laravel:Class DummyController extends Controller
	...
	pfn x(Request $request)
	{	...
		return response()->json(['k1'=>'v1'],201);
	}
	Javascript
	*/
	//const datom = await response.json();
	//const datum = JSON.stringify(datom);
	//console.log(datum);
	
}
/* ------------------------------------------------------------------------------------------------ */
export const fetchXmlRevert = async(pakv_inputParams) =>
{
	let pstUrl = '';
	switch (pakv_inputParams['doc_type'])
	{
		case 'doc'	: pstUrl = '/Venus/xdocx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/revert';
									break;
		case 'cat'	: pstUrl = '/Venus/xcatx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/revert';
									break;
		case 'frm'	: pstUrl = '/Venus/xfrmx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/revert';
									break;
		case 'lib'	: pstUrl = '/Venus/xlibx_xxxxx_00200_xxxxx/'+pakv_inputParams['file_id']+'/revert';
									break;
	}
	const inputParams 	= new URLSearchParams();
	inputParams.append('serialized_xml'	,pakv_inputParams['serxml']);
	inputParams.append('_token'					,pakv_inputParams['laravel_session_token']);
	inputParams.append('file_id'				,pakv_inputParams['file_id']);
	inputParams.append('commit'					,pakv_inputParams['commit']);
	const response 	= await 
													fetch(pstUrl, 
													{
														method: 'POST',
														body: inputParams,
													});
	if (response.ok)
		window.location.href=response.url;
}
/* ------------------------------------------------------------------------------------------------ */
export const fetch_Cat_Lib_files2json = async(p_txurl,pakv_inputParams)	=>
{
	//let getUrl					= '/Venus/xlibx_xxxxx_00600_xxxxx/list';
	const	inputParams		= new URLSearchParams();
	inputParams.append('_token',pakv_inputParams['laravel_session_token']);
	const response_json	= await
													fetch(p_txurl,
													{
														method:	'POST',
														body: inputParams,
													}).then((response)=>response.json());
	/* use then instead of v1=await response.json()|v2=JSON.stringify(v1)|if res.ok return(v2) */ 
	console.log("fetchLibList2JSon",response_json);
	return response_json;
}
/* ------------------------------------------------------------------------------------------------ */
export const fetch_3Columns_List = async(p_txurl,pakv_inputParams) =>
{
	const inputParams	= new URLSearchParams();
	inputParams.append('_token',pakv_inputParams['laravel_session_token']);	
	if (pakv_inputParams['form_id'] !== undefined)
		inputParams.append('form_id',pakv_inputParams['form_id']);	
	if (pakv_inputParams['store_id'] !== undefined)
		inputParams.append('store_id',pakv_inputParams['store_id']);	
	console.log(pakv_inputParams);
	const response_json = await fetch(	p_txurl,
															{
																method:	'POST',
																body: inputParams,
															}).then((response)=>response.json());
	return response_json;
}
/* ------------------------------------------------------------------------------------------------ */
export const fetchDDUI_Cat_Lib_files = async (e,p_txurl,p_oxml_instance,p_oxml_inactive) =>
{
	let _laravel_session_token 	= document.getElementById('_laravel_session_token').innerHTML;
	let akvInputParams 					=	{	laravel_session_token	: _laravel_session_token, };
	let data_list 							= await fetch_Cat_Lib_files2json(p_txurl,akvInputParams);
																// ex. {jsondata:[{id:1,title:'aa'},{id:2,title:'bb'}]}
	let file_id_prefix 					= 'fileid_';
	let page_akvData						=	{
																	txurl								:	p_txurl,		
																	target_div					:	'LIST_FILES',
																	component						: KDropdownFileList,
																	file_id_prefix			:	file_id_prefix,
																	jsondata						:	data_list['jsondata'],
				
																	oxml_instance				:	p_oxml_instance,
																	oxml_inactive				:	p_oxml_inactive,
																	
																	default_title_file	:	'dummy 2.1',
																	inactive_root_title	: 'dummy 2.2',
																	inactive_file_id		: 0,
																};
	
	if (document.getElementById('LIST_FILES')) 	document.getElementById('LIST_FILES').innerHTML = ''; 
	if (document.getElementById('LIST_HX')) 		document.getElementById('LIST_HX').innerHTML 		= ''; 
	if (document.getElementById('LIST_TT')) 		document.getElementById('LIST_TT').innerHTML 		= ''; 
	if (document.getElementById('LIST_PR')) 		document.getElementById('LIST_PR').innerHTML 		= ''; 
	LibUIA.attachDD_cat_lib_files(e,page_akvData);
}
/* ------------------------------------------------------------------------------------------------ */
export const fetch006Update = async (pakv_inputParams) =>
{
	let pstUrl = '';	//= '/Mars/xdocx_xxxxx_00200_xxxxx/updatestatus';
	switch (pakv_inputParams['list_type'])
	{
		case 'document' : pstUrl =  '/Mars/xdocx_xxxxx_00200_xxxxx/updatestatus'; break;
		case 'cat' 			: pstUrl =  '/Mars/xcatx_xxxxx_00200_xxxxx/updatestatus'; break;
		case 'form'			: pstUrl = 	'/Mars/xfrmx_xxxxx_00200_xxxxx/updatestatus'; break;
	}
	console.log(pakv_inputParams['list_type']+' :::::::::::::: ' + pstUrl);
	
	const inputParams = new URLSearchParams();
	inputParams.append('_token'						,pakv_inputParams['laravel_session_token']);
	inputParams.append('file_id'					,pakv_inputParams['file_id']);
	inputParams.append('status_code'			,pakv_inputParams['status_code']);
	inputParams.append('status_code_new'	,pakv_inputParams['status_code_new']);
	inputParams.append('list_type'				,pakv_inputParams['list_type']);
	
	const response 	= await	fetch(pstUrl, 
													{
														method: 'POST',
														body: inputParams,
													});//.then((response) => console.log(response));
	if (response.ok)
		window.location.href=response.url;
}
/* ------------------------------------------------------------------------------------------------ */
export const fetch002Update = async (pakv_inputs,p_token) =>
{
	let pstUrl = '';
	switch('str')
	{
		case 'str'	: pstUrl = 	'/Earth/xstrx_xfrmx_00200_xxxxx/update'; break;
	}
	console.log(pakv_inputs);
	const inputParams	= new URLSearchParams();
	inputParams.append('_token'						,p_token);
	for (let i = 0; i < pakv_inputs.length; i++)
	{
		//pakv_inputs[i].value = document.getElementById(pakv_inputs[i].name).value;
		inputParams.append(pakv_inputs[i].name,pakv_inputs[i].value);
		console.log(pakv_inputs[i].name+':'+pakv_inputs[i].value);
	}	
	console.log(inputParams);
	console.log(pstUrl);
	const response = await fetch(pstUrl,
													{
														method:	'POST',
														body: inputParams,
													});//.then((response)=>console.log(response));
	if (response.ok)
		window.location.href=response.url;
}
/* ------------------------------------------------------------------------------------------------ */

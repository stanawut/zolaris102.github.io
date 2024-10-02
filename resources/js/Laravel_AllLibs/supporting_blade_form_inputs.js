export function _attach_input_document_title(p_sContainerId,p_doc_lang)
{
	console.log("Click me");
	const a_lang 			= ['tha','eng','chi'];
	const b_lang 			= ['th','en','ch'];
	
	const p_lang 			= ['ไทย','English','中文'];
	const akv_lang		= {uni:'',tha:'ไทย',eng:'English',chi:'中文',mul:''};
	let 	r_shemInput	= '';
	let		sKey				= '';
	switch (p_doc_lang)
	{
		case 'uni'	:
		case 'tha'	:
		case 'eng'	:
		case 'chi'	:
			sKey	=	'input_text_1_lang_sub_xx';
			r_shemInput = '<input id="'+sKey+'" name="'+sKey+'" type="text" placeholder="'+akv_lang[p_doc_lang]+'" class="form-control"/>';
			break;
		case 'mul'	:
			for (let i=0; i < a_lang.length; i++)
			{
				sKey	=	'input_text_3_lang_sub_'+b_lang[i];
				r_shemInput += '<input id="'+sKey+'" name="'+sKey+'" type="text" placeholder="'+akv_lang[a_lang[i]]+'" class="form-control"/>';
			}
			break;
	}	
	console.log(p_sContainerId);
	r_shemInput += '<input id="title" name="title" type="hidden" value=""/>';
	let eDiv = document.getElementById(p_sContainerId);
	eDiv.innerHTML = '';
	eDiv.innerHTML = r_shemInput;
	//return r_shemInput;
}
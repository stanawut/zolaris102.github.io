import { g_crud_operation,g_tag } from '../Svelte_AllConstants/ConstantSet4.js';
import { g_3lang_encap} 					from '../Svelte_AllConstants/ConstantSet4.js';
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
export function _attach_hem_flashmessage_before(p_shemTargetId,p_sMessage)
{
	const hemFlashMessage 								= document.createElement('div');
	hemFlashMessage.setAttribute('id','flashmessage');
	hemFlashMessage.style.backgroundColor = 'lightgreen';
	hemFlashMessage.style.padding 				= '10px';
	hemFlashMessage.style.textAlign 			= 'center';
	hemFlashMessage.innerText 						= p_sMessage;

	document.body.appendChild(p_shemTargetId);
	
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_lang_encap_text(p_text)
{
	let sValidator = '[..:th]';
	if (p_text.substring(0,sValidator.length) == sValidator)
		return true;
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_input_text_3_lang()
{
	if (document.getElementById('input_text_3_lang_sub_th') ||
			document.getElementById('input_text_3_lang_sub_en') ||
			document.getElementById('input_text_3_lang_sub_ch'))
		return true;
	return false;
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_input_text_1_lang()
{
	if (document.getElementById('input_text_1_lang_sub_xx'))
		return true;
	return false;
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_input_file_to_upload()
{
	if (document.getElementsByName('file_to_upload'))
		return true;
	return false;
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_prefix_tempimage(p_IM_01_textcontent)
{
	return (p_IM_01_textcontent.substring(0,'tempimage'.length) == 'tempimage');
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_required_1_input_text(p_emid1)
{	// uni,th,en,ch
	if (p_emid1 !== 'emenur1_3') return true;
	return false
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_required_3_input_text(p_emid1)
{ // mul
	if (p_emid1 == 'emenur1_3') return true;
	return false;
}
/* ------------------------------------------------------------------------------------------------ */
export function _get_textcontent_encap_3_lang(p_sthText,p_senText,p_schText)
{
	return (
						g_3lang_encap['th']['prefix'] + p_sthText + g_3lang_encap['th']['suffix'] + ',' +  
						g_3lang_encap['en']['prefix'] + p_senText + g_3lang_encap['en']['suffix'] + ',' +  
						g_3lang_encap['ch']['prefix'] + p_schText + g_3lang_encap['ch']['suffix'] + ',' );  
				
}
/* ------------------------------------------------------------------------------------------------ */

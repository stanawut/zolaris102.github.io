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
export function _is_crud_operation(p_emid)
{
	return g_crud_operation.includes(p_emid);
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur1(p_emid)
{
	return (p_emid.substring(0,'emenur1'.length) == 'emenur1');
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur2(p_emid)
{
	return (p_emid.substring(0,'emenur2'.length) == 'emenur2');
}
/* ------------------------------------------------------------------------------------------------ */
export function _get_emenurN2lang_map(p_emenurN)
{
	switch(p_emenurN)
	{
		case 'emenur1_3' : return 'mul';
		default					 : return 'uni';
	}
	return 'uni';
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur2_level_group(p_emid)
{
	return (p_emid == 'emenur2_0');
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur1_lang_group(p_emid)
{
	//const lang_group = ["emenur1_0","emenur1_1","emenur1_2","emenur1_3","emenur1_4"];
	//return lang_group.includes(p_emid);
	return true;
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur1_xsdtab_group(p_emid)
{
	const lang_group = ["emenur1_0","emenur1_1","emenur1_2","emenur1_3","emenur1_4"];
	return lang_group.includes(p_emid);
}
/* ------------------------------------------------------------------------------------------------ */
export function _get_emenur2_map(p_emid)
{
	switch(p_emid)
	{
		case 'emenur2_0'	: return 'LV_0X';
		case 'emenur2_1'	: return 'HX_01';
		case 'emenur2_2'	: return 'HX_01';
		case 'emenur2_3'	: return 'HX_01';
		case 'emenur2_4'	: return 'HX_01';
		case 'emenur2_5'	: return 'HX_01';
		case 'emenur2_6'	: return 'HX_01';
		case 'emenur2_7'	: return 'HX_01';
		case 'emenur2_8'	: return 'HX_01';
		case 'emenur2_9'	: return 'HX_01';
		default						: return 'HX_01';
	}
	return '';
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur2_new_element(p_emid)
{
	const new_element_group = ["emenur2_1","emenur2_2","emenur2_3","emenur2_4","emenur2_5","emenur2_6","emenur2_7","emenur2_8","emenur2_9"];
	return new_element_group.includes(p_emid);
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur2_new_element_image(p_emid)
{
	const new_image_group = ["emenur2_8"];
	return new_image_group.includes(p_emid);
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur1_edit_element(p_emid)
{
	return (['emenur1_0','emenur1_1','emenur1_2','emenur1_3','emenur1_4'].includes(p_emid));
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_active_editor()
{
	if (document.getElementById('active_editor')) 
		return true;
	return false;
}
/* ------------------------------------------------------------------------------------------------ */
export function _de_active_editor()
{
	if (document.getElementById('active_editor'))
		document.getElementById('active_editor').remove();
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_active_input()
{
	if (document.getElementById('active_input'))
		return true;
	return false;
}
/* ------------------------------------------------------------------------------------------------ */
export function _de_active_input()
{
	if (document.getElementById('active_input'))
		document.getElementById('active_input').remove();
}
/* ------------------------------------------------------------------------------------------------ */

import KDropdownFileList from '../Svelte_Components/KDropdownFileList.svelte';
/* ------------------------------------------------------------------------------------------------ */
/*
export default
{
	data() {value: ''},
}
*/
/* ------------------------------------------------------------------------------------------------ */
//export const attachDD_cat_lib_files = async (e,p_aKV) => 
export function attachDD_cat_lib_files(e,p_aKV)
{
	let inactive_root_title 	= (p_aKV['oxml_inactive']) ? p_aKV['oxml_inactive']._xmldoc.getElementById(2).textContent:'new';
	let active_title_file			= '';
	let new_dem 							= document.getElementById(p_aKV['target_div']);
	let active_title					= (active_title_file == '') ? p_aKV['default_title_file'] : active_title_file;
	var kDropdownFileList 		= new p_aKV['component'](
	{
		target	:	new_dem,
		props		:	{
								user_id									: 'dummy',
								_laravel_session_token	:	'dummy',
								inactive_root_title			: 'dummy',
								
								sourcedata	:	{
																oxml						:	p_aKV['oxml_instance'],
																link_id_prefix	:	p_aKV['file_id_prefix'],
																data_list_title	:	active_title
															},
								data				:	{	jsondata				:	p_aKV['jsondata']	}	
							}
	});
}
/* ------------------------------------------------------------------------------------------------ */

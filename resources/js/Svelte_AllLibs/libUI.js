import { g_crud_operation,g_tag } from '../Svelte_AllConstants/ConstantSet1.js';
import { g_3lang_encap} 					from '../Svelte_AllConstants/ConstantSet1.js';
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
export function _get_lang2emenur1_map(p_sLang)
{
	switch (p_sLang)
	{
		case 'uni'	: return	'emenur1_0'	; //uni,no encap
		case 'th'		: return	'emenur1_1'	; //th,encap choose th
		case 'en'		: return	'emenur1_2'	; //en,encap choose en
		case 'ch'		: return	'emenur1_3'	; //ch,encap choose ch
		case 'mul'	: return	'emenur1_4'	; //mul,all th,en,ch
		default			: return 	'emenur1_4'	;
	}
	return 'emenur1_4';
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur2_level_group(p_emid)
{
	return (p_emid == 'emenur2_0');
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur1_lang_group(p_emid)
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
		case 'emenur2_2'	: return 'TT_01';
		case 'emenur2_3'	: return 'PR_01';
		default						: return '';
	}
	return '';
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur2_new_element(p_emid)
{
	const new_element_group = ["emenur2_1","emenur2_2","emenur2_3","emenur2_4","emenur2_5"];
	return new_element_group.includes(p_emid);
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur2_new_element_image(p_emid)
{
	const new_image_group = ["emenur2_6"];
	return new_image_group.includes(p_emid);
}
/* ------------------------------------------------------------------------------------------------ */
export function _is_emenur1_edit_element(p_emid)
{
	return (p_emid == 'emenur1_5');
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
export function _empty_innerhtml(pakv_div_default) // [{k1:v1},{k2:v2},...]
{
	for (let i = 0; i < pakv_div_default.length; i++)
	{
		console.log('here');
		document.getElementById(pakv_div_default[i]['div_id']).innerHTML = pakv_div_default[i]['div_innerhtml'];
	}
}
/* ------------------------------------------------------------------------------------------------ */
export function showDropdown(p_classdropdown,p_divid,p_jsondata /* [{id:..,title:..}] */)
{	
	console.log('++++++++++++++++++++SHOW DROPDOWN++++++++++++++++++++++++');
	console.log(p_jsondata);
	let new_dem 							= document.getElementById(p_divid);
	new_dem.innerHTML 				= '';
	var kDropdown							= new p_classdropdown(
	{
		target	:	new_dem,
		props		:	{
								user_id									: 'dummy',
								_laravel_session_token	:	'dummy',
								inactive_root_title			: 'dummy',
								data										:	{	jsondata:p_jsondata	}
							}
	});
}
/* ------------------------------------------------------------------------------------------------ */
export function showEditableInputs(p_divid, pakv_inputs)
{
	let dem = document.getElementById(p_divid);
	let str = '';
	for(let i=0; i <  pakv_inputs.length; i++)
	{
			str += 	'<div class="row">'+
							'<label class="col-3 col-form-label" for="'+pakv_inputs[i].name+'">'+pakv_inputs[i].label+'</label>'+
							''+
							'<div class="col">'+
							'<input type="'+pakv_inputs[i].input_type+'" class="form-control" id="'+pakv_inputs[i].name+'" value="'+
							pakv_inputs[i].value+'" '+(pakv_inputs[i].editable?'':'disabled')+'>'+
							'</div>'+
							'</div>';
		
	}
	
	dem.innerHTML = str;
}
/* ------------------------------------------------------------------------------------------------ */
export function showEditableList(p_divid, pakv_key,pakv_link, pakv_list)
{
	/*
	| Head  r1c1 | Head  r1c2 | Head  r1c3
	| tuple r1c1 | tuple r1c2 | tuple r1c3
	| tuple r2c1 | tuple r2c2 | tuple r2c3
	| ...
	| ...
	*/
	let dem = document.getElementById(p_divid);
	let str = '';
	str = '<table class="table">'+
				'<thead>'+
				'<tr>'+
				'<th scope="col">'+pakv_key[0]+'</th>'+
				'<th scope="col">'+pakv_key[1]+'</th>'+
				'<th scope="col">'+pakv_key[2]+'</th>'+
				'</tr>'+
				'</thead>'+
				'<tbody>';
	
	for(let i=0; i <  pakv_list.length; i++)
	{
		str += '<tr>';
		str += '<th scope="row"><small><a href="'+pakv_link['prefix']+pakv_list[i][pakv_key[0]].toString()+pakv_link['suffix']+'" class="link-underline-light">'+pakv_list[i][pakv_key[0]]+'</a></small></th>';
		str += '<td><small>'+pakv_list[i][pakv_key[1]]+'</small></td>';
		str += '<td><small>'+pakv_list[i][pakv_key[2]]+'</small></td>';
		str += '</tr>';
	}
	
	str += '</tbody>'+
				 '</table>';
	dem.innerHTML = str;
	console.log(str);
}
/* ------------------------------------------------------------------------------------------------ */
export function showEditableList2Levels(kv_level_1,kv_level_2,list_key,list_link,list_tuple)
{
	/*
	| title level 1
	| title level 2
	| tuple r1c1 | tuple r1c2 | tuple r1c3
	| tuple r2c1 | tuple r2c2 | tuple r2c3
	| ...
	| title level 1
	| title level 2
	| tuple r1c1 | tuple r1c2 | tuple r1c3
	| tuple r2c1 | tuple r2c2 | tuple r2c3
	| ...
	*/
	
	let s_r = '';
	let prev_level_1_id = -1;
	let prev_level_2_id = -1;
	let sStyle 				= 'style="--bs-alert-padding-y: 0.2rem!important;--bs-alert-margin-bottom: 0.2rem!important;"';
	let bBegin 				= true;
	
	s_r='<table class="table"><tbody>';
	for(let i = 0; i < list_tuple.length;i++)
	{
		let oRec = list_tuple[i];
		if (oRec[kv_level_1.id] !== prev_level_1_id)
		{
				s_r += '<tr><th colspan="3" class="bg-dark text-white" '+sStyle+'>'+
								oRec[kv_level_1.id]+":"+oRec[kv_level_1.title]+
								'</th></tr>';
		}	
		if (oRec[kv_level_2.id] !== prev_level_2_id)
		{
			
			s_r += 	'<tr><th colspan="3" class="bg-secondary text-white" '+sStyle+'>'+
							oRec[kv_level_2.id]+":"+oRec[kv_level_2.title]+
							"</th></tr>";
			if (bBegin)
			{
				bBegin = false;
			}
		}
		prev_level_2_id = oRec[kv_level_2.id];
		prev_level_1_id 	= oRec[kv_level_1.id];
		let sHRef = 'href="'+list_link.prefix+oRec[kv_level_1.id]+'/'+oRec[kv_level_2.id]+'/'+oRec[list_key.col_1]+'"';
		s_r +='<tr>'+
					'<th scope="row">'+'<a '+sHRef+' class="link-underline-light">'+oRec[list_key.col_1]+'</a></td>'+
					'<td>'						+((oRec[list_key.col_2]) ? oRec[list_key.col_2]:'no info')		+'</td>'+
					'<td>'						+((oRec[list_key.col_3]) ? oRec[list_key.col_3]:'no more info')+'</td>'+
					'</tr>';
		if (i == list_tuple.length-1 )
		{
			s_r += '</tbody></table>';
			bBegin = true;
		}
		else if (i < list_tuple.length-1)
		{
			if (oRec[kv_level_2.id] !== list_tuple[i+1][kv_level_2.id])
			{
				bBegin = true;
			}
		}
	}
	s_r += '</tbody></table>';
	return s_r;
}
/* ------------------------------------------------------------------------------------------------ */

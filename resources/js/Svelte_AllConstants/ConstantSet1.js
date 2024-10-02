import { readable } from 'svelte/store'																				;
/* ------------------------------------------------------------------------------------------------ */
export const g_crud_operation = ['emenur1_5','emenur2_0','emenur2_1','emenur2_2','emenur2_3','emenur2_4','emenur2_5','emenur2_6'];
export const g_tag = {
DOCUMENT_ROOT 	: {weight:1,	parent:"ROOT",					sublevel:"",			child:"XX_XX",		css:"c_root"	} ,
DOCUMENT_TITLE 	: {weight:2,	parent:"DOCUMENT_ROOT",	sublevel:"",			child:"TT_00",		css:"c_tt_00"	} ,
TT_00						: {weight:3,	parent:"DOCUMENT_TITLE",sublevel:"",			child:"NO_NE",		css:"c_tt_00"	} ,
LV_00						: {weight:2,	parent:"DOCUMENT_ROOT",	sublevel:"LV_01",	child:"LN_01",		css:"c_lv_00"	} ,
LV_01						: {weight:2,	parent:"LV_00",					sublevel:"LV_02",	child:"LN_01",		css:"c_lv_01"	} ,
LV_02						: {weight:2,	parent:"LV_01",					sublevel:"LV_03",	child:"LN_01",		css:"c_lv_02"	} ,
LV_03						: {weight:2,	parent:"LV_02",					sublevel:"LV_04",	child:"LN_01",		css:"c_lv_03"	} ,
LV_04						: {weight:2,	parent:"LV_03",					sublevel:"LV_05",	child:"LN_01",		css:"c_lv_04"	} ,
LV_05						: {weight:2,	parent:"LV_04",					sublevel:"LV_06",	child:"LN_01",		css:"c_lv_05"	} ,
LN_01						: {weight:3,	parent:"LV_00",					sublevel:"",	    child:"4A_LL",		css:"c_ln_01"	} ,	
HX_01 					: {weight:4,	parent:"LN_01",					sublevel:"",			child:"NO_NE",		css:"c_hx_01"	} ,
TT_01 					: {weight:4,	parent:"LN_01",					sublevel:"",			child:"NO_NE",		css:"c_tt_01"	} ,
PR_01 					: {weight:4,	parent:"LN_01",					sublevel:"",			child:"NO_NE",		css:"c_pr_01"	} ,
IM_01 					: {weight:4,	parent:"LN_01",					sublevel:"",			child:"NO_NE",		css:"c_im_01"	} ,
}	;
export const g_map_directive_to_tag = readable({hx:'HX_01',tt:'TT_01',pr:'PR_01',im:'IM_01',cd:'TT_01',dm:'PR_01',})	;
export const g_text_leaf 						= readable(['HX_01','TT_01','PR_01'])							;
export const g_object_leaf 					= readable(['IM_01'])															;

export const g_lang_encap = readable({
th:{prefix:'[..:th]',suffix:'[th:.]'},
en:{prefix:'[..:en]',suffix:'[en:.]'},
ch:{prefix:'[..:ch]',suffix:'[ch:.]'},
});
export const g_tag_level		= ['LV_01','LV_02','LV_03','LV_04','LV_05'];
export const g_tag_leaf 		= ['HX_01','TT_01','PR_01','IM_01'];
export const g_3lang_encap 	= {
th:{prefix:'[..:th]',suffix:'[th:.]'},
en:{prefix:'[..:en]',suffix:'[en:.]'},
ch:{prefix:'[..:ch]',suffix:'[ch:.]'},
};

export const g_style_text = {
	c_lv_begin:"background:rgb(137, 207, 240,0.7);border-top-right-radius:33px;border:1px solid Platinum;",
	c_lv_end:"background:rgb(137, 207, 240,0.7);border-bottom-left-radius:33px;border:1px solid Platinum;height:33px;",
	HX_01:"font-weight:bold;color:white;background:#189AB4;",
	TT_01:"font-weight:600;color:black;background:#D4F1F4;",
	PR_01:"font-style:normal;",
	IM_01:"font-style:normal;",
	hide:"display:none;",
}
/* ------------------------------------------------------------------------------------------------ */

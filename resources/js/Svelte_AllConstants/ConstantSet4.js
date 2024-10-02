import { readable } from 'svelte/store'																				;
/* ------------------------------------------------------------------------------------------------ */
export const g_crud_operation = [
'emenur1_0','emenur1_1','emenur1_2','emenur1_3','emenur1_4', 	// name,	rule,				default,	title:3lang,	name
'emenur2_0','emenur2_1','emenur2_2','emenur2_3','emenur2_4', 	// level,	char,				text,			int,					decimal,
'emenur2_5','emenur2_6','emenur2_7','emenur2_8','emenur2_9' 	// date,	time,				t/f,			image,				more
];
export const g_tab 		= ['emenur1_0','emenur1_1','emenur1_2','emenur1_3','emenur1_4']; 	// field-name,rule_restriction,default,title,name
export const g_edit		= ['emenur1_0','emenur1_1','emenur1_2','emenur1_3','emenur1_4']; 	// edit above
export const g_insert	=	['emenur2_0','emenur2_1','emenur2_2','emenur2_3','emenur2_4', 	// +{},char,text,number,float
												 'emenur2_5','emenur2_6','emenur2_7','emenur2_8','emenur2_9']; 	// date,time,T/F,object,more
/* ------------------------------------------------------------------------------------------------ */
/*
export const g_menu2type = {
									emenur2_0		:{key:'level',						prefix:'xs:dummy_level',						suffix:'"'},
									emenur2_1		:{key:'char',							prefix:'xs:string',									suffix:'"'},
									emenur2_2		:{key:'string',						prefix:'xs:string',									suffix:'"'},
									emenur2_3		:{key:'number',						prefix:'xs:',												suffix:'"'},
									emenur2_4		:{key:'decimal',					prefix:'xs:',												suffix:'"'},
									emenur2_5		:{key:'date',							prefix:'xs:date',										suffix:'"'},
									emenur2_6		:{key:'time',							prefix:'xs:time',										suffix:'"'},
									emenur2_7		:{key:'boolean',					prefix:'xs:boolean',								suffix:'"'},
									emenur2_8		:{key:'image',						prefix:'xs:dummy_image',						suffix:'"'},
									emenur2_9		:{key:'more',							prefix:'xs:dummy_more',							suffix:'"'},
									
};
export const g_menu2restrictions = {
									restriction_1	:{key:'enumeration',		prefix:'<xs:enumeration value="',		suffix:'"/>'},
									restriction_2	:{key:'fractionDigits',	prefix:'<xs:fractionDigits value="',suffix:'"/>'},
									restriction_3	:{key:'length',					prefix:'<xs:length value="',				suffix:'"/>'},
									restriction_4	:{key:'maxExclusive',		prefix:'<xs:maxExclusive value="',	suffix:'"/>'},
									restriction_5	:{key:'maxInclusive',		prefix:'<xs:maxInclusive value="',	suffix:'"/>'},
									restriction_6	:{key:'maxLength',			prefix:'<xs:maxLength value="',			suffix:'"/>'},
									restriction_7	:{key:'minExclusive',		prefix:'<xs:minExclusive value="',	suffix:'"/>'},
									restriction_8	:{key:'minInclusive',		prefix:'<xs:minInclusive value="',	suffix:'"/>'},
									restriction_9	:{key:'minLength',			prefix:'<xs:minLength value="',			suffix:'"/>'},
									restriction_10:{key:'pattern',				prefix:'<xs:pattern value="',				suffix:'"/>'},
									restriction_11:{key:'totalDigits',		prefix:'<xs:totalDigits value="',		suffix:'"/>'},
									restriction_12:{key:'whiteSpace',			prefix:'<xs:whiteSpace value="',		suffix:'"/>'},
};
export const g_menu2occurs =	{
									occurs_1	: {key:'fixOccurs',					prefix:'',													suffix:''},
									occurs_2	:	{key:'minOccurs',					prefix:'minOccurs="',								suffix:'"'},
									occurs_3	:	{key:'maxOccurs',					prefix:'maxOccurs="',								suffix:'"'},		
									occurs_4	:	{key:'maxUnbounded',			prefix:'',													suffix:''},							
};
*/
/* ------------------------------------------------------------------------------------------------ */
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

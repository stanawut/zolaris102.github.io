<?php
/* ------------------------------------------------------------------------------------------------ */
function test()
{
	return "Aloha";
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_xxx_is_commit($p_commit)
{
	return intval($p_commit);
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_lis_get_feuri_category_pmn($p_user_id,$p_doc_id)
{
	/* feuri ex. http: //localhost:5173//storage/app/public/{uid=1}/venus/documents/{doc_id=35}/document/pmn/{1}_{35}.xml */
	return	"http://localhost:5173/".
					config('config_venus.path_storage')."/".
					$p_user_id."/".
					config('config_venus.path_before_cat_id')."/".
					$p_doc_id."/".
					config('config_venus.path_after_cat_id_document_pmn')."/".
					$p_user_id."_".$p_doc_id.".xml";
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_lis_get_feuri_library_pmn($p_user_id,$p_doc_id)
{
	/* feuri ex. http: //localhost:5173//storage/app/public/{uid=1}/venus/documents/{doc_id=35}/document/pmn/{1}_{35}.xml */
	return	"http://localhost:5173/".
					config('config_venus.path_storage')."/".
					$p_user_id."/".
					config('config_venus.path_before_lib_id')."/".
					$p_doc_id."/".
					config('config_venus.path_after_lib_id_document_pmn')."/".
					$p_user_id."_".$p_doc_id.".xml";
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_lis_get_feuri_form_pmn($p_user_id,$p_doc_id)
{
	/* feuri ex. http: //localhost:5173//storage/app/public/{uid=1}/venus/forms/{doc_id=35}/document/pmn/{1}_{35}.xml */
	return	"http://localhost:5173/".
					config('config_venus.path_storage')."/".
					$p_user_id."/".
					config('config_venus.path_before_frm_id')."/".
					$p_doc_id."/".
					config('config_venus.path_after_frm_id_document_pmn')."/".
					$p_user_id."_".$p_doc_id.".xml";
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_lis_get_feuri_userform_pmn($p_user_id,$p_doc_id)
{
	/* feuri ex. http: //localhost:5173//storage/app/public/{uid=1}/venus/forms/{doc_id=35}/document/pmn/{1}_{35}.xml */
	return	"http://localhost:5173/".
					config('config_venus.path_storage')."/".
					$p_user_id."/".
					config('config_venus.path_before_frm_id')."/".
					$p_doc_id."/".
					config('config_venus.path_after_frm_id_document_pmn')."/".
					$p_user_id."_".$p_doc_id."_frm.xml";
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_lis_get_feuri_formfilled_tmp($p_user_id,$form_id,$p_store_id,$p_fil_id)
{
	return "http://localhost:5173/".
					config('config_earth.path_storage')."/".
					$p_user_id."/".
					config('config_earth.path_before_store_id')."/".
					$p_store_id."/".
					config('config_earth.path_after_store_id')."/tmp/".
					$p_fil_id."/".
					$p_user_id."_".$p_fil_id.".xml";
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_lis_get_feuri_document_pmn($p_user_id,$p_doc_id)
{
	/* feuri ex. http: //localhost:5173//storage/app/public/{uid=1}/venus/documents/{doc_id=35}/document/pmn/{1}_{35}.xml */
	return	"http://localhost:5173/".
					config('config_venus.path_storage')."/".
					$p_user_id."/".
					config('config_venus.path_before_doc_id')."/".
					$p_doc_id."/".
					config('config_venus.path_after_doc_id_document_pmn')."/".
					$p_user_id."_".$p_doc_id.".xml";
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_lis_get_feuri_image_pmn($p_user_id,$p_doc_id,$p_tid)
{
	/* feuri ex. http: //localhost:5173//storage/app/public/{uid=1}/venus/documents/{doc_id=35}/document/pmn/{1}_{35}.xml */
	return	"http://localhost:5173/".
					config('config_venus.path_storage')."/".
					$p_user_id."/".
					config('config_venus.path_before_doc_id')."/".
					$p_doc_id."/".
					config('config_venus.path_after_doc_id_images_pmn')."/".
					"IM_01-".$p_tid.".jpg";
}
/* ------------------------------------------------------------------------------------------------ */
function lib1_lis_get_feuri_all_image_folders_tmp($p_user_id,$p_doc_id,$p_tid)
{
	return
					config('config_venus.path_storage')."/".
					$p_user_id."/".
					config('config_venus.path_before_doc_id')."/".
					$p_doc_id."/".
					config('config_venus.path_after_doc_id_images_tmp')."/";
}
/* ------------------------------------------------------------------------------------------------ */
//function fn_sxmlFileFormat($p_title, $p_last_id, $p_elements='')
function lib1_xxx_rs_archetype_xml($p_title, $p_last_id, $p_elements='')
{
	$initial_elements = 
	'<LN_01 id="4" parent="LV_00" weight="0">
			<HX_01 id="5" weight="0" parent="LN_01" sentinel="LV_HX_BEGIN">Editable LV_00 content</HX_01>
		</LN_01>
		<LN_01 id="6" parent="LV_00" weight="15">
			<HX_01 id="7" weight="15" parent="LN_01" sentinel="LV_HX_END"/>
		</LN_01>';
							
	$r_s = '<?xml version="1.0" encoding="utf-8" ?'.'> ' 									. "\n" .
					'<DOCUMENT_ROOT id="0" 		weight="1" 	parent="ROOT" lastid="' . 
					$p_last_id . '">' 	. "\n" . 
					'<DOCUMENT_TITLE id="1" weight="2" 	parent="DOCUMENT_ROOT">' 	. "\n" . 
					'<TT_00 id="2" 		weight="4" 	parent="DOCUMENT_TITLE">' 			. "" 	 . 
					$p_title				 																							. "\n" . 
					'</TT_00>' 																										. "\n" . 
					'</DOCUMENT_TITLE>'																						. "\n" .
					'<LV_00 id="3" 			weight="2" 	parent="DOCUMENT_ROOT">' 			.
					$initial_elements 										. 
					'</LV_00>' 														. "\n" .
					'</DOCUMENT_ROOT>' 										. "\n" 														;
		return $r_s																																		;
}
/* ------------------------------------------------------------------------------------------------ */

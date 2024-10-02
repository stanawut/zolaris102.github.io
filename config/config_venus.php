<?php
/*
  references by js
	_get_feuri_tmp(p_user_id,p_file_id,p_folder_id)
	{
		return 	'http://localhost:5173/storage/app/public/'+p_user_id+
						'/venus/documents/'+p_file_id+
						'/images/tmp/'+p_folder_id+
						'/tempimage.jpg';
	}
*/	
	return [
		/* -------------------------------------------------------------------------------------------- */
		'path_storage'										=> 'storage/app/public',
		/* -------------------------------------------------------------------------------------------- */
		'archetype_documents' 						=> 'venus/bin/archetype_documents',
		//user_id
		'path_before_doc_id' 							=> 'venus/documents',
		//id or file_id
		'path_after_doc_id_document_tmp' 	=> 'document/tmp',
		'path_after_doc_id_images_tmp' 		=> 'images/tmp',
		'path_after_doc_id_document_pmn' 	=> 'document/pmn',
		'path_after_doc_id_images_pmn' 		=> 'images/pmn',
		/* -------------------------------------------------------------------------------------------- */
		'archetype_categories' 						=> 'venus/bin/archetype_categories',
		//user_id
		'path_before_cat_id' 							=> 'venus/categories',
		//id or file_id
		'path_after_cat_id_document_tmp' 	=> 'document/tmp',
		'path_after_cat_id_images_tmp' 		=> 'images/tmp',
		'path_after_cat_id_document_pmn' 	=> 'document/pmn',
		'path_after_cat_id_images_pmn' 		=> 'images/pmn',
		/* ------------------------------------------ */
		'archetype_cat_default_feuri'			=> 'venus/bin/archetype_categories/cat101_default.xml',
		/* -------------------------------------------------------------------------------------------- */
		'archetype_forms' 								=> 'venus/bin/archetype_forms',
		//user_id
		'path_before_frm_id' 							=> 'venus/forms',
		//id or file_id
		'path_after_frm_id_document_tmp' 	=> 'document/tmp',
		'path_after_frm_id_images_tmp' 		=> 'images/tmp',
		'path_after_frm_id_document_pmn' 	=> 'document/pmn',
		'path_after_frm_id_images_pmn' 		=> 'images/pmn',
		/* ------------------------------------------ */
		'archetype_form_default_feuri'		=> 'venus/bin/archetype_forms/frm101_default.xml',
		/* -------------------------------------------------------------------------------------------- */
		'archetype_libraries' 						=> 'venus/bin/archetype_libraries',
		//user_id
		'path_before_lib_id' 							=> 'venus/libraries',
		//id or file_id
		'path_after_lib_id_document_tmp' 	=> 'document/tmp',
		'path_after_lib_id_images_tmp' 		=> 'images/tmp',
		'path_after_lib_id_document_pmn' 	=> 'document/pmn',
		'path_after_lib_id_images_pmn' 		=> 'images/pmn',
		/* ------------------------------------------ */
		'archetype_lib_default_feuri'			=> 'venus/bin/archetype_libraries/lib101_default.xml',
		/* -------------------------------------------------------------------------------------------- */
		'encap_lang'											=> 
																				array (		
																					'th'=>array('prefix'=>'[..:th]','suffix'=>'[th:.]'),
																					'en'=>array('prefix'=>'[..:en]','suffix'=>'[en:.]'),
																					'ch'=>array('prefix'=>'[..:ch]','suffix'=>'[ch:.]'),
																					
																				),
	];

?>
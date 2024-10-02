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
		// path after user_id
		'filled_collections' 							=> 'earth/filled_collections',
		'path_before_store_id'						=> 'earth/filled_collections',
		// store_id
		'path_after_store_id_pmn'					=> 'pmn',
		'path_after_store_id_tmp'					=> 'tmp',
		/* -------------------------------------------------------------------------------------------- */
	];

?>
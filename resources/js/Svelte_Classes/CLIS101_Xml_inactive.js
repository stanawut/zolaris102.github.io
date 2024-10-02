import { writable } 																	from 'svelte/store';
import CLIS101																				from './CLIS101.js';
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as ALib1 																		from '../AllShareLibs/lib1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet1.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CLIS101_Xml_inactive extends CLIS101
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor()
	{
		super();
	}
	/* ---------------------------------------------------------------------------------------------- */
	_preview_permimage(pa_fname)
	{
		let r_layout 	= '';
		let sLi 			= '';
		let feuri 		= '';
		for (let i=0; i < pa_fname.length & pa_fname[i] !== ''; i++)
		{
			feuri = this._get_feuri_pmn_image(this._user_id,this._file_id,pa_fname[i]);
			sLi += '<li style="list-style-type:none;" >'+
						'<img src="'+feuri+'" class="img-thumbnail" style="padding:0.1em" alt="'+pa_fname[i]+'">'+
						'</li>';
		}
		r_layout =	'<ul class="image_upload_preview" style="padding:0px">'+
								sLi+
								'</ul>';
		return r_layout;
	}	
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */

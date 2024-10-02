import { writable } 																	from 'svelte/store';
import CLIS101_Xml																		from './CLIS101_Xml.js';
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as ALib1 																		from '../AllShareLibs/lib1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet1.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CLIS101_XmlDoc extends CLIS101_Xml
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor()
	{
		super();
	}
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */

import { writable } 																	from 'svelte/store';
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as ALib1 																		from '../AllShareLibs/lib1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet1.js';
import CXSD100																				from './CXSD100.js';
/* ------------------------------------------------------------------------------------------------ */
export default class CXSD101
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor(p_oXmlInstance)
	{
		this._active							= true															;
		this._doc_type						= ''																; // wip_wip:for apb doc,cat,library
		this._oFrm 								=	p_oXmlInstance										;
		this._ignore_tag					= ['DOCUMENT_TITLE','TT_00','LN_01'];
		this._level_sentinel			= ['LV_HX_BEGIN','LV_HX_END']				;
		this._xsd_id_prefix				= this._oFrm._user_id + '_' + this._oFrm._file_id + '_id_';
	}
	/* ---------------------------------------------------------------------------------------------- */
	get_xsdLineItem(p_oFrm,p_xem)
	{
		let r_a = {};
		if (p_xem.hasAttribute('sentinel'))
		{
			// simple type
			if (!this._level_sentinel.includes(p_xem.getAttribute('sentinel')))
			{
				let sXsdIdAttr							= 'id="'+this._xsd_id_prefix + p_xem.getAttribute('id')+'" ';
				let sXsdNameAttr						= 'name="'+p_xem.innerHTML+'" ';
				let sXsdTypeAttr 						= CXSD100.get_xsdTypeString(p_oFrm,p_xem);
				let sXsdBaseAttr 						= CXSD100.get_xsdBaseString(p_oFrm,p_xem);
				let sXsdOccursAttr 					= CXSD100.get_xsdOccursString(p_oFrm,p_xem);
				let sXsdRestrictionLineItem = CXSD100.get_xsdRestrictionLineItem(p_oFrm,p_xem);
				let sXsdBasicLineItem				= CXSD100.get_basicElement(sXsdNameAttr,sXsdTypeAttr,sXsdBaseAttr,sXsdIdAttr,sXsdOccursAttr,sXsdRestrictionLineItem);
				return sXsdBasicLineItem;
			}
			else
			{
				switch (p_xem.getAttribute('sentinel'))
				{
					case 'LV_HX_BEGIN'	: 
																let sXsdIdAttr								= 'id="'+this._xsd_id_prefix + p_xem.getAttribute('id')+'" ';
																let sXsdNameAttr							= 'name="'+p_xem.innerHTML+'" ';
																let sXsdTypeAttr 							= CXSD100.get_xsdTypeString(p_oFrm,p_xem);
																let sXsdOccursAttr 						= CXSD100.get_xsdOccursString(p_oFrm,p_xem);
																let sXsdComplexBeginLineItem 	= CXSD100.get_complexTypeBegin(sXsdNameAttr,sXsdTypeAttr,sXsdIdAttr,sXsdOccursAttr);
																return sXsdComplexBeginLineItem;
																break;
					case 'LV_HX_END'		:
																let sXsdComplexEndLineItem 	= CXSD100.get_complexTypeEnd();	
																return sXsdComplexEndLineItem;
																break;
				}
			}
		}
		return '';
	}
	/* ---------------------------------------------------------------------------------------------- */
	debug()
	{
		var aXem 	= [];
		var tid	 	= 0;
		var xem 	= null;
		var r_data = '';
		for (let i = 0,j = 0; i < this._oFrm._aleaf.length; i++)
		{
			tid = this._oFrm._aleaf[i]['tid'];
			xem = this._oFrm._xmldoc.getElementById(tid);
			if (!this._ignore_tag.includes(xem.tagName)) // ignore DOCUMENT_TITLE,TT_00,LN_01
			{
				r_data += this.get_xsdLineItem(this._oFrm,xem);
			}
		}
		var xsdFile = CXSD100.getXsdFileFormat('DOCUMENTATION',r_data);
		console.log('CXSD:construct user_id:'+this._oFrm._user_id+', file_id:'+this._oFrm._file_id);
		//console.log(this._oFrm);
		console.log(this._oFrm._aleaf);
		console.log(xsdFile);
	}
}
/* ------------------------------------------------------------------------------------------------ */


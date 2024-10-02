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
		this._xsd_id_prefix				= this._oFrm._user_id + '_' + this._oFrm._file_id + '_id_';
	}
	/* ---------------------------------------------------------------------------------------------- */
	parse(p_xml)
	{
		return (new window.DOMParser()).parseFromString(p_xml,"text/xml");
		//this._htmdoc = document.getElementById(this._hemroot_id);
	}
	/* ---------------------------------------------------------------------------------------------- */
	debug()
	{
		var sXsdFile = CXSD100.getStringXsdFile(this._oFrm,this._xsd_id_prefix);
		console.log(sXsdFile);
		let domXsd 	= this.parse(sXsdFile);
		let domRoot = domXsd.getElementsByTagName('xs:element')[0]; // <xs:element name="root",id="root"
		let sXmlUserFormFile = CXSD100.getStringXmlUserFromFile(domRoot);
		console.log(sXmlUserFormFile);
		
		//let r_serXsd	= new XMLSerializer().serializeToString(domXsd);
		//console.log(r_serXsd);
		//let r_serXml	= new XMLSerializer().serializeToString(this._xmldoc);
		
		return {'xsd':sXsdFile,'frm':sXmlUserFormFile};
	}
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------ */

import { writable } 																	from 'svelte/store';
import CLIS101_Xml																		from './CLIS101_Xml.js';
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as AXsd1 																		from '../AllShareLibs/xsd1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet4.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CLIS101_XmlFil extends CLIS101_Xml
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor()
	{
		super();
		console.log('CLIS101_XmlFil:constructor'+"\n");
	}
	/* ---------------------------------------------------------------------------------------------- */
	_cleanJson(p_jsonRaw)
	{
		let r_s = '';
		r_s = "{"+p_jsonRaw.replace(',}','}')+"}";
		r_s = r_s.replace('undefined','');
		return r_s;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_toJsonString(p_eXml)
	{
		let id_eXml = p_eXml.getAttribute('id');
		let xem 		= this._xmldoc.getElementById(id_eXml);
		
		if (xem.hasAttribute('sentinel'))
		{
			console.log(xem.getAttribute('sentinel'));
			switch(xem.getAttribute('sentinel'))
			{
				case 'LV_HX_BEGIN' 	: //console.log(p_eXml.getValue());
															let sKV = xem.innerHTML;
															let aKV = sKV.split(' | ');
															aKV[0] = '"'+aKV[0]+'"';
															aKV[1] = '"'+aKV[1]+'"';
															return aKV[0]+':{';
				case 'LV_HX_END'		:
															return '}';
			}	
		}
		else
		{
															let sKV = xem.innerHTML;
															let aKV = sKV.split(' | ');
															aKV[0] = '"'+aKV[0]+'"';
															aKV[1] = '"'+aKV[1]+'"';
															return aKV[0]+':'+aKV[1]+',';
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	traverseXml2Json(p_htmDoc,p_eXml, idOfContainerDomElement='no assign',p_aLeafData) 
	{
		var self = this;
		var rs = '';
		if (p_eXml.length === 0) 
			throw new Error('MSG: no dom element id: "' + idOfContainerDomElement + '"'); 
		let a_exmlChild	= p_eXml.children;
		/* =========================================================================== */
		// fakeparent use in cat insert update
		//if (!['PR_01','IM_01'].includes(p_eXml.firstElementChild.nodeName))
		//{
			//p_aLeafData.push({tid:p_eXml.firstElementChild.getAttribute('id'),tagname:p_eXml.firstElementChild.nodeName,sentinel:p_eXml.firstElementChild.getAttribute('sentinel')});
		//}
		/* =========================================================================== */
		if (a_exmlChild.length > 0)
		{	
			for (let i = 0; i < a_exmlChild.length; i++)
			{
				
				let exmlChild = a_exmlChild[i];
				(function(I,eXml) {	
					if (eXml.childElementCount > 0) // DOCUMENT_TITLE,LV_0X,LN_01
					{
						//self.append_hem_none_leaf(p_htmDoc,eXml);
						self.traverseXml2Json(p_htmDoc,eXml,'0',p_aLeafData);
					}																					
					else																
					{	
						if (eXml.hasAttribute('bindto')) console.log(eXml); // wip_wip
						if (eXml.hasAttribute('doc_id')) console.log(eXml); // wip_wip
						switch (eXml.tagName)
						{
							case 'HX_01'	:
							//case 'TT_00'	:
							//case 'TT_01'	:
							//case 'PR_01'	:
							//case 'IM_01'	:
								//let dummy = self.append_hem_leaf(p_htmDoc,eXml);
								console.log(eXml);
								self.rs += self._toJsonString(eXml);
								break;
						}
					}																
				})(i,exmlChild);
			}
		}
		//self.rs = self.rs.replace(',}','}');
		return self.rs;
	}
	/* ---------------------------------------------------------------------------------------------- */	/* ---------------------------------------------------------------------------------------------- */
	jsonCreate()
	{
		console.log('CLIS_XmlFil:jsonCreate');
		console.log(this._xmldoc);
		let rs = this.traverseXml2Json(null,this._xmldoc,'no assign',null);
		rs = this._cleanJson(rs);
		return rs;
	}
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */

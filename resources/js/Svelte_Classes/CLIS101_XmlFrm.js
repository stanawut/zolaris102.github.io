import { writable } 																	from 'svelte/store';
import CLIS101_Xml																		from './CLIS101_Xml.js';
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as AXsd1 																		from '../AllShareLibs/xsd1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet4.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CLIS101_XmlFrm extends CLIS101_Xml
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor()
	{
		super();
		/* -------------------------------------------------------------------------------------------- */
		this.mapEmenur1_Meaning	= 
		{
			emenur1_0				:'field',
			emenur1_1				:'restriction',
			emenur1_2				:'default',
			emenur1_3				:'title',
			emenur1_4				:'occurs',
		};
		/* -------------------------------------------------------------------------------------------- */
		this.mapEmenur2_Meaning = 
		{
			emenur2_0				:'level',
			emenur2_1				:'char',
			emenur2_2				:'string',
			emenur2_3				:'number',
			emenur2_4				:'decimal',
			emenur2_5				:'date',
			emenur2_6				:'time',
			emenur2_7				:'boolean',
			emenur2_8				:'image',
			emenur2_9				:'more',
		};
		/* -------------------------------------------------------------------------------------------- */
		this.mapRestriction_Meaning = 
		{
			restriction_1		:'enumeration',
			restriction_2		:'fractionDigits',
			restriction_3		:'length',
			restriction_4		:'maxExclusive',
			restriction_5		:'maxInclusive',
			restriction_6		:'maxLength',
			restriction_7		:'minExclusive',
			restriction_8		:'minInclusive',
			restriction_9		:'minLength',
			restriction_10	:'pattern',
			restriction_11	:'totalDigits',
			restriction_12	:'whiteSpace',		
		};
		/* -------------------------------------------------------------------------------------------- */
		this.mapDefault_Meaning = 
		{
			default_1				:'defaultNo',
			default_2				:'bySystem',
			default_3				:'userFix',
			default_4				:'userSequence',
		};
		/* -------------------------------------------------------------------------------------------- */
		this.mapOccurs_Meaning = 
		{
			occurs_1				:'fixOccurs',
			occurs_2				:'minOccurs',
			occurs_3				:'maxOccurs',
			occurs_4				:'maxUnbounded',
		};
		/* -------------------------------------------------------------------------------------------- */
		this.mapStringPropAttributes = 
		{
			'restriction'		:'{"restriction_1":"a","restriction_2":"","restriction_3":"","restriction_4":"c","restriction_5":"","restriction_6":"b","restriction_7":"","restriction_8":"","restriction_9":"","restriction_10":"","restriction_11":"","restriction_12":""}',		
			'default'				:'{"default_1":"","default_2":"","default_3":"","default_4":""}',
			'occurs'				:'{"occurs_1":"","occurs_2":"","occurs_3":"","occurs_4":""}',
		};
	}
	/* ---------------------------------------------------------------------------------------------- */
	get_restriction(p_key) { return this.mapRestriction_Meaning[p_key]; }
	get_type(p_key) { return this.mapEmenur2_Meaning[p_key]; }
	get_occurs(p_key) { return this.mapOccurs_Meaning[p_key]; }
	get_default(p_key) { return this.mapDefault_Meaning[p_key]; }
	/* ---------------------------------------------------------------------------------------------- */
	get_prop_for_tid(p_tid,p_emenur1_C)
	{
		let ra_data		= {type:'',tag:'',th:'',en:'',ch:'',xx:'',prop:{title:''}};
		let atext 		= {th:'',en:'',ch:'',xx:''}; 
		let sTmp			= '';
		let tmp_akv		= null;
		let xem 			= this._xmldoc.getElementById(p_tid);
		let sKey			= this.mapEmenur1_Meaning[p_emenur1_C];
		switch (sKey)
		{
			case 'field' 				:	ra_data['type']	= 'uni';
														break;
			case 'title' 				: 
														let a_sTmp 			= null;
														if (xem.hasAttribute('xsd_title'))	sTmp = xem.getAttribute('xsd_title');
														else																sTmp = this._encap_lang_text({th:'',en:'',ch:'',xx:''});
														a_sTmp 					= sTmp.split(",");
														ra_data['type']	= 'mul';
														ra_data['tag']	= 'HX_01';
														ra_data['th'] 	= this._decap_lang_encap_text(a_sTmp[0]);
														ra_data['en'] 	= this._decap_lang_encap_text(a_sTmp[1]);
														ra_data['ch'] 	= this._decap_lang_encap_text(a_sTmp[2]);
														break;
														
			case 'restriction' 	:
			case 'default' 			:
			case 'occurs' 			:
														sTmp						= this.mapStringPropAttributes[sKey];
														let sAttr				= 'xsd_'+sKey;
														if (xem.hasAttribute(sAttr))
															sTmp					= xem.getAttribute(sAttr);
														tmp_akv					= JSON.parse(sTmp);
														ra_data['xx']		= tmp_akv;
														break;
		}
		return ra_data;
	}
	/* ---------------------------------------------------------------------------------------------- */
	get_default_data_for_new_tid(p_emenur2_C,p_nRequiredInput) // Overwrite CLIS101_Xml
	{
		let ra_data		= {type:'',tag:'',th:'',en:'',ch:'',xx:''};
		let map_tag		= {emenur2_0:'LV_0X',emenur2_1:'HX_01',emenur2_2:'HX_01',emenur2_3:'HX_01',emenur2_4:'HX_01',
										 emenur2_5:'HX_01',emenur2_6:'HX_01',emenur2_7:'HX_01',emenur2_8:'HX_01',emenur2_9:'HX_01'
										};
		switch (this.mapEmenur2_Meaning[p_emenur2_C])
		{
			case 'level'		: // {+}
			case 'char'			: // +hx a,b,c
			case 'string'		: // +hx text
			case 'number'		: // +hx 1,2,3
			case 'decimal'	: // +hx 1.23
			case 'date'			: // +hx date
			case 'time'			: // +hx time
			case 'boolean'	: // +hx T/F
			
													//if (p_nRequiredInput == 1) 			ra_data['type'] = 'uni';
													//else if (p_nRequiredInput == 3)	ra_data['type'] = 'mul';
													ra_data['type'] = 'uni';
													ra_data['tag']	= map_tag[p_emenur2_C];
													ra_data['th'] 	= '';
													ra_data['en'] 	= '';
													ra_data['ch'] 	= '';
													ra_data['xx']		= '';
													break;
			case 'image'		: // +image filepond
													ra_data['type'] = 'img';
													ra_data['tag']	= 'IMG';
													break;
			case 'more'			: // more..
													ra_data['type'] = 'xxx';
													ra_data['tag']	= 'xxx';
													break;
			
		}
		return ra_data;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_update_prop(p_tid,pxsd_sType)
	{
		let xem = this._xmldoc.getElementById(p_tid);
		xem.setAttribute('xsd_type',pxsd_sType);
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_update_prop(p_emenur1_C,p_tid,pa_text)
	{
		let sKey 				= 'xsd_'+this.mapEmenur1_Meaning[p_emenur1_C];
		let xem 				= this._xmldoc.getElementById(p_tid);
		xem.setAttribute(sKey,pa_text['textcontent']);
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_insert_input_text(p_emenur2_C,p_tid,pa_text)
	{
		this._insert_xem(p_tid,pa_text);
		let lastid 	= this._xmldoc.getElementById(0).getAttribute('lastid');
		this._update_prop(lastid,this.mapEmenur2_Meaning[p_emenur2_C]);
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_insert_level_text(p_emenur2_C,p_tid,pa_text)
	{
		this._insert_xem(p_tid,pa_text);
		let lastid 	= this._xmldoc.getElementById(0).getAttribute('lastid');
		this._update_prop(lastid-2,this.mapEmenur2_Meaning[p_emenur2_C]);
	}	
}
/* ------------------------------------------------------------------------------------------------ */

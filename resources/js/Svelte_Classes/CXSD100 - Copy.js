import { writable } 																	from 'svelte/store';
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as ALib1 																		from '../AllShareLibs/lib1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet1.js';
//import { g_menu2restrictions,g_menu2occurs	} 				from '../Svelte_AllConstants/ConstantSet4.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CXSD100
{
	/* ---------------------------------------------------------------------------------------------- */
	//constructor()
	//{
		static map_xemType2Xsd = 
		{
			'level'						: {xsd:'xs:_level',					prefix:'',suffix:''},
			'char'						: {xsd:'xs:string',					prefix:'',suffix:''},
			'string'					: {xsd:'xs:string',					prefix:'',suffix:''},
			'number'					: {xsd:'xs:integer',				prefix:'',suffix:''},
			'decimal'					: {xsd:'xs:decimal',				prefix:'',suffix:''},
			'date'						: {xsd:'xs:date',						prefix:'',suffix:''},
			'time'						: {xsd:'xs:time',						prefix:'',suffix:''},
			'boolean'					: {xsd:'xs:boolean',				prefix:'',suffix:''},
			'image'						: {xsd:'xs:_image',					prefix:'',suffix:''},
			'more'						: {xsd:'xs:_more',					prefix:'',suffix:''},
		};
		static map_xemAttrRestriction2Xsd =
		{
			'enumeration' 		: {xsd:'xs:enumeration',		prefix:'',suffix:''},
			'fractionDigits' 	: {xsd:'xs:fractionDigits',	prefix:'',suffix:''},
			'length' 					: {xsd:'xs:length',					prefix:'',suffix:''},
			'maxExclusive' 		: {xsd:'xs:maxExclusive',		prefix:'',suffix:''},
			'maxInclusive' 		: {xsd:'xs:maxInclusive',		prefix:'',suffix:''},
			'maxLength' 			: {xsd:'xs:maxLength',			prefix:'',suffix:''},
			'minExclusive' 		: {xsd:'xs:minExclusive',		prefix:'',suffix:''},
			'minInclusive' 		: {xsd:'xs:minInclusive',		prefix:'',suffix:''},
			'minLength' 			: {xsd:'xs:minLength',			prefix:'',suffix:''},
			'pattern' 				: {xsd:'xs:pattern',				prefix:'',suffix:''},
			'totalDigits' 		: {xsd:'xs:totalDigits',		prefix:'',suffix:''},
			'whiteSpace' 			: {xsd:'xs:whiteSpace',			prefix:'',suffix:''},
		};
		static map_xemAttrOccurs2Xsd = 
		{
			'fixOccurs'				:	{xsd:'_fixOccurs',				prefix:'',suffix:''},
			'minOccurs'				:	{xsd:'minOccurs',					prefix:'',suffix:''},
			'maxOccurs'				:	{xsd:'maxOccurs',					prefix:'',suffix:''},
			'maxUnbounded'		:	{xsd:'_maxUnbounded',			prefix:'',suffix:''},
		};
		static map_xemAttrDefault2Xsd =
		{
			'defaultNo'				:	{xsd:'',		prefix:'',suffix:''},
			'bySystem'				:	{xsd:'',		prefix:'',suffix:''},
			'userFix'					:	{xsd:'',		prefix:'',suffix:''},
			'userSequence'		:	{xsd:'',		prefix:'',suffix:''},
		};
	//}
	/* ---------------------------------------------------------------------------------------------- */
	static get_xsdTypeString(p_oFrm,p_xem)
	{
		if (p_xem.hasAttribute('xsd_type'))
		{
			let xsdAttr = CXSD100.map_xemType2Xsd[p_xem.getAttribute('xsd_type')]['xsd'];
			return 'type="'+xsdAttr+'" ';
		}
		return '';
	}
	/* ---------------------------------------------------------------------------------------------- */
	static get_xsdBaseString(p_oFrm,p_xem)
	{
		if (p_xem.hasAttribute('xsd_type'))
		{
			let xsdAttr = CXSD100.map_xemType2Xsd[p_xem.getAttribute('xsd_type')]['xsd'];
			return 'base="'+xsdAttr+'" ';
		}
		return '';
	}
	/* ---------------------------------------------------------------------------------------------- */
	static get_xsdOccursString(p_oFrm,p_xem)
	{
		var r_s = '';
		if (p_xem.hasAttribute('xsd_occurs'))
		{
			let aKV 							= JSON.parse(p_xem.getAttribute('xsd_occurs'));
			Object.keys(aKV).forEach(function(key,index) {
				if (aKV[key] !== '' && aKV[key] !== null)
				{
					let xsdAttr = CXSD100.map_xemAttrOccurs2Xsd[p_oFrm.get_occurs(key)]['xsd'];
					r_s += xsdAttr+'="'+aKV[key]+'" ';
				}
			});
		}
		return r_s;
	}
	/* ---------------------------------------------------------------------------------------------- */
	static get_xsdRestrictionLineItem(p_oFrm,p_xem)
	{
		var r_s = '';
		if (p_xem.hasAttribute('xsd_restriction'))
		{
			/*
			let aKV 							= JSON.parse(p_xem.getAttribute('xsd_restriction'));
			const entries 				= Object.entries(aKV) ;
			const nonEmptyOrNull 	= entries.filter(([key,val]) => val !== '' && val !== null);
			const output 					= Object.fromEntries(nonEmptyOrNull);
			*/

			let aKV 							= JSON.parse(p_xem.getAttribute('xsd_restriction'));
			Object.keys(aKV).forEach(function(key,index) {
				if (aKV[key] !== '' && aKV[key] !== null)
				{
					// key={restriction_1,2,3....
					let xsdTag = CXSD100.map_xemAttrRestriction2Xsd[p_oFrm.get_restriction(key)]['xsd'];
					switch (xsdTag)
					{
						case 'xs:enumeration' :
																		let aEnumV = aKV[key].split(",");
																		for (let i = 0; i < aEnumV.length; i++)
																		{
																			r_s += '<'+xsdTag+' value="'+aEnumV[i]+'"/>'+"\n";
																		}
																		break;
						default 							:	r_s += '<'+xsdTag+' value="'+aKV[key]+'"/>'+"\n";
																		break;
					}
				}
			});
		}
		return r_s;
	}
	/* ---------------------------------------------------------------------------------------------- */
	static get_basicElement(p_name,p_type,p_base,p_id,p_occurs,p_restriction)
	{
		let sAttr = p_name+" "+p_type+" "+p_id+" "+p_occurs;
		//let r_s		= '<xs:element '+sAttr+'/>'+"\n"+p_restriction;
		let r_s = '';
		if (p_restriction !== '' && p_restriction !== null)
		{
			r_s = '<xs:element '+p_name+'>'+"\n"+
						'<xs:simpleType>'+"\n"+
						'<xs:restriction '+p_base+'>'+"\n"+
						p_restriction+
						'</xs:restriction>'+"\n"+
						'</xs:simpleType>'+"\n"+
						'</xs:element>'+"\n";
		}
		else
		{
			r_s		= '<xs:element '+sAttr+'/>'+"\n";
		}
		return r_s;
	}
	/* ---------------------------------------------------------------------------------------------- */
	static get_complexTypeBegin(p_name,p_type,p_id,p_occurs)
	{
		let sAttr = p_name+" "+p_id+" "+p_occurs;
		let r_s 	= '<xs:element '+sAttr+'>'+"\n"+'<xs:complexType>'+"\n"+'<xs:sequence>'+"\n";
		return r_s;
	}
	/* ---------------------------------------------------------------------------------------------- */
	static get_complexTypeEnd()
	{
		return '</xs:sequence>'+"\n"+'</xs:complexType>'+"\n"+'</xs:element>'+"\n";
	}
	/* ---------------------------------------------------------------------------------------------- */
	static get_aXsdLineItem(p_aXem)
	{
		var r_s = '';
		return r_s;
	}
	/* ---------------------------------------------------------------------------------------------- */
	// $p_aXml[$p_nXml-1][1],fn_sGetMapDefinedTagToXsd($sHXId,$sHX,$sIM,$sTT,$sPR,'complexType_begin/end,dom_fields_tran')
	static getXsdFileFormat(p_sDocumentation,p_sData)
	{
		 return '<?xml version="1.0"?>'																		+ "\n" +		
						'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"'	+		
						' targetNamespace="https://www.w3schools.com"'						+		
						' xmlns="https://www.w3schools.com"'											+		
						' elementFormDefault="qualified">'												+ "\n" +
						
						'<xs:annotation>'																					+ "\n" +		
						'<xs:appinfo>W3Schools Note</xs:appinfo>'									+ "\n" +		
						'<xs:documentation xml:lang="en">'												+ // id="dom_fields_tran" not allowed 		
						p_sDocumentation																					+ 		
						'</xs:documentation>'																			+ "\n" +		
						'</xs:annotation>'																				+ "\n" +
						"\n"																											+																																				
						'<xs:element name="root">' 																+ "\n" +																					
						'<xs:complexType>'																				+ "\n" +																					
						'<xs:sequence>'																						+ "\n" +																					
						"\n"																											+				
						p_sData																										+
						'</xs:sequence>'																					+ "\n" +																							
						'</xs:complexType>'																				+ "\n" +	 																					
						'</xs:element>'																						+ "\n" +																						
						'</xs:schema>'																						+ "\n"	;																					
	}
}
/* ------------------------------------------------------------------------------------------------ */


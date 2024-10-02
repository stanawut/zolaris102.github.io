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
			'defaultNo'				:	{xsd:'default',		prefix:'',suffix:''},
			'bySystem'				:	{xsd:'default',		prefix:'',suffix:''},
			'userFix'					:	{xsd:'default',		prefix:'',suffix:''},
			'userSequence'		:	{xsd:'default',		prefix:'',suffix:''},
		};
		static _ignore_tag					= ['DOCUMENT_TITLE','TT_00','LN_01'];
		static _level_sentinel			= ['LV_HX_BEGIN','LV_HX_END']				;
		
		
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
	static get_xsdDefaultString(p_oFrm,p_xem)
	{
		var r_s = '';
		if (p_xem.hasAttribute('xsd_default'))
		{
			let aKV 							= JSON.parse(p_xem.getAttribute('xsd_default'));
			Object.keys(aKV).forEach(function(key,index) {
				if (aKV[key] !== '' && aKV[key] !== null)
				{
					let xsdAttr = CXSD100.map_xemAttrDefault2Xsd[p_oFrm.get_default(key)]['xsd'];
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
	static get_basicElement(p_name,p_type,p_base,p_id,p_occurs,p_default,p_restriction)
	{
		let sAttr = p_name+" "+p_type+" "+p_id+" "+p_occurs+" "+p_default;
		//let r_s		= '<xs:element '+sAttr+'/>'+"\n"+p_restriction;
		let r_s = '';
		if (p_restriction !== '' && p_restriction !== null)
		{
			r_s = '<xs:element '+p_name+' '+p_id+' '+p_default+'>'+"\n"+
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
	static get_xsdLineItem(p_oFrm,p_xem,p_xsd_id_prefix)
	{
		let r_a = {};
		if (p_xem.hasAttribute('sentinel'))
		{
			// simple type
			if (!CXSD100._level_sentinel.includes(p_xem.getAttribute('sentinel')))
			{
				let sXsdIdAttr							= 'id="'+p_xsd_id_prefix+p_xem.getAttribute('id')+'" ';
				let sXsdNameAttr						= 'name="'+p_xem.innerHTML+'" ';
				let sXsdTypeAttr 						= CXSD100.get_xsdTypeString(p_oFrm,p_xem);
				let sXsdBaseAttr 						= CXSD100.get_xsdBaseString(p_oFrm,p_xem);
				let sXsdOccursAttr 					= CXSD100.get_xsdOccursString(p_oFrm,p_xem);
				let sXsdDefaultAttr					= CXSD100.get_xsdDefaultString(p_oFrm,p_xem);
				let sXsdRestrictionLineItem = CXSD100.get_xsdRestrictionLineItem(p_oFrm,p_xem);
				let sXsdBasicLineItem				= CXSD100.get_basicElement(sXsdNameAttr,sXsdTypeAttr,sXsdBaseAttr,sXsdIdAttr,sXsdOccursAttr,sXsdDefaultAttr,sXsdRestrictionLineItem);
				return sXsdBasicLineItem;
			}
			else
			{
				switch (p_xem.getAttribute('sentinel'))
				{
					case 'LV_HX_BEGIN'	: 
																let sXsdIdAttr								= 'id="'+p_xsd_id_prefix+p_xem.getAttribute('id')+'" ';
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
						
						'<xs:element name="XSD_ROOT" id="XSD_ROOT">' 							+ "\n" +																					
						'<xs:complexType>'																				+ "\n" +																					
						'<xs:sequence>'																						+ "\n" +																					
						"\n"																											+	
						
						p_sData																										+
						
						'</xs:sequence>'																					+ "\n" +																							
						'</xs:complexType>'																				+ "\n" +	 																					
						'</xs:element>'																						+ "\n" +																						
						'</xs:schema>'																						+ "\n"	;			
						
						/*
						p_sData																										+ "\n" +
						'</xs:schema>';
						*/
	}
	/* ---------------------------------------------------------------------------------------------- */
	static getStringXsdFile(p_oFrm,p_xsd_id_prefix)
	{
		var r_xsdStringFile = '';
		var aXem 						= [];
		var tid	 						= 0;
		var xem 						= null;
		var r_data 					= '';
		
		for (let i = 0,j = 0; i < p_oFrm._aleaf.length; i++)
		{
			tid = p_oFrm._aleaf[i]['tid'];
			xem = p_oFrm._xmldoc.getElementById(tid);
			if (!CXSD100._ignore_tag.includes(xem.tagName)) // ignore DOCUMENT_TITLE,TT_00,LN_01
			{
				r_data += CXSD100.get_xsdLineItem(p_oFrm,xem,p_xsd_id_prefix);
			}
		}
		r_xsdStringFile = CXSD100.getXsdFileFormat('DOCUMENTATION',r_data);
		console.log('CXSD:construct user_id:'+p_oFrm._user_id+', file_id:'+p_oFrm._file_id);
		//console.log(p_oFrm);
		console.log(p_oFrm._aleaf);
		//console.log(xsdFile);
		return r_xsdStringFile;
		//return r_data;
	}
	/* ---------------------------------------------------------------------------------------------- */
	static getBasicAttribute(p_eXml,p_status)
	{
		let rA = {};
		rA['status']				= p_status;
		if (p_status == 'END') 
		{	
			if (p_eXml.hasAttribute('id'))
				p_eXml.setAttribute('id','_'+p_eXml.getAttribute('id'));
		}
		
		rA['name'] 					= p_eXml.hasAttribute('name') 			? p_eXml.getAttribute('name') 			: null;
		rA['id'] 						= p_eXml.hasAttribute('id') 				? p_eXml.getAttribute('id') 				: null;
		rA['type'] 					= p_eXml.hasAttribute('type') 			? p_eXml.getAttribute('type') 			: null;
		rA['base'] 					= p_eXml.hasAttribute('base') 			? p_eXml.getAttribute('base') 			: null;
		rA['default'] 			= p_eXml.hasAttribute('default') 		? p_eXml.getAttribute('default') 		: null;
		rA['minOccurs'] 		= p_eXml.hasAttribute('minOccurs') 	? p_eXml.getAttribute('minOccurs') 	: null;
		rA['maxOccurs'] 		= p_eXml.hasAttribute('maxOccurs') 	? p_eXml.getAttribute('maxOccurs') 	: null;
		rA['_type']					= '';
		rA['_restriction'] 	= '';
		return rA;		
	}
	/* ---------------------------------------------------------------------------------------------- */
	static getXsdArray(p_eXml,level=0,info='',rA=[])
	{
		//var self = this;
		if (p_eXml.length === 0)
		{
			console.log('node 0');
			return;
		}
		// --------------------------------------------------------------------------------------------
		if (p_eXml.tagName == 'xs:element')
		{
			level = level + 1;
			//console.log('++++++++++ '+p_eXml.firstElementChild.nodeName+' <<<<<<<<<< '+p_eXml.nodeName);
			//console.log('++++++++++ '+p_eXml.nodeName+"\n");
			//console.log('+++++++++++++++++++++ '+p_eXml.firstElementChild.nodeName+"\n");
			
			
			if (p_eXml.hasChildNodes())
			{	

					if (p_eXml.firstElementChild.nodeName !== 'xs:complexType')
					{
						console.log(level+' '+p_eXml.firstElementChild.nodeName.padEnd(30,' ')+' BEGIN_END'.padEnd(20,' ')+p_eXml.getAttribute('name').padEnd(20,' ')+p_eXml.tagName.padEnd(20,' ')+p_eXml.getAttribute('id'));
						rA.push(CXSD100.getBasicAttribute(p_eXml,'BEGIN_END'));
					}
					else
					{
						console.log(level+' '+p_eXml.firstElementChild.nodeName.padEnd(30,' ')+' BEGIN'.padEnd(20,' ')+p_eXml.getAttribute('name').padEnd(20,' ')+p_eXml.tagName.padEnd(20,' ')+p_eXml.getAttribute('id'));
						rA.push(CXSD100.getBasicAttribute(p_eXml,'BEGIN'));
					}
					//rA.push(CXSD100.getBasicAttribute(p_eXml,'BEGIN'));
			}
			else
			{
						//console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHH');
						console.log(level+' '+p_eXml.tagName.padEnd(30,' ')+' BEGIN_END'.padEnd(20,' ')+p_eXml.getAttribute('name').padEnd(20,' ')+p_eXml.tagName.padEnd(20,' ')+p_eXml.getAttribute('id'));
						rA.push(CXSD100.getBasicAttribute(p_eXml,'BEGIN_END'));
			}
		}
		else
		{
			if (['xs:simpleType','xs:complexType'].includes(p_eXml.tagName))
				rA[rA.length-1]['_type'] = p_eXml.tagName;
			if (['xs:restriction'].includes(p_eXml.tagName))
				rA[rA.length-1]['type']	 = p_eXml.getAttribute('base');
			if (p_eXml.parentNode.tagName == 'xs:restriction')
			{
				rA[rA.length-1]['_restriction'] += p_eXml.tagName+':'+p_eXml.getAttribute('value')+',';
			}
		}
		// --------------------------------------------------------------------------------------------
		let a_exmlChild = p_eXml.children;
		//console.log(a_exmlChild);
		if (a_exmlChild.length > 0)
		{
			for (let i = 0; i < a_exmlChild.length; i++)
			{
				let exmlChild = a_exmlChild[i];
				(function(I,eXml){
					if (eXml.childElementCount > 0)
					{
						CXSD100.getXsdArray(eXml,level,info,rA);
					}
					else
					{
						//return;
						CXSD100.getXsdArray(eXml,level,info,rA);
						//console.log(' ################### '+console.log(eXml));
					}
				})(i,exmlChild);
			}
		}
		if (p_eXml.tagName == 'xs:element')
		{

				if (p_eXml.hasChildNodes())
				{
					if (p_eXml.firstElementChild.nodeName !== 'xs:complexType')
					//console.log(level+' '+p_eXml.firstElementChild.nodeName.padEnd(30,' ')+' BEGIN_END'.padEnd(20,' ')+p_eXml.getAttribute('name').padEnd(20,' ')+p_eXml.tagName.padEnd(20,' ')+p_eXml.getAttribute('id'));
					{}
					else
					{	
						console.log(level+' '+p_eXml.firstElementChild.nodeName.padEnd(30,' ')+' END'.padEnd(20,' ')+p_eXml.getAttribute('name').padEnd(20,' ')+p_eXml.tagName.padEnd(20,' ')+p_eXml.getAttribute('id'));
						rA.push(CXSD100.getBasicAttribute(p_eXml,'END'));
					}
					//console.log(level+' END'.padEnd(20,' ')+p_eXml.getAttribute('name').padEnd(20,' ')+p_eXml.tagName.padEnd(20,' ')+p_eXml.getAttribute('id').padEnd(20,''));
					//rA.push(CXSD100.getBasicAttribute(p_eXml,'END'));
				}
					
		}
		return rA;
	} 	
	/* ---------------------------------------------------------------------------------------------- */
	static getXmlUserForm(p_aXsd) // all data in array Xsd has tagName xs:element with id not null
	{
		function sLevelGet(level) { return ('LV_'+level.toString().padStart(2,'0')); }
		function sHemGet(tag,level,id,parentLevel,weight,xsdtagid) { 
			return ('<'+tag+' id="'+id+'" parent="'+parentLevel+'" weight="'+weight+'" '+
							(xsdtagid!==null?(' xsdtagid="'+xsdtagid+'">'):('>')));
		}
		var r_sUserFormTemplate = '';
		let level 			= 0;
		var parentLevel = '',currLevel = '';
		var iCurrLevel 	= -1;
		var idDiv				= 3;
		var r_s					= '';
		for (let i = 0; i < p_aXsd.length; i++)
		{
			let oRec = p_aXsd[i];
			let sXsdTagId = null;
				if (oRec['id'] !== undefined) sXsdTagId='xsdtagid="'+oRec.id+'"';
			if (oRec.status == 'BEGIN')
			{
				parentLevel = (iCurrLevel == -1) ? 'DOCUMENT_ROOT':sLevelGet(iCurrLevel);
				iCurrLevel++;
				currLevel		= sLevelGet(iCurrLevel);
				r_s += sHemGet(currLevel,	0,++idDiv,parentLevel,	0,null)+"\n";
				r_s += sHemGet('LN_01',		0,++idDiv,currLevel,		0,null)+"\n";
			//r_s += sHemGet('HX_01',		0,++idDiv,'LN_01',			0,oRec.id);
				r_s += '<HX_01 id="'+(++idDiv)+'" weight="0" parent="LN_01" sentinel="LV_HX_BEGIN" '+sXsdTagId+' >';
				
				r_s += oRec.name + ' | ';
				r_s += '</HX_01>'+"\n"+'</LN_01>'+"\n";
				console.log(r_s);
				r_sUserFormTemplate += r_s;
				r_s ='';
			}
			else if (oRec.status == 'BEGIN_END')
			{
				//r_s = iCurrLevel+' HELLO BEGIN_END'+"\n";
				//console.log(r_s);
				parentLevel = sLevelGet(iCurrLevel);
				r_s += sHemGet('LN_01',		0,++idDiv,parentLevel,		0,null)+"\n";
				r_s += sHemGet('HX_01',		0,++idDiv,'LN_01',			0,oRec.id);
				r_s += oRec.name + ' | ';
				r_s += '</HX_01>'+"\n"+'</LN_01>'+"\n";
				r_sUserFormTemplate += r_s;
				
				r_s = '';
			}
			else if (oRec.status == 'END')
			{
				parentLevel = sLevelGet(iCurrLevel);
				
				r_s += sHemGet('LN_01',		0,++idDiv,parentLevel,		0,null)+"\n";
				r_s += '<HX_01 id="'+(++idDiv)+'" weight="15" parent="LN_01" sentinel="LV_HX_END"/>'+"\n";
				r_s += '</LN_01>';
				r_s += '</'+parentLevel+'>'+"\n";
				iCurrLevel--;
				r_sUserFormTemplate += r_s;
				console.log(r_s);
				r_s = '';
			}
		}
		return {'xml':r_sUserFormTemplate,'lastid':idDiv} ;
	}
	/* ---------------------------------------------------------------------------------------------- */
	static getXmlUserFormFileFormat(p_sDocumentTitle,p_sData,p_iLastId)
	{
		return 	'<?xml version="1.0" encoding="utf-8"?>'																		+ "\n" +	
						'<DOCUMENT_ROOT id="0" weight="1" parent="ROOT" lastid="'+p_iLastId+'">'		+ "\n" +
						'<DOCUMENT_TITLE id="1" weight="2" parent="DOCUMENT_ROOT">'									+ "\n" +
						'<TT_00 id="2" weight="4" parent="'+p_sDocumentTitle+'">User Form</TT_00>'	+ "\n" +
						'</DOCUMENT_TITLE>'																													+ "\n" +
						p_sData																																			+ "\n" +
						'</DOCUMENT_ROOT>'																													+ "\n";
	}
	/* ---------------------------------------------------------------------------------------------- */
	static getStringXmlUserFromFile(p_domRoot)
	{
		let aXsd					= CXSD100.getXsdArray(p_domRoot,0);
		console.log(aXsd);
		//let sXmlUserForm 	= CXSD100.getXmlUserForm(aXsd);
		let aXmlUserFormData = CXSD100.getXmlUserForm(aXsd);
		
		//let sXmlUserFile 	= CXSD100.getXmlUserFormFileFormat('USER FORM',sXmlUserForm);
		let sXmlUserFile 	= CXSD100.getXmlUserFormFileFormat('USER FORM',aXmlUserFormData['xml'],aXmlUserFormData['lastid']);
		return sXmlUserFile;
	}
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */

import { writable } 																	from 'svelte/store';
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as ALib1 																		from '../AllShareLibs/lib1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet1.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CLIS101
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor()
	{
		this._active							= true				;
		this._doc_type						= ''					; // wip_wip:for apb doc,cat,library
		this._xmldoc 							=	writable([]);
		this._htmdoc 							= ''					; // create on mfn parse(p_xml) user hemroot_id 
		this._hemroot_id					= ''					;
		this._user_id							= 0						;					
		this._file_id							= 0						;			
		this._target_folder				= 'documents'	;
		this._aleaf								= []					; // for HX,TT_01 are faked parent for PR_01, usee in CLIS101_XmlCat,XmlLib
		this._edit_cat						= false				;
		this._edit_lib						= false				;
		
		this._enable_link_doc			= false				;
		this._parent_type					= 'none'			;
		this._parent_file_id			= 0						;
		this._current_page				= 1						;
	}
	/* ---------------------------------------------------------------------------------------------- */
	members_debug()
	{
		console.log('+++++++++0+++++++++0+++++++++0+++++++++0+++++++++0+++++++++0+++++++++0+++++++++0');
		console.log('user_id:'+this._user_id+' >> file_id:'+this._file_id+' >> hemroot_id:'+this._hemroot_id+' >> active:'+this._active);
		console.log(this._xmldoc);
	}
	/* ---------------------------------------------------------------------------------------------- */
	members_set(p_user_id,p_file_id,p_hemroot_id,p_status_active,p_target_folder)
	{
		this._user_id				= p_user_id; 
		this._file_id				= p_file_id;
		this._hemroot_id		= p_hemroot_id; 
		this._active				= p_status_active;
		this._target_folder	= p_target_folder;
		console.log(p_hemroot_id);
	}
	/* ---------------------------------------------------------------------------------------------- */
	_is_lang_encap_text(p_text)
	{
		let sValidator = '[..:th]';
		if (p_text.substring(0,sValidator.length) == sValidator)
			return true;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_decap_lang_encap_text(p_text)
	{
		let sPrefix = '[..:xx]';
		let sSuffix = '[xx:.]';
		return p_text.substring(sPrefix.length,p_text.length-sPrefix.length+1);
	}
	/* ---------------------------------------------------------------------------------------------- */
	_encap_lang_text(pa_text)
	{
		let r_sEncapText = '';
		if (pa_text['xx'] == '')
		{
			r_sEncapText = 	'[..:th]'+pa_text['th']+'[th:.],'+
											'[..:en]'+pa_text['en']+'[en:.],'+
											'[..:ch]'+pa_text['ch']+'[ch:.],';
		}
		else
		{	
			r_sEncapText = pa_text['xx'];
		}
		return r_sEncapText;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_create_hem_none_leaf(p_xemNew) // LN_01
	{
		let hem 						= document.createElement("div"); 
		let xtag						= p_xemNew.tagName;
		let parent_css			= '';
		let element_css			= '';
		let level_css				= (parent_css == '' && element_css == '') ? 'none':(element_css+' '+parent_css);
		let element_class 	= (	xtag == 'LN_01' ||
													//xtag == 'LV_00'	||
														g_tag_level.includes(xtag) || 
														xtag == 'DOCUMENT_TITLE' ) ? 'none' : 'list-group list-group-item';
		if (this._active) hem.setAttribute('id',p_xemNew.getAttribute('id'));												
		hem.setAttribute('current-tag',xtag);												
		hem.setAttribute('css'				,level_css);			
	//hem.setAttribute('class'			,element_class);												

		if (p_xemNew.hasAttribute('xsdtagid')) console.log('XEM none-LEAF xsdtag-------------------------------------------------------------------------');

		return hem;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_create_hem_leaf(p_xemNew) // {HX,TT,PR,IM}_01
	{
		if (this._enable_link_doc)
		{
			if (p_xemNew.hasAttribute('doc_id')) console.log('wip_wip:doc_id:'+p_xemNew.getAttribute('doc_id'));
		}
		
		let _xxp_eATL = p_xemNew.parentNode;
		let iATLTid	= p_xemNew.getAttribute('id');
		
		let hem 						= document.createElement("div"); 
		let xtag						= p_xemNew.tagName;
		let parent_css			= g_tag[p_xemNew.parentNode.parentNode.tagName]['css'];
		let element_css			= g_tag[p_xemNew.tagName]['css'];
		let level_css				= element_css+' '+parent_css;
		let element_class		= (xtag == 'LN_01') ? 'none' : 'list-group list-group-item';
		
		if (xtag == 'HX_01')
		{
			let sSentinel = '';
			if (CXem.is_sentinel_begin_HX(this._xmldoc,p_xemNew.getAttribute('id'))) 
			{
				sSentinel = ' '+'c_lv_begin';
				hem.setAttribute('style',g_style_text['c_lv_begin']);
			}
			else if (CXem.is_sentinel_end_HX(this._xmldoc,p_xemNew.getAttribute('id'))) 	
			{
				sSentinel = ' '+'c_lv_end';
				hem.setAttribute('style',g_style_text['c_lv_end']);
			}
			else
			{
				hem.setAttribute('style',g_style_text[xtag]);
			}
			level_css += sSentinel;
		}
		else
		{
			if ((this._edit_cat || this._edit_lib) && xtag == 'PR_01')
			{
				hem.setAttribute('style',g_style_text[xtag]+g_style_text['hide']);
			}			
			else
			{	
				hem.setAttribute('style',g_style_text[xtag]);
			}
		}
		
		if (this._active) hem.setAttribute('id',p_xemNew.getAttribute('id'));												
		hem.setAttribute('current-tag',xtag);												
		hem.setAttribute('css'				,level_css);												
		hem.setAttribute('class'			,element_class);	

		if (xtag == 'IM_01') 	hem.innerHTML = this._create_subhem_image(p_xemNew);
		else									hem.innerHTML = p_xemNew.innerHTML;

		if (this._enable_link_doc)
		{
			if (p_xemNew.hasAttribute('doc_id'))
			{
				console.log('wip_wip:doc_id:'+hem.innerHTML);
				let sHRef = 'http://localhost:8000/Mars/xdocx_xxxxx_00300_xxxxx/'
											+this._user_id+'/'+p_xemNew.getAttribute('doc_id')+'/'+this._doc_type+'/'+this._file_id+'/'+this._current_page;
				console.log(sHRef);
				let sClass="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover";
			//hem.innerHTML = '<a href="http://localhost:8000/Mars/xdocx_xxxxx_00300_xxxxx/'+this._user_id+'/'+p_xemNew.getAttribute('doc_id')+'/1">'+hem.innerHTML+'</a>';
			hem.innerHTML = '<a href="'+sHRef+'" class="'+sClass+'">'+hem.innerHTML+'</a>';
			}
		}

		// _code_:majorchange:for fil form
		if (p_xemNew.hasAttribute('xsdtagid')) 
		{
			hem.setAttribute('xsdtagid',p_xemNew.getAttribute('xsdtagid'));	
			console.log('XEM LEAF xsdtag'+p_xemNew.getAttribute('xsdtagid'));
		}
		// =code_
		
		return hem;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_get_feuri_pmn_image(p_user_id,p_file_id,p_folder_id) // for doc exclude cat,book
	{
		return 	'http://localhost:5173/storage/app/public/'+p_user_id+
						'/venus/'+this._target_folder+'/'+p_file_id+
						'/images/pmn/'+p_folder_id+
						'/permimage.jpg';
	}
	/* -------------------------------------------- */
	_get_feuri_tmp_image(p_user_id,p_file_id,p_folder_id) // for doc exclude cat,book
	{
		return 	'http://localhost:5173/storage/app/public/'+p_user_id+
						'/venus/'+this._target_folder+'/'+p_file_id+
						'/images/tmp/'+p_folder_id+
						'/tempimage.jpg';
	}
	/* ---------------------------------------------------------------------------------------------- */
	_create_subhem_image(p_xemNew) // for doc exclude cat,book
	{
		let tid 				= p_xemNew.getAttribute('id');
		let list_fname 	= '';
		let a_fname			= null;
		let hem_div			= '';
		let hem_img			= '';
		let feuri				= '';
		if (p_xemNew.hasAttribute('tempimage'))
		{
			list_fname		= p_xemNew.getAttribute('tempimage');
		}
		else
		{
			list_fname		= p_xemNew.innerHTML;
		}
		a_fname 				= list_fname.split(",");
		
		/* feuri ex. http: //localhost:5173/storage/app/public/{uid=1}/venus/documents/{doc_id=35}/document/pmn/{1}_{35}.xml */
		// feuri = this._get_feuri_tmp_image(this._user_id,this._file_id,a_fname[i]);
		// feuri = this._get_feuri_pmn_image(this._user_id,this._file_id,tid,i);
		if (ALib1._is_prefix_tempimage(a_fname[0]))
			hem_img	=	this._preview_tempimage(a_fname);
		else
			hem_img	=	this._preview_permimage(a_fname,tid);
		hem_div = hem_img;
		return hem_div;
	}
	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	/*
	ex: traverse up to parent PR upto fake parent such as HX,TT_01
		let _eATL					= this._xmldoc.getElementById(p_iactiveTid);
		while (_eATL.nodeName == 'PR_01' && iSearchCount < nSearchMax)
			_eATL=_eATL.parentElement.previousElementSibling.firstElementChild;
	*/
	/* ---------------------------------------------------------------------------------------------- */
	append_hem_root(p_doc,p_xemNew=null) /* p_doc = html doc */
	{
		let hem 						= document.createElement("div"); 
		let hem_subtag			= this._hemroot_id; // DOCUMENT_ROOT,INACTIVE_ROOT
		let element_class 	= 'none';
		let level_css				= 'none';
		if (this._active) hem.setAttribute('id',0);
		hem.setAttribute('current-tag',hem_subtag);
		hem.setAttribute('css'				,level_css);
		hem.setAttribute('class'			,element_class);
		p_doc.append(hem);
	}
	/* ---------------------------------------------------------------------------------------------- */
	append_hem_none_leaf(p_htmdoc,p_xemNew)
	{
		let hem = this._create_hem_none_leaf(p_xemNew);
		p_htmdoc.append(hem);
	}
	/* ---------------------------------------------------------------------------------------------- */
	append_hem_leaf(p_htmdoc,p_xemNew)
	{
		let hem = this._create_hem_leaf(p_xemNew);
		p_htmdoc.append(hem);
	}
	/* ---------------------------------------------------------------------------------------------- */
	parse(p_xml)
	{
		this._xmldoc = (new window.DOMParser()).parseFromString(p_xml,"text/xml");
		this._htmdoc = document.getElementById(this._hemroot_id);
	}
	/* ---------------------------------------------------------------------------------------------- */
	traverseXml2LeafData(p_htmDoc,p_eXml, idOfContainerDomElement='no assign',p_aLeafData) 
	{
		var self = this;
		if (p_eXml.length === 0) 
			throw new Error('MSG: no dom element id: "' + idOfContainerDomElement + '"'); 
		let a_exmlChild	= p_eXml.children;
		/* =========================================================================== */
		// fakeparent use in cat insert update
		//if (!['PR_01','IM_01'].includes(p_eXml.firstElementChild.nodeName))
		//{
			//p_aLeafData.push({tid:p_eXml.firstElementChild.getAttribute('id'),tagname:p_eXml.firstElementChild.nodeName,sentinel:p_eXml.firstElementChild.getAttribute('sentinel')});
			p_aLeafData.push({id:p_eXml.firstElementChild.getAttribute('id'),
												title:p_eXml.firstElementChild.textContent,
												tid:p_eXml.firstElementChild.getAttribute('id'),
												tagname:p_eXml.firstElementChild.nodeName,
												sentinel:p_eXml.firstElementChild.getAttribute('sentinel')
											});
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
						self.traverseXml2LeafData(p_htmDoc,eXml,'0',p_aLeafData);
					}																					
				})(i,exmlChild);
			}
		}	
	}
	/* ---------------------------------------------------------------------------------------------- */
	traverseXml2DocumentRoot(p_htmDoc,p_eXml, idOfContainerDomElement='no assign',p_aLeafData) 
	{
		var self = this;
		if (p_eXml.length === 0) 
			throw new Error('MSG: no dom element id: "' + idOfContainerDomElement + '"'); 
		let a_exmlChild	= p_eXml.children;
		/* =========================================================================== */
		// fakeparent use in cat insert update
		//if (!['PR_01','IM_01'].includes(p_eXml.firstElementChild.nodeName))
		//{
			p_aLeafData.push({tid:p_eXml.firstElementChild.getAttribute('id'),tagname:p_eXml.firstElementChild.nodeName,sentinel:p_eXml.firstElementChild.getAttribute('sentinel')});
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
						self.append_hem_none_leaf(p_htmDoc,eXml);
						self.traverseXml2DocumentRoot(p_htmDoc,eXml,'0',p_aLeafData);
					}																					
					else																
					{	
						if (eXml.hasAttribute('bindto')) console.log(eXml); // wip_wip
						if (eXml.hasAttribute('doc_id')) console.log(eXml); // wip_wip
						switch (eXml.tagName)
						{
							case 'HX_01'	:
							case 'TT_00'	:
							case 'TT_01'	:
							case 'PR_01'	:
							case 'IM_01'	:
								let dummy = self.append_hem_leaf(p_htmDoc,eXml);
								break;
						}
					}																
				})(i,exmlChild);
			}
		}	
	}
	/* ---------------------------------------------------------------------------------------------- */
	buildDocumentRoot()
	{
		let doc_root = this._xmldoc.getElementById('0');
		this.members_debug();
		this.append_hem_root(this._htmdoc,null);
		
		this.traverseXml2DocumentRoot(this._htmdoc,doc_root,'0',this._aleaf);
		console.log(this._xmldoc);
		console.log(this._aleaf);
	}
	/* ---------------------------------------------------------------------------------------------- */
	syncDocumentRoot2ALeaf(p_htmDoc=null,p_eXml, idOfContainerDomElement='no assign',p_aLeafData) 
	{
		var self = this;
		if (p_eXml.length === 0) 
			throw new Error('MSG: no dom element id: "' + idOfContainerDomElement + '"'); 
		let a_exmlChild	= p_eXml.children;
		/* =========================================================================== */
		// fakeparent use in cat insert update
		//if (!['PR_01','IM_01'].includes(p_eXml.firstElementChild.nodeName))
		//{
			p_aLeafData.push({tid:p_eXml.firstElementChild.getAttribute('id'),tagname:p_eXml.firstElementChild.nodeName,sentinel:p_eXml.firstElementChild.getAttribute('sentinel')});
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
						self.syncDocumentRoot2ALeaf(p_htmDoc,eXml,'0',p_aLeafData);
					}																					
				})(i,exmlChild);
			}
		}	
	}
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */


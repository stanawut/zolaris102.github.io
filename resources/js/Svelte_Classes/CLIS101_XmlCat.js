import { writable } 																	from 'svelte/store';
import CLIS101_Xml																		from './CLIS101_Xml.js';
import CLIS101_Xem 																		from './CLIS101_Xem.js'; // CREATE XEM
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as ALib1 																		from '../AllShareLibs/lib1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet1.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CLIS101_XmlCat extends CLIS101_Xml
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor()
	{
		super();
	}
	/* ---------------------------------------------------------------------------------------------- */
	_get_idxfakeparent_id(p_tid)
	{
		return this._aleaf.map(function(o) { return o.tid; }).indexOf(p_tid);
	}
	/* ---------------------------------------------------------------------------------------------- */
	_insert_afakeparent_id(p_iactiveTid,p_tid,p_tagname)
	{
		let idx = this._get_idxfakeparent_id(p_iactiveTid);
		this._aleaf = [...this._aleaf.slice(0,idx+1),
														{tid:p_tid,tagname:p_tagname},
														...this._aleaf.slice(idx+1)];
	}
	/* ---------------------------------------------------------------------------------------------- */
	_get_insert_target_tid(p_tid,p_sTagSearch) // HX can insert HX,TT_01 | TT can insert TT_01
	{
		var idxATL 	=	this._get_idxfakeparent_id(p_tid);
		for (let i = idxATL+1; i < this._aleaf.length; i++)
		{
			if (this._aleaf[i]['tagname'] == 'HX_01' && p_sTagSearch == 'TT_01')
				return this._aleaf[i-1]['tid'];
			if (this._aleaf[i]['tagname'] == p_sTagSearch || this._aleaf[i]['tagname'] == 'HX_01')
				return this._aleaf[i-1]['tid'];
		}		
		return -1;
	}
	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	_insert_cat_xem(p_ifakeactiveTid,pa_text)
	{
		//console.log(this._aleaf);
		let new_iactiveTid	= 0;
		let sTagATL					= this._xmldoc.getElementById(p_ifakeactiveTid).nodeName;
		let eNext2ATL				= this._xmldoc.getElementById(p_ifakeactiveTid).parentElement.nextElementSibling.firstChild;
		let sTagNewXem			= pa_text['tagname'];
		let iactiveTid			= 0;
		let sMapKey					= sTagATL+'|'+sTagNewXem;
		switch (sMapKey)
		{
			case "HX_01|HX_01"	:
														iactiveTid	= this._get_insert_target_tid(p_ifakeactiveTid,'HX_01');
														if (iactiveTid > 0)	
														{
															console.log('do 1:'+sMapKey);
														}
														break;	
			case "HX_01|TT_01"	:
														iactiveTid	= this._get_insert_target_tid(p_ifakeactiveTid,'TT_01');
														if (iactiveTid > 0)	console.log('do 21:'+sMapKey);
														else
														{
															iactiveTid	= this._get_insert_target_tid(p_ifakeactiveTid,'HX_01');
															if (iactiveTid > 0) console.log('do 22:+'+sMapKey);
															else iactiveTid = p_ifakeactiveTid;
														}
														break;	
			case 'TT_01|HX_01'	:
														iactiveTid	= this._get_insert_target_tid(p_ifakeactiveTid,'HX_01');
														break;
			case 'TT_01|TT_01'	:
														iactiveTid	= this._get_insert_target_tid(p_ifakeactiveTid,'TT_01');
														break;

		}

		this._insert_xem(iactiveTid,pa_text);
		let lastid					= this._xmldoc.getElementById(0).getAttribute('lastid');
		this._insert_afakeparent_id(iactiveTid,lastid,sTagNewXem);
	}
	/* ---------------------------------------------------------------------------------------------- */
	_insert_bind_xem(p_iactiveTid,pa_text)
	{
		let file_id = pa_text['xx'];
		this._insert_xem(p_iactiveTid,pa_text);
		let iLastId = this._xmldoc.getElementById(0).getAttribute('lastid'); // belonging to newly attach doc
		let fake_parent_tid = 0;
		if (this._xmldoc.getElementById(p_iactiveTid).hasAttribute('fake-parent'))
			fake_parent_tid = this._xmldoc.getElementById(p_iactiveTid).getAttribute('fake-parent');
		else
			fake_parent_tid = p_iactiveTid;
		this._xmldoc.getElementById(iLastId).setAttribute('fake-parent',fake_parent_tid);
		this._xmldoc.getElementById(iLastId).setAttribute('doc_id',file_id);
		if (this._xmldoc.getElementById(fake_parent_tid).hasAttribute('bindto')) // already had doc binded
		{
			let sBindTo = this._xmldoc.getElementById(fake_parent_tid).getAttribute('bindto');
			let ndoc		= parseInt(this._xmldoc.getElementById(fake_parent_tid).getAttribute('ndoc'));
			// First element 
			if (fake_parent_tid == p_iactiveTid)
			{
				this._xmldoc.getElementById(fake_parent_tid).setAttribute('bindto',(file_id+','+sBindTo));
				this._xmldoc.getElementById(fake_parent_tid).setAttribute('ndoc',ndoc+1);
				return true;
			}
			// Last element
			if (this._xmldoc.getElementById(iLastId).parentElement.nextElementSibling)
			{
				if (this._xmldoc.getElementById(iLastId).parentElement.nextElementSibling.firstElementChild.nodeName !== 'PR_01')
				{
					this._xmldoc.getElementById(fake_parent_tid).setAttribute('bindto',(sBindTo+file_id+','));
					this._xmldoc.getElementById(fake_parent_tid).setAttribute('ndoc',ndoc+1);
					return true;
				}			
			}
			// 
			if (this._xmldoc.getElementById(iLastId).parentElement.previousElementSibling)
			{
				let prevDocId 	= this._xmldoc.getElementById(iLastId).parentElement.previousElementSibling.firstElementChild.getAttribute('doc_id');
				let keySearch		= ','+prevDocId+',';
				let frontPos		= sBindTo.indexOf(keySearch)+keySearch.length;
				//alert(sBindTo.indexOf(keySearch));
				let new_sBindTo = sBindTo.slice(0,frontPos)+file_id+','+sBindTo.slice(frontPos);
				alert(sBindTo);
				alert(new_sBindTo);
				this._xmldoc.getElementById(fake_parent_tid).setAttribute('bindto',new_sBindTo);
				this._xmldoc.getElementById(fake_parent_tid).setAttribute('ndoc',ndoc+1);
				return true;
			}
		}
		else // first time bining to doc
		{
			this._xmldoc.getElementById(fake_parent_tid).setAttribute('bindto',(file_id+','));
			this._xmldoc.getElementById(fake_parent_tid).setAttribute('ndoc',1);
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	_remove_bind_xem(p_iactiveTid,pa_text)
	{
		let fake_parent_tid = this._xmldoc.getElementById(p_iactiveTid).getAttribute('fake-parent');
		let sBindTo					= '';
		let nDoc						= '';
		let keySearch				= '';
		if (this._xmldoc.getElementById(fake_parent_tid).hasAttribute('bindto'))
		{
			sBindTo						= this._xmldoc.getElementById(fake_parent_tid).getAttribute('bindto');
			nDoc							= parseInt(this._xmldoc.getElementById(fake_parent_tid).getAttribute('ndoc'));
		}
		else
		{
			return;
		}
		let doc_file_id			= this._xmldoc.getElementById(p_iactiveTid).getAttribute('doc_id');
		let bFound					= false;
		if (this._xmldoc.getElementById(p_iactiveTid).parentElement.previousElementSibling.firstElementChild.getAttribute('current-tag') !== 'PR_01')
		{
			keySearch 			 	= doc_file_id+',';
			sBindTo						= sBindTo.replace(keySearch,'');
			nDoc--;
			bFound						= true;
		}
		if (!bFound && this._xmldoc.getElementById(p_iactiveTid).parentElement.nextElementSibling.firstElementChild.getAttribute('current-tag') !== 'PR_01')
		{
			keySearch 			 	= doc_file_id+',';
			sBindTo						= sBindTo.slice(0,-1*(keySearch.length));
			nDoc--;
			bFound						= true;
		}
		if (!bFound)
		{
			keySearch 			 	= ','+doc_file_id+',';
			sBindTo						= sBindTo.replace(keySearch,',');
			nDoc--;
			bFound						= true;
		}
		console.log('sbindto:'+sBindTo+',ndoc:'+nDoc);
		this._remove_xem_leaf(p_iactiveTid);
		if (nDoc == 0)
		{
			this._xmldoc.getElementById(fake_parent_tid).removeAttribute('bindto');	
			this._xmldoc.getElementById(fake_parent_tid).removeAttribute('ndoc');	
		}	
		else
		{
			this._xmldoc.getElementById(fake_parent_tid).setAttribute('bindto',sBindTo);	
			this._xmldoc.getElementById(fake_parent_tid).setAttribute('ndoc',nDoc);	
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_insert_input_text(p_tid,pa_text)
	{
		if (this._edit_cat || this._edit_lib)
		{
			console.log('here in _edit_cat|edit_lib');
			this._insert_cat_xem(p_tid,pa_text);
		}
		else
		{	
			this._insert_xem(p_tid,pa_text);
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_bind_doc(p_tid,pa_text)
	{
		this._insert_bind_xem(p_tid,pa_text);
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_unbind_doc(p_tid,pa_text)
	{
		this._remove_bind_xem(p_tid,pa_text);
	}
	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	aleaf_debug() // HX,TT_01,not PR_01:PR_01 consider to child of both
	{
		let key 	= '';
		var index = 0	;
		for (let i=0; i < this._aleaf.length; i++)
		{
			key = this._aleaf[i]['tid'];
			index = this._aleaf.map(function(o) { return o.tid; }).indexOf(key);
			//console.log(index+"::"+this._aleaf[i]['tid']+':'+this._aleaf[i]['tagname']);
			console.log(this._aleaf[i]);
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */

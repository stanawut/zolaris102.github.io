import { writable } 																	from 'svelte/store';
import CLIS101		 																		from './CLIS101.js'; // CREATE XEM
import CLIS101_Xem 																		from './CLIS101_Xem.js'; // CREATE XEM
import CXem																						from './CLIS103_Xem.js';
import * as ALib1 																		from '../AllShareLibs/lib1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet1.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CLIS101_Xml extends CLIS101
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor()
	{
		super();
	}
	/* ---------------------------------------------------------------------------------------------- */
	_preview_tempimage(pa_fname)
	{
		let r_layout 	= '';
		let sLi 			= '';
		let feuri 		= '';
		for (let i=0; i < pa_fname.length & pa_fname[i] !== ''; i++)
		{
			feuri = this._get_feuri_tmp_image(this._user_id,this._file_id,pa_fname[i]);
			sLi += '<li id="li_'+i+'" style="list-style-type:none;" >'+
						'<img id="li_image_'+i+'" src="'+feuri+'" class="img-thumbnail" style="padding:0.1em" alt="'+pa_fname[i]+'">'+
						'</li>';
		}
		r_layout =	'<ul id="write-image-preview" class="image_upload_preview" style="padding:0px">'+
								sLi+
								'</ul>';
		return r_layout;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_preview_permimage(pa_fname,p_tid)
	{
		let r_layout 	= '';
		let sImg 			= '';
		let feuri 		= '';
		for (let i=0; i < pa_fname.length & pa_fname[i] !== ''; i++)
		{
			feuri = this._get_feuri_pmn_image(this._user_id,this._file_id,pa_fname[i]);
			sImg 	= sImg + '<img id="'+p_tid+'_image_'+i+'" class="img-thumbnail" src="'+feuri+'"/>';
		}
		r_layout = 	'<div class="bd-example">'+sImg+'</div>' ;
								
		return r_layout;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_insert_hem(p_ixemTargetTid,xemNew)
	{
		let hemLV_0X 				= null;
		let hemLN_01 				= null;
		let hemXX_01 				= null;
		
		let hemLN_01_begin 	= null;
		let hemXX_01_begin 	= null;
		
		let hemLN_01_end 		= null;
		let hemXX_01_end 		= null;
		
		
		let hemTarget				= null;

		if (xemNew.nodeName == 'LN_01')
		{	
			hemLN_01 	= this._create_hem_none_leaf(xemNew);
			hemXX_01 	= this._create_hem_leaf(xemNew.firstChild);
			hemTarget = (p_ixemTargetTid == 0) ? null:document.getElementById(p_ixemTargetTid);
			if (p_ixemTargetTid == 0)
			{
				this._htmdoc.append(hemLN_01);
				this._htmdoc.append(hemXX_01);
			}
			else
			{
				this._htmdoc.insertBefore(hemLN_01,hemTarget);
				this._htmdoc.insertBefore(hemXX_01,hemTarget);
			}
		}
		else if (g_tag_level.includes(xemNew.nodeName))
		{
			hemLV_0X	= this._create_hem_none_leaf(xemNew);
			hemLN_01_begin 	= this._create_hem_none_leaf(xemNew.firstChild);
			hemXX_01_begin 	= this._create_hem_leaf(xemNew.firstChild.firstChild);
			hemLN_01_end 		= this._create_hem_none_leaf(xemNew.lastChild);
			hemXX_01_end 		= this._create_hem_leaf(xemNew.lastChild.firstChild);
			
			
			hemTarget = (p_ixemTargetTid == 0) ? null:document.getElementById(p_ixemTargetTid);
			if (p_ixemTargetTid == 0)
			{
				this._htmdoc.append(hemLV_0X);
				this._htmdoc.append(hemLN_01_begin);
				this._htmdoc.append(hemXX_01_begin);
				this._htmdoc.append(hemLN_01_end);
				this._htmdoc.append(hemXX_01_end);
			}
			else
			{
				this._htmdoc.insertBefore(hemLV_0X,hemTarget);
				this._htmdoc.insertBefore(hemLN_01_begin,hemTarget);
				this._htmdoc.insertBefore(hemXX_01_begin,hemTarget);
				this._htmdoc.insertBefore(hemLN_01_end,hemTarget);
				this._htmdoc.insertBefore(hemXX_01_end,hemTarget);
			}
		}
	}	
	/* ---------------------------------------------------------------------------------------------- */
	_insert_xem(p_iactiveTid,pa_text/*p_snewTagName,p_snewContent*/)
	{
		let oXemTarget			= new CLIS101_Xem(this._xmldoc,p_iactiveTid); // object related info of active XML element
		let xemNew					= oXemTarget.fork_adjacent(pa_text); // return xml element: <LN_01...><HX_01..>...</H.></L.>
		let hemTarget_css		= document.getElementById(p_iactiveTid).getAttribute('css');
		let hemTarget_id		= 0;
		if (g_tag_leaf.includes(pa_text['tagname']) || g_tag_level.includes(pa_text['tagname']) )
		{
			/*
			LN->[leaf]
			LN:target->[other leaf]
			*/
			if (g_tag_leaf.includes(oXemTarget._sbl_sTag)) // sibling leaf tag HX,TT,PR_01
			{
				hemTarget_id	= oXemTarget._sbp_eATL.getAttribute('id');
				oXemTarget._xpp_eATL.insertBefore(xemNew,oXemTarget._sbp_eATL);
				this._xmldoc.getElementById(0).setAttribute('lastid',oXemTarget._iexpectLastTid);
			}
			/*
			LN->[leaf]
			LV_0X:target->LN->leaf
			*/
			else if (g_tag_level.includes(oXemTarget._sbp_sTag)) // sibling parent LV_0X
			{
				hemTarget_id	= oXemTarget._sbp_eATL.getAttribute('id');
				oXemTarget._xpp_eATL.insertBefore(xemNew,oXemTarget._sbp_eATL);
				this._xmldoc.getElementById(0).setAttribute('lastid',oXemTarget._iexpectLastTid);
			}
			/*
			LN->[leaf]
			no LN or LV nextSibling
			*/
			else if (oXemTarget._sbp_eATL == null)
			{
				if (hemTarget_css.includes('c_lv_end'))
				{
					/*
						LV_0X
							LN->[leaf=c_lv_begin]
							LN->[leaf]....
							LN->[leaf=c_lv_end]
						[LN or LV_0N or null] as next sibling of LV_0X
					*/
					if (oXemTarget._xpp_eATL.nextElementSibling)
					{
						hemTarget_id = oXemTarget._xpp_eATL.nextElementSibling.getAttribute('id');
						oXemTarget._xpp_eATL.parentElement.insertBefore(xemNew,oXemTarget._xpp_eATL.nextElementSibling);
					}
					else
					{	
						hemTarget_id = 0;
						oXemTarget._xpp_eATL.parentElement.append(xemNew);
					}
					this._xmldoc.getElementById(0).setAttribute('lastid',oXemTarget._iexpectLastTid);
				}
				else
				{
					hemTarget_id = 0;
					this._xmldoc.getElementById(3).append(xemNew);
					
				}
			}
			this._insert_hem(hemTarget_id,xemNew);
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	_remove_hem_leaf(p_ifordestroyTid) // LN_01 and HX,TT,PR_01 align in hemdoc at same level no parent-child structure
	{
		document.getElementById(p_ifordestroyTid).remove();
		document.getElementById(p_ifordestroyTid-1).remove();
	}
	/* ---------------------------------------------------------------------------------------------- */
	_remove_xem_leaf(p_ifordestroyTid)
	{
		let cXem = CXem.get_leaf_data_LV(this._xmldoc,p_ifordestroyTid); 	// _xxx_:info of these HX,TT,PR_01 leafs
		let eXem = this._xmldoc.getElementById(p_ifordestroyTid-1); 			// _xxp_:LN_01->_xxx_:Above leafs
		this._xmldoc.getElementById(cXem._xpp_iTid).removeChild(eXem); 		// _xpp_:Parent of LN_01
		this._remove_hem_leaf(p_ifordestroyTid);
		//console.clear();
		//console.log(this._xmldoc);
	}
	/* ---------------------------------------------------------------------------------------------- */
	_update_tempimage_to_IM_01()
	{
		let aXemIM_01 = this._xmldoc.getElementsByTagName('IM_01');
		let i = 0;
		if (aXemIM_01.length > 0)
		{
			for (i = 0; i < aXemIM_01.length; i++)
			{
				if (aXemIM_01[i].hasAttribute('tempimage'))
				{
					let tmp = aXemIM_01[i].getAttribute('tempimage');
					tmp = tmp.replace(/tempimage_/g,'permimage_');
					aXemIM_01[i].textContent = tmp;
					aXemIM_01[i].removeAttribute('tempimage');
				}
			}
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	fnXml2Ser()
	{
		this._update_tempimage_to_IM_01()
		let r_serXml	= new XMLSerializer().serializeToString(this._xmldoc);
		return r_serXml;
	}
	/* ---------------------------------------------------------------------------------------------- */
	get_raw_data_by_tid(p_tid)
	{
		let r_data = this._xmldoc.getElementById(p_tid);
		return r_data.innerHTML;
	}
	/* ---------------------------------------------------------------------------------------------- */
	get_meaning_data_by_tid(p_tid)
	{
		let xTag 			= this._xmldoc.getElementById(p_tid).nodeName;
		let tmp_data	= this._xmldoc.getElementById(p_tid).innerHTML;
		let ra_data		= {type:'',th:'',en:'',ch:'',xx:''};
		switch (xTag)
		{
			case 'HX_01'	:
			case 'TT_00'	:
			case 'TT_01'	:
			case 'PR_01'	:
											if (this._is_lang_encap_text(tmp_data))
											{
												let aText = tmp_data.split(",");
												ra_data['type'] = 'mul';
												ra_data['tag']	= xTag;
												ra_data['th'] 	= this._decap_lang_encap_text(aText[0]);
												ra_data['en'] 	= this._decap_lang_encap_text(aText[1]);
												ra_data['ch'] 	= this._decap_lang_encap_text(aText[2]);
												ra_data['xx']		= '';
											}
											else
											{
												ra_data['type'] = 'uni';
												ra_data['tag']	= xTag;
												ra_data['th'] 	= '';
												ra_data['en'] 	= '';
												ra_data['ch'] 	= '';
												ra_data['xx']		= tmp_data;
											}
											break;
		}
		return ra_data;
	}
	/* ---------------------------------------------------------------------------------------------- */
	get_default_data_for_new_tid(p_emenur2_C,p_nRequiredInput)
	{
		let ra_data		= {type:'',tag:'',th:'',en:'',ch:'',xx:''};
		let map_tag		= {emenur2_0:'LV_0X',emenur2_1:'HX_01',emenur2_2:'TT_01',emenur2_3:'PR_01'};
		switch (p_emenur2_C)
		{
			case 'emenur2_0'	: // {+}
			case 'emenur2_1'	: // +hx
			case 'emenur2_2'	: // +tt
			case 'emenur2_3'	: // +pr
												if (p_nRequiredInput == 1) 			ra_data['type'] = 'uni';
												else if (p_nRequiredInput == 3)	ra_data['type'] = 'mul';
												ra_data['tag']	= map_tag[p_emenur2_C];
												ra_data['th'] 	= '';
												ra_data['en'] 	= '';
												ra_data['ch'] 	= '';
												ra_data['xx']		= '';
											break;
		}
		return ra_data;
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_update_input_text(p_tid,pa_text)
	{
		document.getElementById(p_tid).innerHTML 				= pa_text['textcontent'];
		this._xmldoc.getElementById(p_tid).textContent 	= pa_text['textcontent'];
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_insert_input_text(p_tid,pa_text)
	{
		this._insert_xem(p_tid,pa_text);
	}
	/* ---------------------------------------------------------------------------------------------- */
	commit_insert_level_text(p_tid,pa_text)
	{
		this._insert_xem(p_tid,pa_text);
	}
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */

import { g_tag,g_tag_leaf } from '../Svelte_AllConstants/ConstantSet1.js';
export default class CLIS101_Xem
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor(p_xmldoc,p_iactiveTid)
	{
		// _xpp_ = LV_XX > _xxp_ = {LV_XX,LN_XX} > case LN_XX then active=HX,TT,PR_01 
		let hem								= document.getElementById(p_iactiveTid);
		console.log(hem);
		let sCss							= hem.getAttribute('css');
		if (sCss.includes('c_lv_begin'))			this._sCss 	= 'c_lv_begin';
		else if (sCss.includes('c_lv_end'))		this._sCss	=	'c_lv_end';
		else 																	this._sCss	= 'none';
		
		
		this._xmldoc					= p_xmldoc;
		this._iactiveTid			= p_iactiveTid;
		this._iLastTid				= parseInt(p_xmldoc.getElementById(0).getAttribute('lastid'));
		/*
		let akvResult 				= {};
		let akvTraceParent 		= this.trace_parent(p_iactiveTid,akvResult);
		*/
		this._eATL						= p_xmldoc.getElementById(p_iactiveTid);
		this._sATLTag					= this._eATL.nodeName;

		this._xxp_eATL				= this._eATL.parentElement; // parent-ATL
		this._xxp_sTag				=	this._xxp_eATL.nodeName;

		this._xpp_eATL 				= this._xxp_eATL.parentElement; // parent-parent-ATL 
		this._xpp_sTag				= this._xpp_eATL.nodeName; 
		
		if (this._xxp_eATL.nextElementSibling == null) // _xxp_=LN_01
		{
			this._sbp_eATL			= null; // parent-ATL,parent-other leaf 
			this._sbp_sTag			= '';
			this._sbp_iTid			= 0;
			
			this._sbl_eATL 			= null; // ATL,other leaf
			this._sbl_sTag			= ''; // ATL,other leaf
			this._sbl_iTid			= 0;
		}
		else
		{
			this._sbp_eATL			= this._xxp_eATL.nextElementSibling; // parent-ATL,parent-other leaf 
			this._sbp_sTag			= this._sbp_eATL.nodeName;
			this._sbp_iTid			= this._sbp_eATL.getAttribute('id');
			
			this._sbl_eATL 			= this._sbp_eATL.firstElementChild; // ATL,other leaf
			this._sbl_sTag			= this._sbl_eATL.nodeName; // ATL,other leaf
			this._sbl_iTid			= this._sbl_eATL.getAttribute('id');
		}	
		this._iexpectLastTid	= 0;
	}
	/* ---------------------------------------------------------------------------------------------- */
	trace_parent(p_iactiveTid,p_akvResult)
	{
		let eXml = this._xmldoc.getElementById(p_iactiveTid);
		if (eXml !== null && typeof eXml !== "undefined")
		{
			p_akvResult[eXml.nodeName] = eXml.getAttribute('id');
			if (eXml.parentElement)
			{
					if (eXml.parentElement.nodeName !== 'DOCUMENT_ROOT')
					this.trace_parent(eXml.parentElement.getAttribute('id'),p_akvResult);
			}
		}
		return p_akvResult;
	}
	/* ---------------------------------------------------------------------------------------------- */
	/* a{k:v},parent of LN:LV_0X,#,{null for insert XX_01,LV_HX_BEGIN or END for LV_0X} */
	create_xemLN_XX_01(pa_text,p_sLN_01ParentTag,p_iLastTid,p_sSentinel)
	{
		let xemLN_01	= null;
		let xemXX_01	= null;
		let iNextTid	= p_iLastTid+1;

		xemLN_01	= this._xmldoc.createElement('LN_01');
		xemLN_01.setAttribute('id',iNextTid);
		xemLN_01.setAttribute("parent",p_sLN_01ParentTag);
		xemLN_01.setAttribute("weight",9);

		xemXX_01	= this._xmldoc.createElement(pa_text['tagname']);
		iNextTid++;
		xemXX_01.setAttribute('id',iNextTid);
		xemXX_01.setAttribute('parent','LN_01');
		xemXX_01.setAttribute('weight',99);
		if (p_sSentinel)
			xemXX_01.setAttribute('sentinel',p_sSentinel);
		if (pa_text['tagname'] == 'IM_01')
			xemXX_01.setAttribute('tempimage',pa_text['textcontent']);
		else
			xemXX_01.textContent = pa_text['textcontent'];
		xemLN_01.appendChild(xemXX_01);
		this._iexpectLastTid = iNextTid;
		return xemLN_01;
	}
	/* ---------------------------------------------------------------------------------------------- */
	_get_bounding_sLVTag()
	{
		let r_sLV_XX = null;
		if (this._eATL.hasAttribute('sentinel'))
		{
			if (this._eATL.getAttribute('sentinel') == 'LV_HX_END')
				r_sLV_XX 	= this._xpp_eATL.parentElement.nodeName;
			else
				r_sLV_XX	= this._xpp_sTag;
		}
		return r_sLV_XX;
	}
	/* ---------------------------------------------------------------------------------------------- */
	fork_adjacent(pa_text)
	{
		
		let sBoundingLVTag	= '';
		
		switch (pa_text['tagname'])
		{
			case 'HX_01'	:
			case 'TT_01'	:
			case 'PR_01'	:
			case 'IM_01'	: // LN_01->{HX,TT,PR,IM}_01
											let xemLN_XX_01				= null;
											sBoundingLVTag				= this._get_bounding_sLVTag();
											xemLN_XX_01 					= this.create_xemLN_XX_01(pa_text,sBoundingLVTag,this._iLastTid,sBoundingLVTag);

											return xemLN_XX_01;
											
			case 'LV_01'	:
			case 'LV_02'	:
			case 'LV_03'	:
			case 'LV_04'	:
			case 'LV_05'	: // LV_0X->LN_01->{HX,...}_01
											let xemLV_0X					= null;
											let xemLN_XX_01Begin	= null;
											let xemLN_XX_01End		= null;
											let iNextTid					= 0;
											sBoundingLVTag				= this._get_bounding_sLVTag();
											let sLVTag 						= pa_text['tagname']; // new LV_XX tag 
											xemLV_0X							= this._xmldoc.createElement(sLVTag);
											iNextTid 							= this._iLastTid+1;
											xemLV_0X.setAttribute('id',iNextTid);
											xemLV_0X.setAttribute("parent",sBoundingLVTag);
											xemLV_0X.setAttribute("weight",1);
											this._iexpectLastTid = iNextTid;
											
											pa_text['tagname'] 		= 'HX_01';
											xemLN_XX_01Begin 			= this.create_xemLN_XX_01(pa_text,sLVTag,this._iexpectLastTid,"LV_HX_BEGIN");
											pa_text['textcontent']= '';
											xemLN_XX_01End 				= this.create_xemLN_XX_01(pa_text,sLVTag,this._iexpectLastTid,"LV_HX_END");

											xemLV_0X.append(xemLN_XX_01Begin);
											xemLV_0X.append(xemLN_XX_01End);
											
											return xemLV_0X;
											
											
			default: 				console.log('forkadjacent:No match');
											break;
		}
		return null;
	}
	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
}
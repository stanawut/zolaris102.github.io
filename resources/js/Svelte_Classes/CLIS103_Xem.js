import { g_tag_level,g_tag,g_tag_leaf } from '../Svelte_AllConstants/ConstantSet1.js';
export default class CLIS103_Xem
{
	/* ---------------------------------------------------------------------------------------------- */
	static _is_defined_and_not_null(p_eXml)
	{
		if (typeof p_eXml !== "undefined") 
			if (!p_eXml) return false;
			else return true;
		return false;
	}
	/* ---------------------------------------------------------------------------------------------- */
	static get_leaf_data_LV(p_xmldoc,p_iactiveTid)
	{	// eATL element AcTive Leaf
		let eATL 							= p_xmldoc.getElementById(p_iactiveTid);
			
		let	_sbp_eATL					= null;
		let _sbl_eATL					= null;
		let	_xpp_eATL					=	null;
		let	_xpp_iTid					= 0;
		let	_xpp_sTag					= '';
		let	_xpp_sTextContent	= '';
		let	_xpp_sSubLevel		= '';
		
		_xpp_eATL							= eATL.parentElement.parentElement;
		_xpp_iTid							= _xpp_eATL.getAttribute('id');
		_xpp_sTag							= _xpp_eATL.nodeName;
		_xpp_sTextContent			= _xpp_eATL.firstElementChild.firstElementChild.textContent;
		if (eATL.textContent == '')
			_xpp_sSubLevel			= _xpp_sTag;
		else
			_xpp_sSubLevel			= g_tag[_xpp_sTag]['sublevel'];
			
		if (eATL.parentElement.nextElementSibling)
		{
				_sbp_eATL					= eATL.parentElement.nextElementSibling;
				_sbl_eATL					= eATL.parentElement.nextElementSibling.firstElementChild;
				
		}
		return {
			_xpp_sbp						:_sbp_eATL,
			_xpp_iTid						:_xpp_iTid,
			_xpp_sTag						:_xpp_sTag,
			_xpp_sTextContent		:_xpp_sTextContent,
			_xpp_sSubLevel			:_xpp_sSubLevel,
			_sbp_								: _sbp_eATL,
			_sbl_								:_sbl_eATL,
		};
	}
	/* ---------------------------------------------------------------------------------------------- */
	//_xpp_	=>	_xxp_		=>	eATL		
	//LV_0X	=>	LN_01	=>	Leaf[iactiveTid:HX,TT,PR,IM_01] = _xpp_.lastEC{LN_01}.firstEC{HX}
	//			=> 	LN_01	=>	Leaf
	//			=>	...
	/* ---------------------------------------------------------------------------------------------- */
	static is_sentinel_begin_HX(p_xmldoc,p_iactiveTid)
	{
		/*
		let eATL			= p_xmldoc.getElementById(p_iactiveTid); // HX
		let _xpp_eATL	= eATL.parentElement.parentElement;  // parent LV of parent LN of HX
		if (_xpp_eATL.firstElementChild.firstElementChild.getAttribute('id') == p_iactiveTid)
			return true;
		return false;
		*/
		if (p_xmldoc.getElementById(p_iactiveTid).hasAttribute('sentinel'))
			return (p_xmldoc.getElementById(p_iactiveTid).getAttribute('sentinel') == 'LV_HX_BEGIN');
		return false;
	}
	/* ---------------------------------------------------------------------------------------------- */
	//_xpp_	=>	_xxp_		=>	eATL		
	//LV_0X	=>	LN_01	=>Leaf
	//			=>	LN_01	=>leaf
	//			=>	...
	//			=>	LN_01	=>Leaf[iactiveTid:HX,TT,PR,IM_01] = _xpp_.lastEC{LN_01}.firstEC{HX}
	/* ---------------------------------------------------------------------------------------------- */
	static is_sentinel_end_HX(p_xmldoc,p_iactiveTid)
	{
		/*
		let eATL			= p_xmldoc.getElementById(p_iactiveTid); // HX
		let _xpp_eATL	= eATL.parentElement.parentElement; // parent LV of parent LN of HX 
		if (_xpp_eATL.lastElementChild.firstElementChild.getAttribute('id') == p_iactiveTid)
			return true;
		return false;
		*/
		if (p_xmldoc.getElementById(p_iactiveTid).hasAttribute('sentinel'))
			return (p_xmldoc.getElementById(p_iactiveTid).getAttribute('sentinel') == 'LV_HX_END');
		return false;
	}
	/* ---------------------------------------------------------------------------------------------- */
}
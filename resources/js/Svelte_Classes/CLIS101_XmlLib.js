import { writable } 																	from 'svelte/store';
import CLIS101_XmlCat																	from './CLIS101_XmlCat.js';
import CLIS101_Xem 																		from './CLIS101_Xem.js'; // CREATE XEM
import CXem 			 																		from './CLIS103_Xem.js'; // GET INFO XEM
import * as ALib1 																		from '../AllShareLibs/lib1.js';
import { g_tag,g_tag_level,g_tag_leaf,g_style_text } 	from '../Svelte_AllConstants/ConstantSet1.js';

/* ------------------------------------------------------------------------------------------------ */
export default class CLIS101_XmlLib extends CLIS101_XmlCat
{
	/* ---------------------------------------------------------------------------------------------- */
	constructor()
	{
		super();
		this.aHX_01	= [];
		this.aHX_TT = Array();
		this.aTT_PR = Array();
	}
	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	_gen_aHX_TT_and_aTT_PR()
	{
		let key 						=	'';
		var index						=	0	;

		var stackHX 				= [];
		var stackTT					= [];
		var iActiveHX				= 0	;
		var iActiveTT				= 0	;
		var iTid						= 0	;
		
		var j = 0;
		for (let i=0; i < this._aleaf.length; i++)
		{
			iTid = this._aleaf[i]['tid'];
			if (this._aleaf[i]['sentinel'] == 'LV_00')
			{
				if (this._aleaf[i]['tagname'] == 'HX_01')
				{
					this.aHX_01.push({id:iTid,title:this._aleaf[i]['title']});
					stackHX.push(iTid);
					this.aHX_TT[iTid] = [];
				}
				if (this._aleaf[i]['tagname'] == 'TT_01')
				{
					iActiveHX	=	stackHX.pop();
					this.aHX_TT[iActiveHX].push({id:iTid,title:this._aleaf[i]['title']}); 
					stackHX.push(iActiveHX);
					stackTT.push(iTid);
					this.aTT_PR[iTid] = [];
				}
				if (this._aleaf[i]['tagname'] == 'PR_01')
				{
					iActiveTT = stackTT.pop();
					this.aTT_PR[iActiveTT].push({id:iTid,title:this._aleaf[i]['title']});
					stackTT.push(iActiveTT);
				}
			}
		}
	}
	/* ---------------------------------------------------------------------------------------------- */
	buildLeafData()
	{
		let doc_root = this._xmldoc.getElementById('0');
		this.members_debug();
		this.append_hem_root(this._htmdoc,null);
		
		this.traverseXml2LeafData(this._htmdoc,doc_root,'0',this._aleaf);
	//this.aleaf_debug();
		this._gen_aHX_TT_and_aTT_PR();
	}
	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
}
/* ------------------------------------------------------------------------------------------------ */

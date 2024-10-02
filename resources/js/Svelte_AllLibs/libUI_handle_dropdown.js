import { get } from 'svelte/store';
/* ------------------------------------------------------------------------------------------------ */
export function handleDropdownFileList_selection(e,p_sd_cat_xid,file_id_prefix,fn)
{
	let tmp_id 	= e.target.id												;	// fileid_#
	let tmp_xid =	tmp_id.replace(file_id_prefix,'')	; // #
	if (isNaN(tmp_xid) || tmp_xid == '')
	{
			console.log('NaN:'+tmp_xid);
	}
	else 
	{
		let cat_xid = get(p_sd_cat_xid);
		if (cat_xid !== tmp_xid)
		{
			p_sd_cat_xid.set(tmp_xid);
			console.log('libUI_handle_dropdown:1',document.getElementById(tmp_id).innerHTML);
			//document.getElementById('LIST_HX').innerHTML = '';
			//document.getElementById('LIST_TT').innerHTML = '';
			//document.getElementById('LIST_PR').innerHTML = '';
			fn(e);
			// LIST_FILES is binded to this dropdown for cat or lib files selection
			// cat: will use DOCUMENT_ROOT to display attachement location
			// lib: will use LIST_HX,LIST_TT,LIST_PR to navigate for attachement location
			// for cat:it will display xml cat document for attached doc file after cat file is selected
			// for lib:it will display 3 level dropdown HX,TT,PR consecutively after lib file is selected
		}
		else
		{
			console.log('xx:same');
		}
	}
}
/* ------------------------------------------------------------------------------------------------ */
export function handleDropdownFileLib_HXList(e,p_active_hx_id,p_dummy,fn)
{
	if (isNaN(event.target.id) || event.target.id == '')
	{
		console.log('NaN:'+event.target.id);
	}
	else 
	{
		if (p_active_hx_id == e.target.id)
			return;
		else
		{
			p_active_hx_id = e.target.id;
			document.getElementById('LIST_TT').innerHTML = '';
			document.getElementById('LIST_PR').innerHTML = '';
			fn(e);
		}
	}
}
/* ------------------------------------------------------------------------------------------------ */
export function handleDropdownFileLib_TTList(e,p_active_tt_id,p_dummy,fn)
{
	if (isNaN(event.target.id) || event.target.id == '')
	{
		console.log('NaN:'+event.target.id);
	}
	else 
	{
		if (p_active_tt_id == e.target.id)
			return;
		else
		{
			p_active_tt_id = e.target.id;
			document.getElementById('LIST_PR').innerHTML = '';
			fn(e);
		}
	}
}
/* ------------------------------------------------------------------------------------------------ */
export function handleDropdownFileLib_PRList(e,p_active_pr_id,p_dummy,fn)
{
	console.log('tgid:atid:'+e.target.id+','+p_active_pr_id);
	if (isNaN(e.target.id) || e.target.id == '')
	{
		console.log('NaN:'+e.target.id);
	}
	else 
	{
		if (p_active_pr_id == e.target.id)
			return;
		else
		{
			fn(e);
			console.log("Do attached");
		}
	}
}
/* ------------------------------------------------------------------------------------------------ */

import { writable, derived, get } from 'svelte/store';

export const sdgb_src_lang									= writable(0); // dropdown lang 'source in' name[source-in] id[source-in-uni,	th,en,ch,mul]
export const sdgb_wrt_lang									= writable(0); // dropdown lang 'write in' 	name[write-in] 	id[write-in-uni,	th,en,ch,mul]
export const sdgb_default_emid1grouplang		= writable(0);

export const sd_emid1and2xsd								= writable(0);
export const sd_emid1and2xsdgrouplang				= writable(0);


export const sd_tid 												= writable(0); // DOCUMENT_ROOT data tag id=1,2,3,...
export const sd_xid 												= writable(''); // xml file id=1,2,3,... for doc:document may {user}_{file_id} composite
export const sd_cat_xid											= writable(0);	// xml file id=1,2,3,... for cat:category
export const sd_cat_tid											= writable(0);
export const sd_cat_bind_tid								= writable(0);
					
export const sd_doc_xid											= writable(0);	// xml file id=1,2,3,... for cat:category
export const sd_doc_tid											= writable(0);
export const sd_doc_bind_tid								= writable(0);
					
export const sd_emid1grouplang 							= writable(''); // menu id ex. emenur{}_{}
export const sd_emid1edit										= writable(''); 
export const sd_emid2insert 								= writable(''); // menu id ex. xmenurR_C, emenuR_C
	
export const sd_xmenur1 										= writable(0); // 0-change,	1-save,	2-view,	3-cat,4-bkx,			5-?,			6-lib,
export const sd_xmenur2 										= writable(0); // 0-.,			1-xx,		2-th,		3-en,	4-ch,				5-change,	6-view,
export const sd_xmenur3 										= writable(0); // 0-..,			1-xx,		2-th,		3-en,	4-ch,				5-change,	6-view,
										
export const sd_emenur1 										= writable(0); // 0-uni,		1-th,		2-en,		3-ch,	4-all(mul),	5-{...},	6-?,
export const sd_emenur2 										= writable(0); // 0-change,	1-hx,		2-tt,		3-pr,	4-cd,				5-dm,			6-+add object image,
export const sd_emenur3 										= writable(0); // 0-,1-,2-,3-,4-,5-,6-,
						
export const sd_dropdown_cat_xid						= writable(0); // dropdown file id selected

export const sd_cat_00600_prevcatid					= writable(0); // previous catid in list cat for setting status
export const sd_00600_prev_file_id					= writable(0); //

function createMapStore(initial)
{
	const store 	= writable(initial);
	const set	 		= (key,value) => store.update(m=>Object.assign({},m,{[key]:value}));
	const results = derived(store,s => ({
										keys		: Object.keys(s),
										values	: Object.values(s),
										entries	: Object.entries(s),
										set(k,v)
										{
											store.update(s=>Object.assign({},s,{[k]:v}));
										},
										remove(k)
										{
											store.update(s=>{
													delete s[k];
													return s;
											});
										},
									}));
									
	return	{ 
						subscribe: results.subscribe,
						set: store.set,
	}
}
export const sd_ctx = createMapStore({lang:'all',tag:'pr',type:'text'});



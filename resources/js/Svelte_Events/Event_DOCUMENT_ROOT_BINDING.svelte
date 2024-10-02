<script>
import { onMount, createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
/* ------------------------------------------------------------------------------------------------ */
function _is_xtag_IMG(p_tid)
{
	return (document.getElementById(p_tid).nodeName == 'IMG');
}
/* ------------------------------------------------------------------------------------------------ */
function _get_tid_from_xtag_IMG(p_tid)
{
	return (p_tid.substring(0,p_tid.indexOf('_')));
}
/* ------------------------------------------------------------------------------------------------ */
let tid_in_document_root;
/* ------------------------------------------------------------------------------------------------ */
const handle_document_root_event_dispatcher = (e) =>
{
	
	let xTag = '';
	tid_in_document_root = e.target.id;
	if (_is_xtag_IMG(tid_in_document_root)) 
	{
		tid_in_document_root = _get_tid_from_xtag_IMG(tid_in_document_root);
		xTag = 'IMG';
	}
	// reference by other with => e.detail.any_tid
	dispatch('interject',{any_tid:tid_in_document_root});
}
/* ------------------------------------------------------------------------------------------------ */
onMount(()=>
{
	const document_root = document.querySelector('#DOCUMENT_ROOT');
	document_root.addEventListener('click',handle_document_root_event_dispatcher);
});
/* ------------------------------------------------------------------------------------------------ */
</script>
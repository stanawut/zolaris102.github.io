import * as LLibUI from './supporting_blade_form_inputs.js';
import * as ALib1 from '../AllShareLibs/lib1.js';
document.addEventListener('DOMContentLoaded', 
	function() 
	{
			const hemFlashMessage 								= document.createElement('div');
			hemFlashMessage.setAttribute('id','flashmessage');
			hemFlashMessage.style.backgroundColor = 'lightgreen';
			hemFlashMessage.style.padding 				= '10px';
			hemFlashMessage.style.textAlign 			= 'center';
			hemFlashMessage.innerText 						= 'flash message';

			document.body.appendChild(hemFlashMessage);
			/* ------------------------------------------------------------------------------------------ */
			window.EventTarget.prototype.addDelegatedListener = 
				function(type,delegateSelector,listener)
				{
					this.addEventListener(type,
						function(event)
						{
							if (event.target && event.target.matches(delegateSelector))
							{	
								listener.call(event.target, event)
							}
						});
				};
			/* ------------------------------------------------------------------------------------------ */
			function uncheckRadio(radioGroupName)
			{
				let a_e = document.getElementsByName(radioGroupName);
				for (let i = 0; i < a_e.length; i++)
				{
					a_e[i].setAttribute('checked',false);
				}
			}
			/* ------------------------------------------------------------------------------------------ */
			function attachRadioEvent(p_sTargetDivId,p_sTargetElementByName)
			{
				let targetDivElement = document.getElementById(p_sTargetDivId);
				targetDivElement.addDelegatedListener("click","input[name='"+p_sTargetElementByName+"']",
					function(event,p_sTargetElementByName)
					{
						//uncheckRadio(p_sTargetElementByName);this.setAttribute("checked",true);not required
						let doc_lang = this.getAttribute('value');
						let sContainerInputTextId = 'container_input_text';
						document.getElementById('flashmessage').innerText=this.getAttribute('value');
						LLibUI._attach_input_document_title(sContainerInputTextId,doc_lang);
					});
			}
			/* ------------------------------------------------------------------------------------------ */
			function preSubmit(e)
			{
				let sTitle = '';
				if (ALib1._is_input_text_3_lang())
				{
					sTitle = ALib1._get_textcontent_encap_3_lang(
													document.getElementById('input_text_3_lang_sub_th').value,
													document.getElementById('input_text_3_lang_sub_en').value,
													document.getElementById('input_text_3_lang_sub_ch').value
												);
				}
				else
				{
					sTitle = document.getElementById('input_text_1_lang_sub_xx').value;
				}
				document.getElementById('title').setAttribute("value",sTitle);
				document.getElementById(event.target.id).submit();
				return false;
				//targetFormElement.submit();
			}
			/* ------------------------------------------------------------------------------------------ */
			function attachFormSubmitEvent(p_sTargetFormId,p_sTargetElementById)
			{
				let targetFormElement = document.getElementById(p_sTargetFormId);
				targetFormElement.addEventListener('submit',preSubmit,false);
			}
			/* ------------------------------------------------------------------------------------------ */
			attachRadioEvent("document_lang","document_lang");
			attachFormSubmitEvent('form_xxxxx_xxxxx_00100_xxxx','');
			/* ------------------------------------------------------------------------------------------ */
	});


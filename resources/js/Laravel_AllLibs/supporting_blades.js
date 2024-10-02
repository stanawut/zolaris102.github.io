document.addEventListener('DOMContentLoaded', 
	function() 
	{
			const customElement 								= document.createElement('div');
			customElement.setAttribute('id','flashmessage');
			customElement.innerText 						= 'public.build.assets.my-js';
			customElement.style.backgroundColor = 'lightgreen';
			customElement.style.padding 				= '10px';
			customElement.style.textAlign 			= 'center';

			document.body.appendChild(customElement);
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
			/* ----- */
			function uncheckRadio(radioGroupName)
			{
				let a_e = document.getElementsByName(radioGroupName);
				for (let i = 0; i < a_e.length; i++)
				{
					a_e[i].setAttribute('checked',false);
				}
			}
			/* ----- */
			function attachRadioEvent(targetDivId,targetElementByName)
			{
				let targetDivElement = document.getElementById(targetDivId);
				targetDivElement.addDelegatedListener("click","input[name='"+targetElementByName+"']",
					function(event,targetElementByName)
					{
						//uncheckRadio(targetElementByName);
						//this.setAttribute("checked",true);
						console.log(this.getAttribute('value'));
						document.getElementById('flashmessage').innerText=this.getAttribute('value');
					});
			}
			/* ------------------------------------------------------------------------------------------ */
			attachRadioEvent("document_lang","document_lang");
			/* ------------------------------------------------------------------------------------------ */
	});


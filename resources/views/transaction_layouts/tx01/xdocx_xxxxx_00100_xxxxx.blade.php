<x-app-layout>
{{-- @push('my_script') --}}
<!--script src="{{ asset('build/assets/supporting_blades.js') }}"></script-->
<!--script src="{{ asset('venus_js/supporting_blade_events.js') }}"></script-->
<!--script src="{{ asset('venus_js/supporting_blade_form_inputs.js') }}"></script-->
{{-- @endpush --}}
 <x-slot name="header">
 </x-slot>

<div class="text-center b-body-tertiary">
	<p class="fw-semibold">
		{{ __('xdocx_xxxxx_00100_xxxxx') }}
	</p>
</div>

<div class="card">
	<div class="card-body">
		<form id="form_xxxxx_xxxxx_00100_xxxx" method="post" action="{{ route('xdocx_xxxxx_00100_store') }}" class="mt-6 space-y-6">
				@csrf
				<div class="form-group">
						@include('transaction_layouts.tx01.partials.section_document_lang')
						@include('transaction_layouts.tx01.partials.section_document_title')
					<br>
					<div class="form-group">
							<button type="submit" name="commit" value=1 class="btn btn-primary">CREATE</button>
							<button type="submit" name="commit" value=0 class="btn btn-primary">cancel</button>
					</div>
				</div>
		</form>	
	</div>
</div>
								
</x-app-layout>

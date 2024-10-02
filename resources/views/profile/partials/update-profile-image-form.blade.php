<section class="space-y-6">
    <header>
        <h2 class="text-lg font-medium text-gray-900">
            {{ __('Update Profile Image') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600">
            {{ __('Avatar image(s)') }}
        </p>
    </header>
		
		<form method="post" action="{{ route('mercury.store_profile') }}" enctype="multipart/form-data">
			@csrf
		
        <div class="mt-6">
            <x-input-label for="title" :value="__('Title')" />
            <x-text-input id="title" name="title" type="text" class="mt-1 block w-full" :value="old('name', $user->name)" required autofocus autocomplete="title" />
            <x-input-error class="mt-2" :messages="$errors->get('title')" />
        </div>


        <div class="mt-6">
            <x-input-label for="description" :value="__('Description')" />
            <x-text-input id="description" name="description" type="text" class="mt-1 block w-full" :value="old('name', $user->name)" required autofocus autocomplete="description" />
            <x-input-error class="mt-2" :messages="$errors->get('title')" />
        </div>
				
				<div class="mt-6">
					<input type="file"  name="file_to_upload" id="file_to_upload" multiple credits="false"/>
				</div>
				
				<div class="flex items-center gap-4">
            <x-primary-button>{{ __('UPLOAD NOW!') }}</x-primary-button>
				</div>
				
		</form>
		
		<script>
		//ItF:Input type File
		
		document.addEventListener('DOMContentLoaded', function() {
			
			FilePond.registerPlugin(FilePondPluginImagePreview);
			const hemItF = document.querySelector('input[type="file"]')		;
			const pond 		= FilePond.create(hemItF)												;
			FilePond.setOptions({
				server: {
									process:'./Mercury/upload_tempimage',
									fetch:null,
									revert:'./Mercury/delete_tempimage',
									headers: { 'X-CSRF-TOKEN':'{{csrf_token()}}'}
				},
			});
			
		});
		</script>		
		
</section>


<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Gridboard'.' '.Auth::user()->name) }}
        </h2>
    </x-slot>

		<div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                </div>
								<div class="grid grid-cols-3 gap-3 roiunded-lg text-center font-mono text-sm font-bold leading-6 text-white">
									<!-- Row 1 ---------------------------------------------------------------------- -->
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xdocx_xxxxx_00600_list') }}">
											&#x2630;&nbsp;Docs
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xdocx_xxxxx_00100_form') }}">
											&#x2726;&nbsp;Doc
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xdocx_xxxxx_00200_recent') }}">
											&#x270E;&nbsp;Doc
										</a>
									</div>
									<!-- Row 2 ---------------------------------------------------------------------- -->
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xfrmx_xstrx_00600_xxxxx-dropdown',['user_id'=>Auth::id()]) }}">
											&#x2630;&nbsp;Fills
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xfilx_xxxxx_00100_xxxxx-tmp') }}">
											&#x2726;&nbsp;Fill
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xfilx_xxxxx_00200_recent') }}">
											&#x270E;&nbsp;Fill..
										</a>
									</div>
									<!-- Row 3 ---------------------------------------------------------------------- -->
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xcatx_xxxxx_00600_list') }}">
											&#x2630;&nbsp;Cats
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xcatx_xxxxx_00100_form') }}">
											&#x2726;&nbsp;Cat
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-300">
										<a href="{{ route('xcatx_xxxxx_00200_recent') }}">
											&#x270E;&nbsp;Cat
										</a>
									</div>
									<!-- Row 4 ---------------------------------------------------------------------- -->
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-500">
										<a href="{{ route('xfrmx_xxxxx_00600_list') }}">
											&#x2630;&nbsp;Forms
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-500">
										<a href="{{ route('xfrmx_xxxxx_00100_form') }}">
											&#x2726;&nbsp;Form
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-500">
										<a href="{{ route('xfrmx_xxxxx_00200_recent') }}">
											&#x270E;&nbsp;Form
										</a>
									</div>
									<!-- Row 5 ---------------------------------------------------------------------- -->
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-500">
										<a href="{{ route('xlibx_xxxxx_00600_list') }}">
											&#x2630;&nbsp;Libs
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-500">
										<a href="{{ route('xlibx_xxxxx_00100_form') }}">
											&#x2726;&nbsp;Lib
										</a>
									</div>
									<div class="p-4 rounded-lg shadow-lg dark:bg-indigo-900 bg-indigo-500">
										<a href="{{ route('xlibx_xxxxx_00200_recent') }}">
											&#x270E;&nbsp;Lib
										</a>
									</div>
									<!-- Row End -------------------------------------------------------------------- -->



							</div>
            </div>
        </div>
    </div>
</x-app-layout>

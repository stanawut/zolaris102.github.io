<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
						@if (Request::is('Venus/*'))
							@if (	Request::is('Venus/xdocx_xxxxx_00100_xxxxx') 	|| 
										Request::is('Venus/xcatx_xxxxx_00100_xxxxx') 	|| 
										Request::is('Venus/xfrmx_xxxxx_00100_xxxxx') 	|| 
										Request::is('Venus/xlibx_xxxxx_00100_xxxxx')	||
										Request::is('Venus/xstrx_xfrmx_00100_xxxxx') )
												{{-- comment --}}
								@vite(['resources/css/app_lis.scss', 'resources/js/app_lis.js'])
								@vite(['resources/js/Laravel_AllLibs/supporting_blade_events.js'])
							@else	
								@vite(['resources/css/app_lis.scss', 'resources/js/app_lis.js'])
							@endif
						@elseif (Request::is('Mars/*'))
							@vite(['resources/css/apb_lis.scss', 'resource/js/apb_lis.js'])
						@elseif (Request::is('Earth/*'))
								@vite(['resources/css/app_lis.scss', 'resources/js/app_lis.js'])
								@vite(['resources/js/Laravel_AllLibs/supporting_blade_events.js'])
						@else
							@vite(['resources/css/app.css', 'resources/js/app.js'])
						@endif
						{{-- @stack('my_script') --}}
    </head>
    <body class="font-sans antialiased">
        <div class="min-h-screen bg-gray-100">
						@if (Request::is('Venus/*') || Request::is('Earth/*'))
							@include('layouts.app_lis_navigation')
							<!-- Page Heading -->
							@if (isset($header))
									<header>
											<div class="text-center bg-body-tertiary">
												<h5 class="mb-3">{{ $header }}</h5>
											</div>											
											
									</header>
							@endif
						@else
							@include('layouts.navigation')
							<!-- Page Heading -->
							@if (isset($header))
									<header class="bg-white shadow">
											<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
													{{ $header }}
											</div>
									</header>
							@endif
						@endif

            <!-- Page Content -->
            <main>
                {{ $slot }}
            </main>
        </div>
    </body>
		

		
</html>

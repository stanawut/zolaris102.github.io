import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
								'resources/js/app.js',
                'resources/css/app_lis.scss',
                'resources/js/app_lis.js',

            ],
            refresh: true,
        }),
				svelte({
					/* plugin option */
				}),
    ],
});

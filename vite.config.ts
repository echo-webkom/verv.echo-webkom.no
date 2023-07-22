import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			disable: process.env.NODE_ENV === 'development',
			manifest: {
				name: 'verv - echo Webkom',
				short_name: 'verv - echo Webkom',
				start_url: 'https://verv.echo-webkom.no',
				lang: 'nb',
				orientation: 'any',
				dir: 'ltr',
				scope: '/',
				icons: [
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				],
				theme_color: '#0d0e0e',
				background_color: '#0d0e0e',
				display: 'standalone'
			}
		})
	]
});

import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom'
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate'
		})
	]
});

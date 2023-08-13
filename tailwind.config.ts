import forms from '@tailwindcss/forms';
import { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				footer: 'var(--footer)',
				input: 'var(--input)',
				'nav-text': {
					DEFAULT: 'var(--nav-text)',
					hover: 'var(--nav-text-hover)'
				},
				echo: {
					yellow: 'var(--echo-yellow)'
				},
				border: 'var(--border)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [forms, animate]
} satisfies Config;

export default config;

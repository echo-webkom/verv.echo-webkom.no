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
				black: {
					DEFAULT: '#000',
					ebony: 'var(--black-ebony)',
					crow: 'var(--black-crow)',
					oil: 'var(--black-oil)',
					ink: 'var(--black-ink)',
					jet: 'var(--black-jet)',
					dull: 'var(--black-dull)'
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

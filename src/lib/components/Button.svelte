<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';

	const button = cva('rounded-lg border-border border', {
		variants: {
			intent: {
				primary: ['bg-black-jet', 'text-white', 'hover:bg-black-dull'],
				secondary: ['bg-white', 'text-gray-800', 'border-gray-400', 'hover:bg-gray-100']
			},
			size: {
				small: ['text-sm', 'py-1', 'px-2'],
				medium: ['text-base', 'py-2', 'px-4']
			}
		},
		defaultVariants: {
			intent: 'primary',
			size: 'medium'
		}
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {}

	/**
	 * For Svelte components, we recommend setting your defaultVariants within
	 * Svelte props (which are `undefined` by default)
	 */
	export let intent: $$Props['intent'] = 'primary';
	export let size: $$Props['size'] = 'medium';
</script>

<button {...$$props} class={button({ intent, size, class: $$props.class })}>
	<slot />
</button>

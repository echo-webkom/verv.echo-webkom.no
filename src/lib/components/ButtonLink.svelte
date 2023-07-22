<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { VariantProps } from 'class-variance-authority';
	import { button } from '$lib/variants';

	interface $$Props extends HTMLAnchorAttributes, VariantProps<typeof button> {}

	export let intent: $$Props['intent'] = 'primary';
	export let size: $$Props['size'] = 'medium';
</script>

<a {...$$props} href={$$props.href} class={button({ intent, size, class: $$props.class })}>
	<slot />
</a>

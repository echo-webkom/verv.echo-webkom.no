<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import clsx from 'clsx';

	interface $$Props extends HTMLLabelAttributes {}
</script>

<label {...$$props} class={clsx('text-sm font-medium uppercase', $$props.class)}>
	<slot />
</label>

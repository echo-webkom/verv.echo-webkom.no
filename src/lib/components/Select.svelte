<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import clsx from 'clsx';

	interface $$Props extends HTMLSelectAttributes {}
</script>

<select {...$$props} class={clsx('bg-input border rounded-lg px-3 py-2', $$props.class)}>
	<slot />
</select>

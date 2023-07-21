<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import clsx from 'clsx';

	interface $$Props extends HTMLInputAttributes {}
</script>

<input {...$$props} class={clsx('bg-black-jet border rounded-lg px-3 py-2', $$props.class)} />

<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import clsx from 'clsx';

	interface $$Props extends HTMLTextareaAttributes {}
</script>

<textarea {...$$props} class={clsx('bg-input border rounded-lg px-3 py-2', $$props.class)} />

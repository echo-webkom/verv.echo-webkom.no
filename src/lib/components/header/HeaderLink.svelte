<script lang="ts">
	import { cn } from '$lib/cn';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = HTMLAnchorAttributes;

	let { class: className, children, ...props }: Props = $props();
</script>

<a class={cn('px-2 font-medium hover:underline', className)} {...props}>{@render children?.()}</a>

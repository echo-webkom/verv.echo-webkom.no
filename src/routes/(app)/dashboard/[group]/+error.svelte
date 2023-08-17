<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="text-center py-24">
	<h1 class="text-4xl font-bold py-4">
		{$page.status}
	</h1>

	{#if $page.error}
		<p class="mb-3">
			{$page.error.message}
		</p>
	{/if}

	<a class="underline hover:no-underline underline-offset-2" href="/dashboard"
		>Tilbake til dashbordet</a
	>
</div>

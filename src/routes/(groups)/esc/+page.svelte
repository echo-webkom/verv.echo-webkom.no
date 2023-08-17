<script lang="ts">
	import ButtonLink from '$lib/components/ButtonLink.svelte';
</script>

<div class="text-center flex flex-col items-center justify-center gap-3 min-h-[70vh]">
	<div class="space-y-6">
		<h1 class="text-5xl font-bold">Søk verv i echo Sports Club</h1>
		<p class="max-w-md mx-auto text-neutral-200" />
		<ButtonLink class="w-fit mx-auto" href="/verv/esc" size="large">Klikk her for å søke</ButtonLink
		>
	</div>
</div>

<article class="space-y-4 text-lg pt-10 pb-4">
	<h2 class="text-xl font-semibold">Om oss</h2>

	<h2 class="text-xl font-semibold pt-4">Hvorfor ESC?</h2>

	<h2 class="text-xl font-semibold pt-4">Hvorfor deg?</h2>

	<div>
		<ButtonLink class="w-full" href="/verv/esc">Søk her</ButtonLink>
	</div>

	<h2 class="text-xl font-semibold pt-10">Kontakt oss</h2>
</article>

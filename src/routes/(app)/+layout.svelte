<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex flex-col w-full min-h-screen">
	<Header />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
</div>

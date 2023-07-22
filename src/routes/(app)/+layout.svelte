<script lang="ts">
	import WebkomLogo from '$lib/assets/webkom-logo.png';
	import { session } from '$lib/stores/session';

	export let data;
	const { supabase } = data;

	const handleSignout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
	};
</script>

<header class="flex flex-row items-center p-5 mb-5">
	<a href="/" class="flex justify-center">
		<img class="h-10 w-auto" alt="Webkom logo" src={WebkomLogo} />
	</a>

	<div class="flex-grow" />

	{#if $session}
		<button class="text-sm text-neutral-300 hover:text-white" on:click={handleSignout}>
			Logg ut
		</button>
	{/if}
</header>

<div class="flex flex-col gap-4 max-w-2xl w-full mx-auto md:px-0 px-4">
	<slot />
</div>

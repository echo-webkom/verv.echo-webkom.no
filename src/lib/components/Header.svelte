<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import WebkomLogo from '$lib/assets/webkom-logo.png';
	import { session } from '$lib/stores/session';

	export let supabase: SupabaseClient;

	const handleSignout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
	};
</script>

<div
	class="fixed w-full bg-background/10 hover:bg-background transition-all duration-500 backdrop-blur"
>
	<header class="flex flex-row items-center p-5 max-w-5xl mx-auto">
		<a href="/" class="flex justify-center">
			<img class="h-10 w-auto" alt="Webkom logo" src={WebkomLogo} />
		</a>

		<div class="flex-grow" />

		<nav class="flex flex-row items-center gap-3">
			{#if false}
				<a href="/dashboard" class="text-neutral-300 font-bold hover:text-white">Dashboard</a>
			{/if}

			{#if $session}
				<button class="text-neutral-300 font-bold hover:text-white" on:click={handleSignout}>
					Logg ut
				</button>
			{:else}
				<a href="/login" class="text-neutral-300 font-bold hover:text-white">Logg inn</a>
			{/if}
		</nav>
	</header>
</div>

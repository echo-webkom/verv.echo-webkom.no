<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import WebkomLogo from '$lib/assets/webkom-logo.png';
	import { session } from '$lib/stores/session';
	import { invalidate } from '$app/navigation';

	export let supabase: SupabaseClient;

	const handleSignout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
	};
</script>

<div
	class="sticky top-0 w-full bg-background/10 hover:bg-background transition-all duration-500 backdrop-blur"
>
	<header class="flex flex-row items-center p-5 max-w-5xl mx-auto">
		<a href="/" class="flex justify-center">
			<img class="h-10 w-auto" alt="Webkom logo" src={WebkomLogo} />
		</a>

		<div class="flex-grow" />

		{#if $session}
			<nav class="flex flex-row items-center gap-3">
				<button class="text-nav-text font-bold hover:text-nav-text-hover" on:click={handleSignout}>
					Logg ut
				</button>
			</nav>
		{/if}
	</header>
</div>

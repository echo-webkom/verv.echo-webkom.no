<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import WebkomLogo from '$lib/assets/webkom-logo.png';
	import { page } from '$app/stores';

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

		<nav class="flex flex-row items-center gap-4">
			<a href="https://echo.uib.no/" class="text-nav-text font-bold hover:text-nav-text-hover">
				echo.uib.no
			</a>
			{#if $page.data.session}
				<button class="text-nav-text font-bold hover:text-nav-text-hover" on:click={handleSignout}>
					Logg ut
				</button>
			{/if}
		</nav>
	</header>
</div>

<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { session as sessionStore } from '$lib/stores/session';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	$: sessionStore.set(session);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	const handleSignout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
	};
</script>

<Toaster theme="dark" />

<div class="min-h-screen flex flex-col gap-2">
	{#if session}
		<div class="fixed top-0 right-0 p-5">
			<button on:click={handleSignout}>Logg ut</button>
		</div>
	{/if}

	<slot />

	<footer class="text-center border-t border-white/10 mt-auto py-5">
		<p class="text-sm">
			<a class="text-neutral-500 no-underline hover:underline" href="/dashboard"> Dashboard </a>
		</p>
	</footer>
</div>

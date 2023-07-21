<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

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

{#if session}
	<div class="fixed top-0 right-0 p-5">
		<button on:click={handleSignout}>Logg ut</button>
	</div>
{/if}

<slot />

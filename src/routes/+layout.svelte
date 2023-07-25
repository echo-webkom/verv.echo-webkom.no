<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { session as sessionStore } from '$lib/stores/session';
	import Header from '$lib/components/Header.svelte';
	import type { LayoutData } from './$types';
	import Footer from '$lib/components/Footer.svelte';

	export let data: LayoutData;

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
</script>

<Toaster theme="dark" />

<Header {supabase} />

<slot />

<Footer />

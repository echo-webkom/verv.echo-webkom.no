<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { session as sessionStore } from '$lib/stores/session';
	import Footer from '$lib/components/Footer.svelte';

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
</script>

<svelte:head>
	<title>Verv | echo Webkom</title>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#2b5797" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<Toaster theme="dark" />

<div class="min-h-screen flex flex-col gap-6">
	<div>
		<slot />
	</div>

	<Footer />
</div>

<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import type { LayoutData } from './$types';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export let data: LayoutData;

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

	$: {
		const isAdminPage = $page.url.pathname.startsWith('/dashboard');
		if (browser) {
			document.body.classList.toggle('admin', isAdminPage);
		}
	}
</script>

<Toaster theme="dark" />

<Header {supabase} />

<slot />

<Footer />

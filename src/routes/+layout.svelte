<script lang="ts">
	import '../app.css';
	import { setAuthState } from '$lib/contexts/auth-context';
	import { AuthState } from '$lib/states/auth-state.svelte';

	let { data, children } = $props();

	let authState = new AuthState(data.user, data.session);
	setAuthState(authState);
	$effect.pre(() => {
		authState.session = data.session;
		authState.user = data.user;
	});
</script>

{@render children()}

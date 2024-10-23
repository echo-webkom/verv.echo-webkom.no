<script lang="ts">
	import EchoLogo from '$lib/assets/images/echo-logo.png';
	import { getAuthState } from '$lib/contexts/auth-context';
	import HeaderLink from './HeaderLink.svelte';
	import SignOutButton from './SignOutButton.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let authState = getAuthState();
</script>

<div class="border-b-2 mb-8">
	<header class="flex justify-between items-center max-w-screen-lg mx-auto py-2 px-4">
		<div>
			<a href="/">
				<img class="h-14 w-14" src={EchoLogo} alt="Echo Logo" />
			</a>
		</div>

		<menu class="flex">
			{#if !authState.isAuthenticated}
				<HeaderLink href="/logg-inn">Logg inn</HeaderLink>
			{/if}

			{#if authState.isAuthenticated}
				<HeaderLink href="/profil">Profil</HeaderLink>
				<SignOutButton />
			{/if}
			<ThemeToggle />
		</menu>
	</header>
</div>

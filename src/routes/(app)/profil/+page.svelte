<script lang="ts">
	import { getAuthState } from '$lib/contexts/auth-context';

	let authState = getAuthState();
</script>

<div class="max-w-[600px] mx-auto text-center space-y-4 py-24">
	<h1 class="font-display text-6xl font-semibold mb-8">Profil</h1>

	<p class="text-2xl text-balance text-muted-foreground font-medium">
		{authState.user!.name}
	</p>

	<p class="text-2xl text-balance text-muted-foreground font-medium">
		{authState.user!.email}
	</p>
</div>

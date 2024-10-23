<script lang="ts">
	import { getAuthState } from '$lib/contexts/auth-context';

	let authState = getAuthState();
</script>

<div class="max-w-screen-md mx-auto py-10 space-y-10 px-4">
	<section>
		<h2 class="font-display text-4xl font-semibold mb-6">Profil</h2>

		<div class="flex flex-col gap-4">
			<input
				type="text"
				readonly
				class="px-2 py-1 h-10 text-lg font-medium rounded-lg border-2 bg-background text-foreground w-full"
				value={authState.user!.name}
			/>

			<input
				type="text"
				readonly
				class="px-2 py-1 h-10 text-lg font-medium rounded-lg border-2 bg-background text-foreground w-full"
				value={authState.user!.email}
			/>
		</div>
	</section>

	<section>
		<h2 class="font-display text-4xl font-semibold mb-6">Grupper</h2>

		<p class="text-muted-foreground font-medium text-lg">Du er ikke medlem av noen grupper...</p>
	</section>
</div>

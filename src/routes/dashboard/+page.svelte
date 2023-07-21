<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { applications, session } = data;
</script>

<div class="flex min-h-screen flex-col gap-4 max-w-2xl w-full mx-auto py-24 md:px-0 px-4">
	<h1 class="text-3xl font-bold">Dashboard</h1>
	<p class="text-gray-500">Welcome back, {session.user.email}!</p>

	<div>
		{#each applications as application}
			<div class="flex flex-col gap-2">
				<h2 class="text-xl font-bold">{application.name}</h2>
				<p class="text-gray-500">{application.reason}</p>
			</div>
		{/each}
	</div>
</div>

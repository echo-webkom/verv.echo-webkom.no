<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { groupName, applications } = data;
</script>

<h1 class="text-3xl font-medium">Dashboard for {groupName}</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
	{#if applications.length === 0}
		<p class="text-gray-500 py-4">Ingen søknader enda</p>
	{:else}
		{#each applications as application}
			<div class="bg-white rounded-lg shadow-md p-4">
				<h2 class="text-xl font-medium">{application.name}</h2>
				<p class="text-gray-500">{application.email}</p>
				<p class="text-gray-500">{application.reason}</p>
			</div>
		{/each}
	{/if}
</div>

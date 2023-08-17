<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	const { groupName, applications, isWebkom } = data;

	const group = $page.params.group;
</script>

{#if isWebkom}
	<div
		class="p-4 border-red-500 bg-red-100 text-red-500 font-bold text-lg rounded-md border-2 mb-4"
	>
		<p>Du ser på denne siden som en ADMIN.</p>
	</div>
{/if}

<h1 class="text-3xl font-medium">Dashboard for {groupName}</h1>

{#if applications.length === 0}
	<p class="text-gray-500 py-4">Ingen søknader enda</p>
{:else}
	<div class="space-y-4">
		<div>
			<h2 class="text-2xl font-medium">Søknader</h2>
			<p>Antall søknader: {applications.length}</p>
			<a href="/dashboard/{group}/applications" download="paameldte.csv" class="hover:underline"
				>Last ned som csv</a
			>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each applications as application}
				<div class="bg-white rounded-lg shadow-md p-4">
					<h2 class="text-xl font-medium">{application.name}</h2>
					<p class="text-gray-500">{application.email}</p>
					<p class="text-gray-500">{application.reason}</p>
				</div>
			{/each}
		</div>
	</div>
{/if}

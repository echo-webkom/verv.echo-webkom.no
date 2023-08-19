<script lang="ts">
	import { page } from '$app/stores';
	import clsx from 'clsx';
	import type { PageData } from './$types';

	export let data: PageData;
	const { groupName, applications, isWebkom } = data;

	const group = $page.params.group;

	let expandedRow: string | null = null;

	function handleSearch() {
		const search = document.getElementById('search') as HTMLInputElement;
		const rows = document.querySelectorAll('tbody tr');

		rows.forEach((row) => {
			const name = row.querySelector('td:nth-child(1)')?.textContent?.toLowerCase() ?? '';
			const email = row.querySelector('td:nth-child(2)')?.textContent?.toLowerCase() ?? '';

			name.includes(search.value.toLowerCase()) || email.includes(search.value.toLowerCase())
				? row.classList.remove('hidden')
				: row.classList.add('hidden');
		});
	}

	function formatDate(date: Date) {
		return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	}
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
		<div class="flex flex-col sm:flex-row justify-between py-2 mt-2 gap-y-4">
			<div>
				<h2 class="text-2xl font-medium">Søknader</h2>
				<a
					href="/dashboard/{group}/applications"
					download="paameldte.csv"
					class="text-blue-500 font-semibold hover:underline hover:text-blue-600"
					>Last ned som csv</a
				>
			</div>
			<input
				type="text"
				id="search"
				placeholder="Søk"
				class="border-2 border-gray-300 rounded-md"
				on:input={handleSearch}
			/>
		</div>

		<div class="w-full overflow-x-auto">
			<table class="w-full">
				<caption class="caption-top text-left text-sm py-3 font-light">
					<p>
						Antall søknader: {applications.length}
					</p>
					<p><span class="font-medium">Hint: </span>Trykk på en rad for å se mer.</p>
				</caption>
				<thead>
					<tr class="bg-neutral-100">
						<th class="border p-2 text-left">Navn</th>
						<th class="border p-2 text-left">Epost</th>
						<th class="border p-2 text-left">Dato</th>
						<th class="border p-2 text-left">Søknad</th>
					</tr>
				</thead>
				<tbody>
					{#each applications as application}
						{@const lines = application.reason.split('\n')}

						<tr
							class="align-top cursor-pointer"
							on:click={() =>
								(expandedRow = application.id === expandedRow ? null : application.id)}
						>
							<td class="border p-2">
								<p>
									{application.name}
								</p>
							</td>
							<td class="border p-2">
								<p>
									{application.email}
								</p>
							</td>
							<td class="border p-2">
								<p>
									{formatDate(application.createdAt)}
								</p>
							</td>
							<td class="border p-2">
								<div>
									{#each lines.slice(0, expandedRow === application.id ? lines.length : 3) as line, i}
										<p>
											{line}
											{#if i === 2 && lines.length > 3 && expandedRow !== application.id}
												...
											{/if}
										</p>
									{/each}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}

<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	const { groupName, applications, isWebkom } = data;

	const group = $page.params.group;

	const height = "h-28"

	let expandedRow: string | null = null;

	function handleSearch() {
		const search = document.getElementById('search') as HTMLInputElement;
		const rows = document.querySelectorAll('tbody tr');

		rows.forEach((row) => {
			const name = row.querySelector('td:nth-child(1)')?.textContent?.toLowerCase() ?? '';
			const email = row.querySelector('td:nth-child(2)')?.textContent?.toLowerCase() ?? '';

			name.includes(search.value.toLowerCase()) || 
			email.includes(search.value.toLowerCase()) ? 
			row.classList.remove('hidden') : 
			row.classList.add('hidden');
		});
	}

	function formatDate(date: Date) {
		return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	}

    function toggleRow(id: string) {
		const row = document.getElementById(`row-${id}`) as HTMLTableRowElement;

		if (expandedRow === id) {
			row.classList.remove(height);
			expandedRow = null;
		} else {
			row.classList.add(height);
			expandedRow = id;
		}
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
		
		<div class="flex justify-between py-2 mt-2">
			<div>
				<h2 class="text-2xl font-medium">Søknader</h2>
				<a href="/dashboard/{group}/applications" download="paameldte.csv" class="text-blue-500 font-semibold hover:underline hover:text-blue-600"
					>Last ned som csv</a
				>
			</div>
			<input type="text" id="search" placeholder="Søk" class="border-2 border-gray-300 rounded-md" on:input={handleSearch} />
		</div>

		<p class="caption-top text-sm">Klikk på en rad for å se mer</p>
		
		<div class="w-full overflow-x-scroll">
			<table class="w-full">
				<caption class="caption-bottom text-sm py-3 font-light">
					Antall søknader: {applications.length}
				</caption>
				<thead>
					<tr class="bg-neutral-100">
						<th class="border px-4 py-2 text-left">Navn</th>
						<th class="border px-4 py-2 text-left">Epost</th>
						<th class="border px-4 py-2 text-left">Dato</th>
						<th class="border px-4 py-2 text-left">Søknad</th>
					</tr>
				</thead>
				<tbody>
					{#each applications as application}
						<tr on:click={() => toggleRow(application.id)} class="hover:cursor-pointer">
							<td class="border px-4 py-2">{application.name}</td>
							<td class="border px-4 py-2">{application.email}</td>
							<td class="border px-4 py-2">{formatDate(application.createdAt)}</td>
							<td class="border px-4 py-2">
								<div id="row-{application.id}" class="{height} w-40 overflow-y-scroll">{application.reason}</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}

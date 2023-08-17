<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { format } from '$lib/date';

	export let data: PageData;
	const { applications } = data;
</script>

<div class="space-y-4 max-w-2xl mx-auto w-full">
	<h1 class="text-3xl font-bold">Søkere</h1>
	<p>Velkommen tilbake, {$page.data.session?.user.email}!</p>
	<p>Antall søkere: {applications.length}</p>

	<div>
		<ul class="flex flex-col gap-2">
			{#each applications as { id, name, createdAt }}
				<li>
					<a
						href={`/dashboard/application/${id}`}
						class="group block space-y-2 border border-neutral-600 p-2 rounded"
					>
						<p class="text-xs text-neutral-600">{id}</p>
						<h2 class="text-xl font-bold group-hover:underline">{name}</h2>
						<p>Sendt inn: {format(createdAt)}</p>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import { groupNames } from '$lib/constants';
	import { groupEnum } from '$lib/db/schema';
	import type { PageData } from './$types';

	export let data: PageData;
	const { profile } = data;

	const groups = groupEnum.enumValues
		.map((group) => ({
			title: groupNames[group],
			value: group
		}))
		.sort((a, b) => a.title.localeCompare(b.title));
</script>

<div class="space-y-4 max-w-2xl mx-auto w-full">
	<h1 class="text-3xl font-bold">Dashboard</h1>
	<div>
		<p>Velkommen tilbake, {$page.data.session?.user.email}!</p>
		{#if profile.group}
			<p>Du er med i {groupNames[profile.group]}</p>
		{/if}
	</div>

	<h2 class="text-xl font-bold">Velg ditt dashboard</h2>

	<div>
		<ul class="flex flex-col gap-2">
			{#each groups as { title, value }}
				<li>
					<a
						href={`/dashboard/${value}`}
						class="group block space-y-2 border border-neutral-600 p-4 rounded-md hover:bg-gray-100"
					>
						<h2 class="text-xl font-bold group-hover:underline">{title}</h2>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<script lang="ts">
	import { groupNames } from '$lib/constants';
	import { groupEnum } from '$lib/db/schema';

	const groups = groupEnum.enumValues.map((group) => ({
		title: groupNames[group],
		value: group
	}));
</script>

<h2 class="text-3xl font-semibold text-center mb-5">Søk verv i echo i dag!</h2>

<ul class="space-y-4">
	{#each groups as { title, value }}
		<li>
			<a href="/verv/{value}" class="p-3 border flex flex-col gap-2 hover:bg-gray-900 rounded-md">
				<h2 class="text-xl font-bold underline">{title}</h2>

				<p>Klikk her for å søke verv i {title}</p>
			</a>
		</li>
	{/each}
</ul>

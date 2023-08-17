<script lang="ts">
	import { groupNames } from '$lib/constants';
	import { groupEnum } from '$lib/db/schema';

	import Logo from '$lib/assets/echo-logo.png';

	const groups = groupEnum.enumValues.map((group) => ({
		title: groupNames[group],
		value: group
	}));
</script>

<img class="w-40 h-auto mx-auto hover:scale-110 transition-transform duration-300 ease-in" src={Logo} alt="Webkom-logo" />

<h2 class="text-4xl font-bold text-center mb-12">Søk verv i echo i dag!</h2>

<ul class="grid gap-6 max-w-xl mx-auto lg:grid-cols-3 lg:max-w-6xl lg:gap-10">
	{#each groups as { title, value }}
		<li>
			<a href="/{value}" class="px-3 py-5 h-28 border flex flex-col gap-2 rounded-md group hover:bg-gray-950 transition-colors duration-200">
				<h2 class="text-xl font-bold group-hover:underline">{title}</h2>

				<p>Klikk her for å søke verv i {title}</p>
			</a>
		</li>
	{/each}
</ul>

<script lang="ts">
	import { groupNames } from '$lib/constants';
	import { groupEnum } from '$lib/db/schema';

	import Logo from '$lib/assets/echo-logo.png';

	const groups = groupEnum.enumValues.map((group) => ({
		title: groupNames[group],
		value: group
	}));
</script>

<div class="py-24">
	<img
		class="w-40 h-auto mx-auto hover:scale-110 transition-transform duration-300 ease-in"
		src={Logo}
		alt="Webkom-logo"
	/>

	<h2 class="text-4xl font-bold text-center mb-12">Søk verv i echo i dag!</h2>
</div>

<div class="py-10">
	<h2 class="text-2xl font-bold mb-2">Velg gruppe</h2>
	<p>
		Velg hvilken gruppe du ønsker å søke verv i. Du kan lese mer om hver gruppe ved å trykke på
		gruppenavnet. Husk du kan søke verv i flere grupper!
	</p>

	<ul class="grid gap-6 lg:grid-cols-3 lg:gap-10 py-6">
		{#each groups as { title, value }}
			<li>
				<a
					href="/{value}"
					class="px-3 py-5 max-h-32 h-full border flex flex-col gap-2 rounded-md group hover:bg-gray-950 transition-colors duration-200"
				>
					<h2 class="text-xl font-bold group-hover:underline">{title}</h2>

					<p>Klikk her for å søke verv i {title}</p>
				</a>
			</li>
		{/each}
	</ul>
</div>

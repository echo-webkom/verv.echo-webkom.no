<script lang="ts">
	import { format } from '$lib/date';
	import type { PageData } from './$types';

	export let data: PageData;
	const {
		application: { createdAt, email, fieldOfStudy, id, ip, name, reason, yearOfStudy }
	} = data;

	console.log(reason);
</script>

<div class="flex flex-col gap-4">
	<div>
		<p>Søknad for:</p>
		<h1 class="text-2xl font-bold">{name}</h1>
	</div>

	<div>
		<p>
			Sendt inn: <span class="font-bold">
				{format(createdAt)}
			</span>
		</p>
		<p>
			IP-adresse: <span class="font-bold">
				{ip}
			</span>
		</p>
		<p>
			E-post: <span class="font-bold">
				{email}
			</span>
		</p>
		<p>
			Studieretning: <span class="font-bold">
				{fieldOfStudy}
			</span>
		</p>
		<p>
			Studieår: <span class="font-bold">
				{yearOfStudy}
			</span>
		</p>
	</div>

	<hr />

	<article>
		{#each reason.split('\n') as paragraph}
			<p class="py-1 h-[2.5ch]">{paragraph}</p>
		{/each}
	</article>
</div>

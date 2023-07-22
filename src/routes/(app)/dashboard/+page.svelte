<script lang="ts">
	import type { PageData } from './$types';
	import { session } from '$lib/stores/session';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const { applications } = data;

	$: {
		if (!$session) {
			goto('/');
		}
	}
</script>

<h1 class="text-3xl font-bold">Dashboard</h1>
<p class="text-neutral-200">Welcome back, {$session?.user.email}!</p>

<ul>
	{#each applications as { id, name, email, fieldOfStudy, yearOfStudy, ip, createdAt, reason }}
		<li class="flex flex-col gap-2 border border-neutral-600 px-3 py-6 rounded-lg">
			<p class="text-xs text-neutral-600">{id}</p>

			<h2 class="text-xl font-bold">{name}</h2>
			<p class="text-xs">E-post: {email}</p>
			<p class="text-xs">Studie: {fieldOfStudy}</p>
			<p class="text-xs">Årstrinn: {yearOfStudy}</p>

			<hr class="border-t-neutral-600 my-2" />

			<p class="text-sm">{reason}</p>
		</li>
	{/each}
</ul>

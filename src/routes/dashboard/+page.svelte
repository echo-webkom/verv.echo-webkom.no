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

<!--
[x]: email: string;
[ ]: id: string;
[ ]: ip: string;
[x]: name: string;
[x]: yearOfStudy: "1" | "2" | "3" | "4" | "5";
[x]: fieldOfStudy: "DTEK" | "DSIK" | "DVIT" | "BINF" | "IMO" | "INF" | "PROG" | "DSC" | "OTHER";
[x]: reason: string;
[ ]: createdAt: Date;
-->

<div class="flex min-h-screen flex-col gap-4 max-w-2xl w-full mx-auto py-24 md:px-0 px-4">
	<h1 class="text-3xl font-bold">Dashboard</h1>
	<p class="text-gray-500">Welcome back, {$session?.user.id}!</p>

	<div>
		{#each applications as application}
			<div class="flex flex-col gap-2">
				<h2 class="text-xl font-bold">{application.name}</h2>
				<p>E-post: {application.email}</p>
				<p>Studie: {application.fieldOfStudy}</p>
				<p>Årstrinn: {application.yearOfStudy}</p>
				<hr />
				<p>{application.reason}</p>
			</div>
		{/each}
	</div>
</div>

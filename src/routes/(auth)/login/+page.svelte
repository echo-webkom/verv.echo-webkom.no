<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import FormControl from '$lib/components/FormControl.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	const { form, enhance, errors } = superForm(data.form, {
		taintedMessage: null,
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'error') {
				toast.error('Noe gikk galt. Prøv igjen senere.');
			}
		}
	});
</script>

<h1 class="text-3xl font-medium">Logg inn</h1>

<form class="space-y-4" method="post" use:enhance>
	<FormControl>
		<Label for="email">E-post:</Label>
		<Input id="email" name="email" autocomplete="email" bind:value={$form.email} />
		{#if $errors.email}
			{#each $errors.email as error}
				<p class="text-red-500">{error}</p>
			{/each}
		{/if}
	</FormControl>
	<FormControl>
		<Label for="password">Passord:</Label>
		<Input
			type="password"
			name="password"
			autocomplete="current-password"
			bind:value={$form.password}
		/>
		{#if $errors.password}
			{#each $errors.password as error}
				<p class="text-red-500">{error}</p>
			{/each}
		{/if}
	</FormControl>

	<div class="flex flex-col sm:block gap-2">
		<Button class="w-full" type="submit" formaction="?/emailPassword">Logg inn</Button>
	</div>

	<div class="flex items-center justify-evenly">
		<div class="border-t-[1px] w-full border-gray-400" />
		<span class="mx-2 text-gray-400">eller</span>
		<div class="border-t-[1px] w-full border-gray-400" />
	</div>

	<div>
		<Button class="w-full" type="submit" formaction="?/github">Logg inn med GitHub</Button>
	</div>

	<div class="flex flex-col">
		<a href="/forgot-password" class="text-center text-gray-400 hover:underline">Glemt passord?</a>
		<a href="/register" class="text-center text-gray-400 hover:underline"
			>Ingen bruker? Lag en her.</a
		>
	</div>
</form>

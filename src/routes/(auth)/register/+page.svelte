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

<h1 class="text-3xl font-medium">Lag bruker</h1>

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
			autocomplete="new-password"
			bind:value={$form.password}
		/>
		{#if $errors.password}
			{#each $errors.password as error}
				<p class="text-red-500">{error}</p>
			{/each}
		{/if}
	</FormControl>
	<FormControl>
		<Label for="confirmPassword">Bekreft passord:</Label>
		<Input
			type="password"
			name="confirmPassword"
			autocomplete="new-password"
			bind:value={$form.confirmPassword}
		/>
		{#if $errors.confirmPassword}
			{#each $errors.confirmPassword as error}
				<p class="text-red-500">{error}</p>
			{/each}
		{/if}
	</FormControl>

	<div class="flex flex-col sm:block gap-2">
		<Button type="submit">Lag bruker</Button>
	</div>

	<div>
		<a href="/login" class="text-center text-gray-400 hover:underline"
			>Logg inn med eksisterende bruker</a
		>
	</div>
</form>

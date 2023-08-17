<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import FormControl from '$lib/components/FormControl.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const { form, enhance, errors } = superForm(data.form, {
		taintedMessage: null,
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Passord oppdatert!');
				goto('/');
			} else if (result.type === 'error') {
				toast.error('Noe gikk galt. Prøv igjen senere.');
			}
		}
	});
</script>

<h1 class="text-3xl font-medium">Oppdater passord</h1>

<form class="space-y-4" method="post" use:enhance>
	<input type="hidden" name="code" value={$page.url.searchParams.get('code')} />

	<FormControl>
		<Label for="password">Nytt passord:</Label>
		<Input
			id="password"
			name="password"
			type="password"
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
		<Label for="confirmPassword">E-post:</Label>
		<Input
			id="confirmPassword"
			name="confirmPassword"
			type="password"
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
		<Button type="submit">Sett nytt passord</Button>
	</div>

	<div class="flex flex-col">
		<a href="/" class="text-center text-gray-400 hover:underline">Til forsiden</a>
	</div>
</form>

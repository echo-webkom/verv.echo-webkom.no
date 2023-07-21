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
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Sjekk eposten din for magisk innlogging.');
			} else {
				toast.error('Noe gikk galt. Prøv igjen senere.');
			}
		}
	});
</script>

<div class="flex min-h-screen flex-col gap-4 max-w-2xl w-full mx-auto py-24 md:px-0 px-4">
	<form method="post" use:enhance>
		<FormControl>
			<Label for="email">E-post:</Label>
			<Input id="email" name="email" autocomplete="email" bind:value={$form.email} />
			{#if $errors.email}
				<p class="text-red-500">{$errors.email}</p>
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
				<p class="text-red-500">{$errors.password}</p>
			{/if}
		</FormControl>

		<div class="flex flex-col sm:block">
			<Button type="submit">Sign up</Button>
		</div>
	</form>
</div>

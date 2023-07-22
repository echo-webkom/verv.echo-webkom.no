<script lang="ts">
	import type { Action, ActionData, PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import FormControl from '$lib/components/FormControl.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';

	export let data: PageData;
	export let actionData: ActionData;

	const { form, enhance, errors } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				if (actionData?.signin === true) {
					toast.success('Du er nå logget inn.');
				} else {
					toast.success('Takk for søknaden! Du vil høre fra oss i løpet av kort tid.');
				}
			} else {
				toast.error('Noe gikk galt. Prøv igjen senere.');
			}
		}
	});
</script>

<div class="flex min-h-screen flex-col gap-4 max-w-lg w-full mx-auto py-24 md:px-0 px-4">
	<form class="space-y-4" action="?/register" method="post" use:enhance>
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
			<Button type="submit">Lag bruker</Button>
			<Button type="submit" formaction="?/signin">Logg inn</Button>
		</div>
	</form>
</div>

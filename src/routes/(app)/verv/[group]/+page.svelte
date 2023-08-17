<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import FormControl from '$lib/components/FormControl.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Select from '$lib/components/Select.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import { studyNames, yearNames } from '$lib/constants';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import FormHint from '$lib/components/FormHint.svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true,
		taintedMessage: null,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Takk for søknaden! Du vil høre fra oss i løpet av kort tid.');
			} else {
				toast.error('Noe gikk galt. Prøv igjen senere.');
			}
		}
	});
</script>

<h2 class="text-3xl font-semibold text-center mb-5">Søknadsskjema for {data.groupName}</h2>

<form class="flex flex-col gap-6 mb-10" method="post" use:enhance>
	{#if $errors._errors}
		{#each $errors._errors as error}
			<p class="text-red-500 text-sm">{error}</p>
		{/each}
	{/if}

	<FormControl>
		<Label for="name">Fullt navn</Label>

		<Input
			id="name"
			name="name"
			aria-invalid={$errors.email ? 'true' : undefined}
			type="text"
			autocapitalize="words"
			autocomplete="name"
			placeholder="Ola Nordmann"
			bind:value={$form.name}
		/>

		{#if $errors.name}
			{#each $errors.name as error}
				<p class="text-red-500 text-sm">{error}</p>
			{/each}
		{/if}
	</FormControl>

	<FormControl>
		<Label for="email">E-post</Label>

		<Input
			id="email"
			name="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			type="email"
			autocomplete="email"
			autocapitalize="off"
			placeholder="ola.nordman@uib.no"
			bind:value={$form.email}
		/>

		<FormHint>Vi vil bruke denne til å kontakte deg om intervju.</FormHint>

		{#if $errors.email}
			{#each $errors.email as error}
				<p class="text-red-500 text-sm">{error}</p>
			{/each}
		{/if}
	</FormControl>

	<FormControl>
		<Label for="yearOfStudy">Årstrinn</Label>

		<Select
			id="yearOfStudy"
			name="yearOfStudy"
			aria-invalid={$errors.yearOfStudy ? 'true' : undefined}
			bind:value={$form.yearOfStudy}
		>
			<option disabled value={undefined}>Velg årstrinn</option>
			{#each Object.entries(yearNames) as [value, name]}
				<option {value}>{name}</option>
			{/each}
		</Select>
		{#if $errors.yearOfStudy}
			{#each $errors.yearOfStudy as error}
				<p class="text-red-500 text-sm">{error}</p>
			{/each}
		{/if}
	</FormControl>

	<FormControl>
		<Label for="fieldOfStudy">Studieretning</Label>

		<Select
			id="fieldOfStudy"
			name="fieldOfStudy"
			aria-invalid={$errors.fieldOfStudy ? 'true' : undefined}
			bind:value={$form.fieldOfStudy}
		>
			<option disabled value={undefined}>Velg studieretning</option>
			{#each Object.entries(studyNames) as [value, name]}
				<option {value}>{name}</option>
			{/each}
		</Select>

		{#if $errors.fieldOfStudy}
			{#each $errors.fieldOfStudy as error}
				<p class="text-red-500 text-sm">{error}</p>
			{/each}
		{/if}
	</FormControl>

	<FormControl>
		<Label for="reason">Hvorfor?</Label>

		<Textarea
			id="reason"
			name="reason"
			rows={5}
			aria-invalid={$errors.reason ? 'true' : undefined}
			autocomplete="off"
			placeholder="Jeg vil være med i Webkom fordi..."
			bind:value={$form.reason}
		/>

		<FormHint>
			Fortell oss litt om deg selv, hvorfor du vil være med i Webkom og hva du kan bidra med. Det er
			helt greit å ikke ha noen erfaring fra før.
		</FormHint>

		{#if $errors.reason}
			{#each $errors.reason as error}
				<p class="text-red-500 text-sm">{error}</p>
			{/each}
		{/if}
	</FormControl>

	<div class="flex flex-col sm:block">
		<Button type="submit">Send inn</Button>
	</div>
</form>

<script lang="ts">
	import type { PageData } from './$types';
	import webkomLogo from '$lib/assets/webkom-logo.png';
	import Button from '$lib/components/Button.svelte';
	import FormControl from '$lib/components/FormControl.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Select from '$lib/components/Select.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import { studyNames, yearNames } from '$lib/constants';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	let { session } = data;

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Takk for søknaden! Du vil høre fra oss i løpet av kort tid.');
			} else {
				toast.error('Noe gikk galt. Prøv igjen senere.');
			}
		}
	});
</script>

<div class="flex min-h-screen flex-col gap-4 max-w-2xl w-full mx-auto py-24 md:px-0 px-4">
	<div class="flex justify-center mb-5">
		<img class="h-40 w-auto" alt="Webkom logo" src={webkomLogo} />
	</div>

	<main class="flex flex-col">
		<h1 class="text-2xl font-bold">Søk verv i echo Webkom</h1>

		{#if session}
			<p class="my-4">
				Du er logget inn som {session.user.email}
			</p>
		{/if}

		<section class="py-10">
			<article class="space-y-4 text-lg">
				<h2 class="text-xl font-semibold">Om oss</h2>

				<p>
					Webkom er en undergruppe i echo som drifter og videreutvikler linjeforeningens
					webløsninger, blant annet{' '}
					<a
						class="text-blue-500 underline hover:no-underline"
						href="https://echo.uib.no/"
						target="_blank"
					>
						echo.uib.no
					</a>.
				</p>

				<h2 class="text-xl font-semibold pt-4">Hvorfor Webkom?</h2>

				<p>
					I Webkom vil du lære en hel del om full-stack webutvikling, ta en idé ut i produksjon og
					få uvurderlig erfaring du ikke får noe annet sted på studiet!
				</p>

				<p>
					Du vil også få muligheten til å bli kjent med andre studenter på tvers av år,
					studieretninger og undergrupper — og ikke minst ha det gøy sammen med dem!
				</p>

				<h2 class="text-xl font-semibold pt-4">Hvorfor deg?</h2>

				<p>
					Vi ser etter motiverte, engasjerte og hyggelige folk! Relevant erfaring er selvsagt et
					pluss, men ikke et krav.
				</p>

				<p>
					Så lenge du er en lagspiller, åpen for å lære og utvikle deg, og at du er engasjert i å
					bidra til å gjøre echo til et bedre sted for alle studenter.
				</p>

				<h2 class="text-xl font-semibold pt-8">Kjenner du deg igjen? — Søk da vel!</h2>
			</article>
		</section>

		<section class="py-10">
			<form class="flex flex-col gap-6" method="post" use:enhance>
				<FormControl>
					<Label for="name">Navn</Label>
					<Input
						id="name"
						name="name"
						aria-invalid={$errors.email ? 'true' : undefined}
						type="text"
						autocapitalize="words"
						autocomplete="name"
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
						bind:value={$form.email}
					/>
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
						bind:value={$form.reason}
					/>
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
		</section>

		<section class="py-10">
			<h2 class="text-xl font-semibold">Kontakt oss</h2>

			<p>
				Har du spørsmål om vervet eller Webkom generelt? Ta kontakt med oss på <a
					class="text-blue-500 underline hover:no-underline"
					href="mailto:styret-webkom@echo.uib.no"
				>
					e-post
				</a>
				eller på
				<a
					class="text-blue-500 underline hover:no-underline"
					href="https://instagram.com/echo_webkom"
				>
					Instagram
				</a>.
			</p>
		</section>
	</main>
</div>

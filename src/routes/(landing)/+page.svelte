<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/assets/webkom-logo.png';
</script>

<main class="flex flex-col pt-10 sm:pt-24 px-3 transition-all duration-150">
	<div class="text-center py-24">
		<img class="w-40 h-auto mx-auto" src={Logo} alt="Webkom-logo" />
		<h1 class="text-5xl font-bold py-10">Søk verv i echo Webkom</h1>
		<a
			class="text-lg block w-fit mx-auto font-medium bg-background text-foreground border px-5 py-2 rounded-lg transition-colors duration-150"
			href="/apply">Klikk her for å søke</a
		>
	</div>

	<section class="pt-10 pb-4 max-w-2xl mx-auto w-full">
		<article class="space-y-4 text-lg">
			<h2 class="text-xl font-semibold">Om oss</h2>

			<p>
				Webkom er en undergruppe i echo som drifter og videreutvikler linjeforeningens webløsninger,
				blant annet{' '}
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
				I Webkom vil du lære en hel del om full-stack webutvikling, ta en idé ut i produksjon og få
				uvurderlig erfaring du ikke får noe annet sted på studiet!
			</p>

			<p>
				Du vil også få muligheten til å bli kjent med andre studenter på tvers av år,
				studieretninger og undergrupper — og ikke minst ha det gøy sammen med dem!
			</p>

			<h2 class="text-xl font-semibold pt-4">Hvorfor deg?</h2>

			<p>
				Du er motivert, engasjert og ikke minst hyggelig! Relevant erfaring er selvsagt et pluss,
				men ikke et krav.
			</p>

			<p>
				Du er en lagspiller, åpen for å lære og utvikle deg, og du er engasjert i å bidra til å
				gjøre echo til et bedre sted for alle.
			</p>

			<h2 class="text-xl font-semibold pt-10">Kjenner du deg igjen? — Søk da vel!</h2>

			<Button class="w-full">
				<a class="text-white hover:no-underline" href="/apply"> Søk her </a>
			</Button>

			<h2 class="text-xl font-semibold pt-28">Kontakt oss</h2>

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
		</article>
	</section>
</main>

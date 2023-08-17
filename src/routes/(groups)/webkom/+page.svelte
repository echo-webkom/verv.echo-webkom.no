<script lang="ts">
	import Logo from '$lib/assets/webkom-logo.png';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
</script>

<div class="text-center flex flex-col items-center justify-center gap-3 min-h-[70vh]">
	<img class="w-40 h-auto mx-auto" src={Logo} alt="Webkom-logo" />
	<div class="space-y-6">
		<h1 class="text-5xl font-bold">Søk verv i echo Webkom</h1>
		<p class="max-w-md mx-auto text-neutral-200">
			Vil du være med å utvikle linjeforeningens webløsninger? Vi søker nye medlemmer til
			undergruppen vår!
		</p>
		<ButtonLink class="w-fit mx-auto" href="/apply" size="large">Klikk her for å søke</ButtonLink>
	</div>
</div>

<article class="space-y-4 text-lg pt-10 pb-4 max-w-2xl mx-auto w-full">
	<h2 class="text-xl font-semibold">Om oss</h2>

	<p>
		Webkom er en undergruppe i echo som drifter og videreutvikler linjeforeningens webløsninger,
		blant annet{' '}
		<a
			class="text-blue-500 underline hover:no-underline"
			href="https://echo.uib.no/"
			target="_blank"
			rel="noopener noreferrer"
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
		Du vil også få muligheten til å bli kjent med andre studenter på tvers av år, studieretninger og
		undergrupper — og ikke minst ha det gøy sammen med dem!
	</p>

	<h2 class="text-xl font-semibold pt-4">Hvorfor deg?</h2>

	<p>
		Du er motivert, engasjert og ikke minst hyggelig! Relevant erfaring er selvsagt et pluss, men
		ikke et krav.
	</p>

	<p>
		Du er en lagspiller, åpen for å lære og utvikle deg, og du er engasjert i å bidra til å gjøre
		echo til et bedre sted for alle.
	</p>

	<h2 class="text-xl font-semibold pt-10">Kjenner du deg igjen? — Søk da vel!</h2>

	<div>
		<ButtonLink class="w-full" href="/apply">Søk her</ButtonLink>
	</div>

	<h2 class="text-xl font-semibold pt-10">Kontakt oss</h2>

	<p>
		Har du spørsmål om vervet eller Webkom generelt? Ta kontakt med oss på <a
			class="text-blue-500 underline hover:no-underline"
			href="mailto:webkom-styret@echo.uib.no"
		>
			e-post
		</a>
		eller på
		<a class="text-blue-500 underline hover:no-underline" href="https://instagram.com/echo_webkom">
			Instagram
		</a>.
	</p>
</article>

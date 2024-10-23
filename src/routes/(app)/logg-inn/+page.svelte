<script lang="ts">
	import EchoLogo from '$lib/assets/images/echo-logo.png';
	import Feide from '$lib/components/icons/Feide.svelte';
</script>

<div
	class="mx-auto flex w-full max-w-[380px] flex-col rounded-xl border-2 border-muted-dark bg-muted p-8"
>
	<img src={EchoLogo} alt="echo logo" class="mx-auto h-24" />

	<h3 class="font-display font-semibold text-2xl mx-auto mb-8">Velg en måte å logge inn</h3>

	<ul class="mb-4 flex flex-col justify-center gap-3">
		<li>
			<a
				href="/auth/feide"
				class="group w-full rounded-xl border-2 text-white font-medium inline-flex justify-center items-center h-10 gap-2 border-feide-dark bg-feide hover:border-feide hover:bg-feide-hover hover:text-black"
			>
				<Feide class="h-5 w-5" />
				Logg inn med Feide
			</a>
		</li>
	</ul>
</div>

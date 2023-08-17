<script lang="ts">
	import { page } from '$app/stores';
</script>

<hr class="border-t-border mt-auto" />

<div class="w-full bg-footer">
	<footer class="max-w-2xl w-full mx-auto py-10 px-4">
		<div>
			<h3 class="uppercase font-bold mb-2">Internt</h3>

			<ul>
				<li>
					<a href="/dashboard" class="text-center text-gray-400 hover:underline">Til dashboard</a>
				</li>
				{#if !$page.data.session}
					<li>
						<a href="/login" class="text-center text-gray-400 hover:underline">Logg inn</a>
					</li>
					<li>
						<a href="/register" class="text-center text-gray-400 hover:underline">Lag bruker</a>
					</li>
				{/if}
			</ul>
		</div>
	</footer>
</div>

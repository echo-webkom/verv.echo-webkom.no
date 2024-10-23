<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';

	const toggle = () => {
		const theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', theme);
	};
</script>

<button onclick={toggle} class="h-6 w-6 px-2">
	<Sun class="hidden dark:block" />
	<Moon class="block dark:hidden" />
</button>

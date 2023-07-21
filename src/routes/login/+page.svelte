<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
</script>

<div class="flex min-h-screen flex-col gap-4 max-w-2xl w-full mx-auto py-24 md:px-0 px-4">
	<form method="post" use:enhance>
		<Input name="email" />
		<Input type="password" name="password" />

		<Button type="submit">Sign up</Button>
	</form>
</div>

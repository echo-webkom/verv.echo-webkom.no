<script lang="ts">
	import clsx from 'clsx';
</script>

<!--
@component

Example:
```
    <FormHint>
        This is a hint
    </FormHint>
```
 -->

<p {...$$props} class={clsx('text-sm text-neutral-400', $$props.class)}>
	<slot />
</p>

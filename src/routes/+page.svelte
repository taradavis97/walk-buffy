<script lang="ts">
	import WalkPlanner from '$lib/WalkPlanner.svelte';
	import WalkLog from '$lib/WalkLog.svelte';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
    import Input from '$lib/Input.svelte';
	import Button from '$lib/Button.svelte';

	let { data }: PageProps = $props();
	let duration = $state(0);
</script>

<main>
	<header>
		<h1>Walk Buffy</h1>
		<p>Plan your walk by dragging Buffy, then save it to your log.</p>
	</header>

	<WalkPlanner bind:duration />

	<form method="POST" action="?/create" use:enhance={() => {
        return async ({ update }) => {
            await update({ reset: false });
        };
    }}>
		<input type="hidden" name="duration" value={duration} />
        <Input /> 
		<Button type="submit" variant="primary" disabled={duration <= 0}>Save walk</Button>
	</form>

	<WalkLog walks={data.walks} />
</main>

<style>
	main {
		max-width: 720px;
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		font-family: system-ui, sans-serif;
	}

	header h1 {
		margin: 0 0 0.25rem;
		font-size: 2rem;
		color: var(--fg-default);
	}

	header p {
		margin: 0;
		color: var(--fg-light);
	}

	form {
		display: flex;
		justify-content: center;
        gap: 2rem;
		margin: 0;

	}


</style>

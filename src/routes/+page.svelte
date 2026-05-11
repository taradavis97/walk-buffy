<script lang="ts">
	import WalkPlanner from '$lib/WalkPlanner.svelte';
	import WalkLog from '$lib/WalkLog.svelte';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
    import Input from '$lib/Input.svelte'

	let { data }: PageProps = $props();
	let duration = $state(0);
</script>

<main>
	<header>
		<h1>Walk Buffy</h1>
		<p>Plan your walk by dragging Buffy, then save it to your log.</p>
	</header>

	<WalkPlanner bind:duration />

	<form method="POST" use:enhance={() => {
        return async ({ update }) => {
            await update({ reset: false });
        };
    }}>
		<input type="hidden" name="duration" value={duration} />
        <Input /> 
		<button type="submit" class="save" disabled={duration <= 0}>Save walk</button>
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
	}

	header p {
		margin: 0;
		color: #6b7280;
	}

	form {
		display: flex;
		justify-content: center;
        gap: 2rem;
		margin: 0;

	}

	.save {
		padding: 0.75rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		color: white;
		background: #2563eb;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.15s;
	}

	.save:hover:not(:disabled) {
		background: #1d4ed8;
	}

	.save:disabled {
		background: #9ca3af;
		cursor: not-allowed;
	}
</style>

<script lang="ts">
	import WalkPlanner from '$lib/WalkPlanner.svelte';
	import WalkLog from '$lib/WalkLog.svelte';
	import { walks } from '$lib/walks.svelte';
    

	let duration = $state(0);

	function save() {
		if (duration <= 0) return;
		walks.add(duration);
	}
</script>

<main>
	<header>
		<h1>Walk Buffy</h1>
		<p>Plan your walk by dragging Buffy, then save it to your log.</p>
	</header>

	<WalkPlanner bind:duration />

	<button type="button" class="save" onclick={save} disabled={duration <= 0}>
		Save walk
	</button>

	<WalkLog />
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

	.save {
		align-self: center;
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

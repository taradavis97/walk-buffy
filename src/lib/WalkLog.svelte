<script lang="ts">
	import WalkLogRow from './WalkLogRow.svelte';
	import type { Walk } from '$lib/types';

	let { walks }: { walks: Walk[] } = $props();
</script>

<section class="log">
	<h2>Walks</h2>

	{#if walks.length === 0}
		<p class="empty">No walks saved yet — take Buffy out!</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Time</th>
					<th scope="col">Walker</th>
					<th scope="col">Duration</th>
				</tr>
			</thead>
			<tbody>
				{#each walks as walk (walk.id)}
					<WalkLogRow {walk} />
				{/each}
			</tbody>
		</table>
	{/if}
</section>

<style>
	.log {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	h2 {
		font-size: 1.25rem;
		margin: 0;
	}

	.empty {
		color: #6b7280;
		font-style: italic;
		margin: 0;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th {
		text-align: left;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid #e5e7eb;
		background: #f9fafb;
		font-weight: 600;
	}
</style>

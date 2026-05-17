<script lang="ts">
	import WalkLogRow from './WalkLogRow.svelte';
	import type { Walk } from '$lib/types';

	let { walks }: { walks: Walk[] } = $props();
</script>

<section class="log">
	<h2>Walks (last 24 hours)</h2>

	{#if walks.length === 0}
		<p class="empty">No walks in the last 24 hours — take Buffy out!</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Time</th>
					<th scope="col">Walker</th>
					<th scope="col">Duration</th>
					<th scope="col" class="actions-head"><span class="sr-only">Actions</span></th>
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
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
	}

	tr :nth-child(1),
	tr :nth-child(3),
	tr :nth-child(4) {
		width: 20%;
		
	}

	tr :nth-child(2) {
		width: 15%;
	}

	th {
		text-align: left;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid #e5e7eb;
		background: #f9fafb;
		font-weight: 600;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>

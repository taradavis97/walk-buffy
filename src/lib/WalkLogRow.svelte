<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Walk } from '$lib/types';
	import { formatDuration, formatSavedAt, formatSavedOn, toDatetimeLocal } from './format';
	import Button from '$lib/Button.svelte';
	import { Trash, SquarePen } from '@lucide/svelte';

	let { walk }: { walk: Walk } = $props();

	let editing = $state(false);
	let editName = $state('');
	let editMinutes = $state(0);
	let editSavedAt = $state('');

	const editFormId = $derived(`walk-edit-${walk.id}`);
	const deleteFormId = $derived(`walk-delete-${walk.id}`);

	function startEdit() {
		editName = walk.name;
		editMinutes = Math.round(walk.durationSec / 60);
		editSavedAt = toDatetimeLocal(walk.savedAt);
		editing = true;
	}
</script>

<tr>
	{#if editing}
		<td colspan="2">
			<input
				form={editFormId}
				type="datetime-local"
				name="savedAt"
				bind:value={editSavedAt}
				required
			/>
		</td>
		<td>
			<input
				form={editFormId}
				type="text"
				name="walkerName"
				bind:value={editName}
				required
			/>
		</td>
		<td class="duration">
			<input
				class="minutes"
				form={editFormId}
				type="number"
				min="1"
				step="1"
				bind:value={editMinutes}
				required
			/>
			<span class="unit">mins</span>
		</td>
		<td class="actions">
			<form
				id={editFormId}
				method="POST"
				action="?/update"
				use:enhance={() => async ({ result, update }) => {
					await update();
					if (result.type === 'success') editing = false;
				}}
			>
				<input type="hidden" name="id" value={walk.id} />
				<input type="hidden" name="duration" value={editMinutes * 60} />
			</form>
			
			<button type="button" onclick={() => (editing = false)}>Cancel</button>
			<button form={editFormId} type="submit" class="save">Save</button>
		</td>
	{:else}
		<td>{formatSavedOn(walk.savedAt)}</td>
		<td class="time">{formatSavedAt(walk.savedAt)}</td>
		<td>{walk.name}</td>
		<td class="duration">{formatDuration(walk.durationSec)}</td>
		<td class="actions">
			<form id={deleteFormId} method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="id" value={walk.id} />
			</form>
			<Button icon variant="ghost" aria-label="edit walk" onclick={startEdit}>
				<SquarePen size={20} />
			</Button>
			<Button
			    icon
				variant="danger"
				aria-label="delete walk"
				form={deleteFormId}
				type="submit"
				onclick={(e) => {
					if (!confirm('Delete this walk?')) e.preventDefault();
				}}>
				<Trash size={20} color=red/>
			   </Button
			>
		</td>
	{/if}
</tr>

<style>
	td {
		text-align: left;
		padding: 0.5rem 0.75rem;
		text-transform: capitalize;
		
	}


	tr {
		
		align-items: center;
		border-bottom: solid 1px gray;
		width: 100%;
	}



	.duration,
	.time {
		font-variant-numeric: tabular-nums;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}

	.actions button {
		padding: 0.5rem 1rem;
		height: 40px;
		font-size: 0.85rem;
		border: 1px solid #d1d5db;
		background: white;
		border-radius: 0.375rem;
		cursor: pointer;
	}

	.actions button:hover {
		background: #f3f4f6;
	}

	.actions .save {
		background: #2563eb;
		color: white;
		border-color: #2563eb;
	}

	.actions .save:hover {
		background: #1d4ed8;
	}

	
	input[type='text'],
	input[type='datetime-local'],
	input[type='number'] {
		font: inherit;
		border: solid lightgray 1px;
        border-radius: 8px;
        padding: 0.25rem;
        color: black;
	}

	input[type='text'] {
		width: 100%;
		text-transform: capitalize;
	}

	.minutes {
		width: 4rem;
	}

	.unit {
		margin-left: 0.125rem;
		color: #6b7280;
		font-size: 0.85rem;
		text-transform: none;
	}
</style>

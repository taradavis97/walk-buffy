<script lang="ts">
	import type { Walk } from '$lib/types';
	import { formatDuration, formatSavedAt } from './format';

	let { walk }: { walk: Walk } = $props();
</script>

<tr>
	<td>{formatSavedAt(walk.savedAt)}</td>
	<td>{walk.name}</td>
	<td class="duration">{formatDuration(walk.durationSec)}</td>
</tr>

<style>
	td {
		text-align: left;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid #e5e7eb;
		text-transform: capitalize;
	}

	.duration {
		font-variant-numeric: tabular-nums;
	}
</style>

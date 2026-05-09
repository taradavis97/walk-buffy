<script lang="ts">
	import { formatDuration } from './format';

	let { minutes }: { minutes: number } = $props();
</script>

<p class="timer" aria-live="polite">{formatDuration(minutes)}</p>

<style>
	.timer {
		font-size: 3rem;
		font-variant-numeric: tabular-nums;
		font-weight: 600;
		margin: 0;
		color: #1f2937;
	}
</style>

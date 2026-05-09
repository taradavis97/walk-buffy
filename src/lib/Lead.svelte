<script lang="ts">
	type Props = {
		fromX: number;
		fromY: number;
		toX: number;
		toY: number;
		width: number;
		height: number;
	};

	let { fromX, fromY, toX, toY, width, height }: Props = $props();

	const distance = $derived(Math.hypot(toX - fromX, toY - fromY));

	const path = $derived.by(() => {
		const midX = (fromX + toX) / 2;
		const midY = (fromY + toY) / 2;
		// A small downward sag that grows with distance, capped so it stays graceful.
		const sag = Math.min(40, distance * 0.12);
		return `M ${fromX} ${fromY} Q ${midX} ${midY + sag} ${toX} ${toY}`;
	});
</script>

<svg class="lead" viewBox="0 0 {width} {height}" {width} {height} aria-hidden="true">
	<path d={path} />
</svg>

<style>
	.lead {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.lead path {
		fill: none;
		stroke: #6b4423;
		stroke-width: 3;
		stroke-linecap: round;
	}
</style>

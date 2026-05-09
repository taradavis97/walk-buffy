<script lang="ts">
	type Props = {
		x: number;
		y: number;
		width?: number;
		height?: number;
		color: string;
		label?: string;
		alt?: string;
	};

	let { x, y, width = 80, height = 140, color, label = 'Walker', alt = '' }: Props = $props();

	const src = $derived(`https://placehold.co/${width}x${height}/${color}/ffffff.png?text=${label}`);
</script>

<img class="walker" {src} {alt} {width} {height} style="left: {x}px; top: {y}px;" />

<style>
	.walker {
		position: absolute;
		pointer-events: none;
	}
</style>

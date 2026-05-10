<script lang="ts">
	type Props = {
		x: number;
		y: number;
		width?: number;
		height?: number;
		alt?: string;
		dragging?: boolean;
	};

	let { x, y, width = 80, height = 140, alt = '', dragging = false }: Props = $props();
</script>

<img
	class="walker"
	src={dragging ? '/walkers-happy.png' : '/walkers-sad.png'}
	{alt}
	{width}
	{height}
	style="left: {x}px; top: {y}px;"
/>

<style>
	.walker {
		position: absolute;
		pointer-events: none;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}


</style>

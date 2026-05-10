<script lang="ts">
	export type Bounds = { minX: number; maxX: number; minY: number; maxY: number };

	type Props = {
		x: number;
		y: number;
		bounds: Bounds;
		size?: number;
		valueNow: number;
		valueText: string;
		dragging?: boolean;
	};

	let {
		x = $bindable(),
		y = $bindable(),
		bounds,
		size = 100,
		valueNow,
		valueText,
		dragging = $bindable(false)
	}: Props = $props();

	function clamp(value: number, min: number, max: number) {
		return Math.max(min, Math.min(max, value));
	}

	function moveFromPointer(event: PointerEvent) {
		// `offsetParent` is the nearest positioned ancestor — the planner stage in our case.
		const parent = (event.currentTarget as HTMLElement).offsetParent as HTMLElement | null;
		if (!parent) return;
		const rect = parent.getBoundingClientRect();
		x = clamp(event.clientX - rect.left, bounds.minX, bounds.maxX);
		y = clamp(event.clientY - rect.top, bounds.minY, bounds.maxY);
	}

	function handlePointerDown(event: PointerEvent) {
		dragging = true;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function handlePointerMove(event: PointerEvent) {
		if (!dragging) return;
		moveFromPointer(event);
	}

	function handlePointerUp(event: PointerEvent) {
		dragging = false;
		(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
	}

	function handleKeydown(event: KeyboardEvent) {
		const step = event.shiftKey ? 20 : 5;
		switch (event.key) {
			case 'ArrowLeft':
				x = clamp(x - step, bounds.minX, bounds.maxX);
				break;
			case 'ArrowRight':
				x = clamp(x + step, bounds.minX, bounds.maxX);
				break;
			case 'ArrowUp':
				y = clamp(y - step, bounds.minY, bounds.maxY);
				break;
			case 'ArrowDown':
				y = clamp(y + step, bounds.minY, bounds.maxY);
				break;
			default:
				return;
		}
		event.preventDefault();
	}
</script>

<button
	type="button"
	class="buffy"
	class:dragging
	style="left: {x - size / 2}px; top: {y - size / 2}px; width: {size}px; height: {size}px;"
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onkeydown={handleKeydown}
	role="slider"
	aria-label="Drag Buffy to set walk duration"
	aria-valuemin={0}
	aria-valuenow={valueNow}
	aria-valuetext={valueText}
>
	<img src={dragging ? '/buffy-happy.png' : '/buffy-sad.png'} alt="Buffy the dog" />
</button>

<style>
	.buffy {
		position: absolute;
		padding: 0;
		border: 3px solid transparent;
		background: transparent;
		cursor: grab;
		touch-action: none;
	}

	.buffy:focus-visible {
		border-color: #2563eb;
		outline: none;
	}

	.buffy.dragging {
		cursor: grabbing;
	}

	.buffy img {
		width: auto;
		height: auto;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}
</style>

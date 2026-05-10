<script lang="ts">
	import Buffy, { type Bounds } from './Buffy.svelte';
	import Lead from './Lead.svelte';
	import Timer from './Timer.svelte';
	import Walker from './Walker.svelte';
	import { formatDuration } from './format';

	let { duration = $bindable(10) }: { duration?: number } = $props();

	const ASPECT = 600 / 320;
	const MAX_STAGE_WIDTH = 600;
	const buffySize = 100;

	let stageEl: HTMLDivElement | undefined = $state();
	let stageWidth = $state(MAX_STAGE_WIDTH);
	const stageHeight = $derived(stageWidth / ASPECT);

	const walkerX = $derived(stageWidth * 0.183);
	const walkerY = $derived(stageHeight * 0.988);

	const bounds: Bounds = $derived({
		minX: buffySize / 2,
		maxX: stageWidth - buffySize / 2,
		minY: buffySize / 2,
		maxY: stageHeight - buffySize / 2
	});

	let buffyX = $state(MAX_STAGE_WIDTH * 0.733);
	let buffyY = $state((MAX_STAGE_WIDTH / ASPECT) * 0.688);
	let dragging = $state(false);

	$effect(() => {
		if (!stageEl) return;
		const ro = new ResizeObserver((entries) => {
			const w = entries[0].contentRect.width;
			if (w <= 0) return;
			stageWidth = w;
			const h = w / ASPECT;
			const half = buffySize / 2;
			buffyX = Math.max(half, Math.min(w - half, buffyX));
			buffyY = Math.max(half, Math.min(h - half, buffyY));
		});
		ro.observe(stageEl);
		return () => ro.disconnect();
	});

	const T_MIN = 2 * 60;
	const T_PLAT_LO = 15 * 60;
	const T_PLAT_HI = 40 * 60;
	const T_MAX = 90 * 60;

	const distMax = $derived(
		Math.max(
			Math.hypot(bounds.maxX - walkerX, bounds.maxY - walkerY),
			Math.hypot(bounds.maxX - walkerX, walkerY - bounds.minY),
			Math.hypot(walkerX - bounds.minX, bounds.maxY - walkerY),
			Math.hypot(walkerX - bounds.minX, walkerY - bounds.minY)
		)
	);

	const dLo = $derived(distMax * 0.4);
	const dHi = $derived(distMax * 0.8);

	function smoothstep(x: number) {
		const c = Math.max(0, Math.min(1, x));
		return c * c * (3 - 2 * c);
	}

	function distanceToSeconds(d: number, lo: number, hi: number, max: number) {
		if (d <= 0) return T_MIN;
		if (d >= max) return T_MAX;
		if (d < lo) return T_MIN + (T_PLAT_LO - T_MIN) * smoothstep(d / lo);
		if (d < hi) return T_PLAT_LO + (T_PLAT_HI - T_PLAT_LO) * ((d - lo) / (hi - lo));
		return T_PLAT_HI + (T_MAX - T_PLAT_HI) * smoothstep((d - hi) / (max - hi));
	}

	const computedDuration = $derived(
		Math.round(
			distanceToSeconds(Math.hypot(buffyX - walkerX, buffyY - walkerY), dLo, dHi, distMax) / 60
		) * 60
	);

	$effect(() => {
		duration = computedDuration
	});
</script>

<div class="planner">
	<Timer minutes={duration} />

	<div class="stage" bind:this={stageEl}>
		<Lead
			fromX={walkerX + 60}
			fromY={walkerY - 80}
			toX={buffyX}
			toY={buffyY}
			width={stageWidth}
			height={stageHeight}
		/>

		<Walker
			x={walkerX - 60}
			y={walkerY - 140}
			alt="Two people walking Buffy"
			{dragging}
		/>

		<Buffy
			bind:x={buffyX}
			bind:y={buffyY}
			bind:dragging
			{bounds}
			size={buffySize}
			valueNow={duration}
			valueText={formatDuration(duration)}
		/>
	</div>

	<p class="hint">Drag Buffy further away for a longer walk, or closer for a shorter one.</p>
</div>

<style>
	.planner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.stage {
		position: relative;
		width: 100%;
		max-width: 600px;
		aspect-ratio: 600 / 320;
		background: linear-gradient(180deg, #e0f2fe 0%, #bbf7d0 100%);
		border-radius: 1rem;
		overflow: hidden;
		touch-action: none;
		user-select: none;
	}

	.hint {
		color: #6b7280;
		font-size: 0.9rem;
		margin: 0;
	}
</style>

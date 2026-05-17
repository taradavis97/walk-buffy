<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

	type Props = HTMLButtonAttributes & {
		variant?: Variant;
		icon?: boolean;
		children: Snippet;
	};

	let { variant = 'primary', icon = false, children, type = 'button', ...rest }: Props = $props();
</script>

<button {type} class="btn {variant}" class:icon {...rest}>
	{@render children()}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		font-size: 1rem;
		font-weight: 600;
		font-family: inherit;
		line-height: 1;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition:
			background-color 0.15s,
			color 0.15s,
			border-color 0.15s;
	}

	.btn:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.primary {
		color: white;
		background: #2563eb;
	}
	.primary:hover:not(:disabled) {
		background: #1d4ed8;
	}

	.secondary {
		color: #111827;
		background: white;
		border: 2px solid darkgrey;
	}
	.secondary:hover:not(:disabled) {
		background: #f3f4f6;
	}

	.ghost {
		color: #2563eb;
		background: transparent;
	}
	.ghost:hover:not(:disabled) {
		background: rgba(37, 99, 235, 0.1);
	}

	.danger {
		color: red;
		background: transparent;
	}

	.danger:hover:not(:disabled) {
		background: rgba(255, 0, 0, 0.1); 
	}

	.btn.icon {
		padding: 0.5rem;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'neutral';

	type Size = 'small' | 'default' | 'xs';


	type Props = HTMLButtonAttributes & {
		variant?: Variant;
		icon?: boolean;
		size?: Size;
		children: Snippet;
	};

	let { variant = 'primary', icon = false, size = 'default', children, type = 'button', ...rest }: Props = $props();
</script>

<button {type} class="btn {variant} {size}" class:icon {...rest}>
	{@render children()}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: 1rem;
		font-weight: 400;
		font-family: inherit;
		line-height: 1.2rem;
		height: var(--height-md);
		border: none;
		border-radius: var(--border-radius-md);
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

	.small {
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: 0.875rem;
	}

	.large {
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-lg);
		font-size: 1rem;
	}

	.primary {
		color: var(--fg-inverse);
		background: var(--bg-primary);
	}
	.primary:hover:not(:disabled) {
		background:var(--bg-primary-hover);
	}

	.secondary {
		color: var(--fg-neutral);
		border: 1px solid var(--fg-neutral);
	}
	.secondary:hover:not(:disabled) {
		background: var(--bg-neutral);
		color: var(--fg-inverse);
	}

	.ghost {
		color: var(--fg-neutral);
		background: transparent;
	}
	.ghost:hover:not(:disabled) {
		background: var(--bg-neutral-tonal);
		color: var(--fg-neutral-hover);
	}

	.neutral {
		color: var(--fg-neutral);
		background: transparent;
	}

	.neutral:hover:not(:disabled) {
		background: var(--bg-neutral-tonal);
		color: var(--fg-neutral-hover);

	}

	.danger {
		color: var(--fg-danger);
		background: transparent;
	}

	.danger:hover:not(:disabled) {
		background: var(--bg-danger-tonal); 
		color: var(--fg-danger-hover);
	}

	.btn.icon {
		padding: var(--spacing-sm);
		width: var(--width-md);
		height: var(--height-md);
		border-radius: var(--border-radius-md);
	}

	.btn.icon.small {
		padding: var(--spacing-xs);
		width: var(--width-sm);
		height: var(--height-sm);
		border-radius: var(--border-radius-sm);
	}

	.btn.icon.xs {
		padding: var(--spacing-2xs);
		width: var(--width-xs);
		height: var(--height-xs);
		border-radius: var(--border-radius-sm);
	}
</style>

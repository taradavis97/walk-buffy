<script lang="ts">
    import { ChevronDown, X } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import Button from '$lib/Button.svelte';

	const DEFAULT_NAMES = ['Tara', 'Alex', 'Maria', 'Jonathan'];

	let customNames = $state<string[]>(
		browser ? JSON.parse(localStorage.getItem('walkerCustomNames') ?? '[]') : []
	);
	let selected = $state<string[]>(
		browser ? JSON.parse(localStorage.getItem('walkerSelected') ?? '[]') : []
	);
	let newName = $state('');
	let open = $state(false);

	const allNames = $derived([...DEFAULT_NAMES, ...customNames]);
	const joined = $derived(selected.join(', '));

	$effect(() => {
		if (browser) localStorage.setItem('walkerSelected', JSON.stringify(selected));
	});
	$effect(() => {
		if (browser) localStorage.setItem('walkerCustomNames', JSON.stringify(customNames));
	});

	function closeOnOutside(node: HTMLElement) {
		function handler(e: PointerEvent) {
			if (open && !node.contains(e.target as Node)) {
				open = false;
			}
		}
		document.addEventListener('pointerdown', handler);
		return () => document.removeEventListener('pointerdown', handler);
	}

	function addCustom() {
		const trimmed = newName.trim();
		if (!trimmed) return;
		if (!allNames.includes(trimmed)) {
			customNames = [...customNames, trimmed];
		}
		if (!selected.includes(trimmed)) {
			selected = [...selected, trimmed];
		}
		newName = '';
	}

	function remove(name: string) {
		selected = selected.filter((n) => n !== name);
	}

	function clearAll() {
		selected = [];
	}
</script>

<details class="wrapper" bind:open {@attach closeOnOutside}>
	<summary class="trigger">
		{#if selected.length === 0}
		  <span class="placeholder">Select walkers...</span>
		{:else}
		 <div class="pills">
		  {#each selected as name (name)}
		   <span class="pill">
			{name}
			<Button
			icon
			variant="neutral"
			size="xs"
			type="button"
			aria-label="Remove {name}"
			onclick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				remove(name);
			}}
			>
			  <X size={12} />
		    </Button>
		   </span>
		  {/each}
		  </div>
		  <Button
	      icon
	      variant="neutral"
	      size="small"
	      type="button"
	      aria-label="Clear all"
	      onclick={(e) => {
	      e.preventDefault();
	      e.stopPropagation();
	      clearAll();
	     }}
	      >
	      <X size={16} />
	      </Button>
         {/if}
		 <ChevronDown size={16} class={open ? 'chevron rotated' : 'chevron'}></ChevronDown>
	</summary>
	<input type="hidden" name="walkerName" value={joined} />
	<div class="panel">
		{#each allNames as name (name)}
			<label class="row">
				<input type="checkbox" bind:group={selected} value={name} />
				{name}
			</label>
		{/each}
		<div class="add">
			<input
				type="text"
				placeholder="Add name..."
				bind:value={newName}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						addCustom();
					}
				}}
			/>
			<Button type="button" variant="secondary" onclick={addCustom}>Add</Button>
		</div>
	</div>
</details>

<style>
	.wrapper {
		position: relative;
	}

	.trigger {
		border: solid var(--fg-border) 1px;
		border-radius: var(--border-radius-md);
		padding: var(--spacing-sm) var(--spacing-sm);
		padding-right: calc(var(--spacing-sm) + 20px);
		color: var(--fg-lighter);
		text-transform: capitalize;
		font-weight: 400;
		cursor: pointer;
		height: var(--height-md);
		list-style: none;
		min-width: 16rem;
		background: var(--bg-elevation-1);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.trigger::-webkit-details-marker {
		display: none;
	}

	:global(.chevron) {
		position: absolute;
		right: var(--spacing-sm);
		color: var(--fg-neutral);
		transition: transform 0.15s ease;
	}

	:global(.rotated) {
		transition: transform 0.15s ease;
		transform: rotate(180deg);
	}

	.panel {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 0.25rem;
		background: var(--bg-elevation-1);
		border: solid var(--fg-border) 1px;
		border-radius: var(--border-radius-md);
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 16rem;
		z-index: 10;
		color: var(--fg-default);
		font-weight: 400;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.5rem;
		text-transform: capitalize;
		cursor: pointer;
	}

	.add {
		display: flex;
		gap: 0.25rem;
		margin-top: 0.25rem;
		padding-top: 0.5rem;
		border-top: solid var(--fg-border) 1px;
	}

	.add input {
		flex: 1;
		min-width: 0;
		background: var(--bg-elevation-2);
		border: solid var(--fg-border) 1px;
		border-radius: var(--border-radius-md);
		padding: var(--spacing-sm) var(--spacing-sm);
		color: var(--fg-light);
		text-transform: capitalize;
		font-weight: 400;
		cursor: text;
		height: var(--height-md);
		
	
	}



	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		flex: 1;
	}

	.pill {
		border: solid 1px var(--fg-border);
		border-radius: var(--border-radius-md);
		padding-inline: var(--spacing-sm);
		color: var(--fg-default);
		font-weight: 300;
	}

	

</style>

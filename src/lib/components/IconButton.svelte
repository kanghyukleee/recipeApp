<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	// for type safety & auto complete for button element, and <Icon> element
	interface $$Props extends HTMLButtonAttributes {
		icon: ComponentType<Icon>;
		label: string;
	}

	export let icon: ComponentType<Icon>;
	export let label: string;

  // allow to use button element's function such as .focus()
  let button: HTMLButtonElement
  export function getButton() {
    return button;
  }
</script>
<!-- pre-declare directives -->
<button bind:this={button} on:click on:mouseover on:focus on:keydown {...$$restProps}>
	<!-- render icon by svelte:component, color depends on theme -->
	<svelte:component this={icon} aria-hidden="true" focusable="false" />
  <span class="visually-hidden">{label}</span>
</button>

<style lang="scss">
	button {
		border: none;
		background: none;
		cursor: pointer;
		padding: 0;
		width: 38px;
		height: 38px;
		:global(svg) {
			vertical-align: middle;
			color: var(--text-color);
		}
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
		&:active {
			background-color: var(--item-hover-color);
		}
	}
</style>

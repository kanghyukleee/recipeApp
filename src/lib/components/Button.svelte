<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Element = $$Generic<'button' | 'a'>;

	interface ButtonComponentElements {
		button: HTMLButtonAttributes;
		a : HTMLAnchorAttributes;
	}

	type $$Props = ButtonComponentElements[Element] & {
		element: Element;
		varient?: 'filled' | 'outline' | 'danger';
		className?: string;
	}; 
	
	export let element: 'button' | 'a';
	export let varient: 'filled' | 'outline' | 'danger' = 'filled';
	export let className: string = '';
</script>

<svelte:element
	this={element}
	class="button button-{varient} {className}"
	on:click
	{...$$restProps}
>
	<slot />
</svelte:element>

<style lang="scss">
	.button {
		display: inline-block;
		border: none;
		font-weight: 600;
		font-size: functions.toRem(14);
		border-radius: 20px;
		cursor: pointer;
		padding: 7px 15px;
		text-decoration: none;

		// variants
		&.button-filled {
			background-color: var(--accent-color);
			// if light color change text color
			color: var(--dark-text-color);
			border: 2px solid var(--accent-color);
		}
		&.button-outline {
			background: transparent;
			color: var(--dark-text-color);
			border: 2px solid;
		}
		&.button-danger {
			background-color: var(--error);
			color: white;
			border: 2px solid var(--error);
		}

		// functionality
		&:disabled {
			opacity: 0.8;
			cursor: not-allowed;
		}
		&:hover {
			&.button-filled,
			&.button-danger {
				background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0 0);
				border-image: linear-gradient(rgba(0, 0, 0, 0.2) 0 0);
			}
			&.button-outline {
				background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
			}
		}
		&:active {
			&.button-filled,
			&.button-danger {
				background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
				border-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
			}
			&.button-outline {
				background-image: linear-gradient(rgba(255, 255, 255, 0.4) 0 0);
			}
		}
	}
</style>

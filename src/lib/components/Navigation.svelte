<script lang="ts">
	import { tick, type ComponentType } from 'svelte';
	import { Home, Search, UtensilsCrossed, Menu, X, type Icon } from 'lucide-svelte';
	import logo from '$assets/logo-no-background.png';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { IconButton } from '$components';

	export let isDesktop: boolean;
	
	let isMobileMenuOpen = false;
	$: isMenuOpen = isDesktop || isMobileMenuOpen;

	let openMenuButton: IconButton;
	let closeMenuButton: IconButton;
	// keep last list element(anchor) for keyboard control A11Y(tab, shift-tab)
	let lastFocusableElement: HTMLAnchorElement;

	const menuItems: {
		path: string;
		label: string;
		icon: ComponentType<Icon>;
	}[] = [
		{
			path: '/',
			label: 'Home',
			icon: Home
		},
		{
			path: '/search',
			label: 'Search',
			icon: Search
		},
		{
			path: '/recipe/me',
			label: 'My Recipes',
			icon: UtensilsCrossed
		}
	];

	const openMenu = async () => {
		isMobileMenuOpen = true;
		// DOM nodes must be updated before focusing on button
		await tick();
		closeMenuButton.getButton().focus();
	};
	const closeMenu = () => {
		isMobileMenuOpen = false;
		// open button is never been hidden, no need to update DOM nodes
		openMenuButton.getButton().focus();
	};

	beforeNavigate(() => {
		isMobileMenuOpen = false;
	});

	// A11Y on sidebar only
	// function called shift-tab at top element
	const moveFocusToBottom = (event: KeyboardEvent) => {
		if (isDesktop) return;
		if (event.key === 'Tab' && event.shiftKey) {
			event.preventDefault();
			lastFocusableElement.focus();
		}
	};

	// function called tab at bottom element
	const moveFocusToTop = (event: KeyboardEvent) => {
		if (isDesktop) return;
		if (event.key === 'Tab' && !event.shiftKey) {
			event.preventDefault();
			closeMenuButton.getButton().focus();
		}
	};

	// common rule
	const handleEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	};
</script>

<svelte:head>
	{#if !isDesktop && isMobileMenuOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

<div class="nav-content" class:desktop={isDesktop} class:mobile={!isDesktop}>
	{#if !isDesktop && isMobileMenuOpen}
		<div
			class="overlay"
			on:click={closeMenu}
			on:keyup={handleEscape}
			transition:fade={{ duration: 200 }}
		/>
	{/if}
	<nav aria-label="Main">
		{#if !isDesktop}
			<IconButton
				icon={Menu}
				label="Open Menu"
				on:click={openMenu}
				aria-expanded={isMenuOpen}
				bind:this={openMenuButton}
				class="menu-button"
			/>
		{/if}
		<div
			class="nav-content-inner"
			class:is-hidden={!isMenuOpen}
			style:visibility={isMenuOpen ? 'visible' : 'hidden'}
			on:keyup={handleEscape}
		>
			{#if !isDesktop}
				<IconButton
					icon={X}
					label="Close Menu"
					on:click={closeMenu}
					bind:this={closeMenuButton}
					on:keydown={moveFocusToBottom}
					class="close-menu-button"
				/>
			{/if}
			<img class="logo" src={logo} alt="The Recipe" />
			<ul>
				{#each menuItems as item, index}
					{@const iconProps = {
						focusable: 'false',
						'aria-hidden': true,
						// color depens on theme
						color: 'var(--text-color)',
						size: 26,
						strokeWidth: 1
					}}
					<li class:active={item.path === $page.url.pathname}>
						{#if menuItems.length === index + 1}
							<a bind:this={lastFocusableElement} href={item.path} on:keydown={moveFocusToTop}>
								<svelte:component this={item.icon} {...iconProps} />
								{item.label}</a
							>
						{:else}
							<a href={item.path}>
								<svelte:component this={item.icon} {...iconProps} />
								{item.label}</a
							>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		.overlay {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: var(--nav-color);
			opacity: 0.75;
			z-index: 999;
			@include breakpoint.up('md') {
				display: none;
			}
		}
		.logo {
			display: block;
			margin: 10px auto 0;
			max-width: 100%;
			width: 150px;
		}
		.nav-content-inner {
			padding: 20px;
			min-width: var(--sidebar-width);
			background-color: var(--nav-color);
			height: 100vh;
			overflow: auto;
			display: none;

			ul {
				padding: 0;
				margin: 20px 0 0;
				list-style: none;
				li {
					&.active {
						a {
							opacity: 1;
						}
					}
					a {
						display: flex;
						align-items: center;
						text-decoration: none;
						color: var(--text-color);
						font-size: functions.toRem(14);
						font-weight: 500;
						padding: 5px;
						margin: 10px 0;
						opacity: 0.7;
						transition: opacity 0.2s;
						&:hover,
						&:focus {
							opacity: 1;
						}
						:global(svg) {
							margin-right: 12px;
						}
					}
				}
			}
		}
		&.desktop {
			position: sticky;
			top: 0;
			.nav-content-inner {
				@include breakpoint.up('md') {
					display: block;
				}
			}
		}
		&.mobile .nav-content-inner {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			transition: transform 200ms, opacity 200ms;
			&.is-hidden {
				transition: transform 200ms, opacity 200ms, visibility 200ms;
				transform: translateX(-100%);
				opacity: 0;
			}
			@include breakpoint.down('md') {
				display: block;
			}
		}
		:global(.menu-button) {
			@include breakpoint.up('md') {
				display: none;
			}
		}
		:global(.close-menu-button) { 
			position: absolute;
			right: 3px;
			top: 3px;
			
		}
	}
</style>

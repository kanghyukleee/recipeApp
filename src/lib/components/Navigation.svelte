<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { Home, Search, UtensilsCrossed, type Icon } from 'lucide-svelte';
	import logo from '$assets/logo-no-background.png';
	import { page } from '$app/stores';

	export let isDesktop: boolean;

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
			path: '/recipes/me',
			label: 'My Recipes',
			icon: UtensilsCrossed
		}
	];
</script>

<div class="nav-content" class:desktop={isDesktop} class:mobile={!isDesktop}>
	<nav aria-label="Main">
		<div class="nav-content-inner">
			<img class="logo" src={logo} alt="The Recipe" />
			<ul>
				{#each menuItems as item}
					<li class:active={item.path === $page.url.pathname}>
						<a href={item.path}>
							<svelte:component
								this={item.icon}
								focusable="false"
								aria-hidden="true"
								color="white"
								size={26}
								strokeWidth={1}
							/>
							{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		.nav-content-inner {
			.logo {
				display: block;
				margin: auto;
				max-width: 100%;
				width: 150px;
			}
			padding: 20px;
			min-width: var(--sidebar-width);
			background-color: var(--dark-nav-color);
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
						color: white;
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
	}
</style>

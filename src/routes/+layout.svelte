<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { LogoutForm, Button, Navigation, ToggleSwitch, Header } from '$components';

	export let data: LayoutData;

	let topbar: HTMLElement;
	let scrollY: number;
	let topbarOpacity = 0;

	$: if (topbar) {
		topbarOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
	}

	$: user = data.user;
</script>

<svelte:window bind:scrollY />

<div id="main">
	{#if user}
		<div id="sidebar"><Navigation isDesktop={true} /></div>
	{/if}
	<div id="content">
		<div id="topbar" bind:this={topbar}>
			<div
				class="topbar-bg"
				style:background-color="var(--dark-nav-color)"
				style:opacity={`${topbarOpacity}`}
			/>
			<Header />
		</div>
		<main id="main-content" class:logged-in={user}>
			<slot />
			<ToggleSwitch>Light Mode</ToggleSwitch>
			<div class="test" style="height:3000px" />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		#content {
			flex: 1;
			#topbar {
				position: fixed;
				height: var(--topbar-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
				width: 100%;
				z-index: 999;
				.topbar-bg {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: -1;
				}
				@include breakpoint.up('md') {
					padding: 0 30px;
					width: calc(100% - var(--sidebar-width));
				}
			}
			main#main-content {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
				&.logged-in {
					padding-top: calc(30px + var(--topbar-height));
				}
			}
		}
	}
</style>

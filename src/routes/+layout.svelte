<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { Navigation, Header } from '$components';
	import { page } from '$app/stores';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { browser } from '$app/environment';


	NProgress.configure({ showSpinner: false });

	export let data: LayoutData;

	let topbar: HTMLElement;
	let scrollY: number;
	let topbarOpacity = 0;
	$: if (topbar) {
		topbarOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
	}

	let loadingSpinner: HTMLElement;
	let spinnerOpacity = 0;
	$: if (loadingSpinner) {
		if (browser) {
			spinnerOpacity =
				document.body.offsetHeight - (scrollY + window.innerHeight) < 214
					? 1 - (document.body.offsetHeight - (scrollY + window.innerHeight)) / 213
					: 0;
		}
	}

	$: user = data.user;
	afterNavigate(() => {
		NProgress.done();
	});

	beforeNavigate(() => {
		NProgress.start();
	});

</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>The Recipe{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
</svelte:head>

<div id="main">
	{#if $page.url.pathname !== '/login'}
		<div id="sidebar"><Navigation isDesktop={true} /></div>
	{/if}

	<div id="content">
		{#if $page.url.pathname !== '/login'}
			<div id="topbar" bind:this={topbar}>
				<div
					class="topbar-bg"
					style:background-color="var(--nav-color)"
					style:opacity={`${topbarOpacity}`}
				/>
				<Header />
			</div>
		{/if}

		<main id="main-content" class:logged-in={user}>
			<slot />
			<!-- set routes that loader spinner need -->
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		:global(html.no-js) & {
			@include breakpoint.down('md') {
				display: block;
			}
		}
		#content {
			flex: 1;
			#topbar {
				position: fixed;
				height: var(--topbar-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
				width: 100%;
				z-index: 100;
				:global(html.no-js) & {
					position: sticky;
					top: 0;
					background-color: var(--nav-color);
					height: auto;
					padding: 10px 20px;
					@include breakpoint.up('md') {
						position: fixed;
					}
				}
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
				margin-top: var(--topbar-height);
				padding: 30px 15px 60px;

				// overscroll-behavior: auto; //don't know this work as I expected...

				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
				&.logged-in {
					padding-top: calc(30px + var(--topbar-height));
					:global(html.no-js) & {
						@include breakpoint.down('md') {
							padding-top: 30px;
						}
					}
				}
			}
		}
	}
</style>

<script lang="ts">
	import { UtensilsCrossed, User2 } from 'lucide-svelte';

	export let color: string | null;
	export let image: string | undefined;
	export let name: string;
	export let type: string | undefined;
</script>

<div class="banner">
	<div
		class="banner-gradient"
		style:background-image="linear-gradient(0deg, transparent, {color ||
			'var(--bg-gradient-color)'})"
	/>
	<div class="cover">
		{#if type === 'recipe'}
			{#if image}
				<img src={image} alt={name} class="recipe-cover-img" />
			{:else}
				<div class="recipe-cover-placeholder">
					<UtensilsCrossed focusable="false" aria-hidden color="var(--light-gray)" />
				</div>
			{/if}
		{:else if type === 'profile'}
			{#if image}
				<img src={image} alt={name} class="profile-cover-img" />
			{:else}
				<div class="profile-cover-placeholder">
					<User2 focusable="false" aria-hidden color="var(--light-gray)" />
				</div>
			{/if}
		{/if}
	</div>
	<div class="info">
		{#if type === 'recipe'}
			<slot name="tag" />
			<h1 class="title">{name}</h1>
			<slot name="description" />
			<slot name="rating" />
		{:else if type === 'profile'}
			<h1 class="name">{name}</h1>
			<slot name="email" />
			<slot name="followers" />
		{/if}
	</div>
</div>

<div class="content">
	<slot />
</div>

<style lang="scss">
	.content {
		position: relative;
		z-index: 10;
		min-height: 300px;
		background-image: linear-gradient(0deg, var(--bg-color), var(--bg-gradient-color));
		margin: 0 -30px;
		padding: 30px;
	}
	.banner {
		position: relative;
		display: flex;
		flex-direction: column;
		margin: calc(-1 * (30px + var(--topbar-height))) -30px 0;
		padding: calc(30px + var(--topbar-height)) 30px 20px;
		@include breakpoint.up('sm') {
			flex-direction: row;
			align-items: flex-end;
		}
		.banner-gradient {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 150%;
			z-index: 1;
		}
		.info {
			z-index: 10;
			.title {
				font-size: functions.toRem(32);
				margin: 5px 0 0;
				@include breakpoint.up('md') {
					font-size: functions.toRem(36);
				}
				@include breakpoint.up('lg') {
					font-size: functions.toRem(54);
				}
			}
		}
		.cover {
			margin-right: 40px;
			z-index: 10;
			@include breakpoint.down('sm') {
				margin-right: 0;
				margin-bottom: 30px;
			}
			.recipe-cover-img, .recipe-cover-placeholder {
				width: 100px;
				aspect-ratio: 1.5;
				object-fit: cover;
				box-shadow: var(--shadow-value);
				@include breakpoint.up('sm') {
					width: 345px;
				}
				@include breakpoint.up('md') {
					width: 300px;
				}
				@include breakpoint.up('lg') {
					width: 345px;
				}
			}
			.profile-cover-img, .profile-cover-placeholder {
				width: 100px;
				border-radius: 100%;
				aspect-ratio: 1;
				object-fit: cover;
				box-shadow: var(--shadow-value);
				@include breakpoint.up('sm') {
					width: 230px;
				}
				@include breakpoint.up('md') {
					width: 200px;
				}
				@include breakpoint.up('lg') {
					width: 230px;
				}
			}
		}
		.recipe-cover-placeholder, .profile-cover-placeholder {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--item-color);
			:global(svg) {
				width: 40%;
				height: 40%;
			}
		}
	}
</style>

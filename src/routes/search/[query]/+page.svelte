<script lang="ts">
	import { Card } from '$components';
	import { Search } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	type RecipeType = {
		_id: string;
		type: 'recipe';
		owner_id: string;
		title: string;
		image?: string;
		rating: {
			user_id: string;
			rate: 0 | 1 | 2 | 3 | 4 | 5;
			comment?: string;
		}[];
		categories: string[];
		description: string;
		prep_time: string;
		cook_time: string;
		yield: string;
		ingredient: {
			name: string;
			quantity: string;
			unit?: string;
			note?: string;
		}[];
		steps: {
			step_number: number;
			instruction: string;
			duration: string;
			image?: string;
		}[];
	};

	export let data: PageData;
  let items: RecipeType[] = [];
	$: if(data.result) {
    items = data.result
  }

	let searchInput: HTMLInputElement;
	$: searchQuery = $page.params.query || '';
	

</script>

<div class="section-header">
	<h2>{data.title}</h2>
</div>

<form action="/search" method="GET" role="search">
	<div class="search-input-wrapper">
		<Search aria-hidden focusable="false" />
		<input
			class="search-input"
			type="search"
			bind:this={searchInput}
			value={searchQuery}
			name="q"
			placeholder="Search for recipes, categories, or ingredients!"
			aria-label="Search for recipes, categories, or ingredients!"
		/>
	</div>
</form>

<section class="content-row">
	<div class="grid-items recipe">
		{#each items as item}
			<div class="grid-item">
				<Card {item} />
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
    justify-content: center;
		margin-bottom: 80px;
		:global(svg) {
			position: absolute;
			margin-right: 610px;
			stroke: var(--medium-gray);
			width: 22px;
			height: 22px;
      margin-top: 50px;
      @include breakpoint.down('lg') {
        margin-right: 360px;
      }
		}
		.search-input {
      margin-top: 50px;

			border: none;
			padding: 0 20px 0 40px;
			height: calc(var(--topbar-height) - 25px);
			border-radius: 20px;
			font-size: functions.toRem(14);
			color: var(--medium-gray);
      @include breakpoint.up('lg') {
        width: 650px;
      }
      width: 400px;
		}
	}
</style>

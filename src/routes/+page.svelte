<script lang="ts">
	import { Card } from '$components';
	import type { PageData } from './$types';
	import { inview } from 'svelte-inview'; // intersection observer

	type RecipeType = {
		_id: string;
		type: 'recipe';
		owner_id: string;
		title: string;
		image?: string;
		rating: {
			user_id: string;
			rate: 1 | 2 | 3 | 4 | 5;
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
	type ProfileType = {
		_id: string;
		email: string; // extracted from login
		type: 'profile';
		user_image: string; // extracted from login
		name: string; // extracted from login
		recipe_ids: string[];
		followers: number;
	};

	export let data: PageData;

	let items: RecipeType[];

	$: {
		if (data) {
			items.push(data.recipe);
		}
	}
</script>

<div class="section-header">
	<h2 class="section-title">Recipes</h2>
</div>

<section class="content-row">
	<div class="grid-items">
		{#each items as item}
			<div class="grid-item">
				<Card {item} />
			</div>
		{/each}
	</div>
</section>

<!-- intersection observer -->
<div
	class="content-loader"
	use:inview
	on:inview_enter={async () => {
		const recipe = await fetch('/api/recipe?limit=4');
		const recipeRes = await recipe.json();
		items = [...recipeRes];
	}}
	aria-hidden="true"
/>

<style lang="scss">
	.content-row {
		margin-bottom: 40px;
	}
	.section-header {
		align-items: center;
		margin-bottom: 20px;
		.section-title {
			font-size: functions.toRem(22);
			font-weight: 600;
			margin: 0;
		}
	}
</style>

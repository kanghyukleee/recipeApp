<script lang="ts">
	import { Card } from '$components';
	import type { PageData } from './$types';
	import { inview } from 'svelte-inview'; // intersection observer

	type RecipeType = {
		type: 'recipe';
		recipe_id: number;
		owner_id: number;
		title: string;
		image: string;
		rating: {
			user_id: string;
			rate: 0 | 1 | 2 | 3 | 4 | 5;
			comment?: string;
		}[];
		categories: string[];
		is_featured: boolean;
		description: string;
		prep_time: string | number;
		cook_time: string | number;
		yield: string | number;
		ingredient: {
			name: string;
			quantity: string | number;
			note?: string;
		}[];
		steps: {
			step_number: number;
			instruction: string;
			duration: string | number;
			image?: URL | string;
		}[];
	};
	type ProfileType = {
		_id?: string;
		type: 'profile';
		user_id?: number;
		user_image: string;
		name: string;
		recipe_ids: [];
		followers: number;
	};

	export let data: PageData;

	// 나중에 sections를 그냥 section으로 변경.
	let sections: {
		title: string;
		path: string;
		items: (RecipeType | ProfileType)[];
	}[] = [];

	$: {
		if (data) {
			sections.push({
				title: 'Recipes',
				path: '/recipe',
				items: data.recipe
			});
		}
	}
</script>

<div class="section-header">
	<h2 class="section-title">{sections[0].title}</h2>
</div>

{#each sections as section}
	<section class="content-row">
		<div class="grid-items">
			{#each section.items as item}
				<div class="grid-item">
					<Card {item} />
				</div>
			{/each}
		</div>
	</section>
{/each}

<!-- intersection observer -->
<div
	class="content-loader"
	use:inview
	on:inview_enter={async () => {
		const recipe = await fetch('/api/recipe?limit=4');
		const recipeRes = await recipe.json();
		sections[0].items = [...recipeRes];
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

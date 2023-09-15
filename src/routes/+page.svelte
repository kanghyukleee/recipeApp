<script lang="ts">
	// ADD IntersectionObserver!, https://www.youtube.com/watch?v=iZhq7I42uaI

	// option 1, svelte version: https://www.npmjs.com/package/svelte-inview
	// option 2, original : https://www.npmjs.com/package/intersection-observer
	import { Card } from '$components';
	import type { PageData } from './$types';

	

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
		type: 'profile';
		user_id: number;
		user_image: string;
		name: string;
		recipe_ids: [];
		followers: number;
	};

	export let data: PageData;

	//
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

	// content row header 없애거나 변경
</script>

{#each sections as section}
	<section class="content-row">
		<div class="content-row-header">
			<div class="left">
				<h2 class="section-title">{section.title}</h2>
			</div>
			<div class="right">See All</div>
		</div>
		<div class="grid-items">
			{#each section.items as item}
				<div class="grid-item">
					<Card {item} />
				</div>
			{/each}
		</div>
	</section>

	
{/each}

<style lang="scss">
	.content-row {
		margin-bottom: 40px;
		.content-row-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
			.section-title {
				font-size: functions.toRem(22);
				font-weight: 600;
				margin: 0;
			}
		}
	}
	
</style>

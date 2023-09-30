<script lang="ts">
	import { Card, Button } from '$components';
	import type { PageData } from './$types';

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

	// let items: (RecipeType | ProfileType)[] = [];

	let sections: {
		title: string;
		path: string;
		items: (RecipeType | ProfileType)[] = [];
		type: string;
	}[] = [];

	// $: {
	// 	if (data) {
	// 		items = data.recipes;
	// 	}
	// }

	$: {
		// recipes data set
		if (data.recipes) {
			sections.push({
				title: 'Recipes',
				path: '/recipe',
				items: data.recipes,
				type: "recipe"
			});
		}
		// profiles data set
		if (data.profiles) {
			sections.push({
				title: 'Profiles',
				path: '/profile',
				items: data.profiles,
				type: 'profile'
			});
		}
	}
</script>

{#each sections as section}
	<section class="content-row">
		<!-- section header -->
		<div class="content-row-header">
			<div class="left">
				<h2 class="section-title">{section.title}</h2>
			</div>
			<div class="right">
				<Button element="a" href={section.path} varient="outline"
					>See All<span class="visually-hidden">{section.title}</span></Button
				>
			</div>
		</div>
		<!-- section content -->
		<div class="grid-items {section.type}">
			{#each section.items as item}
				<div class="grid-item">
					<Card {item} />
				</div>
			{/each}
		</div>
	</section>
{/each}

<!-- <div class="section-header">
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
</section> -->

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
	// .section-header {
	// 	align-items: center;
	// 	margin-bottom: 20px;
	// 	.section-title {
	// 		font-size: functions.toRem(22);
	// 		font-weight: 600;
	// 		margin: 0;
	// 	}
	// }
	// .content-loader {
	// 	margin-top: 150px;
	// }
</style>

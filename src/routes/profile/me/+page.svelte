<script lang="ts">
	import { Button, Card, ItemPage } from '$components';
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
	let recipes: RecipeType[] = [];
	const userProfile = data.userProfile;

	$: if (data.userRecipes.length > 0) {
		recipes = data.userRecipes;
	}

	const followersFormat = Intl.NumberFormat('en', { notation: 'compact' });
</script>

{#if userProfile}
	<ItemPage
		name={userProfile.name}
		image={userProfile.user_image}
		color="null"
		type={userProfile.type}
	>
		<p class="email" slot="email">{userProfile.email}</p>
		<p class="followers" slot="followers">
			{followersFormat.format(userProfile.followers)} Followers
		</p>

		{#if recipes.length > 0}
			<div class="grid-items recipe">
				{#each recipes as recipe}
					<div class="grid-item">
						<Card item={recipe} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="item-placeholder">
				<h1>Upload Your Recipe</h1>
				<Button element="a" href="/">Add Recipe</Button>
			</div>
		{/if}
	</ItemPage>
{:else}
	<h1>Error!</h1>
	<Button element="a" href="/">Home</Button>
{/if}

<!-- intersection observer -->
<div
	class="content-loader"
	use:inview
	on:inview_enter={async () => {
		const recipe = await fetch(`/api/recipe?userid=${userProfile?._id}&limit=4`);
		const recipeRes = await recipe.json();
		recipes = recipes.concat(recipeRes);
	}}
	aria-hidden="true"
/>

<style lang="scss">
	.item-placeholder {
		height: 100%;
		align-items: center;
		text-align: center;
		margin-top: 100px;
	}
	.content-loader {
		margin-top: 300px;
	}
</style>

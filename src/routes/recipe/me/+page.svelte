<script lang="ts">
	import { Button, Card, ItemPage } from '$components';
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

	export let data: PageData;
	let recipes: RecipeType[] = [];
	const userProfile = data.userProfile;

	$: if (data.userRecipes.length > 0) {
		recipes = data.userRecipes;
	}
</script>

{#if userProfile}
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
			<h1 class="notification">Upload Your Recipe</h1>
			<Button element="a" href="/recipe/new">Add Recipe</Button>
		</div>
	{/if}
{:else}
	<h1>Error!</h1>
{/if}

<style lang="scss">
	.item-placeholder {
		height: 100%;
		align-items: center;
		text-align: center;
		margin-top: 100px;
		.notification {
			font-size: functions.toRem(52);
			margin-bottom: 50px;
		}
	}
</style>

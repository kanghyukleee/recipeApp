<script lang="ts">
	import { ItemPage } from '$components';
	import { Star, ChefHat, Timer, Utensils, ChevronRight } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { rateResult } from '$helpers';

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
	const recipe: RecipeType = data.recipe;

	let totalRate = 0;
	let averageRate = 0;
	let zeroToOne: string;
	let oneToTwo: string;
	let twoToThree: string;
	let threeToFour: string;
	let fourToFive: string;

	let ratingResult = ['off', 'off', 'off', 'off', 'off'];

	if (recipe.rating.length > 0) {
		recipe.rating.forEach((eachRate) => {
			totalRate += eachRate.rate;
		});
		averageRate = totalRate / recipe.rating.length;
		ratingResult = rateResult(averageRate);
		[zeroToOne, oneToTwo, twoToThree, threeToFour, fourToFive] = ratingResult;
	}
</script>

<ItemPage name={recipe.title} type={recipe.type} image={recipe.image} color="null">
	<!-- change categories to string, @Card -->
	<p class="tag" slot="tag">{recipe.categories.map((tag) => tag).join(', ')}</p>
	<p class="description" slot="description">{recipe.description}</p>
	<div class="rating" slot="rating">
		{#if recipe.rating.length > 0}
			<div class={zeroToOne}>
				<Star aria-hidden="true" focusable="false" />
			</div>
			<div class={oneToTwo}>
				<Star aria-hidden="true" focusable="false" />
			</div>
			<div class={twoToThree}>
				<Star aria-hidden="true" focusable="false" />
			</div>
			<div class={threeToFour}>
				<Star aria-hidden="true" focusable="false" />
			</div>
			<div class={fourToFive}>
				<Star aria-hidden="true" focusable="false" />
			</div>
		{:else}
			<p>No ratings yet</p>
		{/if}
	</div>

	<div class="meta">
		<div class="prep-time">
			<Timer aria-hidden="true" focusable="false" />
			<p>Prepration Time: {recipe.prep_time} min</p>
		</div>
		<div class="cook-time">
			<ChefHat aria-hidden="true" focusable="false" />
			<p>Cooking Time: {recipe.cook_time} min</p>
		</div>
		{#if Number(recipe.yield) > 1}
			<div class="yield">
				<Utensils aria-hidden="true" focusable="false" />
				<p>Servings: {recipe.yield} people</p>
			</div>
		{:else}
			<div class="yield">
				<Utensils aria-hidden="true" focusable="false" />
				<p>Servings: {recipe.yield} person</p>
			</div>
		{/if}
	</div>

	<div class="ingredients">
		<h2>Ingredients</h2>
		<div class="ingredient-bg">
			{#each recipe.ingredient as ingredient}
				<div class="ingredient-item">
					<div class="ingredient-group">
						<ChevronRight />
						<p class="ingredient-name">{ingredient.name} :</p>
						<p class="ingredient-quantity">
							{ingredient.quantity}
						</p>
						{#if ingredient.unit}
							<p class="ingredient-unit">{ingredient.unit}</p>
						{/if}
						{#if ingredient.note}
							<p class="ingredient-note">(note: {ingredient.note})</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="steps">
		<h2>Cooking Steps</h2>
		<div class="steps-bg">
			{#each recipe.steps as step}
				<div class="step">
					<h6 class="step-number">Step {step.step_number}</h6>
					{#if step.image}
						<img src={step.image} alt={step.instruction} class="step-image" />
					{/if}
					<p class="step-instruction">{step.instruction}</p>
					<p class="step-duration">Duration: {step.duration} min</p>
				</div>
			{/each}
		</div>
	</div>
</ItemPage>

<style lang="scss">
	.rating {
		align-items: center;
		display: flex;
		:global(svg) {
			width: 80%;
			height: 80%;
		}
		.fill {
			:global(svg) {
				color: var(--accent-color);
				fill: var(--accent-color);
			}
		}
		.outline {
			:global(svg) {
				color: var(--accent-color);
				fill: none;
			}
		}
		.off {
			:global(svg) {
				color: var(--text-color);
				fill: none;
			}
		}
		@include breakpoint.down('xl') {
			justify-content: center;
		}
	}
	.meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		@include breakpoint.up('lg') {
			flex-direction: row;
		}
		.prep-time,
		.cook-time,
		.yield {
			width: 100%;
			text-align: center;
      p{
        font-weight: 600;
        font-size: functions.toRem(20);
      }
			:global(svg) {
				margin-right: 10px;
        height: 10%;
        width: 10%;
        stroke-width: 1.2;
			}
		}
	}
	.ingredients {
		margin: 50px 150px;
		@include breakpoint.down('xl') {
			margin: 50px 20px;
		}
		.ingredient-bg {
			background-color: var(--text-area-bg-color);
			border-radius: 20px;
			padding: 20px;
			.ingredient-item {
				.ingredient-group {
					display: flex;
					align-items: center;
					:global(svg) {
						margin-right: 10px;
					}
					.ingredient-name {
						font-weight: 600;
					}
					.ingredient-quantity {
						margin-left: 5px;
					}
					.ingredient-unit {
						margin-left: 5px;
						margin-right: 5px;
					}
				}
			}
		}
	}
	.steps {
		margin: 50px 150px;
		@include breakpoint.down('xl') {
			margin: 50px 20px;
		}
		.steps-bg {
			background-color: var(--text-area-bg-color);
			border-radius: 20px;
			padding: 20px;
			.step {
				.step-number {
					font-size: functions.toRem(21);
				}
				.step-image {
					width: 100%;
					aspect-ratio: 2.5;
					object-fit: cover;
					border-radius: 10px;
				}
				.step-instruction,
				.step-duration {
					margin-left: 30px;
				}
			}
		}
	}
</style>

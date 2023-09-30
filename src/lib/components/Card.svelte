<script lang="ts">
	import { rateResult } from '$helpers';
	import { UtensilsCrossed, Star } from 'lucide-svelte';

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

	export let item: RecipeType | ProfileType;

	let totalRate = 0;
	let averageRate = 0;
	let zeroToOne: string;
	let oneToTwo: string;
	let twoToThree: string;
	let threeToFour: string;
	let fourToFive: string;

	let ratingResult = ['off', 'off', 'off', 'off', 'off'];

	if (item.type === 'recipe') {
		if (item.rating.length > 0) {
			item.rating.forEach((eachRate) => {
				totalRate += eachRate.rate;
			});
			averageRate = totalRate / item.rating.length;
			ratingResult = rateResult(averageRate);
			[zeroToOne, oneToTwo, twoToThree, threeToFour, fourToFive] = ratingResult;
		}
	}

	const followersFormat = Intl.NumberFormat('en', { notation: 'compact' });
</script>

<div class="{item.type}-card">
	{#if item.type === 'recipe'}
		<!-- recipe card -->
		{#if item.image}
			<div class="{item.type}-cover">
				<img loading="lazy" src={item.image} alt="{item.type} cover for {item.title}" />
			</div>
		{:else}
			<div class="{item.type}-cover-placeholder">
				<!-- TODO: color setup required -->
				<UtensilsCrossed aria-hidden="true" focusable="false" color="var(--light-gray)" />
			</div>
		{/if}
		<div class="{item.type}-info">
			<p class="truncate-1">{item.categories.map((tag) => tag).join(', ')}</p>
			<h4 class="truncate-1">
				<a href="/{item.type}/{item._id}" title={item.title}>{item.title}</a>
			</h4>
			<div class="{item.type}-rating">
				{#if item.rating.length > 0}
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
		</div>
	{:else}
		<!-- profile card -->
		{#if item.user_image}
			<div class="{item.type}-cover">
				<img loading="lazy" src={item.user_image} alt="{item.type} cover for {item.name}" />
			</div>
		{:else}
			<div class="{item.type}-cover-placeholder">
				<!-- TODO: color setup required -->
				<UtensilsCrossed aria-hidden="true" focusable="false" color="var(--subTxt-color)" />
			</div>
		{/if}
		<div class="{item.type}-info">
			<h4 class="truncate-1">
				<a href="/{item.type}/{item._id}" title={item.name}>{item.name}</a>
			</h4>
			<p class="truncate-1">{item.recipe_ids.length} recipes</p>
			<p class="truncate-1">{followersFormat.format(item.followers)} followers</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.recipe-card {
		background-color: var(--item-color);
		padding: 0;
		box-shadow: var(--shadow-value);
		transition: background 0.3s;
		position: relative;
		&:hover {
			background-color: var(--item-hover-color);
			.recipe-cover-placeholder {
				background-color: var(--item-color);
			}
		}
		.recipe-info {
			padding: 20px;
			h4 {
				margin: 0 0 0px;
				font-size: functions.toRem(28);
				font-weight: 600;
				line-height: 1;

				line-height: 1.7;
				a {
					text-decoration: none;
					color: var(--text-color);
					&:focus-visible {
						outline: none;
						&:after {
							outline: 2px solid var(--accent-color);
						}
					}
					&:after {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						border-radius: 4px;
					}
				}
			}
			p {
				position: relative;
				margin: 0;
				color: var(--subTxt-color);
				font-size: functions.toRem(14);
			}
			.recipe-rating {
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
			}
		}
		img {
			width: 100%;
			aspect-ratio: 1.5;
			object-fit: cover;
			margin: 0 0 20px;
		}
		.recipe-cover-placeholder {
			width: 100%;
			aspect-ratio: 1.5;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--placeholder-color);
			margin: 0 0 20px;
			transition: background 0.3s;
			:global(svg) {
				width: 40%;
				height: 40%;
			}
		}
		@include breakpoint.down('md') {
			display: flex;
			height: 200px;
			.recipe-cover,
			.recipe-cover-placeholder {
				aspect-ratio: 1.5;
				object-fit: cover;
				max-width: 300px;
				padding: 0;
				img {
					margin: 0;
				}
			}
			.recipe-info {
				width: 100%;
			}
		}
	}

	.profile-card {
		background-color: var(--item-color);
		padding: 0;
		box-shadow: var(--shadow-value);
		transition: background 0.3s;
		position: relative;

		text-align: center;
		padding: 30px 20px;
		img,
		.profile-cover-placeholder {
			width: 150px;
			max-width: 100%;
			border-radius: 100%;
		}
		&:hover {
			background-color: var(--item-hover-color);
			.profile-cover-placeholder {
				background-color: var(--item-color);
			}
		}
		.profile-info {
			padding: 20px;
			h4 {
				margin: 0;
				text-align: center;
				font-size: functions.toRem(28);
				margin-bottom: 0.5em;
			}

			h4 {
				margin: 0 0 10px;
				font-size: functions.toRem(16);
				font-weight: 600;
				line-height: 1;
				a {
					text-decoration: none;
					color: var(--text-color);
					&:focus-visible {
						outline: none;
						&:after {
							outline: 2px solid var(--accent-color);
						}
					}
					&:after {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						border-radius: 4px;
					}
				}
			}
			p {
				position: relative;
				margin: 0;
				color: var(--subTxt-color);
				font-size: functions.toRem(14);
			}
		}
		img {
			width: 100%;
			aspect-ratio: 1;
			object-fit: cover;
			margin: 0 0 20px;
		}
		.profile-cover-placeholder {
			width: 100%;
			aspect-ratio: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--placeholer-color);
			margin: 0 0 20px;
			transition: background 0.3s;
			:global(svg) {
				width: 40%;
				height: 40%;
			}
		}
	}
</style>

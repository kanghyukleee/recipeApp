<script lang="ts">
	import { Card } from '$components';
	import { SearchForm } from '$components';
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
	let items: RecipeType[] = [];
	$: if (data.result) {
		items = data.result;
	}
</script>

<div class="section-header">
	<h2>{data.title}</h2>
</div>

<SearchForm />

<section class="content-row">
	{#if items.length > 0}
		<div class="grid-items recipe">
			{#each items as item}
				<div class="grid-item">
					<Card {item} />
				</div>
			{/each}
		</div>
	{:else}
		<h2 class="warning">We couldn't find any recipes. Try another search!</h2>
	{/if}
</section>

<style lang="scss">
	.content-row {
		margin-top: 80px;
		.warning {
			margin-top: 200px;
			text-align: center;
		}
	}
</style>

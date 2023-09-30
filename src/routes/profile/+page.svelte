<script lang="ts">
	import Card from '$components/Card.svelte';
	import type { PageData } from './$types';
	import { inview } from 'svelte-inview'; // intersection observer

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
	let items: ProfileType[] = [];

	$: {
		if (data) {
			items = data.profiles;
		}
	}
</script>

<div class="section-header">
	<h2 class="section-title">Profiles</h2>
</div>

<section class="content-row">
	<div class="grid-items profile">
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
		const recipe = await fetch('/api/profile?limit=6');
		const recipeRes = await recipe.json();
		items = items.concat(recipeRes);
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
	.content-loader {
		margin-top: 150px;
	}
</style>

<script lang="ts">
	import { Card } from '$components';
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

	const profile:ProfileType = data.profile

  
	let recipes: RecipeType[] = []; // recipes to display. 4~8 recipes
</script>

<h1>User Profile</h1>
<div class="info">
  {profile.name}
</div>


<div class="recipe-lists">
	<div class="header">
		<div class="header-left" />
		<div class="header-right">See All</div>
	</div>
	<div class="gird-items">
    card content
  </div>
</div>
<!-- invisible loading spin  -->
<style lang="scss">
</style>

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

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

export const load: PageLoad = async ({ fetch, params }) => {
	// get single recipe with given id
	const recipeRes = await fetch(`/api/recipe/${params.id}`);
	if (recipeRes.ok) {
		const recipeJSON: RecipeType = await recipeRes.json();
		
		const owner_id = recipeJSON.owner_id;
		
		const profileRes = await fetch(`/api/profile/${owner_id}`);
		const profileJSON: ProfileType = await profileRes.json();
		return {
			recipe: recipeJSON,
			profile: profileJSON
		};
	} else {
		throw error(404, 'Recipe not Found!');
	}
};

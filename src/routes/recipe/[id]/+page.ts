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

export const load: PageLoad = async ({ fetch, params }) => {
	// get single recipe with given id
	const recipeRes = await fetch(`/api/recipe/${params.id}`);
	if (recipeRes.ok) {
		const recipeJSON: RecipeType = await recipeRes.json();

		return {
			recipe: recipeJSON
		};
	} else {
		throw error(404, 'Recipe not Found!');
	}
};

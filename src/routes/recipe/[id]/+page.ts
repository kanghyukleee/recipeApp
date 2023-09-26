import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	// get single recipe with given id
	const recipeRes = await fetch(`/api/recipe/${params.id}`);
	if (recipeRes.ok) {
		const recipeJSON = await recipeRes.json();

		return {
			recipe: recipeJSON
		};
	} else {
		throw error(404, 'Recipe not Found!');
	}
};

// this route do not require login
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {

	const recipeRes = await fetch('/api/recipe?limit=12');
	const recipeJSON = await recipeRes.json();

	return {
		recipe: recipeJSON
	};
};

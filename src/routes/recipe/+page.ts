
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {

	const recipesRes = await fetch('/api/recipe?limit=12');
	const recipesJSON = await recipesRes.json();

	return {
		recipes: recipesJSON
	};
};

// import { fetchRefresh } from '$helpers';
import type { PageLoad } from './$types';

// auto refresh token 
// import { fetchRefresh } from "$helpers";

export const load: PageLoad = async ({ fetch }) => {
	// auto refresh token 
	// const fetch = (path:string) => fetchRefresh(_fetch, path)  // fetch: _fetch


	const recipe = await fetch('/api/recipe?limit=12');
	const recipeRes = await recipe.json();

	return {
		recipe: recipeRes
	};
};

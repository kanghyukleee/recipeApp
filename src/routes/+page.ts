// this route do not require login
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// get recipes
	const recipesRes = await fetch('/api/recipe?limit=8');
	const recipesJSON = await recipesRes.json();
	// get profiles
	const profilesRes = await fetch('/api/profile?limit=6');
	const profilesJSON = await profilesRes.json();

	return {
		recipes: recipesJSON,
		profiles: profilesJSON
	};
};

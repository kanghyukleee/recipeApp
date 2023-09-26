import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

interface UserProfile {
	_id: string;
	email: string;
	type: 'profile';
	user_image: string;
	name: string;
	recipe_ids: string[];
	followers: number;
}
export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const { user, userProfile } = await parent();
	if (!user) {
		throw error(401, 'Session Expired!');
	}

	// get my recipes (4~8 recipes)
	if (userProfile && userProfile._id) {
		const userRecipeRes = await fetch(`/api/recipe/me?id=${userProfile._id}&limit=4`);
		const userRecipeJSON = await userRecipeRes.json();
		return {
			userRecipes: userRecipeJSON
		};
	} else {
    throw error(400, "Profile not Found!")
  }

	// get my favorite recipes (4~8 recipes)
};

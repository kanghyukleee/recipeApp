import { fetchRefresh } from '$helpers';
import { error, json } from '@sveltejs/kit';
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

export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const { user, userProfile } = await parent();
	const userProfileJSON = userProfile ? JSON.parse(userProfile): null
	
	if (!user) {
		throw error(401, 'Session Expired!');
	}

	// get my recipes (4~8 recipes)
	if (userProfile && userProfileJSON._id) {
		const userRecipesRes = await fetch(`/api/recipe/me?id=${userProfileJSON._id}&limit=4`);
		const userRecipesJSON: RecipeType[] = await userRecipesRes.json();
			
		return {
			userRecipes: userRecipesJSON
		};
	} else {
		throw error(404, 'Profile not Found!');
	}

	// get my favorite recipes (4~8 recipes)
};

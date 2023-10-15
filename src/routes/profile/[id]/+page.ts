import { error, redirect } from '@sveltejs/kit';
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

export const load: PageLoad = async ({ fetch, params, parent }) => {
	// parameter id
	const pathId = await params.id;
	// user id if exist
	const { userProfile } = await parent();
	const userProfileJSON =userProfile ? JSON.parse(userProfile) :null
	const userId = userProfileJSON._id.toString()

	// check user trying to access own profile
	if (userProfile && pathId === userId) {
		throw redirect(301, '/profile/me')
	}		// ->  always got to my profile? why?

	// get single profile with given id
	const profileRes = await fetch(`/api/profile/${params.id}`);
	const profileJSON = await profileRes.json();

	// get user's recipes
	const recipesRes = await fetch(`/api/recipe?userid=${params.id}&limit=8`);
	const recipesJSON = await recipesRes.json()
	console.log("/profile/[id]/+page.ts:",recipesJSON);
	
	return {
		profile:profileJSON,
		recipes: recipesJSON 	
	};

};

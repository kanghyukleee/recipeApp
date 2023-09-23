import { error, type RequestHandler } from '@sveltejs/kit';

// db offline
import RECIPE_DATA from '$assets/dummyRecipeData.json';
// db online
import db from '$db/mongo';

// get my recipes
export const GET: RequestHandler = async ({ url }) => {
	// get user_id
	const userId = url.searchParams.get('id') ? Number(url.searchParams.get('id')) : null;		// this will be changed to string

	if (userId) {
		try {
			const collection = db.collection('recipe');
			const recipes = await collection.find({ owner_id: userId }).toArray();
			return new Response(JSON.stringify(recipes));
		} catch (error) {
			console.error('Database operation error:', error);
			const recipes = await RECIPE_DATA.recipe;
			const userRecipe = recipes.find((recipe) => {
				recipe.owner_id === userId;
			});
			return new Response(JSON.stringify(userRecipe));
		}
	} else {
		throw error(401, 'Session Expired!');
	}
};

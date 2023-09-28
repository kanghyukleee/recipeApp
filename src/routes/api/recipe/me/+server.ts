import { error, type RequestHandler } from '@sveltejs/kit';

// db offline
import RECIPE_DATA from '$assets/dummyRecipeData.json';
// db online
import db from '$db/mongo';

// get my recipes
export const GET: RequestHandler = async ({ url }) => {
	// get user_id
	const userId = url.searchParams.get('id') ? url.searchParams.get('id') : null;
	// get limit
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;

	if (userId) {
		try {
			const collection = db.collection('recipe');

			// check limit on DB
			if (limit) {
				const recipes = await collection
					.aggregate([{ $match: { owner_id: userId } }, { $sample: { size: limit } }, {$project: {_id: 1}}])
					.toArray();
				return new Response(JSON.stringify(recipes));
			} else {
				const recipes = await collection.find({ owner_id: userId }).toArray();
				return new Response(JSON.stringify(recipes));
			}
		} catch (error) {
			console.error('Database operation error:', error);
			const recipes = await RECIPE_DATA.recipe;
			if (limit) {
				const userRecipes = await recipes.filter((recipe) => {
					recipe.owner_id === userId;
				});	
				if (userRecipes.length < limit) {
					// if dummy data have less number of items than given limit
					return new Response(JSON.stringify(userRecipes))
				} else {
					// if dummy data have enough number of items than given limit
					const shuffled = userRecipes.sort(()=>0.5 - Math.random());
					return new Response(JSON.stringify(shuffled.slice(0, limit))); 
				}
			} else {
				// get all recipes of user
				const userRecipes = recipes.filter((recipe) => {
					recipe.owner_id === userId;
				});
				return new Response(JSON.stringify(userRecipes));
			}
		}
	} else {
		throw error(401, 'Session Expired!');
	}
};

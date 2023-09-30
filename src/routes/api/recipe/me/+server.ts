import { error, type RequestHandler } from '@sveltejs/kit';

// db offline
import RECIPE_DATA from '$assets/dummyRecipeData.json';
// db online
import db from '$db/mongo';
import { ObjectId } from 'mongodb';

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
					.aggregate([{ $match: { owner_id: new ObjectId(userId) } }, { $sample: { size: limit } }, {$project: {_id: 1}}])
					.toArray();
				return new Response(JSON.stringify(recipes));
			} else {
				const recipes = await collection.find({ owner_id: new ObjectId(userId) }).toArray();
				return new Response(JSON.stringify(recipes));
			}
		} catch (error) {
			console.error('Database operation error:', error);
			const recipes = await RECIPE_DATA.recipe;
			const userRecipes = await recipes.filter((recipe) => {
				recipe.owner_id === userId;
			});	
			if (limit) {
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
				return new Response(JSON.stringify(userRecipes));
			}
		}
	} else {
		throw error(401, 'Session Expired!');
	}
};

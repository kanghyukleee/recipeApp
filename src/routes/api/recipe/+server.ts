import type { RequestHandler } from './$types';

// db offlline
import RECIPE_DATA from '$assets/dummyRecipeData.json';
// db online
import db from '$db/mongo';
import { ObjectId } from 'mongodb';

// get all recipes
export const GET: RequestHandler = async ({ url }) => {
	// limit for every db search
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;
	// get recipes based on given user id
	const userId = url.searchParams.get('userid') ? url.searchParams.get('userid') : undefined;

	const aggregation: object[] = [];

	if(userId) {
		aggregation.push({ $match: { owner_id: new ObjectId(userId) } });
	}

	// limit should be checked very last
	if(limit) {
		aggregation.push({ $sample: { size: limit } });
	}

	try {
		const collection = db.collection('recipe');
		const recipes = await collection.aggregate(aggregation).toArray();
		
		return new Response(JSON.stringify(recipes));

//=========================== Dummy Data ===================================
	} catch(error) {
		console.error("Database operation error: ", error);
		const dummyRecipes = await RECIPE_DATA.recipe;
		
		if(userId) {
			const filteredRecipes = await dummyRecipes.filter((recipe) => {
				recipe.owner_id === userId;
			});
			if (limit) {
				if (filteredRecipes.length < limit) {
					return new Response(JSON.stringify(filteredRecipes));
				} else {
					const shuffled = filteredRecipes.sort(() => 0.5 - Math.random());
					return new Response(JSON.stringify(shuffled.slice(0, limit)));
				}
			} else {
				return new Response(JSON.stringify(filteredRecipes));
			}
		} else {
			if (limit) {
				if (dummyRecipes.length < limit) {
					return new Response(JSON.stringify(dummyRecipes));
				} else {
					const shuffled = dummyRecipes.sort(() => 0.5 - Math.random());
					return new Response(JSON.stringify(shuffled.slice(0, limit)));
				}
			} else {
				return new Response(JSON.stringify(dummyRecipes));
			}
		}
	}
};

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
	if (userId) {
		try {
			const collection = db.collection('recipe');
			if (limit) {
				const recipes = await collection
					.aggregate([
						{ $match: { owner_id: new ObjectId(userId) } },
						{ $sample: { size: limit } },
					])
					.toArray();
				console.log("/api/reciep/+server.ts:" ,recipes);

				return new Response(JSON.stringify(recipes));
			} else {
				const recipes = await collection.find({ owner_id: new ObjectId(userId) }).toArray();
				return new Response(JSON.stringify(recipes));
			}
		} catch (error) {
			console.error('Database operation error:', error);
			const recipes = await RECIPE_DATA.recipe;
			const filteredRecipe = await recipes.filter((recipe) => {
				recipe.owner_id === userId;
			});
			if (limit) {
				if (filteredRecipe.length < limit) {
					return new Response(JSON.stringify(filteredRecipe));
				} else {
					const shuffled = filteredRecipe.sort(() => 0.5 - Math.random());
					return new Response(JSON.stringify(shuffled.slice(0, limit)));
				}
			} else {
				return new Response(JSON.stringify(filteredRecipe));
			}
		}
	}

	// get recipes
	try {
		const collection = db.collection('recipe');
		if (limit) {
			const recipes = await collection.aggregate([{ $sample: { size: limit } }]).toArray();
			return new Response(JSON.stringify(recipes));
		} else {
			const recipes = await collection.find({}).toArray();
			return new Response(JSON.stringify(recipes));
		}
	} catch (error) {
		console.error('Database operation error:', error);
		const recipe = await RECIPE_DATA.recipe;
		if (limit) {
			const shuffled = recipe.sort(() => 0.5 - Math.random());
			return new Response(JSON.stringify(shuffled.slice(0, limit)));
		} else {
			return new Response(JSON.stringify(recipe));
		}
	}
};

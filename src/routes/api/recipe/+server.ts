import type { RequestHandler } from './$types';

// db offlline
import RECIPE_DATA from '$assets/dummyRecipeData.json';
// db online
import db from '$db/mongo';

// get all recipes
export const GET: RequestHandler = async ({ url }) => {
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;
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

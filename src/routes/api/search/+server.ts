import type { RequestHandler } from './$types';

// db offlline
import RECIPE_DATA from '$assets/dummyRecipeData.json';
// db online
import db from '$db/mongo';
import { error, redirect } from '@sveltejs/kit';

// get all recipes
export const GET: RequestHandler = async ({ url }) => {
	const type = url.searchParams.get('type') ? url.searchParams.get('type') : undefined;
	const query = url.searchParams.get('q') ? url.searchParams.get('q') : undefined;
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;


	// change from $regex to $search
	const regexPattern = query ? new RegExp(query, 'i') : null;
	const recipeQuery = regexPattern
		? {
				$or: [
					{ title: { $regex: regexPattern } },
					{ categories: { $regex: regexPattern } },
					{ description: { $regex: regexPattern } },
					{ 'ingredient.name': { $regex: regexPattern } },
					{ 'steps.instruction': { $regex: regexPattern } }
				]
		  }
		: null;

	if (type && recipeQuery && limit) {
    try{
      const collection = db.collection(type);
      const result = await collection.find(recipeQuery).limit(limit).toArray()
         
      return new Response(JSON.stringify(result));
    } catch(error) {
      console.error("Database operation error: ", error);
      // dummy data usage
      throw redirect(307, '/search') 
    }
	} 
  // other options required update
  else {
		throw error(400, 'Wrong request!');
	}
};

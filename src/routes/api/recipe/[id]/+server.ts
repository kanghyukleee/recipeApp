import type { RequestHandler } from "@sveltejs/kit";

// db offline
import RECIPE_DATA from '$assets/dummyRecipeData.json';
// db online
import db from '$db/mongo'
import { ObjectId } from "mongodb";

// get a recipe by given id
export const GET: RequestHandler = async ({params}) => {
  const { id } = params // id for seeking recipe 
  
  try {
    const collection = db.collection('recipe');
    const recipe = await collection.find({_id: new ObjectId(id)});   // or '_id' maybe
    return new Response(JSON.stringify(recipe));
  } catch (error) {
    console.error('Database operation error:', error);
    const recipeRes = await RECIPE_DATA.recipe;
    const recipe = recipeRes.find((recipe) => { recipe._id === id});   // recipe_id will be recplaced as string. 
    return new Response(JSON.stringify(recipe));
  }
}
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch}) => {
  const recipe = await fetch('/api/recipe?limit=12');
  const recipeRes = await recipe.json();  

  return {
    recipe: recipeRes
  }
}
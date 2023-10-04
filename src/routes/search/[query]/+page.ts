import { error } from "@sveltejs/kit";
import type { PageLoad } from "../$types";


export const load: PageLoad = async ({fetch, params}) => {
  const query = params.query;
  const searchParams = new URLSearchParams({
    q: query, 
    type: 'recipe',
    limit: '8'
  }).toString();
  

  const resultRes = await fetch(`/api/search?${searchParams}`);

  
  if(!resultRes.ok) {
    console.log('Recipe load fail!');
    throw error(resultRes.status, 'Failed to load results!')
  }
  const resultJSON = await resultRes.json();
  return {
    title: `Search results of '${query}'`,
    result: resultJSON,
  }
}
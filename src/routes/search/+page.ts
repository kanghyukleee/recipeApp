import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";


export const load:PageLoad = async ({ url }) => {

  // get query data from form 
  const query = url.searchParams.get('q');
  if (query) {
    throw redirect(307, `/search/${query}`);
  }
  // initial load
  return {
    title: 'Search'
  }
}
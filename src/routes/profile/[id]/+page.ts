import { fetchRefresh } from "$helpers";
import type { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch, params}) => {
  // const fetch = (path: string) => fetchRefresh(_fetch, path); // fetch: _fetch
  
  const profileRes = await fetch(`/api/profile/${params.id}`);

  // if{!profileRes.ok} {
  //   throw error(profileRes.status, 'Failed to load profile!');
  // }

  const profileJSON = await profileRes.json()

  return {
    profile: profileJSON
  }
}
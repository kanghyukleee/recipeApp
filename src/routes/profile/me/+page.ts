import { fetchRefresh } from "$helpers";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

// login required
export const load: PageLoad = async ({fetch:_fetch, parent}) => {
  const fetch = (path: string) => fetchRefresh(_fetch, path);
  //
  const { user } = await parent() //somehow 
  if (!user) {
    throw error(401, "Session Expired!")
  } 
  const profileRes = await fetch(`/api/profile/me?id=${user.id}`)
  const profileJSON = await profileRes.json()

  return {
    profile: profileJSON
  }
}
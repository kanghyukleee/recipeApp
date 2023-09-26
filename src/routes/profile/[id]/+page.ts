import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch, params}) => {

  // get single profile with given id
  const profileRes = await fetch(`/api/profile/${params.id}`);
  if (profileRes.ok){
    const profileJSON = await profileRes.json()
    return {
      profile: profileJSON
    }
  } else {
    throw error(404, "Profile not Found!")
  }
}
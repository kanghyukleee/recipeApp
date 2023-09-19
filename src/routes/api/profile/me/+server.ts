import { error, type RequestHandler } from "@sveltejs/kit";
import PROFILE_DATA from '$assets/dummyProfileData.json';


export const GET:RequestHandler = async ({url}) => {
  const profile = await PROFILE_DATA.profile;
  
  const userId = url.searchParams.get('id') ? Number(url.searchParams.get('id')) : null;

  if (!userId) {
    throw error(401, "Login required!");
  } else {
    const userProfile = profile.find(profile => {profile.user_id === userId});
    return new Response(JSON.stringify(userProfile));
  }
  
}
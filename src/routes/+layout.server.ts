import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({cookies, fetch}) => {
    const accessToken = cookies.get('access_token');
    if(!accessToken) {
      return {
        user: null
      }
    }

    const profileRes = await fetch(` https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${accessToken}`)
    if(!profileRes.ok) {
      return {
        user: null
      }
    }
    const profileResJSON = await profileRes.json()
    console.log(profileResJSON);
    
    return {
      user: profileResJSON
    }
}
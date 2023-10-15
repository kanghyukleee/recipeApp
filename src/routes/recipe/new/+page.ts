import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const load: PageLoad = async ({ parent }) => {
	const { user, userProfile } = await parent();

  if (!user) {
		throw error(401, 'Session Expired!');
	}
  const userProfileJSON = userProfile ? JSON.parse(userProfile): null
  
  return {
    userProfile: userProfileJSON
  } ;
};

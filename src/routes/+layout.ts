import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ data, url }) => {
	const { user, userProfile } = data || {};	// add userProfile here 

	if (user && url.pathname === '/login') {
		throw redirect(307, '/');
	}

  return {
    user,
		userProfile,
		pathname: url.pathname
  }
};

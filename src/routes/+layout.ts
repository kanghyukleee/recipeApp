import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ data, url }) => {
	const { user } = data || {};
	// if user already logged in, redirect user from /login to home route
	if (user && url.pathname === '/login') {
		throw redirect(307, '/');
	}
  // if user not logged in, redirect to /login route only
  // TODO. allow not logged in user with restricted access to service. 
	// if (!user && url.pathname !== '/login') {
	// 	throw redirect(307, '/login');
	// }

  return {
    user
  }
};

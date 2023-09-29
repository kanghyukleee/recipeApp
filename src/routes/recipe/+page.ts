import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ url }) => {
	if (url.pathname === '/recipe') {
		throw redirect(301, '/');
	}
};

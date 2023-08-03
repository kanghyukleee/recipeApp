import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');
	if (!accessToken) {
		return {
			user: null
		};
	}

	const profileRes = await fetch(
		` https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${accessToken}`
	);
	if (profileRes.ok) {
		const profile = await profileRes.json();
		return {
			user: profile
		};
	}
	if (profileRes.status === 401 && refreshToken) {
		// refresh token and try again
		const refreshRes = await fetch('/api/auth/refresh');

    // if refresh success, redirect to where access_token expired
		if (refreshRes.ok) {
			throw redirect(307, url.pathname);
		}
		return {
			user: null
		};
	} else {
		return {
			user: null
		};
	}
};

import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// login required
export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const { user, userProfile } = await parent(); // this is user info given by google
	if (!user) {
		throw error(401, 'Session Expired!');
	}
	if (userProfile && userProfile._id) {
		const profileRes = await fetch(`/api/profile/me?id=${userProfile._id}`);
		if (profileRes.ok) {
			const profileJSON = await profileRes.json();
			return {
				profile: profileJSON
			};
		} else {
			throw error(404, 'Profile not Found!');
		}
	} else {
		throw error(400, 'Profile not Found!');
	}
};

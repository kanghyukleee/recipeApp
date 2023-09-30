// this route do not require login
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const profilesRes = await fetch('/api/profile?limit=6');
	const profilesJSON = await profilesRes.json();

	return {
		profiles: profilesJSON
	};
};

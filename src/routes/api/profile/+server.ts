import type { RequestHandler } from './$types';

import PROFILE_DATA from '$assets/dummyProfileData.json';


export const GET: RequestHandler = async ({ url }) => {
	const profile = await PROFILE_DATA.profile;

	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;


	if (limit) {
		const shuffled = profile.sort(() => 0.5 - Math.random());
		return new Response(JSON.stringify(shuffled.slice(0, limit)), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} else {
		return new Response(JSON.stringify(profile));
	}
};

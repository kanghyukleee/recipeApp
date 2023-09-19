import type { RequestHandler } from '@sveltejs/kit';
import PROFILE_DATA from '$assets/dummyProfileData.json';

export const GET: RequestHandler = async ({ params }) => {
	const profile = await PROFILE_DATA.profile;

	const selectedId = Number(params.id);

	const selectedProfile = profile.find((profile) => {
		profile.user_id === selectedId;
	});

  return new Response (JSON.stringify(selectedProfile))
};

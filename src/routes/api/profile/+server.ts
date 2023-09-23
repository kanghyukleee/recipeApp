import type { RequestHandler } from './$types';

// db offline
import PROFILE_DATA from '$assets/dummyProfileData.json';
// db online
import db from '$db/mongo';

// get all profile
export const GET: RequestHandler = async ({ url }) => {
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;

	try {
		const collection = db.collection('profile');

		if (limit) {
			const profiles = await collection.aggregate([{ $sample: { size: limit } }]).toArray();
			return new Response(JSON.stringify(profiles));
		} else {
			const profiles = await collection.find({}).toArray();
			return new Response(JSON.stringify(profiles));
		}
	} catch (error) {
		console.error('Database operation error:', error);
		const profiles = await PROFILE_DATA.profile;
		if (limit) {
			const shuffled = profiles.sort(() => 0.5 - Math.random());
			return new Response(JSON.stringify(shuffled.slice(0, limit)));
		} else {
			return new Response(JSON.stringify(profiles));
		}
	}
};

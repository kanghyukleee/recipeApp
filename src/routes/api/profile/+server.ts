import type { RequestHandler } from './$types';

// db offline
import PROFILE_DATA from '$assets/dummyProfileData.json';
// db online
import db from '$db/mongo';

// get all profile
export const GET: RequestHandler = async ({ url }) => {
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;

	const aggregation: object[] = [];

	// < more aggregation condition comes here >

	if(limit) {
		aggregation.push({ $sample: { size: limit } });
	}

	try {
		const collection = db.collection('profile');
		const profiles = await collection.aggregate(aggregation).toArray();

		return new Response(JSON.stringify(profiles));
//=========================== Dummy Data ===================================
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

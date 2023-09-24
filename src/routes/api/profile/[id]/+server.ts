import type { RequestHandler } from '@sveltejs/kit';

// db offline
import PROFILE_DATA from '$assets/dummyProfileData.json';
// db online
import db from '$db/mongo';
import { ObjectId } from 'mongodb';

// get a profile by given id 
export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	try {
		const collection = db.collection('profile');
		const profile = collection.findOne({ _id: new ObjectId(id) });
		return new Response(JSON.stringify(profile));
	} catch (error) {
		console.error('Database operation error:', error);
		const profileRes = await PROFILE_DATA.profile;
		const profile = profileRes.find((profile) => {
			profile._id === id;
		});
		return new Response(JSON.stringify(profile));
	}
};

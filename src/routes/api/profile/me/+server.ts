import { error, type RequestHandler } from '@sveltejs/kit';

// db offline
import PROFILE_DATA from '$assets/dummyProfileData.json';
// db online
import db from '$db/mongo';
import { ObjectId } from 'mongodb';

// get user profile
export const GET: RequestHandler = async ({ url }) => {
  // get user_id
	const userId = url.searchParams.get('id') ?url.searchParams.get('id') : null;  // this will be changed to string

  if(!userId){
    throw error(401, 'Session Expired!')
  }
  
  try {
    const collection = db.collection('profile');
    const profile = collection.findOne({_id: new ObjectId(userId)});
    return new Response(JSON.stringify(profile));
  } catch (error) {
    console.error('Database operation error:', error);
    const profileRes = await PROFILE_DATA.profile;
    const profile = profileRes.find((profile) => {
			profile._id === userId;
		});
    return new Response(JSON.stringify(profile));
  }
};

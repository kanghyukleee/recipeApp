import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import db from '$db/mongo'

interface UserProfile {
	_id?: any;
	email: string;
	type: "profile";
	user_image: string;
	name: string;
	recipe_ids: string[];
	followers: number;
}

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
			// db check
		const collection = db.collection('profile');
		
		const filter = {email: profile.email}
		const update:{ $set:UserProfile } = {$set: { 
			email: profile.email,
			type: "profile",
			user_image: profile.picture,
			name: profile.name,
			recipe_ids: [],
			followers: 0
		}}
		const	options = { upsert: true, returnNewDocument: true}

		const result = await collection.findOneAndUpdate(filter, update, options);

		const dbProfile = result.value || update.$set;
		
		if(dbProfile && dbProfile._id) {
			dbProfile._id = dbProfile._id.toString()
		}
		
		return {
			user: profile,
			userProfile : dbProfile
		};
	}
	// access token denied
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
		// no refresh token
		return {
			user: null
		};
	}
};

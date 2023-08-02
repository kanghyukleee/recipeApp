import { redirect } from '@sveltejs/kit';
import pkce from 'pkce-gen';
import type { RequestHandler } from './$types';
import { GOOGLE_APP_CLIENT_ID, GOOGLE_REDIRECTION_URI } from '$env/static/private';

// function to create state code
const generateRandomString = (length: number) => {
	let randomString = '';
	const possibleChar = 'ABCDEFGHIJKLMNOPURSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		randomString += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
	}
	return randomString;
};

const state = generateRandomString(16);
const challenge = pkce.create();

export const GET: RequestHandler = ({ cookies }) => {
	
	cookies.set('google_auth_state', state, {path:'/'});
	cookies.set('google_auth_challenge_verifier', challenge.code_verifier, {path: '/'});

	// console.log(cookies.getAll());
	
	throw redirect(
		307,
		`https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
			client_id: GOOGLE_APP_CLIENT_ID,
			redirect_uri: GOOGLE_REDIRECTION_URI,
			response_type: 'code',
			scope:
				'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
			state,
			code_challenge_method: 'S256',
			code_challenge: challenge.code_challenge
		})}`
	);
};

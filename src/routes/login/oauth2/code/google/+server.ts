import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	GOOGLE_APP_CLIENT_ID,
	GOOGLE_APP_CLIENT_SECRET,
	GOOGLE_REDIRECTION_URI
} from '$env/static/private';

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const code = url.searchParams.get('code') || null;
	const state = url.searchParams.get('state') || null;

	const storedState = cookies.get('google_auth_state') || null;
	const storedChallengeVerifier = cookies.get('google_auth_challenge_verifier') || null;
	console.log(storedState, storedChallengeVerifier);
	
	if (state === null || state !== storedState) {
		throw error(400, 'State Mismatch!');
	}

	const response = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${GOOGLE_APP_CLIENT_ID}:${GOOGLE_APP_CLIENT_SECRET}`
			).toString('base64')}`
		},
		body: new URLSearchParams({
			code: code || '',
			redirect_uri: GOOGLE_REDIRECTION_URI,
			grant_type: 'authorization_code',
            code_verifier: storedChallengeVerifier || '',
            client_id: GOOGLE_APP_CLIENT_ID,
		})
	});
    const responseJSON = await response.json();

    if(responseJSON.error) {
        throw error(400, responseJSON.error_description)
    }
    
    cookies.delete('google_auth_state')
    cookies.delete('google_auth_challenge_verifier')
    cookies.set('access_token', responseJSON.access_token, { path: '/' });
    cookies.set('id_token', responseJSON.id_token, {path: '/'})

    throw redirect(303, '/');
  
    
};

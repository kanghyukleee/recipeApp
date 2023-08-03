import type { RequestHandler } from './$types';
import { GOOGLE_APP_CLIENT_ID, GOOGLE_APP_CLIENT_SECRET } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	const refreshToken = cookies.get('refresh_token');

	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${GOOGLE_APP_CLIENT_ID}:${GOOGLE_APP_CLIENT_SECRET}`
			).toString('base64')}`
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken || ''
		})
	});

	const resJSON = await res.json();
	if (resJSON.error) {
		cookies.delete('refresh_token', { path: '/' });
		cookies.delete('access_token', { path: '/' });
    throw error(401, resJSON.error_description);
	}

  cookies.set('refresh_token', resJSON.refresh_token, {path:'/'})
  cookies.set('access_token', resJSON.access_token, {path:'/'})

  return json(resJSON);
};

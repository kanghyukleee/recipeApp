import { json, redirect } from '@sveltejs/kit';
import type {RequestHandler} from './$types'

export const POST: RequestHandler = ({cookies, url, request}) => {
    cookies.delete('refresh_token', {path: '/'});
    cookies.delete('access_token', {path: '/'});

    // with JS, for no refreshing
    if(request.headers.get('accept') === 'application/json') {
      return json({success: true});
    }

    // without JS, will be refreshed 
    // redirection will be changed from /login to url.pathname
    throw redirect(303, '/login');
}
// if response is 401(session expired), refresh token and try again
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export default async function fetchRefresh(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>, // copied from svelte fetch func type
	path: string
) {
	const req = fetch(path);
	// SSR
	if (!browser) return req;
	// CSR
	const res = await req;
	if (res.status === 401) {
    // refreshPromise type defined in app.d.ts
		if (!window.refreshPromise) {
			window.refreshPromise = fetch('/api/auth/refresh').finally(() => {
				window.refreshPromise = null; // when refresh end, clear it
			}); // store this in window globally so, extra refreshing will not occur and just wait until refresh process end
		}
    await window.refreshPromise;
		return fetch(path);
	} else {
		return res;
	}
}

// get all recipe
import type { RequestHandler } from './$types';

// Dummy data incase of access denied to both Local/Online DB
import RECIPE_DATA from '$assets/dummyRecipeData.json';

export const GET: RequestHandler = async ({ url }) => {
	const recipe = await RECIPE_DATA.recipe;

	// log of url

	// URL {
	// 	href: 'http://localhost:5173/api/recipe?limit=4',
	// 	origin: 'http://localhost:5173',
	// 	protocol: 'http:',
	// 	username: '',
	// 	password: '',
	// 	host: 'localhost:5173',
	// 	hostname: 'localhost',
	// 	port: '5173',
	// 	pathname: '/api/recipe',
	// 	search: '?limit=4',
	// 	searchParams: URLSearchParams { 'limit' => '4' },
	// 	hash: ''
	// }

	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;


	if (limit) {
		const shuffled = recipe.sort(() => 0.5 - Math.random());
		return new Response(JSON.stringify(shuffled.slice(0, limit)), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} else {
		return new Response(JSON.stringify(recipe));
	}
	
};

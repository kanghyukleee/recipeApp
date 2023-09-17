// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			user: {
				id: string | number;
				email: string;
				verified_email: boolean;
				name: string;
				given_name: string;
				family_name: string;
				picture: string | null | undefined;
				locale: string;
			} | null;
			title?: string;
			recipes: {
				type: 'recipe';
				recipe_id: number;
				owner_id: number;
				title: string;
				image?: string;
				rating: {
					user_id: string;
					rate: 1 | 2 | 3 | 4 | 5;
					comment?: string;
				}[];
				categories: string[];
				is_featured: boolean;
				description: string;
				prep_time: string | number;
				cook_time: string | number;
				yield: string | number;
				ingredient: {
					name: string;
					quantity: string | number;
					note?: string;
				}[];
				steps: {
					step_number: number;
					instruction: string;
					duration: string | number;
					image?: string;
				}[];
			} | null;
			profiles: {
				type: 'profile';
				user_id: number;
				user_image: string;
				name: string;
				recipe_ids: [];
				followers: number;
			} | null;
		}
		// interface Platform {}
	}
}

declare interface Window {
	refreshPromise: Promise<Response> | null;
}
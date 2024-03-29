// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			user: {
				_id: string;
				email: string;		// extract to profile 
				verified_email: boolean;
				name: string;			// extract to profile
				given_name: string;
				family_name: string;
				picture: string | null | undefined;		// extract to profile
				locale: string;
			} | null;
			title?: string;
			recipe: {
				_id: string;
				type: 'recipe';
				owner_id: string;
				title: string;
				image?: string;
				rating: {
					user_id: string;
					rate: 0| 1 | 2 | 3 | 4 | 5;
					comment?: string;
				}[];
				categories: string[];
				description: string;
				prep_time: string;
				cook_time: string;
				yield: string;
				ingredient: {
					name: string;
					quantity: string;
					unit?: string;
					note?: string;
				}[];
				steps: {
					step_number: number;
					instruction: string;
					duration: string;
					image?: string;
				}[];
			} | null;
			profile: {
				_id: string;
				email: string;		// extracted from login
				type: 'profile';
				user_image: string;		// extracted from login
				name: string;			// extracted from login
				recipe_ids: ObjectId[];
				followers: number;
			} | null;
		}
		// interface Platform {}
	}
}

declare interface Window {
	refreshPromise: Promise<Response> | null;
}

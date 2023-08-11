// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			user: {
				id: string;
				email: string;
				verified_email: boolean;
				name: string;
				given_name: string;
				family_name: string;
				picture: string | null | undefined;
				locale: string;
			} | null;
			title?: string; 
		}
		// interface Platform {}
	}
}

export {};

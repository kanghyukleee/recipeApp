import type { Actions } from './$types';
import * as fs from 'fs';
import { writeFileSync, existsSync, mkdirSync, chmodSync } from 'fs';
import db from '$db/mongo';
import { ObjectId } from 'mongodb';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		// img store process ==============================================================
		const form = await request.formData();

		const titleImgFile = form.get('title-imgBase64');
		const stepImgFiles = form.getAll('step-imgBase64');

		const id = Date.now();
		const directoryPath = `${process.cwd()}/src/assets/serverStorage/${id}/`;

		const stripBase64Prefix = (dataURL: any) => {
			const BASE64_MARKER = ';base64,';
			const base64Index = dataURL.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
			return dataURL.substring(base64Index);
		};

		if (!existsSync(directoryPath)) {
			try {
				mkdirSync(`${directoryPath}steps/`, { recursive: true });
			} catch (error) {
				console.error('Error creating directory:', error);
				return;
			}
		}
		if (titleImgFile !== '') {
			try {
				const cleanBase64 = stripBase64Prefix(titleImgFile);
				writeFileSync(
					`${process.cwd()}/src/assets/serverStorage/${id}/titleImage.webp`,
					cleanBase64,
					'base64'
				);
				chmodSync(`${directoryPath}titleImage.webp`, 0o644);
			} catch (error) {
				console.error('Error writing image:', error);
			}
		}
		stepImgFiles.forEach((image, index) => {
			try {
				const cleanBase64 = stripBase64Prefix(image);

				writeFileSync(
					`${process.cwd()}/src/assets/serverStorage/${id}/steps/step${index + 1}image.webp`,
					cleanBase64,
					'base64'
				);
				chmodSync(`${directoryPath}steps/step${index + 1}image.webp`, 0o644);
			} catch (error) {
				console.error('Error writing image:', error);
			}
		});
		// ==============================================================================================

		const ingredient: {
			name: string | File;
			quantity: string | File;
			unit: string | File;
			note: string | File;
		}[] = [];

		const ingredientNames = form.getAll('ingredient-name');
		const ingredientQuantity = form.getAll('ingredient-quantity');
		const ingredientUnit = form.getAll('ingredient-unit');
		const ingredientNote = form.getAll('ingredient-note');

		ingredientNames.forEach((_, index) => {
			ingredient.push({
				name: ingredientNames[index],
				quantity: ingredientQuantity[index],
				unit: ingredientUnit[index],
				note: ingredientNote[index]
			});
		});

		const steps: {
			step_number: number;
			instruction: string | File;
			duration: string | File;
			image: string | null;
		}[] = [];

		const stepInstruction = form.getAll('step-instruction');
		const stepDuration = form.getAll('step-duration');

		stepInstruction.forEach((_, index) => {
			const imagePath = `${process.cwd()}/src/assets/serverStorage/${id}/steps/step${
				index + 1
			}image.webp`;
			let stepImage = null;

			try {
				const fileBits = fs.readFileSync(imagePath);
				stepImage = new File([fileBits], imagePath);
			} catch (error) {
				console.error('Error reading/creating image file: ', error);
			}

			steps.push({
				step_number: index + 1,
				instruction: stepInstruction[index],
				duration: stepDuration[index],
				image: stepImage ? imagePath : null
			});
		});

		const newRecipeData = {
			type: 'recipe',
			owner_id: form.get('userId'),
			title: form.get('title'),
			rating: [],
			categories: form.getAll('tag'),
			description: form.get('description'),
			prep_time: form.get('prep-time'),
			cook_time: form.get('cook-time'),
			yield: form.get('yield'),
			ingredient,
			steps
		};

		const recipeCollection = db.collection('recipe');
		const result = await recipeCollection.insertOne(newRecipeData);

		if (result.acknowledged) {
			const newRecipeId = result.insertedId;
			const userId = form.get('userId')?.toString()
			const profileCollection = db.collection('profile');

			const userFilter = { _id: new ObjectId(userId) };
			const userDocument = await profileCollection.findOne(userFilter);
			if (userDocument) {
				userDocument.recipe_ids.push(newRecipeId);
				
				await profileCollection.updateOne(userFilter, {
					$set: { recipe_ids: userDocument.recipe_ids }
				});
				console.log(`Successfully added new recipe id to user profile`);
				throw redirect(303, '/')
			}else {
				return fail(502)
			} 
		} else {
			return fail(502)
		}
	}
};

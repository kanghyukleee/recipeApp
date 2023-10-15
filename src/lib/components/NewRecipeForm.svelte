<script lang="ts">
	import { IconButton } from '$components';
	import { Plus, X } from 'lucide-svelte';
	
	// get userid not user google id
	export let userId:string = '';

	let titleImage: HTMLInputElement;
	let titleImageFiles: FileList;
	let titleImageName: HTMLInputElement;
	$: titleImageResult = '';

	let tags: string[] = [];
	let tagInput = '';

	let ingredientSets: {
		id: number;
		name: string;
		quantity: string;
		unit: string | '';
		note: string | '';
	}[] = [{ id: Date.now(), name: '', quantity: '', unit: '', note: '' }];
	const addIngredientSet = () => {
		ingredientSets = [
			...ingredientSets,
			{ id: Date.now(), name: '', quantity: '', unit: '', note: '' }
		];
	};
	const removeIngredientSet = (id: number) => {
		ingredientSets = ingredientSets.filter((ingredient) => ingredient.id !== id);
	};

	let image: HTMLInputElement;
	let imageName: HTMLInputElement;
	let imageFiles: FileList;

	let stepSets: { id: number; instruction: string; duration: string; image: string | null }[] = [
		{
			id: Date.now(),
			instruction: '',
			duration: '',
			image: null
		}
	];
	const addStepSet = () => {
		stepSets = [...stepSets, { id: Date.now(), instruction: '', duration: '', image: null }];
	};
	const removeStepSet = (id: number) => {
		stepSets = stepSets.filter((step) => step.id !== id);
	};

	$: stepImgResult = '';

	const getTitleImg = async () => {
		if (titleImageFiles.length > 0) {
			const image = titleImageFiles[0];
			const imgBase64 = await readFileAsDataURL(image);
			titleImageResult = imgBase64;
		}
	};

	const getStepImg = async (index: number) => {
		if (imageFiles[index]) {
			const image = imageFiles[index];
			const imgBase64 = await readFileAsDataURL(image);
			stepSets[index].image = imgBase64;
		}
	};

	const readFileAsDataURL = (file: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const imgBase64 = e.target?.result as string;
				resolve(imgBase64);
			};
			reader.readAsDataURL(file);
		});
	};

</script>

<form method="POST">
	<fieldset class='userId'>
		<input type="hidden" value={userId} name='userId'/>
	</fieldset>
	<fieldset class="title">
		<label for="title">Title</label><br />
		<input type="text" id="title" name="title" />
	</fieldset>

	<fieldset class="title-image">
		<label for="title-image">Image</label><br />
		<input
			bind:this={titleImageName}
			class="file-name"
			value={null}
			placeholder="No file chosen"
			disabled
			aria-hidden="true"
		/>
		<label class="image-button" for="title-image">Browse Image</label><br />
		<input
			class="image-input"
			type="file"
			accept="image/*"
			id="title-image"
			bind:files={titleImageFiles}
			bind:this={titleImage}
			on:change={() => {
				// getTitleImg(titleImageFiles);
				getTitleImg();
			}}
		/>
		<input type="hidden" name="title-imgBase64" bind:value={titleImageResult} />
	</fieldset>

	<fieldset class="tag">
		<label class="tags-header" for="tags">Tags</label><br />
		<div class="tags-input">
			<ul class="tags-list">
				{#each tags as tag}
					<li
						on:click={() => {
							tags = tags.filter((item) => item !== tag);
						}}
					>
						{tag}
						<X />
					</li>
					<input type="hidden" bind:value={tag} name="tag" />
				{/each}
			</ul>
			<input
				class="input-area"
				type="text"
				id="tags"
				name="tags"
				bind:value={tagInput}
				placeholder="Enter a tag and press Enter"
				on:keydown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						if (tagInput) {
							tags = [...tags, tagInput];
							tagInput = '';
						}
					}
				}}
			/>
		</div>
	</fieldset>

	<fieldset class="description">
		<label for="description">Description</label><br />
		<textarea id="description" cols="30" rows="10" name="description" />
	</fieldset>

	<fieldset class="meta">
		<div class="meta-component">
			<label for="prep-time">Preperation Time</label><br />
			<input type="text" id="prep-time" name="prep-time" />
		</div>
		<div class="meta-component">
			<label for="cook-time">Cooking Time</label><br />
			<input type="text" id="cook-time" name="cook-time" />
		</div>
		<div class="meta-component">
			<label for="servings">Servings</label><br />
			<input type="text" id="servings" name="yield" />
		</div>
	</fieldset>

	<fieldset class="ingredient">
		<div class="ingredient-header">
			<h2>Ingredient</h2>
			<IconButton
				icon={Plus}
				label="Add Ingredient"
				on:click={(e) => {
					e.preventDefault();
					addIngredientSet();
				}}
			/>
		</div>

		{#each ingredientSets as ingredient, index}
			<div class="ingredient-container">
				{#if index > 0}
					<IconButton
						icon={X}
						label="Delete Ingredient"
						on:click={(e) => {
							e.preventDefault();
							removeIngredientSet(ingredient.id);
						}}
					/>
				{/if}
				<div class="ingredient-component">
					<label for="ingredientName" class="input-label">Name</label><br />
					<input
						type="text"
						id="ingredientName"
						name="ingredient-name"
						bind:value={ingredient.name}
					/>
				</div>
				<div class="ingredient-component">
					<label for="ingredientQuantity" class="input-label">Quantity</label><br />
					<input
						type="text"
						id="ingredientQuantity"
						name="ingredient-quantity"
						bind:value={ingredient.quantity}
					/>
				</div>
				<div class="ingredient-component">
					<label for="ingredientUnit" class="input-label">Unit</label><br />
					<input
						type="text"
						id="ingredientUnit"
						name="ingredient-unit"
						bind:value={ingredient.unit}
					/>
				</div>
				<div class="ingredient-component">
					<label for="ingredientNote" class="input-label">Note</label><br />
					<textarea
						id="ingredientNote"
						cols="30"
						rows="10"
						name="ingredient-note"
						bind:value={ingredient.note}
					/>
				</div>
			</div>
		{/each}
	</fieldset>

	<fieldset class="step">
		<div class="step-header">
			<h2>Steps</h2>
			<IconButton
				icon={Plus}
				label="Add Step"
				on:click={(e) => {
					e.preventDefault();
					addStepSet();
				}}
			/>
		</div>

		{#each stepSets as step, index}
			<div class="step-container">
				{#if index > 0}
					<IconButton
						icon={X}
						label="Delete Step"
						on:click={(e) => {
							e.preventDefault();
							removeStepSet(step.id);
						}}
					/>
				{/if}
				<div class="step-component">
					<label for="stepInstruction" class="input-label">Instruction</label><br />
					<textarea
						id="stepInstruction"
						cols="30"
						rows="10"
						name="step-instruction"
						bind:value={step.instruction}
					/>
				</div>
				<div class="step-component">
					<label for="stepDuration" class="input-label">Dutaion</label><br />
					<input type="text" id="stepDuration" name="step-duration" bind:value={step.duration} />
				</div>
				<!-- image -->
				<label for="image" class="input-label">Image</label><br />
				<input
					bind:this={imageName}
					class="file-name"
					value={null}
					placeholder="No file chosen"
					disabled
					aria-hidden="true"
				/>
				<label class="image-button" for="image">Browse Image</label><br />
				<input
					class="image-input"
					type="file"
					accept="image/*"
					id="image"
					name="step-image"
					bind:files={imageFiles}
					bind:this={image}
					on:change={async () => {
						getStepImg(index);
						step.image = stepImgResult;
					}}
				/>
				<input type="hidden" name="step-imgBase64" bind:value={step.image} />
				<!-- image -->
			</div>
		{/each}
	</fieldset>

	<fieldset class="submit">
		<button type="submit">submit</button>
		<!-- <button on:click={sendData}>submit</button> -->
	</fieldset>
</form>

<style lang="scss">
	fieldset {
		margin-bottom: 80px;
		padding: 0 250px;
	}
</style>

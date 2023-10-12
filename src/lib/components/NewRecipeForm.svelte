<script lang="ts">
	import { IconButton } from '$components';
	import { Plus, X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	let recipeTitle: string;
	// ===========================================================================================
	let titleImage: HTMLInputElement;
	let titleImageName: HTMLInputElement;
	// ===========================================================================================
	let tags: string[] = [];
	let tagInput = '';
	// ===========================================================================================
	let description: string;
	// ===========================================================================================
	let prepTime: string;
	let cookTime: string;
	let servings: string;
	// ===========================================================================================
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
	// ===========================================================================================
	let image: HTMLInputElement;
	let imageName: HTMLInputElement;
	let stepSets: { id: number; instruction: string; duration: string; image: File | null }[] = [
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
	// ===========================================================================================
	const submitSet = () => {
		console.log({
			type: 'recipe',
			owner_id: 'take this later',
			title: recipeTitle,
			rating: [],
			categories: tags,
			description,
			prep_time: prepTime,
			cook_time: cookTime,
			yield: servings,
			ingredient: ingredientSets,
			steps: stepSets
		});
	};

  const dispatch = createEventDispatcher();
  const sendData = () => {
    const newRecipe = {
      type: 'recipe',
			owner_id: 'take this later',
			title: recipeTitle,
			rating: [],
			categories: tags,
			description,
			prep_time: prepTime,
			cook_time: cookTime,
			yield: servings,
			ingredient: ingredientSets,
			steps: stepSets
    }
    dispatch('getNewRecipe', newRecipe);
  }
 
</script>

<section class="title">
	<label for="title">Title</label><br />
	<input type="text" id="title" bind:value={recipeTitle} />
</section>

<section class="title-image">
	<label for="title-image">Image</label><br />
	<input
		bind:this={titleImageName}
		class="file-name"
		value={null}
		placeholder="No file chosen"
		disabled
		aria-hidden="true"
	/>
	<label class="image-button" for="image">Browse Image</label><br />
	<input
		bind:this={titleImage}
		class="image-input"
		type="file"
		accept="image/*"
		id="title-image"
		on:change={() => {
			if (titleImage.files && titleImage.files.length > 0) {
				titleImageName.value = titleImage.files[0].name;
			} else {
				titleImageName.value = '';
			}
		}}
	/>
</section>

<section class="tag">
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
</section>

<section class="description">
	<label for="description">Description</label><br />
	<textarea id="description" cols="30" rows="10" bind:value={description} />
</section>

<section class="meta">
	<div class="meta-component">
		<label for="prep-time">Preperation Time</label><br />
		<input type="text" id="prep-time" bind:value={prepTime} />
	</div>
	<div class="meta-component">
		<label for="cook-time">Cooking Time</label><br />
		<input type="text" id="cook-time" bind:value={cookTime} />
	</div>
	<div class="meta-component">
		<label for="servings">Servings</label><br />
		<input type="text" id="servings" bind:value={servings} />
	</div>
</section>

<section class="ingredient">
	<div class="ingredient-header">
		<h2>Ingredient</h2>
		<IconButton
			icon={Plus}
			label="Add Ingredient"
			on:click={() => {
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
					on:click={() => {
						removeIngredientSet(ingredient.id);
					}}
				/>
			{/if}
			<div class="ingredient-component">
				<label for="ingredientName" class="input-label">Name</label><br />
				<input type="text" id="ingredientName" bind:value={ingredient.name} />
			</div>
			<div class="ingredient-component">
				<label for="ingredientQuantity" class="input-label">Quantity</label><br />
				<input type="text" id="ingredientQuantity" bind:value={ingredient.quantity} />
			</div>
			<div class="ingredient-component">
				<label for="ingredientUnit" class="input-label">Unit</label><br />
				<input type="text" id="ingredientUnit" bind:value={ingredient.unit} />
			</div>
			<div class="ingredient-component">
				<label for="ingredientNote" class="input-label">Note</label><br />
				<textarea id="ingredientNote" cols="30" rows="10" bind:value={ingredient.note} />
			</div>
		</div>
	{/each}
</section>

<section class="step">
	<div class="step-header">
		<h2>Steps</h2>
		<IconButton
			icon={Plus}
			label="Add Step"
			on:click={() => {
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
					on:click={() => {
						removeStepSet(step.id);
					}}
				/>
			{/if}
			<div class="step-component">
				<label for="stepInstruction" class="input-label">Instruction</label><br />
				<textarea id="stepInstruction" cols="30" rows="10" bind:value={step.instruction} />
			</div>
			<div class="step-component">
				<label for="stepDuration" class="input-label">Dutaion</label><br />
				<input type="text" id="stepDuration" bind:value={step.duration} />
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
				bind:this={image}
				class="image-input"
				type="file"
				accept="image/*"
				id="image"
				on:change={() => {
					if (image.files && image.files.length > 0) {
						imageName.value = image.files[0].name;
					} else {
						imageName.value = '';
					}
				}}
				bind:value={step.image}
			/>
			<!-- image -->
		</div>
	{/each}
</section>

<section class="submit">
	<button on:click={sendData}>submit</button>
</section>

<style lang="scss">
	section {
		margin-bottom: 80px;
		padding: 0 250px;
	}
</style>

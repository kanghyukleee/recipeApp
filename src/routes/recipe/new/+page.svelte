<script lang="ts">
	import NewRecipeForm from "$components/NewRecipeForm.svelte";
	import type { PageData } from "./$types";


	const getRecipeData = (event:CustomEvent) => {
		console.log(event.detail);
	}

	export let data: PageData
	const userId = data.userProfile._id.toString();
	
</script>

<NewRecipeForm on:getNewRecipe={getRecipeData} {userId}/>

<style lang="scss">

</style>
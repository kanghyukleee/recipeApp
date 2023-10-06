<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import { Search } from "lucide-svelte";

	let searchInput: HTMLInputElement;
	$: searchQuery = $page.params.query || '';
	
  afterNavigate(() => {
		searchInput.focus();
	});
</script>

<form action="/search" method="GET" role="search">
	<div class="search-input-wrapper">
		<Search aria-hidden focusable="false" />
		<input
			class="search-input"
			type="search"
			bind:this={searchInput}
			value={searchQuery}
			name="q"
			placeholder="Search for recipes, categories, or ingredients!"
			aria-label="Search for recipes, categories, or ingredients!"
		/>
	</div>
</form>

<style lang="scss">
  .search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
    justify-content: center;
		:global(svg) {
			position: absolute;
			margin-right: 610px;
			stroke: var(--medium-gray);
			width: 22px;
			height: 22px;
      margin-top: 50px;
      @include breakpoint.down('lg') {
        margin-right: 360px;
      }
		}
		.search-input {
      margin-top: 50px;
			border: none;
			padding: 0 20px 0 40px;
			height: calc(var(--topbar-height) - 25px);
			border-radius: 20px;
			font-size: functions.toRem(14);
			color: var(--medium-gray);
      @include breakpoint.up('lg') {
        width: 650px;
      }
      width: 400px;
		}
	}
</style>
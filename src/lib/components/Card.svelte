<script lang="ts">
	import { UtensilsCrossed, Star } from 'lucide-svelte';

	export let item; // define type of item later
</script>

<div class="card {item.type}">
	<div class="cover">
		{#if item.image}
			<img loading="lazy" src={item.image} alt="{item.type} image for {item.title}" />
		{:else}
			<div class="cover-placeholder">
				<UtensilsCrossed aria-hidden="true" focusable="false" color="var(--light-gray)" />
			</div>
		{/if}
	</div>
	<div class="recipe-info">
		<div class="tags">
			<p class="tag">tag</p>
		</div>
		<h2 class="title">{item.title}</h2>
		<div class="rating">
			<Star />
		</div>
	</div>
</div>


<style lang="scss">
	.card {
		background-color: var(--dark-gray);
		padding: 10px;
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
		border-radius: 4px;
		transition: background 0.3s;
    // display: flex; @breakpoint down sm
		&:hover {
			background-color: var(--medium-gray);
      .image{
        .cover-placeholder {
          background-color: var(--dark-gray);
        }
      }
		}
    .cover{
      img {
        width: 100%;
        // 이미지가 정사각형에 딱 맞게 들어가도록 하는 코드
        aspect-ratio: 1;  // ratio 1.5 or 0.6 test require
        object-fit: cover;
        // 이미지가 정사각형에 딱 맞게 들어가도록 하는 코드
        margin: 0 0 20px;

        // @breakpoint down sm
        // height: 100%;
				// max-height: 190px;
      }
      .cover-placeholder {
        width: 100%;
        aspect-ratio: 1; // ratio 1.5 or 0.6 test require
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--medium-gray);
        margin: 0 0 20px;
        transition: background 0.3s;

        // @breakpoint down sm
        // height: 100%;
				// max-height: 190px;

        :global(svg) {
          width: 40%;
          height: 40%;
        }
      }
    }
    .recipe-info {
      .tags {
        .tag {
          // or p
        }
      }
      .title {
        // or h2
      }
      .rating {
        
      }
		}
	}
</style>

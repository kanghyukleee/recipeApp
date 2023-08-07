<script lang="ts">
	import Siema from 'siema'
	import { onMount } from 'svelte';

	export let perPage: number = 1;
	export let loop: boolean = true;
	export let autoplay: number = 0;
	export let duration: number = 500;
	export let easing: string = 'ease-out';
	export let startIndex: number = 0;
	export let draggable: boolean = true;
	export let multipleDrag: boolean = true;
	export let threshold: number = 20;
	export let rtl: boolean = false;

	let controller: Siema;
	let timer: NodeJS.Timer;

	onMount(() => {
		controller = new Siema({
			selector: '.slides',
			duration,
			easing,
			// perPage: typeof perPage === 'object' ? perPage : Number(perPage),
			startIndex,
			draggable,
			multipleDrag,
			loop,
			threshold,
			rtl
		});
		if (autoplay > 0) {
			timer = setInterval(() => {
				controller.next();
			}, autoplay);
		}
		return () => {
			autoplay && clearInterval(timer);
			controller.destroy();
		};
	});
</script>

<div class="carousel">
	<div class="slides">
		<slot />
	</div>
</div>

<style lang="scss">
	.carousel {
		position: relative;

		justify-content: center;
		align-items: center;
	}
</style>

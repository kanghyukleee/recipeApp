<script lang="ts">
	import { browser } from '$app/environment';
	import { Navigation } from '$components';
</script>

<div class="content">
	<div class="left">
    <!-- if this app running in the browser (T/F) -->
    <!-- optimize SEO, without if, there will be two Navigation exist -->
		{#if browser}
			<Navigation isDesktop={false} />
		{/if}
	</div>
	<div class="right">right</div>
</div>

<style lang="scss">
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
</style>

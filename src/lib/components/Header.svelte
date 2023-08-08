<script lang="ts">
	import { Navigation } from "$components";


</script>

<div class="content">
  <div class="left"><Navigation isDesktop={false}/></div>
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
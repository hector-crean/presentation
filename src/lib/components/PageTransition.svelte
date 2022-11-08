<!-- Transition.svelte -->
<script lang="ts">
  import { router } from "tinro";
</script>

{#key $router.path}
  <div class:page-transition={false} class:container={true}>
    <slot />
  </div>
{/key}

<style lang="scss">
  @import "../styles/lib";
  .page-transition {
    @include animation(0, 0.3s, animation-fade-in, ease-in-out);
  }
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overscroll-behavior-y: none;
    width: 100%;
    height: 100%;
  }
</style>

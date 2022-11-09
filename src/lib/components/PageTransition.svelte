<!-- Transition.svelte -->
<script lang="ts">
  import { router } from "tinro";
  import { fade } from "svelte/transition";
</script>

{#key $router.path}
  <div
    class:page-transition={false}
    class:container={true}
    transition:fade={{ delay: 500, duration: 2000 }}
  >
    <slot />
  </div>
{/key}

<style lang="scss">
  @import "../styles/mixins/animation";
  .page-transition {
    @include animation(0.5s, 2s, animation-fade-in, ease-in-out);
  }
  .container {
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // overscroll-behavior-y: none;
    width: 100%;
    height: 100%;
  }
</style>

<script lang="ts">
  import { fade } from "svelte/transition";
  import { Route } from "tinro";

  import ColorTheme from "$lib/components/theme/ColorTheme.svelte";
  import SlideDeck from "src/pages/SlideDeck.svelte";
</script>

<ColorTheme>
  <Route path="/section/*">
    <Route path="/1">
      <div
        class="page-transition"
        transition:fade={{ duration: 2000, delay: 1000 }}
      >
        <SlideDeck />
      </div>
    </Route>
    <Route path="/2">
      <div>Another section</div>
    </Route>
  </Route>
</ColorTheme>

<style lang="scss">
  .page-transition {
    width: 100%;
    height: 100%;
  }
</style>

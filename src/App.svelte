<script lang="ts">
  import { fade } from "svelte/transition";
  import { Route, router } from "tinro";

  import ColorTheme from "$lib/components/theme/ColorTheme.svelte";
  import SlideDeck from "src/pages/SlideDeck.svelte";
  import PageTransition from "$lib/components/PageTransition.svelte";
  router.mode.memory();
</script>

<ColorTheme>
  <PageTransition>
    <Route>
      <Route path="/1" fallback>
        <SlideDeck />
      </Route>
      <Route path="/2">
        <section>Another</section>
      </Route>
    </Route>
  </PageTransition>
</ColorTheme>

<style lang="scss">
</style>

<script lang="ts">
  import { writable } from "svelte/store";

  let el: HTMLDivElement;

  let refsMap = writable(new Map<number, number>());
  // let api = writable({refsMap, registerRef: (uuid: number) => {
  //     $refsMap.set()
  // }})
</script>

<div bind:this={el} class:refs-provider={true}><slot /></div>

<style lang="scss">
  /**
 * Initialiazing a `footnotes` counter on the wrapper
 */
  .refs-provider {
    counter-reset: ref-count;
  }
</style>

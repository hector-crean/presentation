<script lang="ts">
  import type { ObserverEventDetails, Options } from "svelte-inview";
  import { inview } from "svelte-inview";
  import { writable } from "svelte/store";

  interface $$Props {
    handleReachedEndOfCorridor?: () => void;
  }

  export let handleReachedEndOfCorridor: () => void = () => {};

  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

  interface $$Props {}

  // interface $$Slots {
  //     intersecting: boolean;
  // }

  let scrollCorrdiorEl: HTMLElement;
  let innerHeight: number = 0;

  const fullyIntersecting = writable(false);
  const progressionRatio = writable(0);

  const options: Options = {
    unobserveOnEnter: false,
  };

  const handleObserverChange = ({
    detail,
  }: CustomEvent<ObserverEventDetails>) => {
    $fullyIntersecting = detail.inView;
  };

  const handleWheel = () => {
    if (fullyIntersecting) {
      const rect = scrollCorrdiorEl.getBoundingClientRect();
      $progressionRatio = clamp(
        -rect.top / (rect.height - innerHeight),
        0,
        100
      );
    }
  };

  $: if ($progressionRatio > 0.99) {
    handleReachedEndOfCorridor();
  }
</script>

<svelte:window on:wheel={handleWheel} bind:innerHeight />

<div
  class="scroll-corridor"
  bind:this={scrollCorrdiorEl}
  use:inview={options}
  on:change={handleObserverChange}
  on:wheel={handleWheel}
>
  <slot
    fullyIntersecting={$fullyIntersecting}
    progressionRatio={$progressionRatio}
  />
</div>

<style lang="scss">
  .scroll-corridor {
    width: 100%;
    height: 100%;
  }
</style>

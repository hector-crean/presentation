<script lang="ts">
  import { resizeObserver } from "$lib/frame/observers/resize-observer";
  import { onMount, setContext } from "svelte";
  import { spring } from "svelte/motion";
  import { writable, type Writable } from "svelte/store";
  import { fade } from "svelte/transition";
  import { frameCtxKey } from "./context-keys";
  import Cursor from "./Cursor.svelte";
  import type { FrameCtx as Ctx } from "./frame.type";

  //https://www.newline.co/@kchan/state-management-with-svelte-context-api-part-2--cecddbc5

  /**	The .chart-container `<div>` tag.  */
  type Datum = $$Generic;

  type $$Props = {};

  type $$Slots = {
    default: {
      frameCtxKey: Symbol;
      w: Writable<number>;
      h: Writable<number>;
    };
  };
  //   export let data: Iterable<A>;
  let frameContainerEl: HTMLDivElement;
  let containerWidth = writable(100);
  let containerHeight = writable(100);

  let scale = writable({ sx: 1, sy: 1, sz: 1 });
  let translation = spring({ tx: 0, ty: 0, tz: 0 });
  let rotation = spring({ rx: 0, ry: 0, rz: 0 });

  const minmax = (n: number, min: number, max: number) =>
    Math.min(Math.max(n, min), max);

  let ctx: Ctx;

  $: ctx = {
    frameContainerEl,
    containerWidth,
    containerHeight,
    scale: scale,
    translation: translation,
    rotation: rotation,
  };

  $: setContext(frameCtxKey, ctx);

  /* --------------------------------------------
   * Keep track of whethr the component has mounted
   * This is used to emit warnings once we have measured
   * the container object and it doesn't have proper dimensions
   */
  let isMounted = false;

  onMount(() => {
    const resize$ = resizeObserver(frameContainerEl, window.ResizeObserver);

    const resizeSubscription = resize$.subscribe((domRect) => {
      containerHeight.set(domRect.height);
      containerWidth.set(domRect.width);
    });

    isMounted = true;

    //cleanup
    return () => {
      // gestureStreamSubscription.unsubscribe();
      resizeSubscription.unsubscribe();
    };
  });
</script>

<div bind:this={frameContainerEl} class="frame" tabindex="-1" transition:fade>
  {#if isMounted}
    <slot {frameCtxKey} w={containerHeight} h={containerWidth} />
  {/if}
</div>
<Cursor />

<style lang="scss">
  .frame {
    /* transform-origin: 0 0; */
    /* -webkit-transform-origin: 0 0; */
    /* transition: transform 0.1s ease-in-out; */

    background-color: #141623;
    width: 100%;
    height: 100%;
    position: relative;
    touch-action: none;
    -webkit-user-select: none;
    user-select: none;
    /* transform-origin: 0% 0%; */
    transform-style: preserve-3d;

    &:focus {
      border: 2px solid red;
    }
  }
</style>

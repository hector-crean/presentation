<svelte:options tag="layer-canvas" />

<script lang="ts">
  import { frameCtxKey } from "$lib/frame/context-keys";
  import type { FrameCtx, Layer } from "$lib/frame/frame.type";
  import { glStore } from "$lib/frame/stores/canvas.store";
  import { getContext, onMount } from "svelte";

  type $$Props = {
    layer: Layer;
    pointerEvents: boolean;
  };
  export let layer: Layer;
  export let pointerEvents: boolean;

  const { containerWidth, containerHeight, rotation, translation, scale } =
    getContext<FrameCtx>(frameCtxKey);

  let canvasEl: HTMLCanvasElement;

  onMount(() => {
    glStore.set(canvasEl.getContext("2d"));

    return () => {};
  });
</script>

<!-- <svelte:window
  on:resize={() => {
    $canvasStore.width = w;
    $canvasStore.height = h;
  }}
/> -->

<canvas
  width={$containerWidth}
  height={$containerHeight}
  bind:this={canvasEl}
  class:canvas={true}
  style:z-index={layer}
  style:pointer-events={pointerEvents ? "all" : "none"}
  style:transform="translate3d({Math.round($translation.tx)}px, {Math.round(
    $translation.ty
  )}px, {Math.round($translation.tz)}px) scale3d({Math.round($scale.sx * 100) /
    100}, {Math.round($scale.sy * 100) / 100}, {Math.round($scale.sz * 100) /
    100})"
/>

<style lang="scss">
  @import "./vars.scss";

  .canvas {
    /* display: block; */
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
  }
</style>

<!--
	@component
	SVG layout component
 -->
<script lang="ts">
  import vermeerPainting from "$lib/assets/girl-with-pearl.jpg";
  import { frameCtxKey } from "$lib/frame/context-keys";
  import type { FrameCtx, Layer } from "$lib/frame/frame.type";
  import { getContext } from "svelte";

  let imgSvgEl: SVGImageElement;

  type $$Props = {
    layer: Layer;
    pointerEvents: boolean;
  };
  export let layer: Layer;
  export let pointerEvents: boolean;

  const { rotation, translation, scale, containerWidth, containerHeight } =
    getContext<FrameCtx>(frameCtxKey);

  $: ox = 0.5 * $containerWidth;
  $: oy = 0.5 * $containerHeight;
</script>

<svg
  viewBox="0 0 {$containerWidth} {$containerHeight}"
  width={$containerWidth}
  height={$containerHeight}
  style:z-index={layer}
  style:pointer-events={pointerEvents ? "all" : "none"}
>
  <defs>
    <slot name="defs" />
  </defs>
  <g
    transform="translate({ox}, {oy}) scale({$scale.sx} {$scale.sy}) translate({-ox} {-oy}) translate({$translation.tx} {$translation.ty})"
  >
    <image
      bind:this={imgSvgEl}
      href={vermeerPainting}
      width={$containerWidth}
      height={$containerHeight}
      style="z-index: 9999"
    />
    <slot />
  </g>

  <!-- </g> -->
</svg>

<style>
  @import "../vars.scss";

  svg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
</style>

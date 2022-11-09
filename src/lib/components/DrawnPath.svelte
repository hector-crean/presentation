<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { draw } from "svelte/transition";

  interface $$Props
    extends svelte.JSX.SVGAttributes<SVGElementTagNameMap["path"]> {
    visible: boolean;
    d: string;
    duration: number;
    delay: number;
  }

  export let visible = true;
  export let d: string;
  export let duration: number;
  export let delay: number;
</script>

<g>
  {#if visible}
    <path
      in:draw={{
        duration: duration,
        delay: delay,
        easing: quintOut,
      }}
      {d}
      stroke-width="2px"
      style:stroke={"var(--text-theme-color-1)"}
    />
  {/if}
</g>

<style>
</style>

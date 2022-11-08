<script lang="ts">
  //   type WithTarget<Event, Target> = Event & { currentTarget: Target };

  import { createEventDispatcher } from "svelte";

  export let evt: CustomEvent;
  export let offset = -35;

  /**
   * Tooltip:
   * - layer of
   */
  const dispatch = createEventDispatcher<{ name: string }>();

  const handleClicked = ({ detail }: CustomEvent<number>) =>
    console.log("clicked", detail);

  /**
   *
   * - Charts are layered (each with different id )
   * -  tooltip can be associasted with a partivcular layr
   */
</script>

{#if evt.detail}
  <div
    class="tooltip"
    style:top={`${evt.detail.e.layerY + offset}px`}
    style:left={`${evt.detail.e.layerX}px`}
  >
    <slot detail={evt.detail} />
  </div>
{/if}

<style lang="scss">
  .tooltip {
    position: absolute;
    width: 150px;
    border: 1px solid #ccc;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.85);
    transform: translate(-50%, -100%);
    padding: 5px;
    z-index: 15;
  }
</style>

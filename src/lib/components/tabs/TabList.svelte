<script lang="ts" context="module">
  type TTabListProps<
    TSlotProps extends {},
    TAsProp extends SupportedAs
  > = TPassThroughProps<TSlotProps, TAsProp, "div"> & {};
</script>

<script lang="ts">
  import type { HTMLActionArray } from "$lib/hooks/use-actions";
  import type { SupportedAs } from "$lib/internal/elements";
  import { forwardEventsBuilder } from "$lib/internal/forwardEventsBuilder";
  import type { TPassThroughProps } from "$lib/types";
  import Render from "$lib/utils/Render.svelte";
  import { get_current_component } from "svelte/internal";
  import { useTabsContext } from "./TabGroup.svelte";

  /***** Props *****/
  type TAsProp = $$Generic<SupportedAs>;
  type $$Props = TTabListProps<typeof slotProps, TAsProp>;

  export let as: SupportedAs = "div";
  export let use: HTMLActionArray = [];

  /***** Events *****/
  const forwardEvents = forwardEventsBuilder(get_current_component());

  /***** Component *****/
  let api = useTabsContext("TabList");
  let listRef = $api.listRef;

  $: propsWeControl = {
    role: "tablist",
    "aria-orientation": $api.orientation,
  };

  $: slotProps = { selectedIndex: $api.selectedIndex };
</script>

<Render
  {...{ ...$$restProps, ...propsWeControl }}
  {as}
  {slotProps}
  bind:el={$listRef}
  use={[...use, forwardEvents]}
  name={"TabList"}
>
  <slot {...slotProps} />
</Render>

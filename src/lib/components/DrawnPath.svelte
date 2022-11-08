<script lang="ts">
    import { quintOut } from "svelte/easing";
    import { draw } from "svelte/transition";

    interface $$Props
        extends svelte.JSX.SVGAttributes<SVGElementTagNameMap["path"]> {
        visible: boolean;
        d: string;
    }

    export let visible = true;
    export let d: string;
</script>

<g>
    {#if visible}
        <path
            in:draw={{
                duration: 2500,
                delay: 1000,
                easing: quintOut,
            }}
            {d}
            stroke-width="2px"
            style:stroke={"red"}
            style:fill={"white"}
        />
    {/if}
</g>

<style>
</style>

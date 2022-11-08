<script lang="ts">
    import { quintOut } from "svelte/easing";
    import { fade, draw, fly } from "svelte/transition";

    interface $$Props {
        visible: boolean;
        paths: Array<string>;
        viewbox: [w: number, h: number];
        strokeColor: string;
    }

    export let visible = true;
    export let paths: Array<string>;
    export let viewbox: [w: number, h: number];
    export let strokeColor: string;
</script>

<svg viewBox="0 0 {viewbox[0]} {viewbox[1]}" xmlns="http://www.w3.org/2000/svg">
    <g>
        {#if visible}
            {#each paths as path}
                <path
                    in:draw={{
                        duration: 2500,
                        delay: 1000,
                        easing: quintOut,
                    }}
                    class:transparent-fill={visible}
                    d={path}
                    stroke-width="2px"
                    style:stroke={strokeColor}
                />
            {/each}
        {/if}
    </g>
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;
    }
    .transparent-fill {
        fill: transparent;
        transition: fill 0.8s ease;
    }
</style>

<script lang="ts">
	import { spring } from 'svelte/motion';
	import { writable } from 'svelte/store';

	let cursorShowing = writable(true);

	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	);

	let size = spring(10);

	const handlePointermove = (e: PointerEvent) => coords.set({ x: e.clientX, y: e.clientY });
	const handlePointerdown = () => size.set(10);
	const handlePointerup = () => size.set(10);
	const handlePointerEnter = () => cursorShowing.set(true);
	const handlePointerLeave = () => cursorShowing.set(false);
</script>

<svelte:window
	on:pointermove={handlePointermove}
	on:pointerdown={handlePointerdown}
	on:pointerenter={handlePointerEnter}
	on:pointerup={handlePointerup}
	on:pointercancel={handlePointerLeave}
	on:pointerleave={handlePointerLeave}
	on:pointerout={handlePointerLeave}
	on:pointerover={handlePointerEnter}
/>

<div class="cursor-wrapper">
	{#if $cursorShowing}
		<svg>
			<circle cx={$coords.x} cy={$coords.y} r={$size} />
		</svg>
	{/if}
</div>

<style lang="scss">
	.cursor-wrapper {
		pointer-events: none;
		background-color: transparent;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}
	svg {
		width: 100%;
		height: 100%;
	}
	circle {
		fill: orange;
	}
</style>

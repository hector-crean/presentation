<script lang="ts">
	import { frameCtxKey } from '$lib/frame/context-keys';
	import type { FrameCtx, Layer } from '$lib/frame/frame.type';
	import { getContext } from 'svelte';

	type $$Props = {
		layer: Layer;
		pointerEvents: boolean;
	};
	export let layer: Layer;
	export let pointerEvents: boolean;

	type Datum = $$Generic;

	const { containerWidth, containerHeight, translation, rotation, scale } =
		getContext<FrameCtx>(frameCtxKey);

	let htmlEl: HTMLDivElement;
</script>

<div
	class:html-overlay={true}
	bind:this={htmlEl}
	style:z-index={layer}
	style:pointer-events={pointerEvents ? 'all' : 'none'}
	style:transform="translate3d({Math.round($translation.tx)}px, {Math.round($translation.ty)}px, {Math.round(
		$translation.tz
	)}px) scale3d({Math.round($scale.sx * 100) / 100}, {Math.round($scale.sy * 100) / 100}, {Math.round(
		$scale.sz * 100
	) / 100})"
>
	<slot {htmlEl} />
</div>

<style lang="scss">
	@import '../vars.scss';

	.html-overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>

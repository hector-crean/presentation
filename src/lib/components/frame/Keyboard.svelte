<script lang="ts">
	import { keysPressed } from '$lib/frame/stores/keyboard.store';

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}

		switch (event.key) {
			case ' ':
				keysPressed.update((state) => ({
					...state,
					modifiers: { ...state.modifiers, spacebar: true }
				}));
				break;
			case 'Meta':
				keysPressed.update((state) => ({
					...state,
					modifiers: { ...state.modifiers, meta: true }
				}));

				break;
			case 'Shift':
				break;
			default:
				return; // Quit when this doesn't handle the key event.
		}

		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	};
	const handleKeyup = (event: KeyboardEvent) => {
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}

		switch (event.key) {
			case ' ':
				keysPressed.update((state) => ({
					...state,
					modifiers: { ...state.modifiers, spacebar: false }
				}));
				break;
			case 'Meta':
				keysPressed.update((state) => ({
					...state,
					modifiers: { ...state.modifiers, meta: false }
				}));

				break;
			case 'Shift':
				break;
			default:
				return; // Quit when this doesn't handle the key event.
		}

		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	};
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<div style="text-align: center">
	{#each Object.entries($keysPressed.modifiers) as [key, pressed]}
		{#if pressed}
			<kbd>{key}</kbd>
		{/if}
	{/each}
</div>

<style lang="scss">
	div {
		position: fixed;
		right: 20px;
		bottom: 20px;
		z-index: 10;
		--color-background-primary: black;
		--color-text-primary: white;
		--kbd-color-background: grey;
		--kbd-color-border: white;
		--font-family-sans-serif: Helvetica;
	}

	kbd {
		// Set up custom properties for colours so we can switch them in dark mode
		--kbd-color-background: var(--color-background-primary);
		// These interpolated variables reference a SCSS map of HSL-based greys
		--kbd-color-border: #{color(grey, 80)};
		--kbd-color-text: var(--color-text-primary);

		// In dark mode, a straight-up inversion doesn’t work for
		// the “physical” key look so they need to be adjusted
		@media (prefers-color-scheme: dark) {
			--kbd-color-background: #{color(grey, 55)};
			--kbd-color-border: #{color(grey, 25)};
			--kbd-color-text: #{color(grey, 14)};
		}

		// Match the page defaults in light mode but
		// switch to a light-ish grey in dark mode
		background-color: var(--kbd-color-background);
		color: var(--kbd-color-text);

		// Round off the corners like physical keys have
		border-radius: 0.25rem;

		// Add a simple border
		border: 1px solid var(--kbd-color-border);

		// A sharp shadow (with no blur) really gives
		// the old school keyboard look
		box-shadow: 0 2px 0 1px var(--kbd-color-border);

		// Remove the text cursor — totally optional
		// but I wanted it for my hover effect
		cursor: default;

		// By default, browsers style <kbd> with a monospace typeface
		font-family: var(--font-family-sans-serif);

		// If we do all this with the default font size
		// (mine is 18px on desktop) it’ll look massive
		// and bump into lines above and below
		font-size: 0.75em;

		// Remove any extra space so I can accurately tweak the padding
		line-height: 1;

		// Make narrow numbers and letters look less odd
		min-width: 0.75rem;
		// `min-width` doesn’t work on inline elements
		display: block;
		// Keep the characters centred when narrower than the `max-width`
		text-align: center;

		// Seemed to look more key-like with more horizontal padding 🤷
		padding: 2px 5px;

		// These two lines pull the whole element up now that they’re
		// bottom-heavy due to the `box-shadow`. This looks better
		// against the cap height of regular paragraph text.
		position: relative;
		top: -1px;

		// This is my favourite part of the whole thing. The key gets
		// “pushed” down and the shadow gets reduced so it looks like
		// it might when typing on a physical keyboard.
		&:hover {
			box-shadow: 0 1px 0 0.5px var(--kbd-color-border);
			top: 1px;
		}
	}
</style>

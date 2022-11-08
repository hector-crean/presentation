import { writable } from 'svelte/store';

interface KeyboardState {
	keys: Record<string, boolean>;
	modifiers: {
		spacebar: boolean;
		meta: boolean;
	};
}

const DEFAULT_KEYBOARD_STATE: KeyboardState = {
	keys: {},
	modifiers: {
		spacebar: false,
		meta: false
	}
};
export const keysPressed = writable<KeyboardState>(DEFAULT_KEYBOARD_STATE);

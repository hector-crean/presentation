import { writable } from 'svelte/store';

export const glStore = writable<CanvasRenderingContext2D | null>(null);

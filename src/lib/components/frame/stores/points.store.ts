import { writable } from 'svelte/store';
import type { Point } from '../frame.type';

export const pointsStore = writable<Array<Point>>([]);

import type { Spring } from 'svelte/motion';
import type { Writable } from 'svelte/store';
//https://www.newline.co/@kchan/state-management-with-svelte-context-api-part-2--cecddbc5

type Layer = 0 | 1 | 2 | 3 | 4 | 5;

interface Margins {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

type Viewbox = `${number} ${number} ${number} ${number}`;

type Rotation = { rx: number; ry: number; rz: number };
type Translation = { tx: number; ty: number; tz: number };
type Scale = { sx: number; sy: number; sz: number };

type Point = [x: number, y: number];

type Polyline = { id: string; points: Array<Point> };

type FrameCtx = {
	frameContainerEl: HTMLDivElement;
	containerWidth: Writable<number>;
	containerHeight: Writable<number>;
	rotation: Spring<Rotation>;
	translation: Spring<Translation>;
	scale: Writable<Scale>;
	//markup:
};

export type { Margins, Rotation, FrameCtx, Viewbox, Translation, Scale, Layer, Polyline, Point };

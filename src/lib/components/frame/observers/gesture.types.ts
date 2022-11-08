import type { coordinates } from './shared';

enum GestureFlag {
	None = 0,
	Tap = 1,
	Wheel = 2,
	Press = 4,
	LongPress = 8,
	Pinch = 16,
	Rotate = 32,
	Pan = 64,
	Drag = 128 //1 << 7,
	// All = ~(~0 << 7)
}

type Drag = {
	readonly tag: typeof GestureFlag.Drag;
	value: {
		phase: 'dragging' | 'pressing' | 'completed';
		pointerId: number;
		currentEvent: PointerEvent;
		absoluteDelta: { ndc: { dx: number; dy: number }; pixel: { dx: number; dy: number } };
		relativeDelta: { ndc: { dx: number; dy: number }; pixel: { dx: number; dy: number } };
		currentPosition: ReturnType<typeof coordinates>;
		priorPosition: ReturnType<typeof coordinates>;
	};
};

type Wheel = {
	readonly tag: typeof GestureFlag.Wheel;
	value: {
		readonly dx: number;
		readonly dy: number;
	};
};

type Tap = {
	readonly tag: typeof GestureFlag.Tap;
};

type Press = {
	readonly tag: typeof GestureFlag.Press;
};

type LongPress = {
	readonly tag: typeof GestureFlag.LongPress;
};

type Pinch = {
	readonly tag: typeof GestureFlag.Pinch;
	value: {
		dz: number;
		dx: number;
		dy: number;
	};
};

type Rotate = {
	readonly tag: typeof GestureFlag.Rotate;
};

type Pan = {
	readonly tag: typeof GestureFlag.Pan;
};

type Gesture = Drag | Tap | Press | LongPress | Pinch | Rotate | Pan | Wheel;

type PointerEventTag =
	| 'pointerdown'
	| 'pointerup'
	| 'pointermove'
	| 'pointercancel'
	| 'pointerout'
	| 'pointerleave';

type TaggedPointedEvent = { tag: PointerEventTag; ev: PointerEvent };

export type {
	PointerEventTag,
	TaggedPointedEvent,
	Gesture,
	Drag,
	Tap,
	Press,
	LongPress,
	Pinch,
	Rotate,
	Pan,
	Wheel
};
export { GestureFlag };

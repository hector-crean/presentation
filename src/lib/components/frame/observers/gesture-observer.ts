// Import stylesheets

import { combineLatest, fromEvent, merge, Observable, race } from 'rxjs';
import {
	filter,
	map,
	pairwise,
	repeat,
	scan,
	switchMap,
	takeUntil,
	takeWhile,
	tap
} from 'rxjs/operators';
import {
	GestureFlag,
	type Drag,
	type Gesture,
	type Pinch,
	type TaggedPointedEvent,
	type Wheel
} from './gesture.types';
import { coordinates, pointerDifference } from './shared';

const initGestureStream = (
	element: HTMLElement | SVGElement
): Observable<[gesture: Gesture, numberOfActivePointers: number]> => {
	const pointerdown$ = fromEvent<PointerEvent>(element, 'pointerdown').pipe(
		tap((e) => e.preventDefault()),
		map((ev) => ({ tag: 'pointerdown' as const, ev: ev }))
	);
	const pointermove$ = fromEvent<PointerEvent>(element, 'pointermove').pipe(
		tap((e) => e.preventDefault()),
		map((ev) => ({ tag: 'pointermove' as const, ev: ev }))
	);

	const pointerup$ = fromEvent<PointerEvent>(element, 'pointerup').pipe(
		tap((e) => e.preventDefault()),
		map((ev) => ({ tag: 'pointerup' as const, ev: ev }))
	);
	const pointercancel$ = fromEvent<PointerEvent>(element, 'pointercancel').pipe(
		tap((e) => e.preventDefault()),
		map((ev) => ({ tag: 'pointercancel' as const, ev: ev }))
	);
	const pointerout$ = fromEvent<PointerEvent>(element, 'pointerout').pipe(
		tap((e) => e.preventDefault()),
		map((ev) => ({ tag: 'pointerout' as const, ev: ev }))
	);
	const pointerleave$ = fromEvent<PointerEvent>(element, 'pointerleave').pipe(
		tap((e) => {
			e.preventDefault();
			e.stopPropagation();
		}),
		map((ev) => ({ tag: 'pointerleave' as const, ev: ev }))
	);

	const wheelUnit = (ev: WheelEvent) => {
		switch (ev.deltaMode) {
			// case 0x00:
			//   return ev.DOM_DELTA_PIXEL;
			// case 0x01:
			//   return ev.DOM_DELTA_LINE;
			// case 0x02:
			//   return ev.DOM_DELTA_PAGE;
			default:
				return 1;
		}
	};

	const wheel$: Observable<Wheel> = fromEvent<WheelEvent>(element, 'wheel').pipe(
		map((ev) => {
			const rect = element.getBoundingClientRect();
			const unit = wheelUnit(ev);
			return {
				dy: (unit * ev.deltaY) / rect.height,
				dx: (unit * ev.deltaX) / rect.width
			};
		}),
		// pairwise(),
		// map(([penultimate, latest]) => ({
		//   dx: latest.dx - penultimate.dx,
		//   dy: latest.dy - penultimate.dy,
		// })),
		map((v) => ({ tag: GestureFlag.Wheel, value: v }))
	);

	const cache_pointers = (cache: Map<number, TaggedPointedEvent>, value: TaggedPointedEvent) => {
		switch (value.tag) {
			case 'pointerdown':
				cache.set(value.ev.pointerId, value);
				return cache;
			case 'pointerup':
			case 'pointercancel':
			case 'pointerleave':
			case 'pointerout':
				cache.delete(value.ev.pointerId);
				return cache;
			case 'pointermove':
				if (cache.get(value.ev.pointerId)) {
					cache.set(value.ev.pointerId, value);
				}
				return cache;
			default:
				return cache;
		}
	};

	const calculatePinchMagnitude = (cache: Map<number, TaggedPointedEvent>) => {
		const coords: Array<[number, number]> = Array.from(cache.entries())
			.map(([_, taggedEv]) => coordinates(element, taggedEv.ev).ndc)
			.map(({ x, y }) => [x, y]);

		const getCentroid = (arr: Array<[number, number]>): [number, number] => {
			const length = arr.length;
			const [xs, ys] = arr.reduce(([x, y], curr) => [x + curr[0], y + curr[1]], [0, 0]);

			return [xs / length, ys / length];
		};

		const distance = (p1: [number, number], p2: [number, number]) =>
			Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);

		const centroid = getCentroid(coords);

		return {
			magnitude: coords.reduce((acc, curr) => distance(curr, centroid), 0),
			centroid: centroid
		};
	};

	const pointercache$ = merge(
		pointerdown$,
		pointermove$,
		pointerup$,
		pointercancel$,
		pointerleave$,
		pointerout$
	).pipe(scan(cache_pointers, new Map<number, TaggedPointedEvent>()));

	const activepointernumber$ = pointercache$.pipe(map((v) => Array.from(v).length));

	const pinch$: Observable<Pinch> = pointercache$.pipe(
		takeWhile((cache) => Array.from(cache.entries()).length >= 2),
		map(calculatePinchMagnitude),
		pairwise<{ magnitude: number; centroid: [number, number] }>(),
		map(([penulatimate, latest]) => {
			const pinch: Pinch = {
				tag: GestureFlag.Pinch,
				value: {
					dz: latest.magnitude - penulatimate.magnitude,
					dx: latest.centroid[0] - penulatimate.centroid[0],
					dy: latest.centroid[1] - penulatimate.centroid[1]
				}
			};
			return pinch;
		}),
		repeat()
	);

	const dragstart$: Observable<TaggedPointedEvent> = pointerdown$;

	const drag$: Observable<Drag> = dragstart$.pipe(
		switchMap((start) =>
			pointermove$.pipe(
				filter((move) => move.ev.pointerId === start.ev.pointerId),
				pairwise<TaggedPointedEvent>(),
				map<Array<TaggedPointedEvent>, Drag>(([penultimate, latest]) => {
					const absoluteDelta = pointerDifference(element, start.ev, latest.ev);
					const relativeDelta = pointerDifference(element, latest.ev, penultimate.ev);

					const currentPosition = coordinates(element, latest.ev);
					const priorPosition = coordinates(element, penultimate.ev);

					const payload: Drag = {
						tag: GestureFlag.Drag,
						value: {
							phase: 'dragging',
							pointerId: latest.ev.pointerId,
							currentEvent: latest.ev,
							absoluteDelta: absoluteDelta,
							relativeDelta: relativeDelta,
							priorPosition: priorPosition,
							currentPosition: currentPosition
						}
					};
					return payload;
				}),
				takeUntil(
					race(
						pointerup$.pipe(filter((up) => up.ev.pointerId === start.ev.pointerId)),
						pointercancel$.pipe(filter((cancel) => cancel.ev.pointerId === start.ev.pointerId)),
						pointerout$.pipe(filter((out) => out.ev.pointerId === start.ev.pointerId)),
						pointerleave$.pipe(filter((leave) => leave.ev.pointerId === start.ev.pointerId))
					)
				)
			)
		)
	);

	const gestures$: Observable<Gesture> = merge(pinch$, drag$, wheel$);

	return combineLatest([gestures$, activepointernumber$]);
};

export { initGestureStream };

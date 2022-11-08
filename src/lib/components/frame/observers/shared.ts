export const coordinates = (element: HTMLElement | SVGElement, ev: PointerEvent) => {
	const rect = element.getBoundingClientRect();
	const x = ev.offsetX - rect.left;
	const y = ev.offsetY - rect.top;

	return {
		ndc: {
			x: (x / rect.width) * 2 - 1,
			y: (y / rect.height) * -2 + 1
		},
		pixel: {
			x: x,
			y: y
		}
	};
};

export const pointerDifference = (
	element: HTMLElement | SVGElement,
	pointer1: PointerEvent,
	pointer2: PointerEvent
) => {
	const pointer1Coords = coordinates(element, pointer1);
	const pointer2Coords = coordinates(element, pointer2);

	return {
		ndc: {
			dx: pointer1Coords.ndc.x - pointer2Coords.ndc.x,
			dy: pointer1Coords.ndc.y - pointer2Coords.ndc.y
		},
		pixel: {
			dx: pointer1Coords.pixel.x - pointer2Coords.pixel.x,
			dy: pointer1Coords.pixel.y - pointer2Coords.pixel.y
		}
	};
};

import { Observable } from 'rxjs';

const resizeObserver = <T extends HTMLElement>(
	element: T,
	roImpl: typeof ResizeObserver
): Observable<DOMRect> =>
	new Observable((subscriber) => {
		const ro = new roImpl((entries) => {
			entries.forEach((entry) => {
				if (entry.target === element) {
					subscriber.next(entry.contentRect);
				}
			});
		});

		ro.observe(element, { box: 'border-box' });

		return () => {
			ro.unobserve(element);
			ro.disconnect();
		};
	});

export { resizeObserver };

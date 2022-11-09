<script lang="ts">
  import { Observable } from "rxjs";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // interface $$Props {

  // }

  let wrapperEl: HTMLElement;

  const intersectionObserver = <T extends HTMLElement>(
    element: T,
    options?: IntersectionObserverInit
  ): Observable<IntersectionObserverEntry> => {
    return new Observable<IntersectionObserverEntry>((subscriber) => {
      const intersectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          for (let entry of entries) {
            if (entry.target === element) {
              subscriber.next(entry);
              break;
            }
          }
        },
        options
      );

      intersectionObserver.observe(element);

      return () => {
        intersectionObserver.unobserve(element);
        intersectionObserver.disconnect();
      };
    });
  };

  const intersecting = writable<boolean>(false);

  onMount(() => {
    const intersectionObserver$ = intersectionObserver(wrapperEl);

    const subscription = intersectionObserver$.subscribe((entry) => {
      $intersecting = entry.isIntersecting;
    });

    return () => subscription.unsubscribe();
  });
</script>

<div bind:this={wrapperEl}>
  <slot intersecting={$intersecting} />
</div>

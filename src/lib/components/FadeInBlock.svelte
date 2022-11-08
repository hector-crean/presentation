<script lang="ts">
  import IntersectionObserver from "@/components/IntersectionObserver.svelte";

  let sectionEl: HTMLElement;
  let isIntersecting: boolean = false;
  let scrollY: number = 0;
</script>

<svelte:window bind:scrollY />

<IntersectionObserver
  bind:element={sectionEl}
  bind:intersecting={isIntersecting}
>
  <div
    bind:this={sectionEl}
    class:block={true}
    class:relative={true}
    class:opacity-transition={true}
    data-is-intersecting={isIntersecting}
  >
    <div
      class:transform-transition={true}
      data-is-intersecting={isIntersecting}
    >
      <div class:flex-container={true}>
        <slot />
      </div>
    </div>
  </div>
</IntersectionObserver>

<style lang="scss">
  .block {
    width: 100%;
    z-index: 200;
  }

  .opacity-transition {
    transition: opacity 50ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s;
    &[data-is-intersecting="true"] {
      opacity: 1;
      transition-timing-function: linear;
      transition-duration: 1s;
      transition-property: opacity;
    }
    &[data-is-intersecting="false"] {
      opacity: 0;
    }
  }
  .transform-transition {
    transition: transform 360ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.8s;
    &[is-intersecting="true"] {
      transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0)
        scaleX(1) scaleY(1);
    }
    &[is-intersecting="false"] {
      transform: translateX(0) translateY(100px) rotate(0) skewX(0) skewY(0)
        scaleX(1) scaleY(1);
    }
  }
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
  }
  .flex-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    text-align: center;
  }
</style>

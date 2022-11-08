<script lang="ts">
  export let uuid: number;

  interface $$Props {
    uuid: number;
  }
</script>

<span id="mark:ref-{uuid}" class:ref={true}>
  <a href={`#content:ref-${uuid}`} role="doc-noteref">
    <slot />
  </a>
</span>

<style lang="scss">
  .ref {
    counter-increment: ref-count; /* 1 */
    text-decoration: none; /* 2 */
    color: inherit; /* 2 */
    cursor: default; /* 2 */
    outline: none; /* 2 */

    &::after {
      content: "[" counter(ref-count) "]"; /* 3 */
      vertical-align: super; /* 4 */
      font-size: 0.7em; /* 5 */
      margin-left: 2px; /* 6 */
      text-decoration: underline; /* 7 */
      cursor: pointer; /* 7 */
    }

    /**
 * Resetting the default focused styles on the number
 */
    &:focus::after {
      outline: thin dotted;
      outline-offset: 2px;
    }
  }
</style>

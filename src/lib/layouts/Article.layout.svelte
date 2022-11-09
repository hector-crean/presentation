<script lang="ts">
</script>

<article>
  <slot />
</article>

<style lang="scss" global>
  article {
    background-color: var(--bg-theme-color-1);
    color: var(--text-theme-color-1);
    display: grid;
    grid-template-columns:
      1fr
      min(65ch, 100%)
      1fr;

    & :first-child {
      margin-top: 0rem;
    }

    & > section {
      margin-top: var(--space-3xl);
      margin-left: auto;
      margin-right: auto;
      grid-column: 2;

      &[data-fullbleed="true"] {
        width: 100%;
        grid-column: 1 / -1;
      }
    }
  }
</style>

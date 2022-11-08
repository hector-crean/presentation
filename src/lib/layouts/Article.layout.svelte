<script lang="ts">
</script>

<main class="article-layout">
  <slot />
</main>

<style lang="scss" global>
  .article-layout {
    display: grid;
    grid-template-columns:
      1fr
      min(65ch, 100%)
      1fr;
  }

  .article-layout > section {
    margin-top: 19.2rem;
    margin-left: auto;
    margin-right: auto;
    grid-column: 2;
  }
  .article-layout > section[data-fullbleed="true"] {
    width: 100%;
    grid-column: 1 / -1;
  }

  section[data-kind="media"] {
  }
</style>

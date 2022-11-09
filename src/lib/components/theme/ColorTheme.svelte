<script lang="ts">
  import { colorThemeStore } from "./color-theme.store";
</script>

<div
  class="color-provider"
  class:dark-mode={$colorThemeStore === "dark-theme"}
  class:light-mode={$colorThemeStore === "light-theme"}
>
  <slot />
</div>

<style lang="scss" global>
  @import "../../styles/colors";

  .color-provider {
    width: 100%;
    height: 100%;
  }

  $themes: (
    bg-theme-color-1: (
      dark-theme: $blue-1,
      light-theme: $blue-8,
    ),
    text-theme-color-1: (
      dark-theme: $blue-8,
      light-theme: $blue-1,
    ),
  );

  @mixin color-vars($mode) {
    @each $key, $map in $themes {
      @each $prop, $color in $map {
        @if $prop == $mode {
          --#{$key}: #{$color};
        }
      }
    }
  }

  .dark-mode {
    @include color-vars("dark-theme");
  }

  .light-mode {
    @include color-vars("light-theme");
  }
</style>

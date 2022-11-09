import { writable } from "svelte/store";

type ColorTheme = "dark-theme" | "light-theme";

const createColorThemeStore = () => {
  const { subscribe, update, set } = writable<ColorTheme>("dark-theme");

  return {
    subscribe,
    update,
    set,
    toggle: () =>
      update((theme) =>
        theme === "dark-theme" ? "light-theme" : "dark-theme"
      ),
  };
};

export const colorThemeStore = createColorThemeStore();

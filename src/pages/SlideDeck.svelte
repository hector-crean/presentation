<script lang="ts">
  import { colorThemeStore } from "$lib/components/theme/color-theme.store";
  import DefiningObesity from "$lib/svelte-svgs/DefiningObesity.svelte";
  import USObesity from "$lib/svelte-svgs/USObesity.svelte";
  import FadeInBlock from "$lib/components/FadeInBlock.svelte";

  import DrawnPfizer from "$lib/components/DrawnPfizer.svelte";
  import IntersectionObserver from "$lib/components/IntersectionObserver.svelte";
  import ScrollCorridor from "$lib/components/ScrollCorridor.svelte";
  import { router } from "tinro";
  import ArticleLayout from "../lib/layouts/Article.layout.svelte";

  import ritonavirPng from "$lib/assets/ritonavir.png";

  const paths = [
    "m 645.57617,87.980474 c -59.56449,4e-4 -74.82368,57.647346 -83.36328,88.869146 l -63.62695,232.58397 h 37.12109 l 56.41211,-206.23046 h 38.55469 l -25.66602,93.84179 h 37.1211 l 30.78125,-112.53905 h -75.67383 c 3.87721,-14.1845 8.01224,-29.29559 11.38281,-41.61719 6.22395,-22.7554 16.39036,-39.28031 31.17578,-38.72461 16.34099,0.6142 8.02467,11.34439 5.78711,19.52539 -3.09568,11.3183 5.26227,22.69922 19.90625,22.69922 31.80831,0 39.65238,-58.408206 -19.91211,-58.408206 z M 435.00195,128.67774 v 0.002 l -46.05078,168.36522 h 38.69922 l 17.05273,-62.34764 h 33.61524 c 37.0919,0 61.70718,-20.47174 68.36328,-48.92774 6.2149,-26.5694 -9.30329,-57.0918 -50.86719,-57.0918 -20.2719,4e-4 -40.5396,0 -60.8125,0 z m 33.28125,19.8125 h 14.87891 c 15.5779,0 27.93742,12.47008 24.95312,34.17188 -2.7664,20.1172 -24.6112,32.17578 -43.6582,32.17578 h -14.32226 z m 366.97657,32.60743 c -32.5391,0 -56.01173,27.99295 -61.64454,55.96875 -5.41283,26.88279 10.00375,62.60741 52.44727,62.60741 30.16642,0 45.33789,-13.28321 45.33789,-13.28321 l -6.94336,-17.13867 c 0,0 -12.68211,10.32227 -30.35351,10.32227 -17.67123,0 -28.75712,-13.94923 -26.30469,-36.17773 h 72.16211 c 5.15877,-13.0901 7.98353,-62.29882 -44.70117,-62.29882 z m 143.83984,1.51367 c -24.20185,0 -38.4707,24.99219 -38.4707,24.99219 l 6.3164,-23.09571 h -37.12109 l -30.78125,112.5371 h 37.12109 c 0,0 8.93917,-32.88002 13.48828,-49.29492 7.02286,-25.65939 21.346,-41.72726 28.23243,-42.38476 7.95812,-0.7598 7.19612,18.41602 22.71679,18.41602 23.54414,0 28.62264,-41.16992 -1.49804,-41.16992 z m -292.20313,1.89648 -5.11523,18.69922 h 47.05273 l -73.9707,93.83788 h 104.45703 l 5.11328,-18.69922 h -53.07812 l 73.96875,-93.83788 z m 148.22461,15.17188 v 0.002 c 20.18248,0 15.58985,26.64844 15.58985,26.64844 l -40.43164,-0.0937 c 0,0 6.70553,-26.55664 24.84179,-26.55664 z",
    "M 301.8419,297.3069 C 168.7224,289.0059 14.0255,220.34151 19.4861,163.82961 L 1.1196,230.98071 C -4.4516,288.6378 139.0512,357.0924 282.3559,368.5503 Z",
    "m 350.2187,204.72081 c -11.7989,43.13829 -60.9416,53.40489 -106.1864,54.67319 -37.1946,1.0426 -78.6657,-3.8755 -78.6657,-3.8755 l 19.4861,-71.24339 c 0,0 41.4711,4.91819 78.666,3.8756 45.2444,-1.26831 94.3871,-11.5349 106.186,-54.6733 z",
    "m 67.8627,71.243305 c 133.12,8.3011 287.8165,76.965605 282.356,133.477505 l 18.3667,-67.1511 C 374.1564,79.912405 230.6538,11.4579 87.3487,0 Z",
  ];

  interface $$Props {}

  interface $$Slots {}
</script>

<div class="deck">
  <header>
    <button on:click={() => colorThemeStore.toggle()}>
      <svg
        class:color-mode={$colorThemeStore === "dark-theme"}
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        /></svg
      >
    </button>
  </header>
  <IntersectionObserver let:intersecting>
    <section id="intro">
      <!-- <Typewriter chars="Obesity and COVID-19" /> -->

      <DrawnPfizer
        visible={intersecting}
        {paths}
        viewbox={[1000, 410]}
        strokeColor="#0000c9"
      />
      <div class:chevron-down={true}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          /></svg
        >
      </div>
    </section>
  </IntersectionObserver>
  <ArticleLayout>
    <section data-fullbleed="true">
      <img src={ritonavirPng} alt="ritonavir" />
    </section>
    <section>
      <FadeInBlock>
        <p>
          Pfizer is among the world’s largest pharmaceutical companies and one
          of the most recognizable brands across all industries. After more than
          170 years, the company has arrived at a new era. Narrowing its focus,
          Pfizer had undertaken an ambitious transformation at the most
          significant moment in the company’s history — at the height of the
          COVID-19 pandemic. As a result, they have reclaimed their role as
          trailblazing scientific researchers, makers, and doers with a bold and
          confident outlook: the new Pfizer is not only treating difficult
          diseases — they’re curing them. To mark this evolution, Pfizer
          enlisted Team to create a new identity that celebrated its storied
          history, while signaling a new chapter for the company from scientific
          fast follower to innovative science leader.
        </p>
      </FadeInBlock>
    </section>
    <section>
      <IntersectionObserver let:intersecting>
        <DefiningObesity visible={intersecting} />
        <USObesity visible={intersecting} />
      </IntersectionObserver>
    </section>
  </ArticleLayout>
  <section id="exit">
    <ScrollCorridor
      let:progressionRatio
      handleReachedEndOfCorridor={() => {
        router.goto("/2");
      }}
    >
      <div class="ring-container">
        <svg viewBox="0 0 520 520" fill="none" class="ring"
          ><circle
            class="text-black"
            stroke="currentColor"
            stroke-width="18"
            opacity="0.1"
            cx="260"
            cy="260"
            r="251"
          /><circle
            class="text-red"
            stroke="currentColor"
            stroke-width="18"
            cx="260"
            cy="260"
            r="251"
            stroke-dasharray="1577.0795121020763"
            stroke-dashoffset={(1 - progressionRatio) * 2 * Math.PI * 251}
          /></svg
        >
      </div>
    </ScrollCorridor>
  </section>
</div>

<!-- <section id="content" use:inview={options} on:change={handleChange} /> -->
<style lang="scss">
  header {
    position: fixed;
    height: 0px;
    top: 2rem;
    right: 2rem;
    z-index: 40;
  }

  button {
    transition: transform 2s;
    & > svg.color-mode {
      transform: rotate(180deg);
    }
  }

  .chevron-down {
    position: absolute;
    left: 50vw;
    transform: translateY(-50%);
    bottom: 2rem;
  }
  .deck {
    width: 100%;
    height: 100%;
    background-color: var(--bg-theme-color-1);
    color: var(--text-theme-color-1);
  }

  section {
    background-color: var(--bg-theme-color-1);
    color: var(--text-theme-color-1);
  }

  .overlay {
    position: sticky;
    top: 0px;
    height: 20px;
    z-index: 20;

    .right-strip {
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }

  section[id="intro"] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    padding: 2rem;
    height: 100vh;
    background-color: var(--bg-theme-color-1);
    color: var(--text-theme-color-1);
  }

  section[id="exit"] {
    height: 500vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ring-container {
    position: sticky;
    top: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ring {
    transform: rotate(-90deg);
    width: 200px;
    aspect-ratio: 1;
  }
</style>

<script lang="ts">
  import { Tab, TabGroup, TabList, TabPanels } from "$lib";
  import Ref from "$lib/components/ref/Ref.svelte";
  import RefProvider from "$lib/components/ref/RefProvider.svelte";
  import TabPanel from "$lib/components/tabs/TabPanel.svelte";
  import Article from "$lib/layouts/Article.layout.svelte";
  import { getContent, RenderContent } from "@builder.io/sdk-svelte";
  import type { RegisteredComponent } from "@builder.io/sdk-svelte/package/context/types";
  import type { BuilderContent } from "@builder.io/sdk-svelte/package/types/builder-content";
  import "@builder.io/widgets";

  // Add your Public API Key
  const BUILDER_PUBLIC_API_KEY = "18737c02af314eca85af954a0eb3761b";

  function classNames(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }

  const CUSTOM_COMPONENTS: Array<RegisteredComponent> = [
    // {
    //   builtIn: true,
    //   component: Counter,
    //   name: "Counter",
    //   inputs: [
    //     {
    //       name: "name",
    //       type: "string",
    //       defaultValue: "hello",
    //     },
    //     {
    //       name: "count",
    //       type: "number",
    //       defaultValue: 0,
    //     },
    //   ],
    // },
  ];

  const fetchContent: (
    model: string,
    key: string
  ) => Promise<BuilderContent> = (model, key) =>
    getContent({
      model: model,
      apiKey: BUILDER_PUBLIC_API_KEY,
      userAttributes: {
        urlPath: `/${key}`,
      },
    });

  let tabs = [
    { name: "My Account", content: "Content" },
    { name: "Company", content: "Tab content for company", disabled: true },
    { name: "Team Members", content: "Tab content for team members" },
  ];

  let manual = false;
</script>

<Article>
  <RefProvider>
    <TabGroup as="div" {manual}>
      <TabList>
        <Tab disabled={false} let:selected>Bulder Content</Tab>
        <Tab disabled={false} let:selected>Bulder Content2</Tab>
        <Tab disabled={false} let:selected>Bulder Content2</Tab>
        <Tab disabled={false} let:selected>Bulder Content2</Tab>
      </TabList>

      <TabPanels let:selectedIndex>
        <TabPanel>
          <p>Content1 here with <Ref uuid={1123} /></p>
          <p>Content1 here with <Ref uuid={1123} /></p>
          <p>Content1 here with <Ref uuid={1123} /></p>
          <p>Content1 here with <Ref uuid={1123} /></p>
        </TabPanel>
        <TabPanel>
          <p>Content2 here with <Ref uuid={11213} /></p>
        </TabPanel>
        <TabPanel>
          <p>Content3 here with <Ref uuid={123} /></p>
        </TabPanel>
        <TabPanel>
          {#await fetchContent("page", "living-with-AD")}
            <p>...waiting</p>
          {:then content}
            <RenderContent
              model="page"
              {content}
              apiKey={BUILDER_PUBLIC_API_KEY}
              customComponents={CUSTOM_COMPONENTS}
              canTrack={true}
            />
          {:catch error}
            <p style="color: red">{error.message}</p>
          {/await}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </RefProvider>
</Article>

<style lang="scss">
  .flex {
    display: flex;
  }
</style>

import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [defaultLayoutPlugin],
    extendDefaultPlugins: true
  },
});

function defaultLayoutPlugin () {
  return function (tree, file) {
    file.data.astro.frontmatter.layout = '@layouts/PostLayout.astro'
  }
}
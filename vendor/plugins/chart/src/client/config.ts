// Modified for Promoes: VuePress rc.31 compatibility and security. See vendor/README.md.
import { defineClientConfig } from "vuepress/client";
import Chart from "./Chart";

export default defineClientConfig({
  enhance({ app }) {
    app.component("Chart", Chart);
  }
});

// Modified for Promoes: VuePress rc.31 compatibility and security. See vendor/README.md.
import type { Plugin } from "vuepress/core";
import { path } from "vuepress/utils";
import type * as MarkdownIt from "markdown-it";
import MarkdownItChart from "./markdown-it-chart";
import type { ChartOptions } from "./options";

export const chartPlugin = (options: ChartOptions = {}): Plugin => ({
  name: "vuepress-plugin-chart",

  clientConfigFile: path.resolve(import.meta.dirname, "../client/config.ts"),

  extendsMarkdown: (md: MarkdownIt): void => {
    md.use(MarkdownItChart(options.token));
  }
});

export default chartPlugin;
export * from "./options";

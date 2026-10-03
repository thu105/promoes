// Modified for Promoes: VuePress rc.31 compatibility and security. See vendor/README.md.
import type { Page, Plugin } from "vuepress/core";
import type { LocaleConfig } from "vuepress/shared";
import { path } from "vuepress/utils";

import { prepareSearchIndex } from "./prepareSearchIndex";

export interface SearchPluginOptions {
  locales?: LocaleConfig<{
    placeholder: string;
  }>;
  hotKeys?: string[];
  maxSuggestions?: number;
  isSearchable?: (page: Page) => boolean;
  getExtraFields?: (page: Page) => string[];
}

export const searchPlugin = ({
  locales = {},
  hotKeys = ["s", "/"],
  maxSuggestions = 10,
  isSearchable = () => true,
  getExtraFields = () => []
}: SearchPluginOptions = {}): Plugin => ({
  name: "@renovamen/vuepress-plugin-search",

  clientConfigFile: path.resolve(import.meta.dirname, "../client/config.ts"),

  define: {
    __SEARCH_LOCALES__: locales,
    __SEARCH_HOT_KEYS__: hotKeys,
    __SEARCH_MAX_SUGGESTIONS__: maxSuggestions
  },

  onPrepared: async (app) => {
    await prepareSearchIndex({ app, isSearchable, getExtraFields });
  },

  onPageUpdated: async (app) => {
    await prepareSearchIndex({ app, isSearchable, getExtraFields });
  }
});

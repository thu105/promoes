// Modified for Promoes: supported VuePress rc.31 hooks and explicit client layouts.
import type { Theme } from 'vuepress/core';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { GungnirThemeLocaleOptions } from '../shared';
import { getPlugins } from './plugins';
import { readingTime } from '../../../plugins/reading-time/src/node/reading-time';
import { assignDefaultLocaleOptions, createPages } from './utils';

export interface GungnirThemeOptions extends GungnirThemeLocaleOptions {
  themePlugins?: Record<string, any>;
}
export const gungnirTheme = ({ themePlugins = {}, ...localeOptions }: GungnirThemeOptions = {}): Theme => () => {
  assignDefaultLocaleOptions(localeOptions);
  localeOptions.search = themePlugins.search !== false;
  const client = resolve(import.meta.dirname, '../client');
  return {
    name: 'promoes-gungnir',
    templateBuild: resolve(import.meta.dirname, '../../templates/index.build.html'),
    alias: Object.fromEntries(readdirSync(resolve(client, 'components')).filter(file => file.endsWith('.vue')).map(file => [`@theme/${file}`, resolve(client, 'components', file)])),
    clientConfigFile: resolve(client, 'config.ts'),
    extendsPage(page) {
      page.data.filePathRelative = page.filePathRelative;
      page.data.headers = page.headers;
      page.routeMeta.title = page.title;
      if (page.content && themePlugins.readingTime !== false) {
        page.data.readingTime = readingTime(page.content, themePlugins.readingTime);
      }
    },
    plugins: getPlugins(themePlugins, localeOptions),
    onInitialized: async app => { await createPages(app, localeOptions); }
  };
};

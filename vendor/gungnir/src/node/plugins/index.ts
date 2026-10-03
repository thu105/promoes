// Modified for Promoes: RC ecosystem plugins and locally maintained Gungnir features.
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { nprogressPlugin } from '@vuepress/plugin-nprogress';
import { palettePlugin } from '@vuepress/plugin-palette';
import { prismjsPlugin } from '@vuepress/plugin-prismjs';
import { themeDataPlugin } from '@vuepress/plugin-theme-data';
import { pwaPlugin } from '@vuepress/plugin-pwa';
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math';
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart';
import { searchPlugin } from '../../../../plugins/search/src/node/searchPlugin';
import { mdPlusPlugin } from '../../../../plugins/md-plus/src/node';
import { codeEnhancePlugin } from '../../../../plugins/code-enhance/src/node';
import chartPlugin from '../../../../plugins/chart/src/node';
import { getActiveHeaderLinksPlugin } from './activeHeaderLinks';
import { getBlogPlugin } from './blog';
import { getContainerPlugin } from './container';
import { getGitPlugin } from './git';
import { getMediumZoomPlugin } from './mediumZoom';

export const getPlugins = (plugins: Record<string, any>, localeOptions: any) => [
  getActiveHeaderLinksPlugin(plugins.activeHeaderLinks),
  getGitPlugin(localeOptions, plugins.git),
  getMediumZoomPlugin(plugins.mediumZoom),
  plugins.nprogress !== false ? nprogressPlugin() : false,
  palettePlugin({ preset: 'sass' }),
  plugins.prismjs !== false ? prismjsPlugin({ lineNumbers: true }) : false,
  themeDataPlugin({ themeData: localeOptions }),
  plugins.search !== false ? searchPlugin(plugins.search === true ? {} : plugins.search) : false,
  plugins.katex ? markdownMathPlugin({ type: 'katex', trust: false, throwOnError: false }) : false,
  plugins.mermaid ? markdownChartPlugin({ mermaid: true }) : false,
  plugins.chartjs ? chartPlugin(plugins.chartjs === true ? {} : plugins.chartjs) : false,
  plugins.codeEnhance !== false ? codeEnhancePlugin(plugins.codeEnhance) : false,
  typeof plugins.ga === 'string' ? googleAnalyticsPlugin({ id: plugins.ga }) : false,
  plugins.mdPlus ? mdPlusPlugin(plugins.mdPlus) : false,
  plugins.pwa ? pwaPlugin({ update: 'hint', ...typeof plugins.pwa === 'object' ? plugins.pwa : {} }) : false,
  getBlogPlugin(localeOptions, plugins.blog),
  ...getContainerPlugin(localeOptions, plugins.container)
].filter(plugin => plugin && !Array.isArray(plugin));

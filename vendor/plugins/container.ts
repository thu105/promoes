// Promoes adapter for Gungnir containers using the supported Markdown hook.
import markdownContainer from 'markdown-it-container';
import type { Plugin } from 'vuepress/core';
export const containerPlugin = ({ type, before, after, locales = {} }: any): Plugin => ({
  name: `promoes-container-${type}`,
  extendsMarkdown(md) {
    md.use(markdownContainer, type, {
      render(tokens: any[], index: number, _options: any, env: any) {
        if (tokens[index].nesting === -1) return after();
        const info = tokens[index].info.trim().slice(type.length).trim();
        return before(info || locales[env.base ?? '/']?.defaultInfo || '');
      }
    });
  }
});

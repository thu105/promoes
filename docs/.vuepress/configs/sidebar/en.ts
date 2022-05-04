import { assignDefaultLocaleOptions, SidebarConfig } from "vuepress-theme-gungnir";

export const en: SidebarConfig = {
  '/about/': [
    {
      text: 'About',
      children: [
        '/about/promoes.md',
        '/about/team.md'
      ]
    }
  ]
};

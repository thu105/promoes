// Modified for Promoes: VuePress rc.31 compatibility and security. See vendor/README.md.
import { createPage } from "vuepress/core";
import type { App } from "vuepress/core";
import type { GungnirThemeData } from "../../shared";

export const createPages = async (
  app: App,
  localeOptions: GungnirThemeData
) => {
  /**
   * Create page for pagination manully to avoid the issues caused by
   * dynamic routes, see https://github.com/Renovamen/vuepress-theme-gungnir/issues/28.
   */
  const blogNum = app.pages.filter(
    (page) => page.frontmatter.layout === "Post"
  ).length;
  const maxPageIndex = Math.max(
    1,
    Math.ceil(blogNum / (localeOptions.blogNumPerPage as number))
  );

  // Preserve the existing empty tag URLs produced from the hidden post template.
  const hiddenTags = new Set(app.pages.filter(page => page.frontmatter.layout === 'Post' && page.frontmatter.hide).flatMap(page => page.frontmatter.tags as string[] ?? []));
  for (const tag of hiddenTags) {
    const tagPath = `/tags/${tag}/`;
    if (!app.pages.some(page => page.path === tagPath)) {
      app.pages.push(await createPage(app, { path: tagPath, frontmatter: { title: `${tag} | Posts`, layout: 'Tags', tagName: tag } }));
    }
  }

  for (let i = 1; i <= maxPageIndex; i++) {
    const pagination = await createPage(app, {
      path: `/page/${i}/`,
      frontmatter: {
        title: "Home",
        layout: "HomePage"
      }
    });
    app.pages.push(pagination);
  }
};

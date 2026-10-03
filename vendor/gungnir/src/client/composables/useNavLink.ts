// Modified for Promoes: resolve titles and legacy Markdown links with public RC APIs.
import { resolveRoute } from "vuepress/client";
import { inferRoutePath } from "vuepress/shared";
import type { NavLink } from "../../shared";

/** Resolve configured navigation paths through VuePress's route metadata. */
export const useNavLink = (item: string): NavLink => {
  const path = encodeURI(item.endsWith(".md") ? inferRoutePath(item) : item);
  const resolved = resolveRoute(path);
  return {
    text: resolved.meta.title || item,
    link: resolved.notFound ? item : resolved.path
  };
};

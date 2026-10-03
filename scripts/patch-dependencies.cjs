// VuePress beta.38 uses a private Markdown-it 12 import. Markdown-it 14 is
// required for the parser's security fixes and ships this table as an ES module.
const { readFileSync, writeFileSync } = require('node:fs');
const target = require.resolve('@vuepress/markdown/lib/plugins/customComponentPlugin/htmlBlockRule.js');
const original = 'require("markdown-it/lib/common/html_blocks")';
const replacement = 'require("markdown-it/lib/common/html_blocks.mjs").default';
const source = readFileSync(target, 'utf8');
if (source.includes(original)) {
  writeFileSync(target, source.replace(original, replacement));
} else if (!source.includes(replacement)) {
  throw new Error('VuePress Markdown internals changed; review the compatibility patch.');
}

// GHSA-vfj7-8cjw-p6xm has no upstream release. Bound parser and walker depth
// so malicious patterns (or supplied ASTs) cannot exhaust the Node.js stack.
function patchBraces(file, replacements) {
  const path = require.resolve(`braces/lib/${file}.js`);
  let code = readFileSync(path, 'utf8');
  for (const [before, after] of replacements) {
    if (code.includes(after)) continue;
    if (!code.includes(before)) {
      throw new Error(`Braces ${file} changed; review the security patch.`);
    }
    code = code.replaceAll(before, after);
  }
  writeFileSync(path, code);
}
const depthGuard = "\n    if (depth > 128) throw new RangeError('Brace nesting exceeds security limit (128)');";
patchBraces('parse', [[
  '      stack.push(block);',
  "      if (stack.length >= 128) throw new RangeError('Brace nesting exceeds security limit (128)');\n      stack.push(block);"
]]);
for (const file of ['compile', 'expand']) {
  patchBraces(file, [
    ['const walk = (node, parent = {}) => {', `const walk = (node, parent = {}, depth = 0) => {${depthGuard}`],
    ['walk(child, node)', 'walk(child, node, depth + 1)']
  ]);
}
patchBraces('stringify', [
  ['const stringify = (node, parent = {}) => {', `const stringify = (node, parent = {}, depth = 0) => {${depthGuard}`],
  ['stringify(child)', 'stringify(child, {}, depth + 1)']
]);

// Gungnir's computed navigation callbacks call injection-based composables
// after setup. Vue 3.5 evaluates those callbacks outside the component context.
// Keep sidebar resolution in the application's injection context and capture
// component routers during setup instead of during computed evaluation.
function patchTheme(file, replacements) {
  const path = require.resolve(`vuepress-theme-gungnir/lib/client/${file}`);
  let code = readFileSync(path, 'utf8');
  for (const [before, after] of replacements) {
    if (code.includes(after)) continue;
    if (!code.includes(before)) throw new Error(`Gungnir ${file} changed; review the compatibility patch.`);
    code = code.replace(before, after);
  }
  writeFileSync(path, code);
}
patchTheme('composables/useSidebarItems.js', [
  ['import { computed, inject, provide } from "vue";', 'import { computed, inject, provide, getCurrentInstance } from "vue";'],
  ['const sidebarItems = computed(() => resolveSidebarItems(frontmatter.value, themeLocale.value));',
   'const app = getCurrentInstance().appContext.app;\n    const sidebarItems = computed(() => app.runWithContext(() => resolveSidebarItems(frontmatter.value, themeLocale.value)));']
]);
patchTheme('components/NavbarItems.vue', [
  ['import { computed } from "vue";', 'import { computed, getCurrentInstance } from "vue";'],
  ['defineEmits(["toggle-search"]);', 'defineEmits(["toggle-search"]);\nconst app = getCurrentInstance()!.appContext.app;'],
  ['return computed(() =>\n    (themeLocale.value.navbar || []).map(resolveNavbarItem)\n  );',
   'return computed(() => app.runWithContext(() =>\n    (themeLocale.value.navbar || []).map(resolveNavbarItem)\n  ));'],
  ['const isDocPage = computed(() => {\n  // Show language switcher only on docs page\n  const router = useRouter();',
   'const router = useRouter();\nconst isDocPage = computed(() => {\n  // Show language switcher only on docs page']
]);
patchTheme('components/PageNav.vue', [
  ['import { computed } from "vue";', 'import { computed, getCurrentInstance } from "vue";'],
  ['import { useNavLink, useSidebarItems } from "../composables";',
   'import { useNavLink, useSidebarItems } from "../composables";\nconst app = getCurrentInstance()!.appContext.app;'],
  ['return useNavLink(conf);', 'return app.runWithContext(() => useNavLink(conf));']
]);

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const MarkdownIt = require('markdown-it');
const katex = require('katex');

test('the retired vulnerable braces and beta VuePress runtime stay out of the dependency graph', () => {
  const lock = readFileSync('yarn.lock', 'utf8');
  assert(!/^braces@/m.test(lock), 'The removed braces advisory must not be reintroduced');
  for (const name of ['vuepress', '@vuepress/core', '@vuepress/client', '@vuepress/bundler-vite']) {
    assert.equal(require(`${name}/package.json`).version, '2.0.0-rc.31');
  }
  assert(!/^"?@vuepress\/[^\n]*beta\./m.test(lock), 'Legacy VuePress beta packages remain');
});

test('Markdown rejects executable link schemes', () => {
  const md = new MarkdownIt();
  for (const url of ['javascript:alert(1)', 'vbscript:msgbox(1)', 'data:text/html;base64,PHNjcmlwdD4=']) {
    assert(!md.render(`[click](${url})`).includes('<a '));
  }
  assert(md.render('[safe](https://example.com)').includes('href="https://example.com"'));
});

test('KaTeX blocks untrusted HTML commands and executable URLs', () => {
  for (const input of [String.raw`\href{javascript:alert(1)}{click}`, String.raw`\htmlData{onmouseover=alert(1)}{x}`]) {
    const html = katex.renderToString(input, { throwOnError: false, trust: false });
    assert(!html.includes('href="javascript:'));
    assert(!html.includes('onmouseover="'));
  }
});

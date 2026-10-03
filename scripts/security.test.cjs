const assert = require('node:assert/strict');
const { test } = require('node:test');
const braces = require('braces');
const MarkdownIt = require('markdown-it');
const katex = require('katex');

test('deep brace patterns fail with a bounded error before recursive traversal', () => {
  const malicious = '{'.repeat(4000) + 'a,b' + '}'.repeat(4000);
  for (const method of ['parse', 'compile', 'expand', 'stringify']) {
    assert.throws(() => braces[method](malicious), /Brace nesting exceeds security limit/);
  }
  const parentheses = '('.repeat(4000) + 'x' + ')'.repeat(4000);
  assert.throws(() => braces.compile(parentheses), /Brace nesting exceeds security limit/);
});

test('recursive brace walkers reject a deeply nested supplied AST', () => {
  let ast = { type: 'text', value: 'x', nodes: [] };
  for (let i = 0; i < 5000; i++) ast = { type: 'root', nodes: [ast] };
  for (const method of ['compile', 'expand', 'stringify']) {
    assert.throws(() => braces[method](ast), /Brace nesting exceeds security limit/);
  }
});

test('ordinary and escaped brace patterns still work', () => {
  assert.deepEqual(braces.expand('assets/*.{js,css}'), ['assets/*.js', 'assets/*.css']);
  assert.deepEqual(braces.expand('{1..3}'), ['1', '2', '3']);
  assert.equal(braces.stringify('a/{b,{c,d}}/e'), 'a/{b,{c,d}}/e');
  assert.equal(braces.compile('a/{b,c}/d'), 'a/(b|c)/d');
  assert.equal(braces.stringify(String.raw`a/\{b,c\}/d`), 'a/{b,c}/d');
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

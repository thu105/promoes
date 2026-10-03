import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const firebaseHeaders = JSON.parse(readFileSync('firebase.json')).hosting.headers[0].headers;
const vercelHeaders = JSON.parse(readFileSync('vercel.json')).headers[0].headers;
assert.deepEqual(firebaseHeaders, vercelHeaders, 'Hosting security policies must match');
const policy = firebaseHeaders.find(({ key }) => key === 'Content-Security-Policy').value;
const scriptPolicy = policy.split(';').find((part) => part.trim().startsWith('script-src '));
assert(!scriptPolicy.includes("'unsafe-inline'"), 'Inline scripts must use hashes');
assert(!scriptPolicy.includes("'unsafe-eval'"), 'Dynamic code evaluation must remain blocked');

let pages = 0;
function checkDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      checkDirectory(path);
    } else if (entry.name.endsWith('.html')) {
      const html = readFileSync(path, 'utf8');
      pages++;
      for (const [, attributes, script] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (/\bsrc\s*=/.test(attributes)) continue;
        const hash = createHash('sha256').update(script).digest('base64');
        assert(scriptPolicy.includes(`'sha256-${hash}'`), `CSP blocks an inline script in ${path}`);
      }
      assert(!/\s(?:on\w+|href)\s*=\s*["']javascript:/i.test(html), `Executable URL in ${path}`);
    } else {
      assert(!entry.name.endsWith('.map'), `Source map leaked into hosting output: ${path}`);
    }
  }
}
checkDirectory('dist');
assert(pages > 0, 'No HTML pages were built');
assert(readFileSync('dist/index.html', 'utf8').includes('Promoes'), 'Homepage content is missing');
assert(readFileSync('dist/service-worker.js', 'utf8').includes('precacheAndRoute'), 'PWA precache is missing');
console.log(`Security policy and static output checked: ${pages} HTML pages.`);

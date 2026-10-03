# Security review — October 2, 2026

This repository builds a static VuePress blog. It contains no application server,
login flow, or database. Markdown, Vue components, and configuration are trusted
source code; pull requests must be reviewed before merge. No credential patterns
were found in the current tracked source during this review. This does not cover
Git history or credentials stored outside the repository.

## Patches

- Refreshed the Yarn lockfile and enforced patched versions of Vite, its Vue
  plugin, Esbuild, Markdown-it, TOML, KaTeX, Mermaid, DOMPurify, and
  Serialize JavaScript. Other vulnerable transitive dependencies now resolve to
  patched versions within their existing ranges. The Gungnir theme is pinned to
  preserve the site's existing appearance and API.
- Replaced the direct Rimraf dependency with Node's built-in recursive removal.
- Added deterministic compatibility patches for VuePress's legacy Markdown-it
  import, CommonJS SSR output, and theme navigation injection context. The install/build scripts fail if the patched
  dependency internals change, requiring an explicit review. Node 22.12 or later
  is required; CI uses Node 24.
- Added matching Firebase and Vercel response headers: a Content Security Policy,
  MIME sniffing protection, frame denial, referrer policy, restricted browser
  permissions, and HTTPS enforcement. Only the theme's known inline color-scheme
  script is allowed by hash. Script evaluation and arbitrary inline scripts are
  blocked. Google Analytics is the only allowed external script origin. Inline
  styles remain permitted because the theme and Vue components use them.
- Bound the development server to loopback and added `noopener noreferrer` to
  manually authored footer links.
- Pinned every workflow action to a verified commit, disabled checkout credential
  persistence, limited token permissions, and separated build and deployment
  runners. Firebase service credentials are only exposed to the deployment job,
  which downloads only static files and writes a fixed hosting configuration. It
  does not execute build scripts or accept deployment hooks from build artifacts.
  Fork PRs retain the existing exclusion from credentialed Firebase previews.
- Added weekly dependency/action update configuration and ignored local
  environment files and Vercel credentials/metadata.

## Advisory requiring a local mitigation

[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
reports stack exhaustion in `braces` through 3.0.3, with no upstream patched
release as of this review. `scripts/patch-dependencies.cjs` adds a maximum depth
of 128 to its parser and recursive compile, expand, and stringify walkers.
Regression tests exercise deeply nested patterns below the character limit,
supplied ASTs, and ordinary brace patterns.

Yarn audit still reports the installed `braces` version along eight dependency
paths, even with this local mitigation applied. These are build/development
packages; the static preview does not expose a Node.js parser endpoint. Remove
the local patch and update to an upstream fixed release when one is available.

## Verification

```sh
yarn install --frozen-lockfile
yarn test:security
yarn docs:build
yarn audit
```

The build automatically verifies security-header parity, the CSP hashes of every
inline script, the absence of published source maps, homepage content, and the
PWA precache. Security tests also check that Markdown-it rejects executable link
schemes and KaTeX rejects untrusted HTML/JavaScript commands. Browser verification
must cover navigation, theme switching, and search under the enforced CSP.

The chart plugin supports JavaScript callbacks via evaluation; the CSP blocks
those callbacks. Current posts contain no chart blocks. Keep chart data as JSON
if adding charts, or replace that legacy plugin before using callbacks.

Firebase remains the production hosting configuration. `vercel.json` supports
preview builds of the same static output and policy. Use a preview deployment
without the `--prod` flag; production promotion is a separate action.

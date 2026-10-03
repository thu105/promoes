# Security review — October 2, 2026

This repository builds a static VuePress blog. It contains no application server,
login flow, or database. Markdown, Vue components, and configuration are trusted
source code; review pull requests before merge. The original source review did
not find credential patterns in tracked files. It did not cover Git history or
credentials stored outside the repository.

## Dependencies and local compatibility

VuePress core, client and Vite bundler are pinned to 2.0.0-rc.31, with Vue 3.5.43,
Node >=22.18.0 and Yarn 1.22.22. CI uses Node 24. Gungnir alpha.26 is maintained
in `vendor/` against the supported RC APIs, without installing its obsolete beta
runtime. See [vendor/README.md](vendor/README.md) for source provenance, licenses
and maintenance ownership.

The previous beta dependency graph reported eight paths to the unresolved
[braces stack-exhaustion advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm),
mitigated locally with bounded parser/walker depth. The RC graph removes `braces`
entirely, replacing that mitigation with dependency removal. A regression test
checks that the vulnerable package and beta VuePress runtime are not reintroduced.
The retired Markdown-it private-import and CommonJS SSR patches are unnecessary
under the supported ESM renderer. Navigation injection fixes now live in the
maintained theme source rather than modifying installed dependencies.

All previous dependency overrides were reviewed and removed in favor of the
current packages' supported versions. One override remains: `lodash-es@4.18.1`
replaces Mermaid/Chevrotain's pinned vulnerable version and fixes
[template import code injection](https://github.com/advisories/GHSA-r5fr-rjxr-66jc)
and [array-path prototype pollution](https://github.com/advisories/GHSA-f23m-r3pf-42rh).
The RC lockfile audit reports zero vulnerabilities, compared with eight high
findings on the previously mitigated baseline. Re-audit on dependency updates;
this result is specific to the reviewed lockfile and advisory database.

Charts accept plain JSON. The legacy function deserializer has been removed,
so charts render without dynamic code evaluation. KaTeX is configured with
`trust: false`; Markdown link validation and untrusted KaTeX regression tests
remain enabled. Cleanup uses Node's built-in recursive removal.

## Hosting and CI controls

Firebase and Vercel use matching response headers: a Content Security Policy,
MIME sniffing protection, frame denial, referrer policy, restricted browser
permissions and HTTPS enforcement. Only the theme's existing inline color-mode
script is allowed by hash. Arbitrary inline scripts and dynamic evaluation are
blocked. Google Analytics is the only allowed external script origin. Inline
styles remain permitted for the theme and Vue components.

The development server binds to loopback. Footer and profile links preserve
`noopener noreferrer` when opening a new tab.

Workflow actions are pinned to reviewed commits. Checkout credential persistence
is disabled and token permissions are limited. Builds and deployments run on
separate runners. Firebase credentials are exposed only to the deployment job,
which downloads static output and writes fixed hosting configuration; it does
not execute build scripts or accept artifact-provided deployment hooks. Fork PRs
retain the exclusion from credentialed Firebase previews. Weekly dependency and
Action updates are enabled; local environment files and Vercel credentials are
ignored.

## Verification

```sh
yarn install --frozen-lockfile
yarn test:security
yarn docs:build
yarn audit
```

The build checks hosting-policy parity, hashes for every inline script, rendered
page content, absence of published source maps and PWA precaching. Browser checks
must cover all existing post URLs, direct and client navigation, About/profile
links, search, mobile/desktop layouts and both theme modes under the enforced CSP.
Build with `DOCS_VERIFY_FEATURES=1` to test representative math, Mermaid, JSON
charts and Markdown/code features; rebuild without it before deployment.

Firebase hosts production. Vercel preview configuration serves the same static
output and security policy. Local static previews must also serve these headers
so browser verification exercises the real CSP.

# PROMOES

[![Blog](https://img.shields.io/badge/Blog-Promoes-4C3F77)](https://promoes.com/)
[![Build](https://img.shields.io/badge/Build-VuePress-3AA675)](https://v2.vuepress.vuejs.org/)
[![Theme](https://img.shields.io/badge/Theme-Gungnir-74B3EB)](https://v2-vuepress-theme-gungnir.vercel.app/)

This is my personal blog using [VuePress](https://v2.vuepress.vuejs.org/) with [Gungnir](https://v2-vuepress-theme-gungnir.vercel.app/) theme. Check it out live at https://promoes.com/.
The website is for me to document my projects, courses, and thoughts while aslo serving as a playground for me to learn more about the Vue framework.
## Development and security

Use Node 24 (CI and local verification), or Node >=22.18.0, and Yarn 1.22.22:

```sh
yarn install --frozen-lockfile
yarn docs:dev
yarn test:security
yarn docs:build
```

The framework is pinned to **VuePress 2.0.0-rc.31**, the latest v2 release candidate verified on October 2, 2026; it is not an LTS release. The Vite bundler is pinned to the same release, and Vue 3.5.43 satisfies its ^3.5.40 peer requirement. The npm `latest` tag refers to VuePress v1, so upgrades must select the v2 RC explicitly. See the [official release](https://github.com/vuepress/core/releases/tag/v2.0.0-rc.31) and [registry metadata](https://registry.npmjs.org/vuepress).

Gungnir alpha.26 is maintained locally for the RC API; its published beta.49 dependencies are not installed. See [vendor/README.md](vendor/README.md) for migration details, licenses, ownership, and feature verification.

See [SECURITY.md](SECURITY.md) for dependency controls, hosting policies, and verification commands. Firebase hosts
production; `vercel.json` also supports Vercel preview deployments.

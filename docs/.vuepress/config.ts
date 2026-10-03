import { defineUserConfig } from "vuepress";
import { createPage } from "vuepress/core";
import { anchorPlugin } from "vuepress/markdown";
import { readFileSync } from "node:fs";
import { viteBundler } from "@vuepress/bundler-vite";
import { gungnirTheme } from "../../vendor/gungnir/src/node/gungnirTheme";
import { navbar, sidebar } from "./configs";

const isProd = process.env.NODE_ENV === "production";

export default defineUserConfig({
  base: '/',
  host: '127.0.0.1',
  shouldPrefetch: false,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/img/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/img/icons/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'Promoes' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Promoes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/img/icons/apple-touch-icon.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/img/icons/safari-pinned-tab.png',
        color: '#4C3F77',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#4C3F77' }],
    ['meta', { name: 'theme-color', content: '#4C3F77' }],
  ],

  // Site-level locales config
  locales: {
    "/": {
      lang: "en-US",
      title: 'Promoes',
      description: "Hein's personal documentation website."
    },
  },

  bundler: viteBundler({ viteOptions: { ssr: { noExternal: ['oh-vue-icons', 'chart.js'] }, optimizeDeps: { exclude: ['oh-vue-icons/icons'] } } }),

  theme: gungnirTheme({
    docsDir: 'docs',
    repo: 'thu105/promoes',
    // My personal information
    personalInfo: {
      name: 'Hein Moe Thu',
      avatar: '/img/profile.jpg',
      description: 'ဟိန်းမိုးသူ',
      sns: {
        github: 'thu105',  // Github
        linkedin: 'hein-thu',  // Linkedin
        facebook: 'hein.moe.thu.1996',  // Facebook
        email: 'hein.thu@promoes.com',  // Email
        cv: {  // any name you want
          icon: "ai-cv",  // platform icon
          link: "https://workaholic.promoes.com/u/hthu"  // profile URL
        }
      }
    },

    // Hero images on home page
    homeHeaderImages: [
      {
        "path": "/img/home/hero/1.jpg",
        "mask": "rgba(0, 0, 0, .1)"
      }
    ],

    pages: {
      // posts page
      tags: {
        title: 'Posts',
        subtitle: 'Check out all posts by tags!',
        bgImage: {
          path: '/img/pages/bg-tags.jpg',
          mask: 'rgba(0, 0, 0, .5)'
        }
      },
      // links page
      links: {
        title: 'Links',
        subtitle: 'Here are all related links!',
        bgImage: {
          path: '/img/pages/bg-tags.jpg',
          mask: 'rgba(0, 0, 0, .5)'
        }
      }
    },
    
    navbarTitle: 'Promoes',
    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale is English, we don't need to set all of the locale fields
       */
      "/": {
        // navbar
        navbar: navbar.en,
        // sidebar
        sidebar: sidebar.en
      },
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      katex: true,
      mermaid: true,
      chartjs: true,
      giscus: false,
      mdPlus: {
        all: true
      },
      ga: 'G-YBZY4BLVM6',
      pwa: true,
    },

    footer: `
      Developed by <a href="https://github.com/thu105" target="_blank" rel="noopener noreferrer">Hein Thu</a>
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank" rel="noopener noreferrer">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank" rel="noopener noreferrer">Gungnir</a>
    `
  }),

  plugins: [
    process.env.DOCS_VERIFY_FEATURES === '1' ? {
      name: 'promoes-local-feature-fixture',
      onInitialized: async app => {
        app.pages.push(await createPage(app, {
          path: '/verification/features/',
          frontmatter: { title: 'Feature verification', hide: true },
          content: readFileSync(new URL('../../scripts/fixtures-features.md', import.meta.url), 'utf8')
        }));
      }
    } : false
  ].filter(Boolean),

  markdown: {
    // A separate permalink avoids nesting links in headings such as About > Projects.
    anchor: {
      permalink: anchorPlugin.permalink.linkInsideHeader({
        symbol: '#',
        placement: 'before',
        ariaHidden: true
      })
    },
    headers: {
      level: [2,3,4,5]
    }
  }
});

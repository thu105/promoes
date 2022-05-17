import { defineUserConfig } from "vuepress";
import type { GungnirThemeOptions } from "vuepress-theme-gungnir";
import { navbar, sidebar } from "./configs";

const isProd = process.env.NODE_ENV === "production";

export default defineUserConfig<GungnirThemeOptions>({
  base: '/',
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

  bundler:
    // specify bundler via environment variable
    process.env.DOCS_BUNDLER ??
    // use vite by default
    "@vuepress/vite",

  theme: 'vuepress-theme-gungnir',

  themeConfig: {
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
          link: "/files/about/Hein Thu - Resume [20220503].pdf"  // profile URL
        }
      }
    },

    // Hero images on home page
    homeHeaderImages: [
      {
        "path": "/img/home/hero/1.jpg",
        "mask": "rgba(0, 0, 0, .1)"
      },
      {
        "path": "https://lh3.googleusercontent.com/KWN0778-X4ldnbGih93-2zYMYh8IuwKhpb_MBOAiB3mv4St5HWA0u91P4HFV4m1PhoexwyGZxoIIAM26GaXxiL3R03ygUjX6vpWXzKFhv0aRmfohjGkv8O2tT06ABKbtrkzqhBXCkGc=w2400",
        "mask": "rgba(0, 0, 0, .2)"
      },
      {
        "path": "https://lh3.googleusercontent.com/MHK0074UOumf1x25qO5HX9-hbDr-miQCiFwxGZxcXE9Wzlmi--KjGNMYkg-1SV_AjKJCpKopBjCtgKA4iC1zZbhfeaDfjPLY1CSTfWACiSBqtINrU0ir1M8TpOjZl9eX6H_RY4Lo9ww=w2400",
        "mask": "rgba(0, 0, 0, .2)"
      },
      {
        "path": "https://lh3.googleusercontent.com/PXFRUVpgVEQiIzq3vaFsl9A4pJH3Zciek7Z6Qt7z-mrhtOGC_RbF6cYVsdnsKdz-TmMeJPUJrbt793SXdLPqHH6k0oCSwnutOgy4YydFi5zmh-3bnAse0bc_BrHBRMBfIFd2WFE0URI=w2400",
        "mask": "rgba(0, 0, 0, .4)"
      },
      {
        "path": "https://lh3.googleusercontent.com/cahFeZbM9GBFl-cC610c-iYVXefYxJvgmQRETZvUMl8SLIGHEsH5Ma6EEFkbJqAupVTWTHQNTa5Z0TltAkRn4gasIMYigZ4_f7Hcb9UpC_mTvkevkR2eCoIRDdaH1ih13UFCMkm2yO8=w2400",
        "mask": "rgba(0, 0, 0, .1)"
      },
      {
        "path": "https://lh3.googleusercontent.com/BzSpAumzPaK-rpm1nglWTHabXET4UYf6JWHKYE9DX2Nt3HiWc7MF0vAiUwUt5ofvhjlAD6-vMhobTFLOZljFUtcf8vPWnj4Pi8ObM47Ea8rgS4vKxkJvoehmCNptKLtkxaR1qqtcT9g=w2400",
        "mask": "rgba(0, 0, 0, .4)"
      },
      {
        "path": "https://lh3.googleusercontent.com/2j-257CuYtIFwy1B8OuXH66hfbJKa3lOMpMEQm8IwPXinMldSEqDwx5BuOCuZnvnI75WIv2vJNfQg5FNYZNmr8hPAk8cnyhYqDNcgu7poEYBbV4I0bAWafkco1g8g96zD-pEEvvgsbg=w2400",
        "mask": "rgba(0, 0, 0, .5)"
      },
      {
        "path": "https://lh3.googleusercontent.com/F3wUdvW7fx-6K-H1rxKHP6BkMacHH8Eec7OgeEHmIFCP_tcBeuB9rMzuNUhaL-46GQxPgZOGoYl7vVth4il1gxjoPAUHDtpyYYcYD7pMHvFaFHa0WUBzCPhhAzpb14rRWzmohksEksw=w2400",
        "mask": "rgba(0, 0, 0, .5)"
      },
      {
        "path": "https://lh3.googleusercontent.com/wCBUesvWoMYUxVywp-Z-RDQPeTgQb7RyxFtH9hl2nfIT_yBlplCoXVtfsNyvT-bS1yOZ1eTWpIfFRQNz6zN6oczWaDW38OLnAmtYrM06UThHYaxS4ihG6QWtMCaya5Rv8H88orDoOR4=w2400",
        "mask": "rgba(0, 0, 0, .5)"
      },
      {
        "path": "https://lh3.googleusercontent.com/FHdm4uewf0N5cx3k_swP9Ue6TKgicB-MWJVz96Q0dlqWtPJixzzneqjGQk22YEIQXoN5cj9p5U_wnDmWmXDRa4VAWyNQEBKCVcMxBVj946JXGbkzD1o1KHfpxOWvdYmF-w680m8TMiU=w2400",
        "mask": "rgba(0, 0, 0, .5)"
      },
      {
        "path": "https://lh3.googleusercontent.com/CWt8Y4dW_QSLLzFECk3l83mrSbpGDRM7xKZVFqgLurLYYXBtHG5wS5pZCivRJwCuGQroIcC1gv80X0RJ1NNXbnQ1wb7X1WRJzzs4isNG8LKdL8RV7DZu8ZYRESlPl8xA2YwPfx8G3xM=w2400",
        "mask": "rgba(0, 0, 0, .5)"
      },
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
      Developed by <a href="https://github.com/thu105" target="_blank">Hein Thu</a>
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `
  },

  plugins: [
  ],

  markdown: {
    extractHeaders: {
      level: [2,3,4,5]
    }
  }
});
---
layout: Post
title: Learning VueJS
subtitle: Teaching myself how to create a website using VueJS framework.
date: 2022-04-25
author: Hein Thu
useHeaderImage: true
headerImage: /img/posts/learning-vue-header.jpg
headerImageCredit: Patrick Fore on Unsplash
headerMask: rgba(0, 0, 0, .5)
tags:
 - VueJS
 - VuePress
 - Gungnir
 - VitePress
permalinkPattern: /post/:year/:month/:day/:slug/
---

## Introduction
I have been learning software development for almost six years and often neglected front-end development because I was not able to wrap my head around web design and user experience. My only experience with web development is creating static websites using HTML and CSS, so JavaScript and its frameworks were a huge hurdle for me to overcome. I tried picking up the Angular framework but quickly got after the navigation bar since I had no experience in JavaScript nor TypeScript. In addition, most of my time were wasted on the design aspect as I spent multiple hours creating logos and selecting fonts and colors.

Now, I am attempting again to rebuild my old [personal website](https://www1.chapman.edu/~thu105/). But this time, I got one uninterrupted week dedicated to learning about Vue, already have a [prototype](https://www.figma.com/proto/L0Uxm0n8GldjKoKNe5vwNF/Promoes-Mockup?node-id=100%3A3730&scaling=scale-down-width&page-id=17%3A367&hide-ui=1) created on Figma, and had some [foundational knowledge](https://www.freecodecamp.org/certification/fccdd313ffa-97e8-4d74-ad5e-1f3d3d5b3d40/javascript-algorithms-and-data-structures) on JavaScript.

## Timeline
### 2022-04-25
I read some documentation on Vue 3 and started creating the project right away. I chose to use TypeScript since I wanted to also learn about it. I created a navigation bar and a hero section. However, I got stuck at creating a global CSS variable for my brand colors. When I was researching on ways to implement uniform UI components, I came across Vuetify Material UI Library. After learning about how Vuetify works, I gave it a try.

### 2022-04-26
My project was based on Vue 3, which was just launched recently so many libraries did not support it officially yet. I still wanted to keep using Vue 3, so I went with Vuetify 3, which was still in beta. I also chose Vite tooling since it supposedly had better hot reload compared to Webpack. While creating the AppBar and the HeroSection, I learned how to use assets with Vite. To use images in the template, I had to import it in the logic section first. Here is how I imported my wordmark to use in the AppBar:
```vue
<script lang="ts">
import { defineComponent } from 'vue'

//Stores
import { useMainStore } from '@/stores/main'
import { useNavigationStore } from '@/stores/navigation'

//Images
import wordmark from '@/assets/wordmark.svg'

export default defineComponent({
  name: 'AppBar',

  setup() {
    const mainStore = useMainStore()
    const navigationStore = useNavigationStore()

    return {
      mainStore,
      navigationStore,
      wordmark
    }
  },
})
</script>

<template>
  <v-app-bar>
    <v-btn to="/" min-width="168px">
      <v-img :src="wordmark"  alt="Promoes Wordmark"/>
    </v-btn>
    <v-spacer/>
    <v-tabs>
      <v-tab
        v-for="menu in navigationStore.menuList"
        :key="menu.name"
        :to="menu.link"
      >
        {{ menu.name }}
      </v-tab>
    </v-tabs>
    <v-btn @click="mainStore.toggleTheme" icon="mdi-theme-light-dark"/>
  </v-app-bar>
</template>
```
I was also experimenting with Vuex stores to keep the light/dark mode state and track navigation states.

### 2022-04-27
I worked on the Hero component and couldn't get the `<v-img>` to respond to light/dark mode toggle. I had a light and dark version of the background image and wanted it to automatically update with the toggle but for some reason, the image will fail to load after a toggle. The only way to get the images to load was to reload the entire page. Vuetify 3 was in beta, so its documentation was limited. First, I checked the images' location to make sure Vite was properly loading them. Then, I made sure that Vuex state is getting properly updated. I even moved over to Pinia state management and still had the same issue. Lastly, it pointed that the Vue component was the culprit because it was rerendering after an update to its src. I tried using onUpdated and watch functions to force an update, but the image still would not load. After battling this issue for a couple of hours, I found that putting `eager` force to render immediately.
```vue
<script lang="ts">
import { defineComponent, onUpdated, watch } from 'vue'

//Stores
import { useMainStore } from '@/stores/main'

//Images
import heroLight from '@/assets/backgrounds/hero-light.jpg'
import heroDark from '@/assets/backgrounds/hero-dark.jpg'

export default defineComponent({
  setup() {
    
    const mainStore = useMainStore()

    return {
      mainStore,
      heroDark,
      heroLight
    }
  },
})
</script>

<template>
  <v-parallax
    height="95vh"
    :src="mainStore.theme === 'light' ? heroLight : heroDark"
    eager
  >
    <v-container class="d-flex flex-column fill-width fill-height justify-center align-center">
      <v-card id="titleCard" class= "d-flex flex-column align-center justify-center">
        <h2>မင်္ဂလာပါ</h2>
        <h1>
          Welcome to my playground!
        </h1>
      </v-card>
    </v-container>
  </v-parallax>
</template>
```
### 2022-04-28
After finishing setting up the hero section of my homepage, it dawned on me that I will never finish the websit in a week going at this pace so I began looking for plugins and packages to improve the speed. I found VitePress and thought of using it to generate posts. I use Obsidian for notetaking so creating blog posts in markdown would be more streamlined for me. I recreated the project with VitePress and quickly found that it was less configurable as the VitePress team was going for a minimalistic approach. So I recreated the project again using VuePress v2.0.0-beta42. While it had limited documentation, I was able to configure it to recreate my hero section.

### 2022-04-29
The next feature I wanted was tags in frontmatter that can be used to search articles. As I began researching for a way to customize VuePress's default theme, I came across the Gungnir theme that had all the features I wanted. However, it was not compatible with the current VuePress version due so code breaking changes made in VuePress v.2.0.0-beta40 so I had to rebuild the website again with this this stack. I reconfigured the theme and added branding styles.

### 2022-04-30
The home page looked perfect, and I wanted to add a custom About page that used the same components from home page, so I began delving into how to reuse Vue components and accessing local theme configs. I tried importing the components and composables directly. That worked out on a local instance but started failing once I started building. Again, I thought it was a bug related to Vite so I started troubleshooting the `package.json` file. After creating multiple versions of the file, I found that it was the way I was importing the composables causing the error. I looked back at VuePress documentation and used its plugin to access the data:
```ts
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client"
```

### 2022-05-01
I tried playing around with creating a project page but I was not able to fully recreate a separate tagging system, so I just settled with configuring the tags route. This is something I will revisit later. My college already started so I had less time on my hand.

### 2022-05-04
I integrated the site with Firebase and generated two GitHub Action workflows. I pushed to my pre-existing Promoes repository and tested out the workflows. I had to configure the build commands a couple of times and finally had a working deployment pipeline from GitHub to Firebase for both production and preview channels.

## Conclusion
I got [Promoes](https://promoes.com) created and running in a little over a week. While the code is quite sloppy, I am just happy that I had a functioning website in the end. It was a good learning experience as I learned about Vue, Vite, VuePress, Gungnir, and TypeScript with just one project. It does look like I just copied and pasted codes since most of my time was spent testing and understanding how the stack works. If I were to do a project like this again, I would spend more time researching to know which plugins, frameworks, and packages to use from the beginning.
 
## Related Posts
- [About Promoes](/about/promoes/)
- [Promoes](/post/2022/05/01/promoes/)
<template>
  <Common>
    <template #page>
      <div class="about-profile">
        <div class="about-avatar">
          <img :src="$withBase(pageData.frontmatter.avatar)" />
        </div>
        <div class="about-info">
          <h1 class="name">{{ pageData.frontmatter.name }}</h1>
          <p class="subname">{{ pageData.frontmatter.subname }}</p>
          <div class="sns">
            <div
              v-for="(link, platform) in LINKS"
              :key="`sns-${link}`"
              class="sns-item"
            >
              <a target="_blank" :href="link">
                <v-icon :name="snsIcon(platform)" scale="1.82" />
              </a>
            </div>
            <div v-if="pageData.frontmatter.cv" class="sns-item">
              <a :href="pageData.frontmatter.cv" download>
                <v-icon name="ai-cv" scale="2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Common>
</template>

<script setup>
import { pageData } from "@vuepress/client";
import Common from "vuepress-theme-gungnir/lib/client/components/Common.vue";

const LINKS = {
  github: "https://github.com/thu105",
  linkedin: "https://www.linkedin.com/in/hein-thu",
  facebook: "https://www.facebook.com/hein.moe.thu.1996",
  email: "mailto:hein.thu@promoes.com"
};

const ICONS = {
  github: "ri-github-fill",
  linkedin: "ri-linkedin-box-fill",
  facebook: "ri-facebook-box-fill",
  email: "hi-mail"
};

const snsIcon = (platform) => ICONS[platform];
</script>
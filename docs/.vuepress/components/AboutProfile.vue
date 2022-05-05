<template>
  <Common>
    <template #page>
      <div class="about-profile">
        <div class="about-avatar">
          <img :src="$withBase(personalInfo.avatar)" />
        </div>
        <div class="about-info">
          <h1 class="name">{{ personalInfo.name }}</h1>
          <p class="subname">{{ personalInfo.description }}</p>
          <SNS class="hide-on-mobile sns" large />
        </div>
      </div>
    </template>
  </Common>
</template>

<script setup>
import { pageData } from "@vuepress/client";
import { useThemeLocaleData } from "vuepress-theme-gungnir/lib/client/composables";
import SNS from "vuepress-theme-gungnir/lib/client/components/SNS.vue"
import Common from "vuepress-theme-gungnir/lib/client/components/Common.vue";

const themeLocale = useThemeLocaleData();

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
const personalInfo = themeLocale.value.personalInfo;
</script>
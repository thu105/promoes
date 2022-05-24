<script setup lang="ts">
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client"
import { withBase } from "@vuepress/client";
import SNS from "vuepress-theme-gungnir/lib/client/components/SNS.vue"

const personalInfo = useThemeLocaleData().value.personalInfo;
</script>

<template>
  <div class="about-profile">
    <div class="about-avatar">
      <img :src="$withBase(personalInfo.avatar)"/>
    </div>
    <div class="about-info">
      <h1 class="name">{{ personalInfo.name }}</h1>
      <p class="subname">{{ personalInfo.description }}</p>
      <SNS class="hide-on-mobile sns" large />
    </div>
  </div>
</template>
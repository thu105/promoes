<template>
  <Common>
    <template #page>
      <div class="not-found-wrapper">
        <p class="emoji">{{ emoji }}</p>
        <h1>404 - {{ message }}</h1>
        <RouterLink to="/">{{ homeText }}</RouterLink>
      </div>
    </template>
  </Common>
</template>

<script setup lang="ts">
// Modified for Promoes: keep the initial SSR/client text deterministic.
import { ref, onMounted } from "vue";
import Common from "@theme/Common.vue";
import { useThemeLocaleData } from "../composables";

const themeLocale = useThemeLocaleData();

const messages = themeLocale.value.notFound ?? ["Not Found"];
const message = ref(messages[0]);
const homeText = themeLocale.value.backToHome ?? "$ cd /home/";

const emojiArray = [
  "\\(o_o)/",
  "(o^^)o",
  "(˚Δ˚)b",
  "(^-^*)",
  "(^_^)b",
  "(╯‵□′)╯",
  "(='X'=)",
  "(>_<)",
  "\\(°ˊДˋ°)/",
  "ㄟ(▔▽▔)ㄏ"
];

const emoji = ref(emojiArray[0]);
onMounted(() => {
  message.value = messages[Math.floor(Math.random() * messages.length)];
  emoji.value = emojiArray[Math.floor(Math.random() * emojiArray.length)];
});
</script>

<style lang="scss">
@import "../styles/_variables";

.not-found-wrapper {
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -180px;
  padding: 0 1rem;

  a,
  h1 {
    font-size: 30px;
    font-weight: bold;
  }

  .emoji {
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  a {
    color: var(--c-text);
    &:hover {
      color: var(--c-text-accent);
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .not-found-wrapper {
    a,
    h1 {
      font-size: 25px;
    }

    .emoji {
      font-size: 45px;
    }
  }
}
</style>

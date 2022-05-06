import { defineClientAppEnhance } from "@vuepress/client";
import { addIcons } from "oh-vue-icons";
import {
  FaTag,
  RiLinkM,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiFacebookBoxFill,
  RiTwitterFill,
  HiMail,
  AiCv} from "oh-vue-icons/icons";
import AboutProfile from "./components/AboutProfile.vue"

addIcons(
  FaTag,
  RiLinkM,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiFacebookBoxFill,
  RiTwitterFill,
  HiMail,
  AiCv
);

export default defineClientAppEnhance(({ app }) => {
  app.component("AboutProfile", AboutProfile)
});

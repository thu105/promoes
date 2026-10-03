import "./styles/index.scss";
import { defineClientConfig } from "@vuepress/client";
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

export default defineClientConfig({ enhance({ app }) {
  app.component("AboutProfile", AboutProfile)
} });

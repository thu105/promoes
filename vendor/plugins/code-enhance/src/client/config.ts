// Modified for Promoes: VuePress rc.31 compatibility and security. See vendor/README.md.
import { defineClientConfig } from "vuepress/client";
import { codeEnhance } from "./composables";

import "./styles/main.css";

export default defineClientConfig({
  setup: () => {
    codeEnhance();
  }
});

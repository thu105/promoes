// Modified for Promoes: VuePress rc.31 compatibility and security. See vendor/README.md.
import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData
} from "@vuepress/plugin-theme-data/client";
import type {
  ThemeDataRef,
  ThemeLocaleDataRef
} from "@vuepress/plugin-theme-data/client";
import type { GungnirThemeData } from "../../shared";

export const useThemeData = (): ThemeDataRef<GungnirThemeData> =>
  _useThemeData<GungnirThemeData>();
export const useThemeLocaleData = (): ThemeLocaleDataRef<GungnirThemeData> =>
  _useThemeLocaleData<GungnirThemeData>();

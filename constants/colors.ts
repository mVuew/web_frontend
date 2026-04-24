export const themeColors = {
  light: {
    background: "#F7F7F5",
    foreground: "#121212",
    mutedForeground: "#5C5C5C",
    border: "#D6D6D1",
    surface: "#FFFFFF",

    accent: "#3A3A3A",
    accentStrong: "#101010",
    accentSoft: "#ECECEC",
    accentMuted: "#9A9A9A",

    tabMuted: "#525252",

    globalGradient: "none",
  },

  dark: {
    background: "#0B0B0C",      // near-black
    foreground: "#F2F2F2",
    mutedForeground: "#A1A1A1",
    border: "#2B2B2E",
    surface: "#161618",         // graphite

    accent: "#3F3F46",          // gray-700 style
    accentStrong: "#D4D4D4",
    accentSoft: "#232326",
    accentMuted: "#1B1B1D",

    tabMuted: "#C4C4C4",

    globalGradient:
      "radial-gradient(circle at 14% 18%, #2a2a2d, transparent 34%), radial-gradient(circle at 84% 10%, #1c1c1f, transparent 30%), linear-gradient(145deg,#050506 0%,#0b0b0c 52%,#141416 100%)",
  },
} as const;

export const themeCssVariables = {
  "--theme-light-background": themeColors.light.background,
  "--theme-light-foreground": themeColors.light.foreground,
  "--theme-light-muted-foreground": themeColors.light.mutedForeground,
  "--theme-light-border": themeColors.light.border,
  "--theme-light-surface": themeColors.light.surface,
  "--theme-light-accent": themeColors.light.accent,
  "--theme-light-accent-strong": themeColors.light.accentStrong,
  "--theme-light-accent-soft": themeColors.light.accentSoft,
  "--theme-light-accent-muted": themeColors.light.accentMuted,
  "--theme-light-tab-muted": themeColors.light.tabMuted,
  "--theme-light-global-gradient": themeColors.light.globalGradient,

  "--theme-dark-background": themeColors.dark.background,
  "--theme-dark-foreground": themeColors.dark.foreground,
  "--theme-dark-muted-foreground": themeColors.dark.mutedForeground,
  "--theme-dark-border": themeColors.dark.border,
  "--theme-dark-surface": themeColors.dark.surface,
  "--theme-dark-accent": themeColors.dark.accent,
  "--theme-dark-accent-strong": themeColors.dark.accentStrong,
  "--theme-dark-accent-soft": themeColors.dark.accentSoft,
  "--theme-dark-accent-muted": themeColors.dark.accentMuted,
  "--theme-dark-tab-muted": themeColors.dark.tabMuted,
  "--theme-dark-global-gradient": themeColors.dark.globalGradient,
} as const;

const colors = {
  background: "bg-background",
  text: "text-foreground",
  placeholderText: "placeholder:text-muted-foreground",
  border: "border-border",

  white: themeColors.light.surface,
  black: "#000000",

  primary: "bg-zinc-900 text-white",
  primaryHover: "hover:bg-black dark:hover:bg-zinc-700",

  danger: "text-red-600 dark:text-red-400",
  success: "text-emerald-600 dark:text-emerald-400",
  info: "text-sky-600 dark:text-sky-400",

  card: "border border-border bg-surface",

  input:
    "bg-surface border border-border text-foreground placeholder:text-muted-foreground",

  toastSuccess:
    "border border-emerald-600/25 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300",

  toastError:
    "border border-red-600/25 bg-red-600/10 text-red-700 dark:text-red-300",

  toastInfo:
    "border border-sky-600/25 bg-sky-600/10 text-sky-700 dark:text-sky-300",
};

export default colors;
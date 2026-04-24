export const FONT_VARIABLES = {
  site: "--font-site",
} as const;

export const fonts = {
  heading: `var(${FONT_VARIABLES.site})`,
  body: `var(${FONT_VARIABLES.site})`,
} as const;

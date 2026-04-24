import type { Config } from "tailwindcss";
import { fonts } from "./constants/fonts";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: fonts.heading,
        body: fonts.body,
      },
    },
  },
  plugins: [],
};

export default config;

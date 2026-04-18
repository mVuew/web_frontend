import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--font-kanit)",
        body: "var(--font-inter)",
      },
    },
  },
  plugins: [],
};

export default config;

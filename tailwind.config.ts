import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-site)", '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.02em",
        snug: "-0.01em",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        glass: "0 24px 80px rgba(15, 23, 42, 0.16)",
      },
    },
  },
  plugins: [],
}
export default config

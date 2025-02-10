import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "blur-pulse": "blur-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange: {
          primary: "#F87D4F",
        },
      },
      keyframes: {
        "blur-pulse": {
          "0%, 100%": { filter: "blur(40px)" },
          "50%": { filter: "blur(20px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

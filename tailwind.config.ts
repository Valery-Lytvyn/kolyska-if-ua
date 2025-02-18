import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#333333",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "secondary-accent": "var(--color-secondary-accent)",
        accent: "var(--color-accent)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        "primary-hover": "var(--color-primary-hover)",
        "accent-hover": "var(--color-accent-hover)",
      },
      backgroundColor: {
        "light-gray": "var(--light-gray)",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          iwl: "#FF007A",
        },
        yellow: {
          iwl: "#ffd600",
        },
      },
      animation: {
        "marquee-slow": "marquee 45s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

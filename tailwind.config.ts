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
        gold: {
          DEFAULT: "#c9a96e",
          light: "#e8d5a3",
          dark: "#a07c45",
          pale: "#f5ecd7",
        },
        navy: {
          DEFAULT: "#0a1628",
          deep: "#020408",
          mid: "#0f1f3d",
          light: "#162544",
        },
        glass: "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        accent: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,169,110,0.4)" },
          "50%": { boxShadow: "0 0 0 20px rgba(201,169,110,0)" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c9a96e, #e8d5a3, #c9a96e)",
        "dark-gradient": "linear-gradient(180deg, #020408 0%, #0a1628 50%, #020408 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(2,4,8,0.3) 0%, rgba(2,4,8,0.7) 60%, rgba(2,4,8,0.95) 100%)",
        "card-gradient": "linear-gradient(180deg, transparent 0%, rgba(2,4,8,0.9) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;

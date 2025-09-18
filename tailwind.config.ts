import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      keyframes: {
        slowpulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        orb1: {
          '0%': { transform: 'rotate(0deg) translateX(8%) rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) translateX(8%) rotate(-180deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) translateX(8%) rotate(-360deg) scale(1)' },
        },
        orb2: {
          '0%': { transform: 'rotate(360deg) translateX(10%) rotate(-360deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) translateX(10%) rotate(180deg) scale(1.06)' },
          '100%': { transform: 'rotate(0deg) translateX(10%) rotate(0deg) scale(1)' },
        },
      },
      animation: {
        'slow-pulse': 'slowpulse 6s ease-in-out infinite',
        'orb-1': 'orb1 18s linear infinite',
        'orb-2': 'orb2 22s linear infinite',
      },
      colors: {
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        muted: "hsl(var(--muted))",
        accent: {
          green: "hsl(var(--accent-green))",
          blue: "hsl(var(--accent-blue))",
        },
        primary: {
          DEFAULT: "#f59e0b", // amber-500
        },
        secondary: {
          DEFAULT: "#14b8a6", // teal-500
        },
        card: "hsl(var(--card))",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.25)",
        glow: "0 0 60px rgba(251,191,36,.15)",
      },
      maxWidth: {
        container: "1200px",
      }
    },
  },
  plugins: [],
};

export default config;

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}



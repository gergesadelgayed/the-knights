/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#050814",
          900: "#0a1030",
          800: "#0f1740",
        },
        neon: {
          blue: "#00d4ff",
          steel: "#1e90ff",
          crimson: "#ff1744",
        },
      },
      fontFamily: {
        display: ["'Rajdhani'", "sans-serif"],
        mono: ["'Chakra Petch'", "monospace"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "glow-blue": "0 0 12px rgba(0, 212, 255, 0.55), 0 0 32px rgba(30, 144, 255, 0.25)",
        "glow-crimson": "0 0 12px rgba(255, 23, 68, 0.55), 0 0 32px rgba(255, 23, 68, 0.2)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { filter: "drop-shadow(0 0 6px rgba(0,212,255,0.6))" },
          "50%": { filter: "drop-shadow(0 0 18px rgba(0,212,255,0.95))" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

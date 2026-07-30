/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        // Base surfaces
        canvas: "#FAFAFF",
        "canvas-dark": "#0F0D2B",
        surface: "#FFFFFF",
        "surface-dark": "#1E1B4B",
        // Text
        ink: "#1E1B2E",
        "ink-dark": "#F1F0FA",
        muted: "#64748B",
        "muted-dark": "#9491C4",
        // Morph gradient stops (the signature)
        morph: {
          violet: "#7C3AED",
          blue: "#3B82F6",
          pink: "#EC4899",
        },
        border: {
          DEFAULT: "rgba(30, 27, 75, 0.08)",
          dark: "rgba(241, 240, 250, 0.12)",
        },
      },
      backgroundImage: {
        "morph-gradient": "linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #EC4899 100%)",
        "morph-gradient-soft": "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.12) 50%, rgba(236,72,153,0.12) 100%)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(30, 27, 75, 0.06)",
        "soft-lg": "0 20px 60px rgba(30, 27, 75, 0.12)",
        glow: "0 0 40px rgba(124, 58, 237, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "morph-shift": {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 45% 55% 55%" },
          "50%": { borderRadius: "60% 40% 30% 70% / 55% 60% 40% 45%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "morph-shift": "morph-shift 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

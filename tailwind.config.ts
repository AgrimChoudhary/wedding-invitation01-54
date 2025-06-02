
import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced RCB color palette
        maroon: "#7f1d1d", // darker red for better contrast
        cream: "#fef3c7", // warmer cream with yellow tint
        gold: {
          light: "#fbbf24", // brighter gold
          dark: "#d97706", // deeper amber
        },
        // New RCB themed colors
        rcb: {
          red: "#dc2626",
          gold: "#fbbf24",
          black: "#000000",
          white: "#ffffff"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(3deg)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "victory-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(251, 191, 36, 0.8), 0 0 60px rgba(220, 38, 38, 0.6)",
            transform: "scale(1.05)"
          },
        },
        "trophy-bounce": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-15px)" },
          "60%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "heart-beat": "heart-beat 1.5s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "scale-up": "scale-up 0.8s forwards",
        "fade-in": "fade-in 1s forwards",
        "fade-in-left": "fade-in-left 0.8s forwards",
        "fade-in-right": "fade-in-right 0.8s forwards",
        "blink": "blink 1s infinite",
        "victory-glow": "victory-glow 3s ease-in-out infinite",
        "trophy-bounce": "trophy-bounce 2s infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(to right, #fbbf24, #f59e0b, #fbbf24)",
        "rcb-gradient": "linear-gradient(45deg, #dc2626, #fbbf24)",
        "victory-gradient": "linear-gradient(135deg, #dc2626 0%, #fbbf24 50%, #dc2626 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(251, 191, 36, 0.5)",
        "gold-lg": "0 0 30px rgba(251, 191, 36, 0.7)",
        "rcb": "0 0 25px rgba(220, 38, 38, 0.4), 0 0 50px rgba(251, 191, 36, 0.3)",
        "victory": "0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(220, 38, 38, 0.6)",
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      textShadow: {
        'rcb': '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(251, 191, 36, 0.5)',
        'victory': '0 0 10px rgba(251, 191, 36, 0.8), 0 0 20px rgba(220, 38, 38, 0.6)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

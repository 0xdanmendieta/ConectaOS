import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Conecta OS palette (see PROMPT MAESTRO §3)
        purple: {
          institutional: "#800080",
          DEFAULT: "#6E1ED4", // Primary UI Purple
          deep: "#5510A8",
        },
        lavender: {
          DEFAULT: "#B68BFF",
          light: "#E8D8FF",
          bg: "#F5EEFF", // Soft Lavender Background
        },
        nexo: {
          DEFAULT: "#F57A1F", // Nexo Orange
          soft: "#FFB15A",
          cream: "#FFF6EF", // Warm Cream
        },
        porcelain: "#FBFAF8",
        graphite: "#1B1B20",
        muted: "#5E5A6B",
        line: "#E9E3F3",
        ok: "#16A34A",
        warn: "#F57A1F",
        critical: "#EF4444",
      },
      fontFamily: {
        sans: [
          "Satoshi",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["Inter Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(27,27,32,0.06), 0 2px 8px rgba(109,30,212,0.04)",
        "card-hover":
          "0 16px 40px rgba(109,30,212,0.12), 0 4px 12px rgba(27,27,32,0.05)",
        topbar: "0 4px 20px rgba(27,27,32,0.06)",
        pop: "0 20px 50px rgba(27,27,32,0.14), 0 4px 14px rgba(109,30,212,0.08)",
      },
      borderRadius: {
        xl2: "16px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

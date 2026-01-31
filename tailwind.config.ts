import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1f2a",
        lake: "#1d4ed8",
        pine: "#0f766e",
        sun: "#f59e0b",
        alert: "#dc2626"
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(15, 23, 42, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;

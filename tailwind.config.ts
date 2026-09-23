import type { Config } from "tailwindcss";

// Los tokens de diseño se mapean en la etapa 1 desde styles/tokens.css.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

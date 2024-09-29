import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";

const tailwindcssConfig: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter-sans)", ...fontFamily.sans],
      mono: ["var(--font-fira-mono)", ...fontFamily.mono],
    },
  },
  plugins: [],
};

export default tailwindcssConfig;

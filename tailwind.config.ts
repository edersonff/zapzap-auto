import type { Config } from "tailwindcss";

const mainSizes = {
  "main-1": "69px",
  "main-2": "168px",
  "main-3": "267px",
  "main-4": "367px",
  "main-5": "466px",
  "main-6": "565px",
  "main-7": "664px",
  "main-8": "763px",
  "main-9": "863px",
  "main-10": "962px",
  "main-11": "1061px",
};

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      minWidth: mainSizes,
      maxWidth: mainSizes,
      width: mainSizes,
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
      },
      padding: {
        section: "100px",
      },
      gap: {
        main: "30px",
      },
      borderRadius: {
        main: "20px",
      },
      screens: {
        big: [{ min: "1024px" }, { min: "1280px" }],
        small: [{ max: "1023px" }],
      },
      fontFamily: {
        text: ["var(--font-inter)"],
        title: ["var(--font-merriweather)"],
      },
      fontSize: {
        small: "10px",
      },
      colors: {
        primary: "#171F38",
        secondary: "#25D366",
        dark: "#1A1A1A",
        light: "#FBF5F3",

        link: "#0066FF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss/plugin")(({ matchUtilities }: any) => {
      matchUtilities({
        x: (value: string) => ({
          [`@apply ${value.replaceAll(",", " ")}`]: {},
        }),
      });
    }),
  ],
};
export default config;

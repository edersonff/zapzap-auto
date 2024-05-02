"use client";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          100: "#E0A3FF",
          200: "#B370FF",
          300: "#8D3AFF",
          400: "#6A1AFF",
          500: "#4C00FF",
          600: "#C525D3",
          700: "#A61AB3",
          800: "#861094",
          900: "#6B007A",
        },
      },
    },
  },
  components: {
    JoyButton: {
      defaultProps: {
        size: "md",
      },
      styleOverrides: {
        root: {
          borderRadius: "100px",
        },
      },
    },
  },
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
}

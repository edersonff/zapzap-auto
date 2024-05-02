import React from "react";
import FontProvider from "./font";
import ThemeProvider from "./theme";
import StylesProvider from "./styles";
import HydrationProvider from "./hydration";
import ReactQueryProvider from "./react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FontProvider>
      <StylesProvider>
        <ThemeProvider>
          <HydrationProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </HydrationProvider>
        </ThemeProvider>
      </StylesProvider>
    </FontProvider>
  );
}

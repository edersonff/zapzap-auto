import React from "react";
import FontProvider from "./font";
import StylesProvider from "./styles";
import HydrationProvider from "./hydration";
import ReactQueryProvider from "./react-query";
import SessionProvider from "./session";
import AlertProvider from "./alert";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FontProvider>
      <StylesProvider>
        <HydrationProvider>
          <SessionProvider>
            <AlertProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </AlertProvider>
          </SessionProvider>
        </HydrationProvider>
      </StylesProvider>
    </FontProvider>
  );
}

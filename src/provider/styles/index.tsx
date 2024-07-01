import React from "react";

import "../../app/globals.css";
import { CssVarsProvider } from "@mui/joy";

export default function StylesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CssVarsProvider>
      <>{children}</>
    </CssVarsProvider>
  );
}

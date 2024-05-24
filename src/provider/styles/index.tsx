import React from "react";

import "../../app/globals.css";
import { CssVarsProvider } from "@mui/joy";
import dynamic from "next/dynamic";

const WorldMap: any = dynamic(() => import("./WorldMap"), {
  ssr: false,
});

export default function StylesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CssVarsProvider>
      <WorldMap>{children}</WorldMap>
    </CssVarsProvider>
  );
}

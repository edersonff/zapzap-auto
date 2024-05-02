import React from "react";

import "../../app/globals.css";

export default function StylesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

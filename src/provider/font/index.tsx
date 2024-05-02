"use client";

import { Merriweather, Inter } from "next/font/google";
import React from "react";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  weight: ["400", "700", "900"],
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-merriweather",
});

export default function FontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${inter.variable} ${merriweather.variable}`}>
      {children}
    </body>
  );
}
